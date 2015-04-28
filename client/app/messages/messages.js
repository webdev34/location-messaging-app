(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard',
  	'messages.new',
  	'messages.edit'
  ])

	  .controller('MessageListController', ['$scope','$http', function($scope, $http) {

	  	$scope.currentMessage = null;
	    
	    $http.get('assets/data/message-list.json').
	    success(function(data) {
	      $scope.messages = data;
	    });

	    $scope.setCurrentMessage = function(messageId) {
	  		$scope.currentMessage = messageId;
	  		//console.log(messageId)
	  	};

	  	$scope.openDashboard = function() {
	  		$scope.currentMessage = null;
	  	};

	  	$scope.isCurrentMessage = function(messageId) {
	  		return $scope.currentMessage !== null && messageId === $scope.currentMessage;
	  	};

	  }])

	  .controller('MessageDetailController', ['$scope', 'MessageDetailModel', function($scope, MessageDetailModel) {

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			$scope.message = result;
		  		});

	  }]);

})();