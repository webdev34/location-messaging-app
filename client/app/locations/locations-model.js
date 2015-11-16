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

			model.newLocationTemplate = {
				"name": "",
				"range": 5,
				"discoverOn": 1,
				"address": "",
				"coordinates": {"lat":43.657504642319005,"lng":-79.3760706718750}
			}

			
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

			model.getLocation = function(locationSID) {
				return LocationsService.get(locationSID)
					.then(
						function success(response) {
							var locObj = response.location[0];
							var formattedLocation = {
								"sid": locObj.sid,
								"name": locObj.name,
								"range": locObj.distance / 1000,
								"discoverOn": locObj.trigger,
								"address": locObj.address,
								"coordinates": {"lat":locObj.latutude,"lng":locObj.longitude}
							}
							return formattedLocation;
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
							//console.log('success from model')
							return response;
						},
						function error(response) {
							//console.log('error from model')
							return response;
						});

			}

			model.deleteLocation = function(locationSID) {
				return LocationsService.remove(locationSID)
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

			model.updateLocation = function(newLocation) {
				var formattedLocation = {
					"location": {
						"sid": newLocation.sid,
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
							//console.log('success from model')
							return response;
						},
						function error(response) {
							//console.log('error from model')
							return response;
						});
			}

		
		}
	])
	;

})();