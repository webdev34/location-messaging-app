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
			
			EnterpriseModel.getEnterprise().then(function(){
				enterpriseCtrl.company = EnterpriseModel.company;
			});
			
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