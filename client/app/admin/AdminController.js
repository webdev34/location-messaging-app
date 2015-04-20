(function() {
  'use strict';

  angular.module('enterprise-portal').controller('AdminController', ['$scope','$http', function($scope, $http){
   
    $http.get('assets/data/admin.json').
    success(function(data) {
      $scope.enterprises = data;
    });

  }]);

 

})();
