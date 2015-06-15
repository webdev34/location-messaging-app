/*
* This is the current user's set enterprise.
* NOT a definition model for enterprises in general
*/

(function() {
	'use strict';

	angular.module('enterprise-portal.models.enterprise', [
		'enterprise-portal.services.enterprise'
	])
	
	.service('EnterpriseModel', [
		'$rootScope',
		'$http',
		'$q',
		'$cookies',
		'$cookieStore',
		'EnterpriseService',
		'UserModel',
		
		function($rootScope, $http, $q, $cookies, $cookieStore, EnterpriseService, UserModel) {
			var model = this;
			
			// load remembered company
			model.company = $cookieStore.get("QVR.company");

			// update company on login
			$rootScope.$on('QVR.onLoginSuccess', function(response) {
				console.log('test');
				//model.getEnterprise();
			});

			model.getEnterprise = function() {
				return EnterpriseService.get(UserModel.user.enterprise)
					.then(
						function (response) {
							//model.company = response.enterprise;
							angular.extend(model.company, response);
							$cookieStore.put("QVR.company", model.company);
							return response;
						}
					);
			};

			model.updateCompany = function(updatedCompany) {
				angular.extend(model.company, updatedCompany);
				
				return EnterpriseService.update(updatedCompany)
					.then(
						function(response) {
							//angular.extend(model.company, response.enterprise);
							angular.extend(model.company, response);
							$cookieStore.put("QVR.company", model.company);
							return response;
						},
						function(response) {
							return response;
						}
					);
			};
			
			model.addAdmin = function(newAdmin) {
				model.company.administrators.push(newAdmin);
			}

			model.addUser = function(newUser) {
				model.company.users.push(newUser);
			}
		}
	]);

})();