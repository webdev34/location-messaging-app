(function() {
  'use strict';

  angular.module('enterprise-portal').controller('ActiveMessageController', ['$scope', '$http', function($scope, $http){
    
    $http.get('data/active-messages.json').
    success(function(data) {
      $scope.active = data;
    });

    
  }]);

 

})();
