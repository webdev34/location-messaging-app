(function() {
  'use strict';

  angular.module('messages.dashboard', [])

	    .controller('ActiveMessageController', ['$scope', '$http', function($scope, $http){
    
	    $http.get('assets/data/active-messages.json').
	    success(function(data) {
	      $scope.active = data;
	    });
    
 		}])

 		// 	---
		// name: messages
		// url: /enterprise/messages/dashboard
		// ---
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('messages', {
				url: '/enterprise/messages/dashboard',
				templateUrl: '/app/messages/dashboard/messages-dashboard.tmpl.html'
			});
		
	}])

  	.controller('LiveFeedController', ['$scope', '$http', function($scope, $http){
    
	    $http.get('assets/data/live-feed.json').
	    success(function(data) {
	      $scope.feed = data;
	    });


  	}]);
 

})();