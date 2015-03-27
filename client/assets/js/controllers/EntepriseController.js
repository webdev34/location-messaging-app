(function() {
  'use strict';

  angular.module('enterprise-portal').controller('EntepriseController', ['$scope', '$http', function($scope, $http){
    
    $http.get('data/company.json').
    success(function(data) {
      $scope.company = data;
    });

  }]);
 

})();
