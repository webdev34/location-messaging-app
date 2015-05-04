(function() {
  'use strict';

  angular.module('enterprise', [
  	'enterprise-portal.models.enterprise',
    'enterprise.profile',
    'enterprise.users'
  	])

   .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
     $stateProvider
      .state('enterprise', {
        url: '/enterprise/profile',
        templateUrl: '/app/enterprise/enterprise.tmpl.html',
        abstract: true
      }); 
      $urlRouterProvider.otherwise('enterprise.profile');
    }])
  	.controller('EnterpriseCtrl', [
      'EnterpriseModel',  
      function(EnterpriseModel) {

        var enterpriseCtrl = this;



        EnterpriseModel.getEnterpriseInfo()
  	  		.then(function(result) {
  	  			enterpriseCtrl.company = result;
  	  		});


  	}]);
 

})();
