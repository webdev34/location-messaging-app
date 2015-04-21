(function() {
  'use strict';

  angular.module('admin', [
  	'enterprise-portal.models.admin'])
  	.controller('AdminController', ['$http', 'AdminModel', function($http, AdminModel){


	    AdminModel.getAdminData()
	  		.then(function(result) {
	  			$scope.enterpises = result;
	  		});

	  }]);

})();
