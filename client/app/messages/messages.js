(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard',
  	'messages.create',
  	'messages.edit'
  ])

	  .controller('MessageListController', ['$scope','$http', function($scope, $http) {
	    
	    $http.get('assets/data/message-list.json').
	    success(function(data) {
	      $scope.messages = data;
	    });

	  }])

	  .controller('MessageDetailController', ['$scope', 'MessageDetailModel', function($scope, MessageDetailModel) {

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			$scope.message = result;
		  		});

	  }]);

})();