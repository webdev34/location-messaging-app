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
				//newMessage.target = 3;

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
								"coordinates": newMessage.coordinates
							},
							"distance": newMessage.range,
							"trigger": 1, //is this the same as discoverOn
							//"discoverOn": newMessage.discoverOn,
							"startTime": 1440722869392,
							"endTime": 1440722869932
						}
					]//,
					// envelope: {
     //        target: 2
     //    	},
     //    	messageRecipient: [
     //        { sid: '558ad4daed1954f366cd0c41' }
     //    	]
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