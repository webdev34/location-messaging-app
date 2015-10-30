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
					enterpriseCtrl.company = {
						firstName: 'Quiver',
						emailAddress: 'quiver@quiver.zone',
						avatar: '/assets/img/logo/quiver-logo_enterprise-profile.jpg',
						address: 'Post Geographical',
						sid: '562f8ff5c9fc5be1978f17af',
						messageCount: 2,
						fullName: 'Quiver Media',
						deleted: false,
						likeCount: 0,
						usernameKey: 'quiver',
						lastName: 'Media',
						created: 1445957621720,
						title: '',
						friendCount: 0,
						lastModified: 1446055593364,
						followingCount: 0,
						enterprise: '562f8ff5c9fc5be1978f17b0',
						followerCount: 16,
						description: 'Quiver brings innovation to mobile communications by delivering the world\'s most flexible, fun and feature-rich messaging platform.',
						primaryContact: 'Bryan Bogensberger',
						phone: '844-8QUIVER (844-878-4837) ext: 102',
						username: 'quiver',
       			suspended: false
					};

					enterpriseCtrl.editedCompany = enterpriseCtrl.company;
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