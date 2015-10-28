(function() {
	'use strict';

	angular.module('messages.new', [])
	
	.controller('NewMessageCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$stateParams',
		'FoundationApi',
		'MessageDetailModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			$stateParams,
			FoundationApi,
			MessageDetailModel
		) {
			
			var newMessageCtrl = this;
			
			newMessageCtrl.isEditing = false;
			
			newMessageCtrl.showStartDatePicker = false;
			newMessageCtrl.showEndDatePicker = false;
			newMessageCtrl.showStartTimePicker = false;
			newMessageCtrl.endStartTimePicker = false;

			// Setting up Dates
			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

			newMessageCtrl.newMessageTemplate = {
				"messageTitle": "",
				"content": "",
				"status": "Inactive",
				"range": 5,
				"discoverOn": 1, // 1 => enter; 2 => leave
				"startDate": todayProperFormatted,
				"startTime": "12:01 AM",
				"endDate": tomorrowProperFormatted,
				"endTime": "11:59 PM",
				// "startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
				// "endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime(),
				"locationName": "",
				"coordinates": {"lat":43.657504642319005,"lng":-79.3760706718750}
			};

			newMessageCtrl.newMessage = newMessageCtrl.newMessageTemplate;

			if ($state.current.name == "messages.edit" ) {
				newMessageCtrl.isEditing = true;
				//console.log('$stateParams: '+ $stateParams._id);

				MessageDetailModel.getMessageDetail($stateParams._id)
					.then (
					function success(response) {
							console.log("response: " + JSON.stringify(response));

							newMessageCtrl.newMessage = response;

							JSON.stringify('new message 67:' + newMessageCtrl.newMessage);

							setMapCenter();


					},
					function error(response) {
					});

			} else {
				setMapCenter();
			}

			//JSON.stringify('new message:' + newMessageCtrl.newMessage);

			function setMapCenter() {
				newMessageCtrl.initialMapCenter = newMessageCtrl.newMessage.coordinates.lat + ","+ newMessageCtrl.newMessage.coordinates.lng;
			}
			
			
			function resetForm() {
				newMessageCtrl.newMessage = newMessageCtrl.newMessageTemplate;
			}

			newMessageCtrl.createNewMessage = function() {
				
				//console.log("logging new message: " + JSON.stringify(newMessageCtrl.newMessage));

				MessageDetailModel.createNewMessage(newMessageCtrl.newMessage).then(
					function success(response){
						
						FoundationApi.publish('main-notifications', {
							title: 'Message Sent',
							content: '',
							color: 'success',
							autoclose: '3000'
						});

						$state.go('messages.dashboard');

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

			newMessageCtrl.updateMessage = function() {
				console.log('updating');
				MessageDetailModel.updateMessage(newMessageCtrl.newMessage).then(
					function success(response){
						
						FoundationApi.publish('main-notifications', {
							title: 'Message Sent',
							content: '',
							color: 'success',
							autoclose: '3000'
						});

						$state.go('messages.dashboard');

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

			


			newMessageCtrl.messageTags = [
				{ name: "Tag 1", ticked: false },
				{ name: "Tag 2", ticked: false},
				{ name: "Tag 3", ticked: false},
				{ name: "Tag 4", ticked: false},
				{ name: "Tag 5", ticked: false},
				{ name: "Tag 6", ticked: false},
				{ name: "Tag 7", ticked: false},
				{ name: "Tag 8", ticked: false},
				{ name: "Tag 9", ticked: false},
				{ name: "Tag 10", ticked: false}
			];



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


		}
	]);

})();