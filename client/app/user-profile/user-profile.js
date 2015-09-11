(function() {
	'use strict';

	angular.module('user-profile', [
		'enterprise-portal.models.user'

	])
	
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('enterprise.user-profile', {
				url: '/user-profile',
				templateUrl: 'app/user-profile/user-profile.tmpl.html',
				controller: 'UserProfileCtrl as userProfileCtrl'
			});
	}])
	.controller(
		'UserProfileCtrl', 
		['UserModel', 'FoundationApi', 
		function (UserModel, FoundationApi) {
		
		var userProfileCtrl = this;
		userProfileCtrl.isEditing = false;


		function init() {
			getAccount();
		}

		function getAccount() {
			UserModel.getAccount(UserModel.user.sid)
				.then(
					function success (response) {
						console.log('response: ' + response);
						userProfileCtrl.user = UserModel.user;
						userProfileCtrl.editedUser = userProfileCtrl.user;

			});
		}

		userProfileCtrl.saveChanges = function() {
			userProfileCtrl.updatedUser = userProfileCtrl.editedUser;
			UserModel.updateAccount(userProfileCtrl.updatedUser);
			FoundationApi.publish('saveProfileChangesModal', 'close');
			userProfileCtrl.isEditing = false;
		}

		init();

	}]);

})();