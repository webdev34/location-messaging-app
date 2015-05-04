(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'user-profile.edit'
  	])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('user-profile', {
          url: '/user',
          templateUrl: '/app/user-profile/user-profile.tmpl.html',
          controller: 'UserProfileCtrl as userProfileCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: '/app/user-profile/register/user-profile-register.tmpl.html'
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

        UserModel.loginMock();


        userProfileCtrl.registerNewUser = function(newUser) {
          console.log(newUser.username)
        };
  
  }]);

 

})();
