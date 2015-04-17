(function() {
  'use strict';

  angular.module('enterprise-portal').controller('UserProfileController', ['$scope','$http', function($scope, $http){
   
  	$http.get('assets/data/user.json').
    success(function(data) {
      $scope.user = data;
    });

  }]);

 

})();
