(function() {
	'use strict';

	angular.module('enterprise.profile', [])
	
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('enterprise.profile', {
				url: '/',
				templateUrl: 'app/enterprise/profile/enterprise-profile.tmpl.html',
				controller: 'EnterpriseCtrl as enterpriseCtrl'
			})
			.state('enterprise.edit', {
				url: '/edit',
				templateUrl: 'app/enterprise/profile/edit/enterprise-profile-edit.tmpl.html',
				controller: 'EditEnterpriseCtrl as editEnterpriseCtrl'
			});
	}])
	
	.controller('EditEnterpriseCtrl', [
		'$state',
		'EnterpriseModel',
		
		function($state, EnterpriseModel) {
			var editEnterpriseCtrl = this;

			EnterpriseModel.getEnterprise().then(function(){
				editEnterpriseCtrl.enterpriseModel = EnterpriseModel;
				editEnterpriseCtrl.editedCompany = angular.copy(editEnterpriseCtrl.enterpriseModel.company);
			});

			function returnToCompanyProfile() {
				$state.go('enterprise.profile');
			}

			function cancelEdit() {
				returnToCompanyProfile();
			}

			function updateCompany() {
				editEnterpriseCtrl.company = angular.copy(editEnterpriseCtrl.editedCompany);
				EnterpriseModel.updateCompany(editEnterpriseCtrl.company);

				returnToCompanyProfile();
			}

			editEnterpriseCtrl.updateCompany = updateCompany;
			editEnterpriseCtrl.cancelEdit = cancelEdit;
		}
	]);

})();