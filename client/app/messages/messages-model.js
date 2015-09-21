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
				console.log("start: "+ newMessage.startDate + " " +  newMessage.startTime);
				console.log("end: "+ newMessage.endDate + " " + newMessage.endTime);

				var formattedMessage = {
					"comment": {
						"text": newMessage.content
						//"messagetitle": newMessage.messageTitle
					},
					"messageLocation": [
						{
							"name": newMessage.locationName,
							"geoFence": {
								"type": "Point",
								"coordinates": [newMessage.coordinates.H, newMessage.coordinates.L]
							},
							"distance": newMessage.range,
							"trigger": 1, //is this the same as discoverOn
							//"discoverOn": newMessage.discoverOn,
							"startTime": new Date(newMessage.startDate + " " + newMessage.startTime).getTime(),
							"endTime": new Date(newMessage.endDate + " " + newMessage.endTime).getTime()
						}
					],
					 envelope: {
            target: 3 //targets all followers
        	}
				}

				return MessagesService.create(formattedMessage).then(function(response){
					
					//var newMessage = response.message[i];
					// newMessage.comment = response.comment[i];
					// newMessage.envelope = response.envelope[i];
					// newMessage.recipients = response.messageRecipient[i];
					// messageList.push(newMessage);
					
				});
			};
		}
	]);

})();