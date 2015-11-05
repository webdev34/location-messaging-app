(function() {
	'use strict';

	angular.module('enterprise-portal.models.locations', [
		'enterprise-portal.services.locations'
	])
	
	.service('LocationsModel', [
		'$http',
		'$q',
		'LocationsService',
		
		function(
			$http,
			$q,
			LocationsService
		) {
			var model = this;
			
			model.getLocationList = function() {
				return LocationsService.list()
					.then(
						function success(response) {
							console.log(JSON.stringify(response));
						},
						function error(response) {
							console.log('error');
						});
			}

		
		}
	])
	;

})();