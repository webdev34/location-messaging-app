(function() {
  'use strict';

  angular.module('admin', [
  	'enterprise-portal.models.admin'
  	])
  	.config([
  		'$stateProvider', '$urlRouterProvider', 
  		function ($stateProvider, $urlRouterProvider) {
    
     	$stateProvider
	      .state('admin', {
	        url: '/admin',
	        templateUrl: 'app/admin/admin.tmpl.html',
	        controller: 'AdminCtrl as adminCtrl'
	      });

      $urlRouterProvider.otherwise('messages.dashboard');
    }])
  	.controller('AdminCtrl', [
  		'AdminModel', 'FoundationApi', 
  		function(AdminModel, FoundationApi){

  			var adminCtrl = this;

		    AdminModel.getAdminData()
		  		.then(function(result) {
		  			adminCtrl.enterprises = result;
		  		});

		  	function addEnterprise() {
		  		console.log('adding');
          AdminModel.addEnterprise(adminCtrl.newEnterprise);

          resetForm();
          FoundationApi.publish('addEnterpriseModal', 'close')

        }

        function resetForm() {
          adminCtrl.newEnterprise = {}
        }

        resetForm();

        adminCtrl.addEnterprise = addEnterprise;


	  }]);

})();
