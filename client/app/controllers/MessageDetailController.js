(function() {
  'use strict';

  angular.module('enterprise-portal').controller('MessageDetailController', ['$scope', '$http', function($scope, $http){
    
    $http.get('data/message-detail.json').
    success(function(data) {
      $scope.message = data;
    });

  
  }]);

 

})();
