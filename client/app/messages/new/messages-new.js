(function() {
	'use strict';

	angular.module('messages.new', [])
	
	.controller('NewMessageCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		'$timeout',
		'$stateParams',
		'FoundationApi',
		'MessageDetailModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			$http,
			$timeout,
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

			$scope.uploader = {};

			newMessageCtrl.areFilesUploaded = false;

			$http.get('assets/data/demo-images.json').success(function(data) {
				newMessageCtrl.demoImages = data.demoImages;
			});

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
				"range": 5000,
				"discoverOn": 1, // 1 => enter; 2 => leave
				"startDate": todayProperFormatted,
				"startTime": "12:01 AM",
				"endDate": tomorrowProperFormatted,
				"endTime": "11:59 PM",
				// "startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
				// "endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime(),
				"locationName": "",
				"coordinates": {"lat":53.337524,"lng":-6.270449},
				"assets": []
			};


			newMessageCtrl.editMessageTemplate = {
				"messageTitle": "The Market Bar",
				"sid": "02",
				"content": "Welcome Web Summit Attendees to The Market Bar! Join us at Barstool #3 and we'd love to buy you a pint!  Of course there is a catch you will have to claim your company's Quiver handle #QuiverCYH, but hey you'll want to do that anyway once you get to know us!",
				"status": "Inactive",
				"range": 200,
				"discoverOn": 1, // 1 => enter; 2 => leave
				"startDate": "11/2/2015",
				"startTime": "9:00 AM",
				"endDate": "11/3/2015",
				"endTime": "6:00 AM",
				// "startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
				// "endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime(),
				"locationName": "The Market Bar",
				"coordinates": {"lat":53.3420655,"lng":-6.2661938},
				"assets": []
			};


			newMessageCtrl.newMessage = newMessageCtrl.newMessageTemplate;

			if ($state.current.name == "messages.edit" ) {
				newMessageCtrl.isEditing = true;
				newMessageCtrl.newMessage = newMessageCtrl.editMessageTemplate;
				setMapCenter();
   				$timeout(function() {
        			angular.forEach(newMessageCtrl.demoImages, function(img) {
				      
				      newMessageCtrl.newMessage.assets.push(img.image);
				      $scope.uploader.flow.files.push(img.image);
				    });
					console.log(newMessageCtrl.newMessage.assets)
					console.log($scope.uploader.flow.files)
    			}, 500);

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

				FoundationApi.publish('main-notifications', {
							title: 'Message Sent',
							content: '',
							color: 'success',
							autoclose: '3000'
						});

						$state.go('messages.dashboard');
			}

			newMessageCtrl.updateMessage = function() {
				FoundationApi.publish('main-notifications', {
							title: 'Message Saved',
							content: '',
							color: 'success',
							autoclose: '3000'
						});

						$state.go('messages.dashboard');
			}


			newMessageCtrl.messageTags = [
				{ name: "#SanFrancisco", ticked: false },
				{ name: "#Barcelona", ticked: false },
				{ name: "#WebSummit", ticked: true },
				{ name: "#Dublin", ticked: true},
				{ name: "#FadeStreet", ticked: false},
				{ name: "#TheMarketBar", ticked: false}
			];

		  	$scope.processFiles = function(files){
		  		newMessageCtrl.areFilesUploaded = true;
		    	angular.forEach(files, function(flowFile, i){
		       	var fileReader = new FileReader();
		          	fileReader.onload = function (event) {
		            	var uri = event.target.result;
		              	newMessageCtrl.newMessage.assets.push(uri);
		              	console.log(newMessageCtrl.newMessage.assets)

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
					if(currentRange != 10000){
					  	$scope.newMessageCtrl.newMessage.range = currentRange + 50;
					}
				}
				else{
					if(currentRange != 0){
						$scope.newMessageCtrl.newMessage.range = currentRange - 50;
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
				range = range > 100000 ? 100000 : (range < 0 || !range ? 0 : range);
				newMessageCtrl.newMessage.range = range;
			};


		}
	]);

})();