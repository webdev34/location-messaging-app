(function() {
  'use strict';

  angular.module('user-profile', [
  		'enterprise-portal.models.user',
      'user-profile.edit',
      'user-profile.register'
  	])

    .config(['$stateProvider', function ($stateProvider) {
    
      $stateProvider
        .state('user-profile', {
          url: '/user',
          templateUrl: 'app/user-profile/user-profile.tmpl.html'//,
         // controller: 'UserProfileCtrl as userProfileCtrl'
        }); 

    }]);

})();
