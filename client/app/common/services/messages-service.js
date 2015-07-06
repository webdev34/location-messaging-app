(function() {
	'use strict';

	angular.module('enterprise-portal.services.messages', [])
	
	.factory('MessagesService', [
		'$http',
		'API_URL_DROID',
		
		function(
			$http,
			API_URL
		) {
			return {
				get : function(messageId){
					return $http.get(API_URL + '/message/' + messageId);
				},
				create : function(messageObj) {
					console.log(messageObj);
					console.log("file", messageObj.file);
					
					//*** service does not accept messageTitle or status
					
					var target;
					switch (messageObj.sentTo){
						case "TARGET_MYSELF":
							target = 1;
							break;
						case "TARGET_RECIPIENTS":
							target = 2;
							break;
						case "TARGET_FRIENDS":
							target = 3;
							break;
						default:
							target = 3;
					}

					var locationObj = {
						name: messageObj.locationName || "",
						geoFence: {
						    type: 'Point',
						    coordinates: messageObj.latlng || []
						},
						distance: messageObj.range || 0,
						trigger: messageObj.discoverOn == "enter" ? 1 : 0,
						startTime: messageObj.startTimestamp || 0,
						endTime: messageObj.endTimestamp || 0
					};
					
					var msgObj = {
						"comment": {
							"text": messageObj.content || ""
						},
						"messageLocation": [locationObj],
						"envelope": {
							"target": target
						},
						"messageRecipient": messageObj.recipients || [],
						"attachments": messageObj.file
					};
					
					//return $http.post(API_URL + '/message', msgObj);
					return $http({
						method: 'POST',
						url: API_URL + '/message',
						headers: {
							'Content-Type': undefined
						},
						transformRequest: function(data) {
							var formData = new FormData();
							formData.append("payload", JSON.stringify(data.msgObj));
							formData.append("file", data.file);
							return formData;
						},
						data: {
							"msgObj": msgObj,
							"file": messageObj.file
						}
						//data: msgObj
					});
				},
				list : function(timestamp, limit){
					if (!timestamp){
						// beginning of the month
						var date = new Date();
						timestamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
					}
					
					return $http.get(API_URL + '/message/' + timestamp + '/limit/' + (limit || 0));
				},
				remove : function(messageId){
					return $http["delete"](API_URL + '/message/' + messageId);
				}
			};
		}
	]);

})();