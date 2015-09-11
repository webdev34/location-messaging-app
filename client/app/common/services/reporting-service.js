(function() {
	'use strict';

	angular.module('enterprise-portal.services.reporting', [])
	
	.factory('ReportingService', [
		'$http',
		'API_URL',
		
		function(
			$http,
			API_URL
		) {
			return {
				
				get : function(enterpriseId) {
					//return $http.get(API_URL + '/enterprise/' + enterpriseId + '/user');
				}
			}
		}
	]);

})();