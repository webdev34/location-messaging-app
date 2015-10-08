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
		'$cookieStore',
		'API_URL',
		'UserService',
		function( $rootScope, $cookieStore, API_URL, UserService) {
			var model = this;
			
			model.isLoggedIn = false;

			
			// if ( $cookieStore.get("qvr.auth") && $cookieStore.get("qvr.user") ) {
			// 	console.log("cookies yes");
			// 	model.userID = $cookieStore.get("qvr.user");
			// 	$rootScope.auth = $cookieStore.get("qvr.auth");
			// 	model.isLoggedIn = true;
			// 	model.getAccount(model.userID);

			// } else {
			// 	console.log("cookies no");
			// 	model.isLoggedIn = false;
			// };


			model.getAccount = function(userID) {
				return UserService.get(userID)
					.then(
						function(response) {
							model.user = response.user[0];
							//console.log('user: ' + JSON.stringify(model.user));

							model.enterprise = response.enterpriseUser[0].enterprise;
							//console.log('enterprise: ' + JSON.stringify(response.enterpriseUser[0].enterprise));

							return response;
						},
						function(response) {
							return response;
						}
					);
			}


			if (model.userCookie) {
				model.getAccount(model.userCookie).then(
					function success (response) {
						model.isLoggedIn = true;
					}
				);
			}

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
							//model.user = response.user;
							model.userID = response.user.sid;
							//console.log('model user id: ' + model.userID);
							model.authorization = response.authorization;
							//model.enterprise = response.enterprise;
							$rootScope.auth = response.authorization;

							model.isLoggedIn = true;

							$cookieStore.put("qvr.auth", model.authorization );
							$cookieStore.put("qvr.user", model.userID );
							
							
							return model.getAccount(model.userID);
						},
						function(response) {
							return response;
						}
					);
			}

			
			model.logout = function() {
				model.user = {};
				model.isLoggedIn = false;
				$cookieStore.remove("qvr.auth");
				$cookieStore.remove("qvr.user");

				return UserService.logout();
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