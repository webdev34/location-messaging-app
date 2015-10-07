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

	angular.module('enterprise-portal.models.user', [
		'enterprise-portal.services.user'
	])
	
	.service('UserModel', [
		'$cookies',
		'$cookieStore',
		'API_URL',
		'UserService',
		
		function(
			$cookies,
			$cookieStore,
			API_URL,
			UserService
		) {
			var model = this;
			
			//model.user = $cookieStore.get("QVR.user");
			model.isLoggedIn = false;
			//console.log(model.user);
			
			// model.registerUser = function(userDetail) {
			// 	return UserService.register(userDetail)
			// 		.then(
			// 			function(response) {
			// 				model.user = response.user;
			// 				return response;
			// 			},
			// 			function(response) {
			// 				return response;
			// 			}
			// 		);
			// };

			model.login = function(userDetail) {
				return UserService.login(userDetail)
					.then(
						function(response) {
							model.user = response.user;
							//console.log('model user: ' + model.user);
							model.authorization = response.authorization;
							model.enterprise = response.enterprise;
							model.isLoggedIn = true;
							//$cookieStore.put("QVR.user", model.user);
							return response;
						},
						function(response) {
							return response;
						}
					);
			}

			model.getAccount = function(userID) {
				return UserService.get(userID)
					.then(
						function(response) {
							model.user = response.user;

							//$cookieStore.put("QVR.user", model.user);
							return response;
						},
						function(response) {
							return response;
						}
					);
			}

			model.logout = function() {
				model.user = {};
				$cookieStore.remove("QVR.user");
				$cookieStore.remove("QVR.company");
				//return UserService.logout();
			}

			model.updateAccount = function(updatedUser) {

				UserService.update(updatedUser);

				// angular.extend(model.user, updatedUserDetail);
				
				// return UserService.update(updatedUserDetail)
				// 	.then(
				// 		function(response) {
				// 			angular.extend(model.user, response.user);
				// 			$cookieStore.put("QVR.user", model.user);
				// 			return response;
				// 		},
				// 		function(response) {
				// 			return response;
				// 		}
				// 	);
			};

		}
	]);

})();