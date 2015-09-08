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
			.state('enterprise.edit', {
				url: '/profile/edit',
				templateUrl: 'app/enterprise/profile/edit/enterprise-profile-edit.tmpl.html',
				controller: 'EditEnterpriseCtrl as editEnterpriseCtrl'
			});
	}])
	.controller('EnterpriseCtrl', [
		'$state',
		'$scope',
		'EnterpriseModel',
		'FoundationApi',
		
		function($state, $scope, EnterpriseModel, FoundationApi) {
			var enterpriseCtrl = this;
			
			EnterpriseModel.getEnterprise().then(function(){
				enterpriseCtrl.company = EnterpriseModel.company;
			});

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


			$scope.editProfileToggle = function() {
				$scope.editProfile = !$scope.editProfile;
			};
			
			function addUser() {
				if (enterpriseCtrl.newUser.userType === 'admin') {
					EnterpriseModel.addAdmin(enterpriseCtrl.newUser);
				} else if (enterpriseCtrl.newUser.userType === 'user') {
					EnterpriseModel.addUser(enterpriseCtrl.newUser);
				}

				resetForm();
				
				FoundationApi.publish('addUserModal', 'close');
			}

			function resetForm() {
				enterpriseCtrl.newUser = {
					'_id': '',
					"name": "",
					"title": "",
					"username": "",
					"avatar": "assets/img/avatar.jpg",
					'userType': null
				}
			}

			resetForm();

			//enterpriseCtrl.addUser = addUser;
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