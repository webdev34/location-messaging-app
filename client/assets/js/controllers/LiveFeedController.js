(function() {
  'use strict';

  angular.module('enterprise-portal').controller('LiveFeedController', ['$scope', '$http', function($scope, $http){
    
    $http.get('data/live-feed.json').
    success(function(data) {
      $scope.feed = data;
    });


  }]);

 

})();
