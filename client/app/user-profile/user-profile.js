(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'enterprise'
  	])

    .config(['$stateProvider', function ($stateProvider) {
    
      $stateProvider
        .state('user-profile', {
          url: '/user',
          templateUrl: '/app/user-profile/user-profile.tmpl.html',
          controller: 'UserProfileCtrl as userProfileCtrl'
        });

  }])

  	.controller('UserProfileCtrl', [
      '$rootScope', 'UserModel',
      function( $rootScope, UserModel){

        var userProfileCtrl = this;
      
        userProfileCtrl.user = null;
        $rootScope.isLoggedIn = false;


        userProfileCtrl.userLogin = function(loginInfo) {
          //console.log(loginInfo);
          UserModel.getUserDetail()
          .then(function(result) {
            userProfileCtrl.user = result;
            $rootScope.isLoggedIn = true;
            //console.log($rootScope.isLoggedIn);
          }); 
        };

        userProfileCtrl.userLogin();


        userProfileCtrl.registerNewUser = function(newUser) {
          console.log(newUser.username)
        };
  
  }]);

 

})();
