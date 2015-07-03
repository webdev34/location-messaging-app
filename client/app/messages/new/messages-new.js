(function() {
	'use strict';

	angular.module('messages.new', [])
	
	.controller('NewMessageCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$stateParams',
		'FoundationApi',
		'MessageListModel',
		'MessageDetailModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			$stateParams,
			FoundationApi,
			MessageListModel,
			MessageDetailModel
		) {
			var newMessageCtrl = this;
			
			newMessageCtrl.title = {
					"messages.new": "Compose",
					"messages.edit": "Edit"
				}[$state.current.name];
			
			var createNewMessage = function() {
				MessageListModel.createNewMessage(newMessageCtrl.newMessage).then(
					function success(response){
						$state.go('messages.dashboard');
						
						FoundationApi.publish('main-notifications', {
							title: 'Message Sent',
							content: '',
							color: 'success',
							autoclose: '3000'
						});
					},
					function error(response) {
						FoundationApi.publish('main-notifications', {
							title: 'Message Was Not Sent',
							content: response.code,
							color: 'fail',
							autoclose: '3000'
						});
					}
				);
			}

			var updateMessage = function() {
				MessageDetailModel.updateMessage(newMessageCtrl.newMessage).then(
					function success(response){
						$state.go('messages.dashboard');
						
						FoundationApi.publish('main-notifications', {
							title: 'Message Sent',
							content: '',
							color: 'success',
							autoclose: '3000'
						});
					},
					function error(response) {
						FoundationApi.publish('main-notifications', {
							title: 'Message Was Not Sent',
							content: response.code,
							color: 'fail',
							autoclose: '3000'
						});
					}
				);
			}
			
			// Fire create or update depending on mode
			newMessageCtrl.saveMessage = function(){
				newMessageCtrl.message = angular.copy(newMessageCtrl.newMessage); //*** matters if pulling message from cache
				
				switch($state.current.name){
					case "messages.new":
						createNewMessage();
						break;
					case "messages.edit":
						updateMessage();
						break;
				}
			}
			
			
			// Communicate with date & time selectors
			var clearTakeOverSelectors = function(){
				newMessageCtrl.showStartDatePicker = false;
				newMessageCtrl.showEndDatePicker = false;
				newMessageCtrl.showStartTimePicker = false;
				newMessageCtrl.showEndTimePicker = false;
				
				var sdArray = newMessageCtrl.newMessage.startDate.split("/"),
					edArray = newMessageCtrl.newMessage.endDate ? newMessageCtrl.newMessage.endDate.split("/") : null;
				
				newMessageCtrl.startTimestamp = new Date(sdArray[1] + "/" + sdArray[0] + "/" + sdArray[2] + "/" + newMessageCtrl.newMessage.startTime).getTime();
				newMessageCtrl.endTimestamp = edArray ? new Date(edArray[1] + "/" + edArray[0] + "/" + edArray[2] + "/" + newMessageCtrl.newMessage.endTime).getTime() : 0;
			};
			
			$scope.$watch("newMessageCtrl.newMessage.startDate", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.endDate", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.startTime", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.endTime", clearTakeOverSelectors);
			
			
			// Communicate with map
			$rootScope.$watch("map_coords", function(newValue, oldValue){
				newMessageCtrl.newMessage.latlng = newValue;
			});
			
			$scope.$watch("newMessageCtrl.newMessage.range", function(newValue, oldValue){
				$rootScope.map_range = newValue;
			});
			
			$scope.checkRange = function(){
				var range = parseInt(newMessageCtrl.newMessage.range);
				range = range > 100 ? 100 : (range < 0 || !range ? 0 : range);
				newMessageCtrl.newMessage.range = range;
			};

			$scope.doSearch = function(){
				newMessageCtrl.locationName = newMessageCtrl.search;
				$rootScope.map_search = newMessageCtrl.search;
			};
			
			
			// Reset form
			var resetForm = function() {
				newMessageCtrl.search = "Toronto, Ontario";
				$scope.doSearch();
				
				var today = new Date(),
					todayFormatted = ("00" + today.getDate()).slice(-2) + "/" + ("00" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				newMessageCtrl.newMessage = {
					"sid": "",
					"messageTitle": "",
					"content": "",
					"status": "Inactive",
					"range": 5,
					"sentTo": "TARGET_FRIENDS",
					"discoverOn": "enter",
					"startDate": todayFormatted,
					"startTime": "12:01 AM",
					"endDate": 0,
					"endTime": 0,
					"locationName": newMessageCtrl.search,
					"latlng": [],
					"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
					"endTimestamp": 0
				};
				
				clearTakeOverSelectors();
			};
			
			// Reset form
			resetForm();
			
			// Search for message by id if provided otherwise start new message
			if ($stateParams._id){
				MessageDetailModel.getMessageDetail($stateParams._id)
					.then(function(result) {
						if (result) {
							newMessageCtrl.message = result;
							newMessageCtrl.newMessage = angular.copy(newMessageCtrl.message); //*** matters if pulling message from cache
						} else {
							cancelEdit();
						}
					});
			}
		}
	]);

})();