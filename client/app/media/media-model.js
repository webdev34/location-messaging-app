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
			
			console.log('MediaModel Loaded');

		
		}
	]);

})();