(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard',
  	'messages.new',
  	'messages.edit'
  ])

	  .controller('MessageListController', ['$scope','$http', function($scope, $http) {

	  	$scope.isCreatingNew = false;
	  	$scope.isEditing = false;

	  	$http.get('assets/data/message-list.json').
	    success(function(data) {
	      $scope.messages = data;
	    });


	  	function startCreatingNew() {
	  		$scope.isCreatingNew = true;
	  		$scope.isEditing = false;
	  	}

	  	function cancelCreating() {
	  		$scope.isCreatingNew = false;
	  	}
	  	function startEditing() {
	  		$scope.isCreatingNew = false;
	  		$scope.isEditing = true;
	  	}

	  	function cancelEditing() {
	  		$scope.isEditing = false;
	  	}
	    
	  	$scope.startCreatingNew = startCreatingNew;
		$scope.cancelCreating = cancelCreating;
		$scope.startEditing = startEditing;
	   	$scope.cancelEditing = cancelEditing;


	  }])

	  .controller('MessageDetailController', ['$scope', 'MessageDetailModel', function($scope, MessageDetailModel) {

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			$scope.message = result;
		  		});

	  }]);

})();