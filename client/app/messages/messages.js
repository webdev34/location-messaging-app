(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard',
  	'messages.new',
  	'messages.edit'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('messages', {
				url: '/enterprise/messages',
				templateUrl: '/app/messages/messages.tmpl.html',
				abstract: true
			})
			.state('messages.dashboard', {
				url: '/dashboard',
				templateUrl: '/app/messages/dashboard/messages-dashboard.tmpl.html'

			})
			.state('messages.detail', {
				url: '/:_id',
				templateUrl: '/app/messages/messages-detail.tmpl.html',
				controller: 'MessageDetailCtrl as messageDetailCtrl'
			});

		$urlRouterProvider.otherwise('messages.dashboard');
	}])

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

	  .controller('MessageDetailCtrl', ['$stateParams', 'MessageDetailModel', function($stateParams, MessageDetailModel) {
	  		var messageDetailCtrl = this;

	  		messageDetailCtrl.currentMessageId = $stateParams._id;

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			messageDetailCtrl.message = result;
		  		});

	  }]);

})();