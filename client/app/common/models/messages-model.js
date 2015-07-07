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
				//return (message) ? $q.when(message) : MessagesService.get(messageId).then(
				return MessagesService.get(messageId).then(
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
		//'$q',
		'MessagesService',
		
		function(
			$http,
			//$q,
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
							
							for (var i = 0; i < response.message.length; i++){
								var messageDetail = {
									message: response.message[i],
									comment: response.comment[i],
									envelope: response.envelope[i],
									messageRecipient: response.messageRecipient[i]
								}
								
								messageList.push(messageDetail);
							}
							
							return messageList;
						}
					);
			};

			model.createNewMessage = function(newMessage) {
				newMessage.target = 3;
				
				return MessagesService.create(newMessage).then(function(response){
					/*
					var messageDetail = {
						message: response.message[0],
						comment: response.comment[0],
						envelope: response.envelope[0],
						messageRecipient: response.messageRecipient[0]
					}
					messageList.push(messageDetail);
					*/
				});
			};
		}
	]);

})();