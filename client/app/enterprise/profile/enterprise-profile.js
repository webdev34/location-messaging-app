(function() {
  'use strict';

  angular.module('enterprise.profile', [
    'enterprise.profile.edit'
    ])
  	.config(['$stateProvider', function ($stateProvider) {
  		$stateProvider
  			.state('enterprise.profile', {
				url: '/',
				templateUrl: '/app/enterprise/profile/enterprise-profile.tmpl.html',
				controller: 'EnterpriseCtrl as enterpriseCtrl'
  			});
  	}]);
 

})();