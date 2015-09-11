(function() {
	'use strict';

	angular.module('enterprise-portal.models.reporting', [
		'enterprise-portal.services.reporting'
	])
	
	.service('ReportingModel', [
		'$q',
		'$cookies',
		'$cookieStore',
		'ReportingService',
		
		
		function(
			$q,
			$cookies,
			$cookieStore,
			ReportingService
		) {
			//var model = this;
			var model = this,
			URLS = {
				FETCH: 'assets/data/admin.json'
			},
			adminData;

			alert(0);
			console.log(adminData)
			
			

			// model.getEnterprise = function() {
			// 	return (model.company) ? $q.when(model.company) : EnterpriseService.get(UserModel.user.enterprise)
			// 		.then(
			// 			function (response) {
			// 				model.company = response.enterprise;
			// 				$cookieStore.put("QVR.company", model.company);
			// 				return response;
			// 			}
			// 		);
			// };
			

			// model.updateCompany = function(updatedCompany) {
			// 	angular.extend(model.company, updatedCompany);
				
			// 	return EnterpriseService.update(updatedCompany)
			// 		.then(
			// 			function(response) {
			// 				angular.extend(model.company, response.enterprise);
			// 				$cookieStore.put("QVR.company", model.company);
			// 				return response;
			// 			},
			// 			function(response) {
			// 				return response;
			// 			}
			// 		);
			// };
			
			// model.addAdmin = function(newAdmin) {
			// 	model.company.administrators.push(newAdmin);
			// }

			// model.addUser = function(newUser) {
			// 	model.company.users.push(newUser);
			// }

			// if (!model.company){
			// 	//model.getEnterprise();
			// }
		}
	]);

})();