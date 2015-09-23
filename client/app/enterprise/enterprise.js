(function() {
	'use strict';

	angular.module('enterprise', [
		'enterprise-portal.models.enterprise',
		'enterprise.profile'
	])
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('enterprise', {
				url: '/enterprise/profile',
				templateUrl: 'app/enterprise/enterprise.tmpl.html',
				abstract: true
			})
			.state('enterprise.users', {
				url: '/users',
				templateUrl: 'app/enterprise/users/enterprise-users.tmpl.html',
				controller: 'EnterpriseCtrl as enterpriseCtrl'
			});
		
		$urlRouterProvider.otherwise('enterprise.profile');
	}])
	
	.controller('EnterpriseCtrl', [
		'$state',
		'EnterpriseModel',
		'FoundationApi',
		
		function($state, EnterpriseModel, FoundationApi) {
			var enterpriseCtrl = this;
			
			// EnterpriseModel.getEnterprise().then(function(){
			// 	enterpriseCtrl.company = EnterpriseModel.company;
			// });
			// HARD CODED FOR NOW
			enterpriseCtrl.company = {
				'_id': '',
				"companyName": "TESLA Motors",
				"username": "",
				"primaryContact": "Jason Tumbler",
				"logo": "assets/img/tesla.png",
				"email": "NASales@teslamotors.com",
				"phone": "7187187188",
				"address": "3500 Deer Creek Rd",
				"state": "Palo Alto",
				"city": "CA",
				"zip": 94304,
				"bio": "Tesla Motors, Inc. designs, develops, manufactures, and sells electric vehicles, electric vehicle powertrain components, and stationary energy storage systems in the United States, China, Norway, and internationally. It also provides development services to develop electric vehicle powertrain components and systems for other automotive manufacturers. The company sells its products through a network of Tesla stores and galleries, as well as through Internet. It has collaboration agreement with EnerNOC, Inc. for the deployment and management of energy storage systems in commercial and industrial buildings."
			}

			enterpriseCtrl.editedCompany = angular.copy(enterpriseCtrl.company);
			
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

			enterpriseCtrl.addUser = addUser;
		}
	]);

})();