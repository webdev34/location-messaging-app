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
				templateUrl: '/app/messages/detail/messages-detail.tmpl.html',
				controller: 'MessageDetailCtrl as messageDetailCtrl'
			});

		$urlRouterProvider.otherwise('messages.dashboard');
	}])

	  .controller('MessageListCtrl', [
	  	'MessageListModel',
	  	function( MessageListModel) {
	  		var messageListCtrl = this;

  			MessageListModel.getMessageList()
	  		.then(function(result) {
	  			messageListCtrl.messages = result;
	  		});

		  }])

	  .controller('MessageDetailCtrl', [
	  	'$stateParams', 'MessageDetailModel', 
	  	function($stateParams, MessageDetailModel) {
	  		var messageDetailCtrl = this;

	  		messageDetailCtrl.currentMessageId = $stateParams._id;

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			messageDetailCtrl.message = result;
		  		});

	  }]);

})();