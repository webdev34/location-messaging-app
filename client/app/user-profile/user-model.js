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

			// $rootScope.auth = $cookieStore.get("qvr.auth");
			// model.userID = $cookieStore.get("qvr.user");

			model.getAccount = function() {
				return UserService.get()
					.then(
						function(response) {
							model.user = response.user[0];
							//model.user = model.user;
							//console.log('root user: ' + JSON.stringify($rootScope.user));

							//console.log('user: ' + JSON.stringify(model.user));

							model.enterprise = model.user.enterprise;
							$rootScope.enterprise = model.enterprise;

							//console.log('enterprise: ' + JSON.stringify(response.enterpriseUser[0].enterprise));

							return response;
						},
						function(response) {
							model.logout();
							return response;
						}
					);
			}


			// if ($rootScope.auth && model.userID) {
			// 	model.getAccount(model.userID).then(
			// 		function success (response) {
			// 			model.isLoggedIn = true;
			// 		}
			// 	);
			// }

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
							model.userID = response.user.sid;
							//console.log('user: ' + JSON.stringify(response.user));

							model.authorization = response.authorization;
							model.enterprise = response.user.enterprise;
							$rootScope.enterprise = model.enterprise;
							//console.log(model.enterprise);

							$rootScope.auth = response.authorization;
							//console.log('enterprise: ' + JSON.stringify(response.enterprise));

							model.isLoggedIn = true;

							$cookieStore.put("qvr.auth", model.authorization );
							$cookieStore.put("qvr.user", model.userID );

							return response;
						},
						function(response) {
							model.logout();
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
