(function() {
  'use strict';

  angular.module('enterprise.profile', [
    
    ])
  	.config(['$stateProvider', function ($stateProvider) {
  		$stateProvider
  			.state('enterprise.profile', {
				  url: '/',
				  templateUrl: '/app/enterprise/profile/enterprise-profile.tmpl.html',
				  controller: 'EnterpriseCtrl as enterpriseCtrl'
  			})
        .state('enterprise.profile.edit', {
          url: '/edit',
          templateUrl: '/app/enterprise/profile/edit/enterprise-profile-edit.tmpl.html',
          controller: 'EditEnterpriseCtrl as editEnterpriseCtrl'
        });;
  	}])
    .controller('EditEnterpriseCtrl', ['$scope', function ($scope) {
      
      var editEnterpriseCtrl = this;


    }]);
 

})();