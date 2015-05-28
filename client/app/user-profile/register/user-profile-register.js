(function() {
  'use strict';

  angular.module('user-profile.register', [])

    .config(['$stateProvider', function ($stateProvider) {
    
      $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'app/user-profile/register/user-profile-register.tmpl.html',
          controller: 'RegisterUserCtrl as registerUserCtrl'
        }); 

    }])

  	.controller('RegisterUserCtrl', [
      '$rootScope', 'UserModel',
      function( $rootScope, UserModel){

        var registerUserCtrl = this;

        registerUserCtrl.newUser = {};
        

        function registerNewUser() {
          UserModel.registerUser(registerUserCtrl.newUser);
        }

        registerUserCtrl.registerNewUser = registerNewUser;

  }]);

 

})();
