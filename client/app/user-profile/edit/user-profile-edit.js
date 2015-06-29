(function() {
	'use strict';

	angular.module('user-profile.edit', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('user-profile/edit', {
				url: 'user/edit',
				templateUrl: 'app/user-profile/edit/user-profile-edit.tmpl.html',
				controller: 'EditProfileCtrl as editProfileCtrl'
			});
	}])

	.controller('EditProfileCtrl', [
		'UserModel',
      	'$state',
      	
		function(UserModel, $state) {
			var editProfileCtrl = this;

			editProfileCtrl.user = UserModel.user;
			editProfileCtrl.editedUser = angular.copy(editProfileCtrl.user);
			
			function returnToUserProfile() {
				$state.go('user-profile');
			}

			function cancelEdit() {
				returnToUserProfile();
			}

			function updateUser() {
				console.log('updating');
				editProfileCtrl.user = angular.copy(editProfileCtrl.editedUser);
				UserModel.updateUser(editProfileCtrl.user);

				returnToUserProfile();
			}

			editProfileCtrl.cancelEdit = cancelEdit;
			editProfileCtrl.updateUser = updateUser;
		}
	]);

})();