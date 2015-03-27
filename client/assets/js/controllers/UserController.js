(function() {
  'use strict';

  angular.module('enterprise-portal').controller('UserController', ['$scope','$http', function($scope, $http){
   
   $http.get('data/user.json').
    success(function(data) {
      $scope.user = data;
    });

  }]);

 

})();
