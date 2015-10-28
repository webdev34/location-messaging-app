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
			
			

		
		}
	])
	;

})();