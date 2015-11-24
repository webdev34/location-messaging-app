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
							return response;
						},
						function error(response) {
							return response;
						});
			}
			model.postMedia = function(mediaFile) {
				//console.log("media file:" + mediaFile);
				//var btoaFile = btoa(mediaFile);
				//console.log("btoa file:" + btoaFile);
				var strToIndex = ";base64,";
				var strStart = (mediaFile.indexOf(";base64,") + strToIndex.length);
				//console.log("start at:" + strStart);
				var mediaObj = mediaFile.slice(strStart, -1);
				//console.log("mediaObj:" + mediaObj);


				return 	model.getMediaReservation(1)
					.then(
						function success(response) {
							//console.log(JSON.stringify(response));
							var reservationSID = response.files[0].sid;

							//console.log(file);

							var media = {
								"userFile": {
									"sid": reservationSID,
									"context": "message",
									"name": "New File for message",
									"uploadUri": "http://localhost:8000/1.1/media",
									"content": mediaObj
								}
							} 

							//console.log(JSON.stringify(media));

							MediaService.postMedia(media)
								.then(
										function succuss(response) {
											console.log(JSON.stringify(response));
										},
										function error(response) {

										}
									);


						},
						function error(response) {

						}
					)
			}

		
		
		}
	]);

})();