/*
User types - these are NOT 'social users' (followers)
	admin
		a/e/d users
		a/e/d campaigns
		a/e/d messages
	campaign manager
		a/e/d campaigns
		a/e/d messages
	normal
		a/e/d messages
	quiver admin
		a/e/d enterprises
		a/e/d users
*/

(function() {
	'use strict';

	angular.module('enterprise-portal.models.users', [
		'enterprise-portal.services.users'
	])
	
	.service('UsersModel', [
		'$cookies',
		'$cookieStore',
		'API_URL',
		'UsersService',
		
		function(
			$cookies,
			$cookieStore,
			API_URL,
			UsersService
		) {
			var model = this;
			
			model.getAllUsers = function(userID) {
				// return UsersService.get(userID)
				// 	.then(
				// 		function(response) {
				// 			model.user = response.user;

				// 			//$cookieStore.put("QVR.user", model.user);
				// 			return response;
				// 		},
				// 		function(response) {
				// 			return response;
				// 		}
				// 	);
			}

		}
	]);

})();