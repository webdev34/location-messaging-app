
(function() {
	'use strict';

	angular.module('enterprise-portal.models.followers', [
		'enterprise-portal.services.followers'
	])
	
	.service('FollowersModel', [
		'$cookies',
		'$cookieStore',
		'API_URL',
		'FollowersService',
		
		function(
			$cookies,
			$cookieStore,
			API_URL,
			FollowersService
		) {
			var model = this;
			
			model.getAllFollowers = function(followerID) {
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