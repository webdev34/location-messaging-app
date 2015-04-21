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

	  .controller('MessageDetailController', ['$scope', '$http', 'MessageDetailModel', function($scope, $http, MessageDetailModel) {
			// $http.get('assets/data/message-detail.json')
			// .success(function(data) {
			//   $scope.message = data;
			// });

	  	MessageDetailModel.getMessageDetail()
	  		.then(function(result) {
	  			$scope.message = result;
	  			console.log('result', result);
	  		});


	  }]);
 

})();