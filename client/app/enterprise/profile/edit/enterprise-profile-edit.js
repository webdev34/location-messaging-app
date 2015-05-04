(function() {
  'use strict';

  angular.module('enterprise.profile.edit', [])
  	.config(['$stateProvider', function ($stateProvider) {
  		$stateProvider
  			.state('enterprise.profile.edit', {
				url: '/',
				templateUrl: '/app/enterprise/profile/edit/enterprise-profile-edit.tmpl.html',
				controller: 'EditEnterpriseCtrl as editEnterpriseCtrl'
  			});
  	}])
    .controller('EditEnterpriseCtrl', ['$scope', function ($scope) {
      
      var editEnterpriseCtrl = this;


    }]);
 

})();