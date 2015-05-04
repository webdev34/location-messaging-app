(function() {
  'use strict';

  angular.module('admin', [
  	'enterprise-portal.models.admin'])
  	.controller('AdminController', ['$scope', 'AdminModel', function($scope, AdminModel){


	    AdminModel.getAdminData()
	  		.then(function(result) {
	  			$scope.enterprises = result;
	  		});

	  }]);

})();
