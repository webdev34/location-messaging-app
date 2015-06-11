(function() {
	'use strict';

	angular.module('enterprise-portal.models.user', [
		'enterprise-portal.services.user'
	])
	
	.service('UserModel', [
		'$http',
		'$q',
		'API_URL',
		'UserService',
		
		function($http, $q, API_URL, UserService) {
			var model = this;

			model.getUserDetail = function() {
				return (model.user) ? $q.when(model.user) : UserService.get()
					.then(
						function(response) {
							model.user = response.user;
							model.enterprise = response.enterprise;
							return model.user;
						}
					);
			};

			model.getEnterpriseDetail = function() {
				return (model.enterprise) ? $q.when(model.enterprise) : UserService.get()
					.then(
						function(response) {
							model.user = response.user;
							model.enterprise = response.enterprise;
							return model.enterprise;
						}
					);
			};

			model.registerUser = function(userDetail) {
				return UserService.register(userDetail)
					.then(
						function(response) {
							model.user = response.user;
							model.enterprise = response.enterprise;
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
							model.enterprise = response.enterprise;
							return response;
						},
						function(response) {
							return response;
						}
					);
			}

			model.logout = function() {
				return UserService.logout();
			}

			model.updateUser = function(updatedUserDetail) {
				model.user = updatedUserDetail;
				
				return UserService.update(updatedUserDetail)
					.then(
						function(response) {
							model.user = response.user;
							model.enterprise = response.enterprise;
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