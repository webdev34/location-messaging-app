(function() {
	'use strict';

	angular.module('enterprise-portal.models.enterprise', [
		'enterprise-portal.services.enterprise'
	])
	
	.service('EnterpriseModel', [
		'$q',
		'$cookies',
		'$cookieStore',
		'EnterpriseService',
		'UserModel',
		
		function(
			$q,
			$cookies,
			$cookieStore,
			EnterpriseService,
			UserModel
		) {
			var model = this;
			
			if (!model.company){
				model.company = $cookieStore.get("QVR.company");
			}

			model.getEnterprise = function() {
				return (model.company) ? $q.when(model.company) : EnterpriseService.get(UserModel.user.enterprise)
					.then(
						function (response) {
							//model.company = response.enterprise;
							model.company = response;
							$cookieStore.put("QVR.company", model.company);
							return response;
						}
					);
			};
			
			model.getEnterprise = function() {
				return EnterpriseService.get(UserModel.user.enterprise)
					.then(
						function (response) {
							//model.company = response.enterprise;
							model.company = response;
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

			if (!model.company){
				model.getEnterprise();
			}
		}
	]);

})();