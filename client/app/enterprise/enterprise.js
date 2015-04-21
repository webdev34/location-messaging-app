(function() {
  'use strict';

  angular.module('enterprise', [
  	'enterprise-portal.models.enterprise'
  	])
  	.controller('EnterpriseController', ['$scope', 'EnterpriseModel',  function($scope, EnterpriseModel){

  	
    	EnterpriseModel.getEnterpriseInfo()
	  		.then(function(result) {
	  			$scope.company = result;
	  		});


  	}]);
 

})();
