(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'user-profile.edit',
      'user-profile.register'
  	])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
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

        userProfileCtrl.userLoginInfo = {};



        userProfileCtrl.userLoginMock = function(loginInfo) {
          //console.log(loginInfo);
          UserModel.getUserDetail()
          .then(function(result) {
            userProfileCtrl.user = result;
            $rootScope.isLoggedIn = true;
            //console.log($rootScope.isLoggedIn);
          }); 
        };

        function userLogin() {
          //console.log(userProfileCtrl.userLoginInfo);
          UserModel.login(userProfileCtrl.userLoginInfo);
        }

        userProfileCtrl.userLogin = userLogin;

        userProfileCtrl.userLoginMock();

  
  }]);

 

})();
