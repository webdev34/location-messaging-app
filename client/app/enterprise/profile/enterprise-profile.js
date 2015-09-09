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

			$scope.editProfileToggle = function() {
				$scope.editProfile = !$scope.editProfile;
			};

			function init() {
				getEnterprise();
			}

			function getEnterprise() {
				EnterpriseModel.getEnterprise().then(function(){
					enterpriseCtrl.company = EnterpriseModel.company;
					enterpriseCtrl.editedCompany = enterpriseCtrl.company;
				});
			}
			

			// enterpriseCtrl.company = {
			// 	'_id': '',
			// 	"companyName": "TESLA Motors",
			// 	"username": "",
			// 	"primaryContact": "Jason Tumbler",
			// 	"logo": "assets/img/tesla.png",
			// 	"email": "NASales@teslamotors.com",
			// 	"phone": "7187187188",
			// 	"address": "3500 Deer Creek Rd",
			// 	"state": "Palo Alto",
			// 	"city": "CA",
			// 	"zip": 94304,
			// 	"bio": "Tesla Motors, Inc. designs, develops, manufactures, and sells electric vehicles, electric vehicle powertrain components, and stationary energy storage systems in the United States, China, Norway, and internationally. It also provides development services to develop electric vehicle powertrain components and systems for other automotive manufacturers. The company sells its products through a network of Tesla stores and galleries, as well as through Internet. It has collaboration agreement with EnerNOC, Inc. for the deployment and management of energy storage systems in commercial and industrial buildings."
			// }

			function saveChanges() {
				enterpriseCtrl.updatedCompany = enterpriseCtrl.editedCompany;
				
				EnterpriseModel.updateCompany(enterpriseCtrl.updatedCompany.sid, enterpriseCtrl.updatedCompany);
			}

			enterpriseCtrl.saveChanges = saveChanges;
			init();
			
		}
	])
	
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