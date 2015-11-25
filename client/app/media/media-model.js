(function() {
	'use strict';

	angular.module('enterprise-portal.models.media', [
		'enterprise-portal.services.media'
	])
	
	.service('MediaModel', [
		'$http',
		'$q',
		'MediaService',
		
		function(
			$http,
			$q,
			MediaService
		) {
			var model = this;
			
			
			model.getMediaReservation = function(numberOfFiles) {
				return MediaService.getMediaReservation(numberOfFiles)
					.then(
						function success(response) {
							//console.log(JSON.stringify(response.files));
							var fileReservations = response.files;
							var listOfFiles = [];

							angular.forEach(response.files, function(file, i) {
								listOfFiles.push(file.sid);
							});

							//console.log("fileSIDS:" + listOfFiles);
							return listOfFiles;
						},
						function error(response) {
							return response;
						});
			}

			model.postMessageMedia = function(mediaSIDList, assets) {
				//console.log("model sid:" + mediaSIDList);
				//console.log("assets: " + assets);

				var numberOfFiles = assets.length;
				//console.log("numberOfFiles: " + numberOfFiles);

				var strToIndex = ";base64,";
				//var mediaArray = [];

				angular.forEach(assets, function(file, i) {
					var strStart = (file.indexOf(";base64,") + strToIndex.length);
					var mediaObj = file.slice(strStart, -1);
					var mediaSID = mediaSIDList[i];

					var media = {
						"userFile": {
							"sid": mediaSID,
							"context": "message",
							"name": "New File for message",
							"uploadUri": "http://localhost:8000/1.1/media",
							"content": mediaObj
						}
					} 

					MediaService.postMedia(media)
						.then(
								function success(response) {
									//console.log(JSON.stringify(response));
								},
								function error(response) {

								}
							);
				});
				//console.log(mediaArray);

			}

			model.postMedia = function(mediaFiles) {

				var numberOfFiles = mediaFiles.length;
				var strToIndex = ";base64,";
				var mediaArray = [];

				angular.forEach(mediaFiles, function(file, i){
		    	var strStart = (file.indexOf(";base64,") + strToIndex.length);
					var mediaObj = file.slice(strStart, -1);
					mediaArray.push(mediaObj);
		    });

				console.log(mediaArray);

				return model.getMediaReservation(numberOfFiles)
					.then(
						function success(response) {
							console.log(JSON.stringify(response.files));
							var fileReservations = response.files;
							var listOfFiles = [];

							angular.forEach(response.files, function(file, i) {
								listOfFiles.push(file.sid);
							});

						//console.log("fileSIDS:" + listOfFiles);
						return listOfFiles;

							// var media = {
							// 	"userFile": {
							// 		"sid": reservationSID,
							// 		"context": "message",
							// 		"name": "New File for message",
							// 		"uploadUri": "http://localhost:8000/1.1/media",
							// 		"content": mediaObj
							// 	}
							// } 

							//console.log(JSON.stringify(media));

							// MediaService.postMedia(media)
							// 	.then(
							// 			function success(response) {
							// 				console.log(JSON.stringify(response));
							// 			},
							// 			function error(response) {

							// 			}
							// 		);


						},
						function error(response) {

						}
					)
			}

		
		
		}
	]);

})();