(function() {
	'use strict';

	angular.module('enterprise.profile', [])
	
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('enterprise.profile', {
				url: '/profile',
				templateUrl: 'app/enterprise/profile/enterprise-profile.tmpl.html',
				controller: 'EnterpriseCtrl as enterpriseCtrl'
			})
			;
	}])
	.controller('EnterpriseCtrl', [
		'$state',
		'$scope',
		'EnterpriseModel',
		'FoundationApi',
		
		function($state, $scope, EnterpriseModel, FoundationApi) {
			var enterpriseCtrl = this;
			enterpriseCtrl.isEditing = false;



			function init() {
				getEnterprise();
			}

			function getEnterprise() {
				EnterpriseModel.getEnterprise().then(function() {
					enterpriseCtrl.company = EnterpriseModel.company;
					enterpriseCtrl.editedCompany = enterpriseCtrl.company;
				});
			}

			enterpriseCtrl.saveChanges = function() {
				enterpriseCtrl.updatedCompany = enterpriseCtrl.editedCompany;
				EnterpriseModel.updateCompany(enterpriseCtrl.updatedCompany.sid, enterpriseCtrl.updatedCompany);
				FoundationApi.publish('saveProfileChangesModal', 'close');
				enterpriseCtrl.isEditing = false;
			}



			init();
			
		}
	])
	;

})();