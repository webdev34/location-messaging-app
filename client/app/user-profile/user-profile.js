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
		'UserProfileCtrl', [
		'UserModel', 
		'MediaModel',
		'FoundationApi', 
		'$scope', 
		function (UserModel, MediaModel, FoundationApi, $scope) {
		
		var vm = this;
		vm.isEditing = false;
		vm.isUploadingAvatar = false;


		function init() {
			getAccount();
		}

		function getAccount() {
			UserModel.getAccount(UserModel.user.sid)
				.then(
					function success (response) {
						//console.log(response);
						vm.user = UserModel.user;
						vm.editedUser = vm.user;

			});

			// vm.user = {
			// 	'_id': '',
			// 	"companyName": "TESLA Motors",
			// 	"firstName": "Jason",
			// 	"lastName": "Tumbler",
			// 	"logo": "assets/img/default-profile-avatar.png",
			// 	"email": "jtumbler@teslamotors.com",
			// 	"phone": "7187187188",
			// 	"userRights": "Admin"
			// }
		}

		vm.uploadAvatar = function() {
			console.log('uploading avatar');

			var newAvatar = MediaModel.stripBase64(vm.user.newlogo);
			vm.isUploadingAvatar = true;

			MediaModel.getAvatarReservation()
				.then(function(response) {
					var mediaSID = response;
					return MediaModel.postAvatarMedia(mediaSID, newAvatar);
				})
				.then(function(response) {
					var avatarSID = response.file.sid;
					return MediaModel.postAvatarToAccount(avatarSID);
				})
				.then(function(success) {
					vm.isUploadingAvatar = false;
				});

			//console.log(vm.user.newlogo);
			//console.log(newAvatar);
			//MediaModel.postAvatarMedia(mediaSID, mediaObj)
		}


		$scope.uploader = {};

  	$scope.processFiles = function(files){
  		vm.user.newlogo = null;
    	angular.forEach(files, function(flowFile, i){
       	var fileReader = new FileReader();
          	fileReader.onload = function (event) {
            	var uri = event.target.result;
            	vm.user.newlogo = uri;
           		//console.log('changing');
           		vm.uploadAvatar();
              	// vm.user.newlogo.push(uri);
          	};
          	fileReader.readAsDataURL(flowFile.file);
    	});
  	};

  	$scope.removeFiles = function(index){
	    $scope.uploader.flow.files = []
		};

		vm.saveChanges = function() {
			vm.updatedUser = vm.editedUser;
			UserModel.updateAccount(vm.updatedUser);
			FoundationApi.publish('saveProfileChangesModal', 'close');
			vm.isEditing = false;
		}

		init();

	}]);

})();