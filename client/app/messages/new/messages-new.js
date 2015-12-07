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

			var vm = this;

			var testObj = "123;base64,12345"
			var mediaObj = MediaModel.stripBase64(testObj);

			vm.isEditing = false;
			vm.uploadingImages = false;

			vm.showStartDatePicker = false;
			vm.showEndDatePicker = false;
			vm.showStartTimePicker = false;
			vm.endStartTimePicker = false;

			vm.uploader = {};

			// Setting up Dates
			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

			vm.newMessageTemplate = {
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


			vm.newMessage = vm.newMessageTemplate;

			if ($state.current.name == "messages.edit" ) {

				vm.isEditing = true;
				//console.log('$stateParams: '+ $stateParams._id);

				MessageDetailModel.getMessageDetail($stateParams._id)
					.then (
					function success(response) {
							//console.log("response: " + JSON.stringify(response));

							vm.newMessage = response;

							JSON.stringify('new message 67:' + vm.newMessage);

							setMapCenter();

					},
					function error(response) {


					});

				//if()

				/*
				$http.get('assets/data/edit-message-example.json').success(function(data) {
					var mediaArray = data.data.message[0].media
					angular.forEach(mediaArray, function(img, i){
	       				vm.newMessage.assets.push(img.url);
	        			vm.uploader.flow.files.push(img.url);
	  				});
           		});
				*/


			} else {
				setMapCenter();
			}



			//JSON.stringify('new message:' + vm.newMessage);

			function setMapCenter() {
				vm.initialMapCenter = vm.newMessage.coordinates.lat + ","+ vm.newMessage.coordinates.lng;
			}


			function resetForm() {
				vm.newMessage = vm.newMessageTemplate;
			}

			vm.postMediaFile = function(media) {

				MediaModel.postMedia(media);

			}

			vm.createNewMessage = function() {
				var assets = vm.newMessage.assets;
				//console.log(assets);

				if (assets.length > 0) {
					vm.uploadingImages = true;

					MediaModel.getMediaReservation(assets.length)
						.then( function(mediaSIDList) {
								var mediaArray = [];
								angular.forEach(mediaSIDList, function(sid, i) {
					 				mediaArray.push({"sid" : sid });
								});
								vm.newMessage.media = mediaArray;

							return mediaSIDList;
						})
						.then( function(mediaSIDList) {


							var numberOfFiles = assets.length;
							var finishedFiles = 0;

							angular.forEach(assets, function(asset, i) {
								// var strToIndex = ";base64,";
								// var strStart = (asset.indexOf(";base64,") + strToIndex.length);
								// var mediaObj = asset.slice(strStart, -1);

								var mediaObj = MediaModel.stripBase64(asset);


								MediaModel.postMessageMedia(mediaSIDList[i], mediaObj).then(function(success){
									finishedFiles++;
									checkIfDone();
								});
							});

							function checkIfDone() {
								if (finishedFiles >= numberOfFiles) {
									vm.uploadingImages = false;
									postMessage();
									return;
								};
							}

						});

				} else {
					postMessage();
				}


				function postMessage() {
					MessageDetailModel.createNewMessage(vm.newMessage).then(
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

			vm.updateMessage = function() {

				MessageDetailModel.updateMessage(vm.newMessage).then(
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

			vm.messageTags = [
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

		  	vm.processFiles = function(files){
		    	angular.forEach(files, function(flowFile, i){
		       	var fileReader = new FileReader();
		          	fileReader.onload = function (event) {
		            	var uri = event.target.result;
		              	vm.newMessage.assets.push(uri);
		          	};
		          	fileReader.readAsDataURL(flowFile.file);
		          	// JSON.stringify("content:" + vm.newMessage.assets);
		    	});
		  	};

		  	vm.removeFile = function(index){
		        vm.uploader.flow.files.splice(index, 1);
		        vm.newMessage.assets.splice(index, 1);
		  	};

			function clearTakeOverSelectors(){
				vm.showStartDatePicker = false;
				vm.showEndDatePicker = false;
				vm.showStartTimePicker = false;
				vm.showEndTimePicker = false;
			}

			$scope.$watch("vm.newMessage.startDate", clearTakeOverSelectors);
			$scope.$watch("vm.newMessage.endDate", clearTakeOverSelectors);
			$scope.$watch("vm.newMessage.startTime", clearTakeOverSelectors);
			$scope.$watch("vm.newMessage.endTime", clearTakeOverSelectors);

			vm.checkRange = function(){
				var range = parseInt(vm.newMessage.range);
				range = range > 100 ? 100 : (range < 0 || !range ? 0 : range);
				vm.newMessage.range = range;
			};

		}
	]);

})();
