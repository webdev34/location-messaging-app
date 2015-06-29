(function() {
	'use strict';

	angular.module('messages.dashboard', [])

	.controller('ActiveMessageController', [
		'$scope',
		'$http',
		'MessageListModel',
		
		function(
			$scope,
			$http,
			MessageListModel
		) {
					console.log("Active Messages");
			MessageListModel.getMessageList().then(
				function(response){
					console.log("------>", response);
					$scope.active = response;
				}
			);
		}
	])

	/*
	.controller('LiveFeedController', ['$scope', '$http', function($scope, $http) {
		$http.get('assets/data/live-feed.json').
		success(function(data) {
			$scope.feed = data;
		});
	}]);
	*/
})();