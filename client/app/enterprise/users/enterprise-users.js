(function() {
  'use strict';

  angular.module('enterprise.users', [])
  	.config(['$stateProvider', function ($stateProvider) {
  		$stateProvider
  			.state('enterprise.users', {
				url: '/users',
				templateUrl: '/app/enterprise/users/enterprise-users.tmpl.html',
				controller: 'EnterpriseCtrl as enterpriseCtrl'
  			});
  	}]);
 

})();