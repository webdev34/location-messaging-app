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
			var model = this;
			
			model.getMessageList = function() {
				//return (messageList) ? $q.when(messageList) : MessagesService.list()
				console.log('model testing');
				return MessagesService.list(0,0)
					.then(
						function(response){
							
							var messageList = [],
									noLocation = [{"name": "No Location"}];
							
							function getItemByEnvelope(arrayName, objName, envelopeID) {
								// var results = [];
								// arrayName.forEach(function(item) {
								// 	if (item.envelope == envelopeID) {
								// 		results.push(item);
								// 	}
								// });
								// //console.log(results);
								// return results;
								return arrayName.filter(function(item) {
									return item[objName] == envelopeID;
								});
							}


							
							for (var i = 0; i < response.message.length; i++) {
								 
					 			var messageDetail = {},
										envelopeID = response.message[i].envelope,
										recipientCount = getItemByEnvelope(response.envelope, "sid", envelopeID);							

								messageDetail.message = response.message[i];
								//messageDetail.message.location = response.location.filter || noLocation;
								messageDetail.message.location = getItemByEnvelope(response.location, "envelope", envelopeID) || noLocation;
								messageDetail.message.recipients = recipientCount.length;

								//messageDetail.
								console.log(messageDetail);
								messageList.push(messageDetail);
							}
							
							//console.log(JSON.stringify(messageList));
							return messageList;
						}
					);
			};

			model.createNewMessage = function(newMessage) {

				var formattedMessage = {
					"message": {
						target: 3, //targets all followers
						"label": newMessage.messageTitle,
						"text": newMessage.content,
						"startTime": new Date(newMessage.startDate + " " + newMessage.startTime).getTime(),
						"endTime": new Date(newMessage.endDate + " " + newMessage.endTime).getTime()
					},
					"location": [
						{
							"name": newMessage.locationName || "Unnamed Location",
							"latitude": newMessage.coordinates.H,
							"longitude": newMessage.coordinates.L,
							"distance": newMessage.range*1000,
							"trigger": newMessage.discoverOn
						}
					]
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