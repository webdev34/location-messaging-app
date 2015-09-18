(function() {
	'use strict';

	angular.module('messages.new', [])
	
	.controller('NewMessageCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'FoundationApi',
		'MessageListModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			FoundationApi,
			MessageListModel
		) {
			var newMessageCtrl = this;
			
			newMessageCtrl.showStartDatePicker = false;
			newMessageCtrl.showEndDatePicker = false;
			newMessageCtrl.showStartTimePicker = false;
			newMessageCtrl.endStartTimePicker = false;

			newMessageCtrl.coordinates =  {"H":43.657504642319005,"L":-79.37607067187501};
			newMessageCtrl.initialMapCenter = newMessageCtrl.coordinates.H + ","+ newMessageCtrl.coordinates.L;

			newMessageCtrl.newMessage = {
					"sid": "",
					"messageTitle": "",
					"content": "",
					"status": "Inactive",
					"range": 5,
					"sentTo": "TARGET_FRIENDS",
					"discoverOn": "enter",
					"startTime": "12:01 AM",
					"endTime": "11:59 PM",
					"locationName": "",
					"latlng": [],
					"assets": [],


					"locationName": "generic name",
					"coordinates": [-79.383184, 43.653226]
				};

			
			function resetForm() {
				var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();
				
				newMessageCtrl.newMessage = {
					"sid": "",
					"messageTitle": "",
					"content": "",
					"status": "Inactive",
					"range": 5,
					"sentTo": "TARGET_FRIENDS",
					"discoverOn": "enter",
					"startDate": todayProperFormatted,
					"startTime": "12:01 AM",
					"endDate": tomorrowProperFormatted,
					"endTime": "11:59 PM",
					"locationName": "",
					"latlng": [],
					"assets": [],
					"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
					"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime(),
					"locationName": "generic name",
					"coordinates": [-79.383184, 43.653226]
				};
			}
			
			newMessageCtrl.createNewMessage = function() {
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

			$scope.$watch("newMessageCtrl.newMessage.range", function(newValue, oldValue){
				// console.log("from msg ctrl:" + newMessageCtrl.newMessage.range);
				// $rootScope.map_range = newValue;
			});

			$scope.uploader = {};

		  	$scope.processFiles = function(files){
		    	angular.forEach(files, function(flowFile, i){
		       	var fileReader = new FileReader();
		          	fileReader.onload = function (event) {
		            	var uri = event.target.result;
		              	newMessageCtrl.newMessage.assets.push(uri);
		          	};
		          	fileReader.readAsDataURL(flowFile.file);
		    	});
		  	};

		  	$scope.removeFile = function(index){
		        newMessageCtrl.newMessage.assets.splice(index, 1);  
		        $scope.uploader.flow.files.splice(index, 1);
		  	};

			$scope.map_range_change = function(operator) {
				var currentRange = parseFloat($scope.newMessageCtrl.newMessage.range);
				if(operator == 'addRange'){
					if(currentRange != 100){
					  	$scope.newMessageCtrl.newMessage.range = currentRange + 0.50;
					}
				}
				else{
					if(currentRange != 0){
						$scope.newMessageCtrl.newMessage.range = currentRange - 0.50;
					}
				}
			};
			
			function clearTakeOverSelectors(){
				newMessageCtrl.showStartDatePicker = false;
				newMessageCtrl.showEndDatePicker = false;
				newMessageCtrl.showStartTimePicker = false;
				newMessageCtrl.showEndTimePicker = false;
			}
			
			$scope.$watch("newMessageCtrl.newMessage.startDate", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.endDate", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.startTime", clearTakeOverSelectors);
			$scope.$watch("newMessageCtrl.newMessage.endTime", clearTakeOverSelectors);
			
			$scope.checkRange = function(){
				var range = parseInt(newMessageCtrl.newMessage.range);
				range = range > 100 ? 100 : (range < 0 || !range ? 0 : range);
				newMessageCtrl.newMessage.range = range;
			};

			$scope.doSearch = function(){
				$rootScope.map_search = newMessageCtrl.search;
			};

			resetForm();
		}
	]);

})();