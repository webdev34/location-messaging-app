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
			
			var range_timer;
			newMessageCtrl.range_meter = 50;
			$scope.checkRange = function(){
				var range_meter = parseInt(newMessageCtrl.range_meter);
				
				if (range_timer){
					clearInterval(range_timer);
				}
				
				if (range_meter != 50){ 
					var range_setting = (range_meter - 50) / 50; // -1 to 1
					var multiplier = range_setting > 0 ? 1 + Math.abs(range_setting) : 1 / (1 + Math.abs(range_setting));
					var speed = range_setting;
					
					range_timer = setInterval(function(){
						newMessageCtrl.newMessage.range = (parseFloat(newMessageCtrl.newMessage.range) * multiplier).toFixed(3);
						if (newMessageCtrl.newMessage.range < 0.009){
							newMessageCtrl.newMessage.range = 0.009; // 9 meters, same as the app
						}
						$scope.$apply();
					}, 200);
				}
			};

			$scope.doSearch = function(){
				newMessageCtrl.locationName = newMessageCtrl.search;
				$rootScope.map_search = newMessageCtrl.search;
			};
			
			
			// Image management
			$scope.$watch("newMessageCtrl.newMessage.file", function(newValue, oldValue){
				var att = document.getElementById("attachment-input");
				var preview = document.getElementById("img-preview");
				var files = att.files;
				var file;
				var imageType = /^image\//;

				var img = preview.getElementsByTagName("img")[0] || document.createElement("img");
				preview.appendChild(img);

				for (var i = 0; i < files.length; i++) {
					file = files[i];
					
					console.log(file);
					
					if (!imageType.test(file.type)) {
						continue;
					}
					
					img.file = file;
					
					var reader = new FileReader();
					reader.onload = (function(aImg) {
						return function(e) {
							aImg.src = e.target.result;
						};
					})(img);
					reader.readAsDataURL(file);
				}
			});
			
			
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
					"endTimestamp": 0,
					"file": null
				};
				
				clearTakeOverSelectors();
			};
			
			// Reset form
			resetForm();
			
			// Search for message by id if provided otherwise start new message
			if ($stateParams._id){
				MessageDetailModel.getMessageDetail($stateParams._id)
					.then(function(result) {
						var startDate = new Date(result.messageLocation[0].startTime);
						var endDate = new Date(result.messageLocation[0].endTime);
						
						var msgObj = {
							"sid": result.message[0].sid,
							"messageTitle": result.comment[0].text, //*** temporary, BE doesn't accept title yet
							"content": result.comment[0].text,
							"status": "Inactive", //*** temporary, BE doesn't accept status yet
							"range": result.messageLocation[0].distance,
							"sentTo": "TARGET_FRIENDS", //*** no envelope in response
							"discoverOn": result.messageLocation[0].trigger ? "enter" : "exit",
							"startDate": !result.messageLocation[0].startTime ? 0 : startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear(),
							"startTime": !result.messageLocation[0].startTime ? 0 : startDate.getHours() + ":" + startDate.getMinutes(),
							"endDate": !result.messageLocation[0].endTime ? 0 : endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear(),
							"endTime": !result.messageLocation[0].endTime ? 0 : endDate.getHours() + ":" + endDate.getMinutes(),
							"locationName": result.messageLocation[0].name,
							"latlng": result.messageLocation[0].geoFence.coordinates,
							"startTimestamp": result.messageLocation[0].startTime,
							"endTimestamp": result.messageLocation[0].endTime,
							"file": result.comment[0].media[0]
						}
						
						newMessageCtrl.search = result.messageLocation[0].name;
						
						newMessageCtrl.message = msgObj;
						newMessageCtrl.newMessage = angular.copy(newMessageCtrl.message); //*** matters if pulling message from cache
					});
			}
		}
	]);

})();