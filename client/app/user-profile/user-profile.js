(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'enterprise'
  	])

  	.controller('UserProfileController', [
      '$scope',
      '$rootScope',
      'UserModel',

      function($scope, $rootScope, UserModel){
      
        $scope.user = null;
        $rootScope.isLoggedIn = false;


        $scope.userLogin = function(loginInfo) {
          //console.log(loginInfo);
          UserModel.getUserDetail()
          .then(function(result) {
            $scope.user = result;
            $rootScope.isLoggedIn = true;
            //console.log($rootScope.isLoggedIn);
          }); 
        };

        $scope.userLogin();


        $scope.registerNewUser = function(newUser) {
          console.log(newUser.username)
        };
  
  }]);

 

})();
