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
							console.log(JSON.stringify(response));
						},
						function error(response) {

						});
			}
			model.postMedia = function() {
				
			}

			model.getMediaReservation(1);
		
		}
	]);

})();