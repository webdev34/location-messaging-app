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
		'$rootScope',
		'$cookies',
		'$cookieStore',
		'API_URL',
		'UserService',
		
		function($rootScope, $cookies, $cookieStore, API_URL, UserService) {
			var model = this;
			
			// load remembered user
			model.user = $cookieStore.get("QVR.user");
			
			model.registerUser = function(userDetail) {
				return UserService.register(userDetail)
					.then(
						function(response) {
							model.user = response.user;
							return response;
						},
						function(response) {
							return response;
						}
					);
			};

			model.login = function(userDetail) {
				return UserService.login(userDetail)
					.then(
						function(response) {
							model.user = response.user;
							model.user.isLoggedIn = true;
							$cookieStore.put("QVR.user", model.user);
							$rootScope.$broadcast('QVR.onLoginSuccess');
							return response;
						},
						function(response) {
							$rootScope.$broadcast('QVR.onLoginFail');
							return response;
						}
					);
			}

			model.logout = function() {
				model.user = {};
				$rootScope.$broadcast('QVR.onLogoutSuccess');
				return UserService.logout();
			}

			model.updateUser = function(updatedUserDetail) {
				angular.extend(model.user, updatedUserDetail);
				
				return UserService.update(updatedUserDetail)
					.then(
						function(response) {
							angular.extend(model.user, response.user);
							$cookieStore.put("QVR.user", model.user);
							return response;
						},
						function(response) {
							return response;
						}
					);
			};

		}
	]);

})();