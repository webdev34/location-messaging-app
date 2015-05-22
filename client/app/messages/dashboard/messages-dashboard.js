(function() {
  'use strict';

  angular.module('messages.dashboard', [])

  	.config(['$stateProvider', function ($stateProvider) {
				
				$stateProvider
					.state('messages.dashboard', {
						url: '/',
						templateUrl: 'app/messages/dashboard/messages-dashboard.tmpl.html'
					});

		}])

	  .controller('ActiveMessageController', ['$scope', '$http', function($scope, $http){
    
	    $http.get('assets/data/active-messages.json').
	    success(function(data) {
	      $scope.active = data;
	    });
    
 		}])


  	.controller('LiveFeedController', ['$scope', '$http', function($scope, $http){
    
	    $http.get('assets/data/live-feed.json').
	    success(function(data) {
	      $scope.feed = data;
	    });


  	}]);
 

})();