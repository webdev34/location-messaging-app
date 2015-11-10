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
							return response;
						},
						function error(response) {
							return response;
						});
			}


			model.createNewLocation = function(newLocation) {

				var formattedLocation = {
					"location": {
						"name": newLocation.name,
						"address": newLocation.address,
						"latitude": newLocation.coordinates.lat,
						"longitude": newLocation.coordinates.lng,
						"distance": newLocation.range*1000,
						"trigger": newLocation.discoverOn
					}	
				}

				return LocationsService.post(formattedLocation)
					.then(
						function success(response){
							console.log('success from model')
							return response;
						},
						function error(response) {
							console.log('error from model')
							return response;
						});

			}

		
		}
	])
	;

})();