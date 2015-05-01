(function() {
  'use strict';

  angular.module('messages', [
  	'enterprise-portal.models.messages',
  	'messages.dashboard',
  	'messages.detail',
  	'messages.new',
  	'messages.edit'
  ])
  
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('messages', {
				url: '/enterprise/messages',
				templateUrl: '/app/messages/messages.tmpl.html',
				abstract: true
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
	;

})();