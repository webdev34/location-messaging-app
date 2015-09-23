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
		['UserModel', 'FoundationApi', '$scope', 
		function (UserModel, FoundationApi, $scope) {
		
		var userProfileCtrl = this;
		userProfileCtrl.isEditing = false;


		function init() {
			getAccount();
		}

		function getAccount() {
			// UserModel.getAccount(UserModel.user.sid)
			// 	.then(
			// 		function success (response) {
			// 			console.log('response: ' + response);
			// 			userProfileCtrl.user = UserModel.user;
			// 			userProfileCtrl.editedUser = userProfileCtrl.user;

			// });

			userProfileCtrl.user = {
				'_id': '',
				"companyName": "TESLA Motors",
				"firstName": "Jason",
				"lastName": "Tumbler",
				"logo": "assets/img/default-profile-avatar.png",
				"email": "jtumbler@teslamotors.com",
				"phone": "7187187188",
				"userRights": "Admin"
			}
		}


		$scope.uploader = {};

	  	$scope.processFiles = function(files){
	  		userProfileCtrl.user.newlogo = null;
	    	angular.forEach(files, function(flowFile, i){
	       	var fileReader = new FileReader();
	          	fileReader.onload = function (event) {
	            	var uri = event.target.result;
	            	userProfileCtrl.user.newlogo = uri;
	              	// userProfileCtrl.user.newlogo.push(uri);
	          	};
	          	fileReader.readAsDataURL(flowFile.file);
	    	});
	  	};

	  	$scope.removeFiles = function(index){
		    $scope.uploader.flow.files = []
		};

		userProfileCtrl.saveChanges = function() {
			userProfileCtrl.updatedUser = userProfileCtrl.editedUser;
			UserModel.updateAccount(userProfileCtrl.updatedUser);
			FoundationApi.publish('saveProfileChangesModal', 'close');
			userProfileCtrl.isEditing = false;
		}

		init();

	}]);

})();