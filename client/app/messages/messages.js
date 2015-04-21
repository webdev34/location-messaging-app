(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard'
  ])

	  .controller('MessageListController', ['$scope','$http', function($scope, $http) {
	    
	    $http.get('assets/data/message-list.json').
	    success(function(data) {
	      $scope.messages = data;
	    });

	  }])

	  .controller('MessageDetailController', ['$scope', '$http', function($scope, $http) {
			$http.get('assets/data/message-detail.json')
			.success(function(data) {
			  $scope.message = data;
			});

	  }]);
 

})();