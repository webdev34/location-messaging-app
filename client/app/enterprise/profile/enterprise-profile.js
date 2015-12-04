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
		'$http',
		
		function($state, $scope, EnterpriseModel, FoundationApi, $http) {
			var enterpriseCtrl = this;
			enterpriseCtrl.isEditing = false;

			

			function init() {
				getEnterprise();
				getUserAccounts();
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

	        function getUserAccounts() {
	            $http.get('assets/data/users.json').success(function(data) {
	                enterpriseCtrl.primaryContacts = data.users;
	            });
	        }

	        enterpriseCtrl.selectPrimaryContact = function() {
				
				angular.forEach(enterpriseCtrl.primaryContacts, function(contact, index){

					if(parseInt(enterpriseCtrl.editedCompany.primaryContact) == parseInt(contact.id)){
						enterpriseCtrl.editedCompany.emailAddress = enterpriseCtrl.primaryContacts[index].email;
						enterpriseCtrl.editedCompany.contactNumber = enterpriseCtrl.primaryContacts[index].contactNumber;
					}
					
		       	});
			}

			init();
			
		}
	])
	;

})();