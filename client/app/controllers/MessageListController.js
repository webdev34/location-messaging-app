(function() {
  'use strict';

  angular.module('enterprise-portal').controller('MessageListController', ['$scope','$http', function($scope, $http){
    
    $http.get('assets/data/message-list.json').
    success(function(data) {
      $scope.messages = data;
    });

  }]);

 

})();
