(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'enterprise',
      'user-profile.register'
  	])

  	.controller('UserProfileController', ['$scope','UserModel', function($scope, UserModel){
   
		UserModel.getUserDetail()
	  		.then(function(result) {
	  			$scope.user = result;
	  		});   
  
  }]);

 

})();
