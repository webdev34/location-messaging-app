(function() {
	'use strict';

	angular.module('messages.dashboard', [])

	.controller('ActiveMessageController', ['$scope', '$http', function($scope, $http) {
		$http.get('assets/data/active-messages.json').
		success(function(data) {
			$scope.active = data;
		});
	}])

	.controller('LiveFeedController', ['$scope', '$http', function($scope, $http) {
		$http.get('assets/data/live-feed.json').
		success(function(data) {
			$scope.feed = data;
		});
	}]);
})();