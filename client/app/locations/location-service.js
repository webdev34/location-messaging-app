(function() {
	'use strict';

	angular.module('enterprise-portal.services.locations', [])
	
	.factory('LocationsService', [
		'$http',
		'API_URL',
		
		function(
			$http,
			API_URL
		) {
			return {
				get : function(locationSID){
					return $http.get(API_URL + '/location/' + locationSID);
				},
				post : function(locationObj) {
									
					return $http.post(API_URL + '/location', locationObj);
				},
				list : function(){
					return $http.get(API_URL + '/location/');
				},
				remove : function(locationSID){
					return $http["delete"](API_URL + '/location/' + locationSID);
				}
			};
		}
	]);

})();