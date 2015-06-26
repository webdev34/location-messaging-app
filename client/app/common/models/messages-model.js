(function() {
	'use strict';

	angular.module('enterprise-portal.models.messages', [
		'enterprise-portal.services.messages'
	])
	
	.service('MessageDetailModel', [
		'$http',
		'$q',
		'MessagesService',
		
		function(
			$http,
			$q,
			MessagesService
		) {
			var model = this,
				message;
			
			model.getMessageDetail = function(messageId) {
				return (message) ? $q.when(message) : MessagesService.get(messageId).then(
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
							console.log(response);
							
							messageList = [];	
							
							for (var i = 0; i < response.message.length; i++){
								var newMessage = response.message[i];
								newMessage.comment = response.comment[i];
								newMessage.envelope = response.envelope[i];
								newMessage.recipients = response.messageRecipient[i];
								
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