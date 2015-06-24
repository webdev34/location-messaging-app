(function() {
	'use strict';

	angular.module('enterprise-portal.models.messages', [
		'enterprise-portal.services.messages'
	])
	
	.service('MessageDetailModel', [
		'$http',
		'$q',
		'$routeParams',
		'MessagesService',
		
		function(
			$http,
			$q,
			$routeParams,
			MessagesService
		) {
			var model = this,
				message,
				sid = $routeParams.sid;
			
			model.getMessageDetail = function() {
				return (message) ? $q.when(message) : MessagesService.get(sid).then(
					function(response) {
						message = response;
						return response;
					}
				);
			};

			model.updateMessage = function(updatedMessage) {
				message = updatedMessage;
			};
		}
	])
		
	.service('MessageListModel', [
		'$http',
		'$q',
		'MessagesService',
		
		function(
			$http,
			$q,
			MessagesService
		) {
			var model = this,
				messageList;

			model.getMessageList = function() {
				//return (messageList) ? $q.when(messageList) : MessagesService.list()
				return MessagesService.list()
					.then(
						function(response){
							messageList = [];	
							
							for (var i = 0; i < response.length; i++){
								var newMessage = response[i].message;
								newMessage.comment = response[i].comment;
								newMessage.envelope = response[i].envelope;
								newMessage.recipients = response[i].messageRecipient;
								newMessage.user = response[i].user;
								
								messageList.push(newMessage);
							}
							
							return messageList;
						}
					);
			};

			model.createNewMessage = function(newMessage) {
				newMessage.target = 3;
				
				return MessagesService.create(newMessage).then(function(response){
					/*
					newMessage = response.message;
					newMessage.comment = response.comment;
					newMessage.envelope = response.envelope;
					newMessage.recipients = response.messageRecipient;
					newMessage.user = response.user;
					
					messageList.push(newMessage);
					*/
				});
			};
		}
	]);

})();