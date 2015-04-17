(function() {
  'use strict';

  angular.module('enterprise-portal').controller('MessageDetailController', ['$scope', '$http', function($scope, $http){
    
    $http.get('assets/data/message-detail.json').
    success(function(data) {
      $scope.message = data;
    });

  
  }]);

 

})();
