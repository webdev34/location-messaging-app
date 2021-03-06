(function() {
	'use strict';

	angular.module('enterprise-portal.services.media', [])

	.factory('MediaService', [
		'$http',
		'API_URL',

		function(
			$http,
			API_URL
		) {
			return {

				getMediaReservation : function(numberOfFiles) {
					return $http.get(API_URL + '/media/' + numberOfFiles);
				},

				postMedia : function(media) {
					media.userFile.uploadUri = (API_URL + '/media/')
					//console.log("service:" + JSON.stringify(media));
					return $http.post(API_URL + '/media', media);

					/*
					{
						"userFile": {
							"sid": "5645552cfa432a2e3776f6c1",
							"context": "message",
							"name": "New File for message",
							"uploadUri": "http://localhost:8000/1.1/media",
							"content": ""
						}
					}
					/*/
				},
				postAvatar: function(avatarObj) {
					return $http.post(API_URL + '/account/avatarNew', avatarObj);

					/*
					{
						"userFile": {
							"sid": "..."
						}
					}
        	*/
				}

			};
		}
	]);

})();
