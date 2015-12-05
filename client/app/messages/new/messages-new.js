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
		'MediaModel',
		'$http',
		
		function(
			$rootScope,
			$scope,
			$state,
			$stateParams,
			FoundationApi,
			MessageDetailModel,
			MediaModel,
			$http
		) {
			
			var newMessageCtrl = this;
			
			newMessageCtrl.isEditing = false;
			newMessageCtrl.uploadingImages = false;
			
			newMessageCtrl.showStartDatePicker = false;
			newMessageCtrl.showEndDatePicker = false;
			newMessageCtrl.showStartTimePicker = false;
			newMessageCtrl.endStartTimePicker = false;

			newMessageCtrl.uploader = {};

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
				"coordinates": {"lat":43.657504642319005,"lng":-79.3760706718750},
				"assets": []
			};

			
			newMessageCtrl.newMessage = newMessageCtrl.newMessageTemplate;

			if ($state.current.name == "messages.edit" ) {
				
				newMessageCtrl.isEditing = true;
				//console.log('$stateParams: '+ $stateParams._id);

				MessageDetailModel.getMessageDetail($stateParams._id)
					.then (
					function success(response) {
							//console.log("response: " + JSON.stringify(response));

							newMessageCtrl.newMessage = response;

							JSON.stringify('new message 67:' + newMessageCtrl.newMessage);

							setMapCenter();

					},
					function error(response) {


					});

				// Adding images to FLOW object -- When working remove http and use response data for mediaArray variable
				// $http.get('assets/data/edit-message-example.json').success(function(data) {
				// 	var mediaArray = data.data.message[0].media
				// 	angular.forEach(mediaArray, function(img, i){
	   //     				newMessageCtrl.newMessage.assets.push(img.url);  
	   //      			newMessageCtrl.uploader.flow.files.push(img.url);
	  	// 			});
    //        		});	
						

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

			newMessageCtrl.postMediaFile = function(media) {

				MediaModel.postMedia(media);

			}

			newMessageCtrl.createNewMessage = function() {
				var assets = newMessageCtrl.newMessage.assets;
				//console.log(assets);

				if (assets.length > 0) {
					newMessageCtrl.uploadingImages = true;

					MediaModel.getMediaReservation(assets.length)
						.then( function(mediaSIDList) {
								var mediaArray = [];
								angular.forEach(mediaSIDList, function(sid, i) {
					 				mediaArray.push({"sid" : sid });
								});
								newMessageCtrl.newMessage.media = mediaArray;

							return mediaSIDList;
						})
						.then( function(mediaSIDList) {


							var numberOfFiles = assets.length;
							var finishedFiles = 0;
							var strToIndex = ";base64,";

							angular.forEach(assets, function(asset, i) {
								var strToIndex = ";base64,";
								var strStart = (asset.indexOf(";base64,") + strToIndex.length);
								var mediaObj = asset.slice(strStart, -1);

								MediaModel.postMessageMedia(mediaSIDList[i], mediaObj).then(function(success){
									finishedFiles++;
									checkIfDone();
								});
							}); 

							function checkIfDone() {
								if (finishedFiles >= numberOfFiles) {
									newMessageCtrl.uploadingImages = false;
									postMessage();
									return;
								};
							}

						});
					
				} else {
					postMessage();
				}


				function postMessage() {
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
				
			}

			newMessageCtrl.updateMessage = function() {

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

		  	newMessageCtrl.processFiles = function(files){
		    	angular.forEach(files, function(flowFile, i){
		       	var fileReader = new FileReader();
		          	fileReader.onload = function (event) {
		            	var uri = event.target.result;
		              	newMessageCtrl.newMessage.assets.push(uri);
		          	};
		          	fileReader.readAsDataURL(flowFile.file);
		          	// JSON.stringify("content:" + newMessageCtrl.newMessage.assets);
		    	});
		  	};

		  	newMessageCtrl.removeFile = function(index){
		        newMessageCtrl.uploader.flow.files.splice(index, 1);
		        newMessageCtrl.newMessage.assets.splice(index, 1); 
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
			
			newMessageCtrl.checkRange = function(){
				var range = parseInt(newMessageCtrl.newMessage.range);
				range = range > 100 ? 100 : (range < 0 || !range ? 0 : range);
				newMessageCtrl.newMessage.range = range;
			};

		}
	]);

})();