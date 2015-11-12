(function() {
	'use strict';

	angular.module('enterprise-portal.models.messages', [
		'enterprise-portal.services.messages',
		'enterprise-portal.models.media'
	])
	
	.service('MessageDetailModel', [
		'$http',
		'$q',
		'MessagesService',
		'MediaModel',
		
		function(
			$http,
			$q,
			MessagesService,
			MediaModel
		) {
			var model = this;
			
			model.getMessageDetail = function(messageId) {
				//return (message) ? $q.when(message) : MessagesService.get(messageId).then(
				return MessagesService.get(messageId).then(
					function success(response) {
						var retrievedMsg = response.message[0];

						var today = new Date(),
								todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
								todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
						var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
								tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
								tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

						var formattedMsg = {
							"sid": retrievedMsg.sid,
							"messageTitle": retrievedMsg.label,
							"content": retrievedMsg.text,
							"status": "Inactive",
							"range": 5,
							"discoverOn": 1, // 1 => enter; 2 => leave
							"startDate": todayProperFormatted,
							"startTime": "12:01 AM",
							"endDate": tomorrowProperFormatted,
							"endTime": "11:59 PM",
							"locationName": "",
							"coordinates": {"lat":43.657504642319005,"lng":-79.3760706718750}
						}

						console.log("formattedMessage: "+ JSON.stringify(formattedMsg));
						return formattedMsg;
					},
					function error() {
						alert('something went wrong');
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
						"endTime": new Date(newMessage.endDate + " " + newMessage.endTime).getTime()//,
						//sent: true,
						//'media': [23423awerwe5q435345]
					},
					"location": [
						{
							"name": newMessage.locationName || "Unnamed Location",
							//"coordinates": newMessage.coordinates,
							"latitude": newMessage.coordinates.lat,
							"longitude": newMessage.coordinates.lng,
							"distance": newMessage.range*1000,
							"trigger": newMessage.discoverOn
						}
					]
				}

				return MessagesService.post(formattedMessage).then(function(response){});
			};

			model.updateMessage = function(updatedMessage) {
				console.log('model update');
				var formattedMessage = {
					"message": {
						sid: updatedMessage.sid,
						target: 3, //targets all followers
						"label": updatedMessage.messageTitle,
						"text": updatedMessage.content,
						"startTime": new Date(updatedMessage.startDate + " " + updatedMessage.startTime).getTime(),
						"endTime": new Date(updatedMessage.endDate + " " + updatedMessage.endTime).getTime()//,
						//sent: true
					}
				}

				return MessagesService.post(formattedMessage).then(function(response){});
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
				return MessagesService.list(0,0)
					.then(
						function(response){
							
							var messageList = [],
									noLocation = [{"name": "No Location"}];
							
							function getItemByEnvelope(arrayName, objName, envelopeID) {
								return arrayName.filter(function(item) {
									return item[objName] == envelopeID;
								});
							}


							
							for (var i = 0; i < response.message.length; i++) {
								 
					 			var messageDetail = {},
										envelopeID = response.message[i].envelope,
										recipientCount = getItemByEnvelope(response.envelope, "sid", envelopeID);							

								messageDetail.message = response.message[i];
								messageDetail.message.location = getItemByEnvelope(response.location, "envelope", envelopeID) || noLocation;
								messageDetail.message.recipients = recipientCount.length;

								messageList.push(messageDetail);
							}
							
							return messageList;
						}
					);
			};

		}
	]);

})();