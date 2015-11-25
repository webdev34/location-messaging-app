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
			
			model.stripBase64 = function(file) {
				var strToIndex = ";base64,";
				var strStart = (file.indexOf(";base64,") + strToIndex.length);
				var mediaObj = file.slice(strStart, -1);
				return mediaObj;
			}
			
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

			model.getAvatarReservation = function() {
				return MediaService.getMediaReservation(1)
					.then(
						function success(response) {
							return response.files[0].sid;
						},
						function error(response) {
							return response;
						});
			}

			model.postMessageMedia = function(mediaSID, file) {

				var media = {
					"userFile": {
						"sid": mediaSID,
						"context": "message",
						"name": "New File for message",
						//"uploadUri": "http://localhost:8000/1.1/media",
						"content": file
					}
				} 

				return MediaService.postMedia(media);

			}

			model.postAvatarMedia = function(mediaSID, file) {

				var media = {
					"userFile": {
						"sid": mediaSID,
						"context": "avatar",
						"name": "New File for Avatar",
						//"uploadUri": "http://localhost:8000/1.1/media",
						"content": file
					}
				} 

				return MediaService.postMedia(media);

			}

			model.postAvatarToAccount = function(avatarSID) {
				var avatarObj = {
					"userFile": {
						"sid": avatarSID
					}		
				}
				return MediaService.postAvatar(avatarObj);
			}

		
		}
	]);

})();