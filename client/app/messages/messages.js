(function() {
	'use strict';

	angular.module('messages', [
		'enterprise-portal.models.messages',
		'messages.dashboard',
		'messages.detail',
		'messages.new',
		'messages.edit',
		'messages.create-campaign',
		'messages.communications',
		'messages.all-messages'
	])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('messages', {
				url: '/campaign',
				templateUrl: 'app/messages/messages.tmpl.html',
				abstract: true
			})
			.state('messages.dashboard', {
				url: '/',
				templateUrl: 'app/messages/dashboard/messages-dashboard.tmpl.html',
				controller: 'CampaignCenterCtrl as campaignCenterCtrl'
			})
			.state('messages.new', {
				url: '/message/new',
				templateUrl: 'app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
			})
			.state('messages.edit', {
				url: '/message/:_id',
				templateUrl: 'app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
			})
			.state('messages.asset', {
				url: '/assets',
				templateUrl: 'app/messages/asset/messages-asset.tmpl.html',
				controller: 'AssetMessageCtrl as assetMessageCtrl'
			})
			.state('messages.manage', {
				url: '/manage',
				templateUrl: 'app/messages/manage/messages-manage.tmpl.html',
				controller: 'MessagesManageCtrl as messagesManageCtrl'
			})
			.state('messages.create-campaign', {
				url: '/create-campaign',
				templateUrl: 'app/messages/manage-campaign/manage-campaign.tmpl.html',
				controller: 'ManageCampaignCtrl as manageCampaignCtrl'
			}) 
			.state('messages.all-messages', {
				url: '/all-messages',
				templateUrl: 'app/messages/all-messages/all-messages.tmpl.html',
				controller: 'AllMessagesCtrl as allMessagesCtrl'
			})
			.state('messages.communications', {
				url: '/communications',
				templateUrl: 'app/messages/communications/messages-communications.tmpl.html',
				controller: 'MessagesCommunicationsCtrl as messagesCommunicationsCtrl'
			})
			;

		$urlRouterProvider.otherwise('messages.dashboard');
	}])

	.controller('MessageListCtrl', [
		'MessageListModel',
		
		function(MessageListModel) {
			var messageListCtrl = this;
			MessageListModel.getMessageList()
				.then(function(result) {
					messageListCtrl.messages = result;
				});
		}
	])

	.controller('MyCtrl', ['$scope', function ($scope) {
     $scope.types = "['establishment']";
    
	}])
	
;

})();