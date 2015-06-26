(function() {
	'use strict';

	angular.module('enterprise-portal.services.messages', [])
	
	/***************************************************************
	
	// Would this see the auth token change?
	.factory('httpRequestInterceptor', function () {
		return {
			request: function (config) {
				config.headers['Authorization'] = $rootScope.auth;
				return config;
			}
		};
	})

	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('httpRequestInterceptor');
	})
	
	//*** Add interceptor for response transformation
	
	***************************************************************/

	.factory('MessagesService', [
		'$rootScope',
		'$http',
		'$q',
		'API_URL_DROID',
		
		function(
			$rootScope,
			$http,
			$q,
			API_URL
		) {
			$http.defaults.headers.common['Authorization'] = $rootScope.auth;
			
			function extractData(response) {
				return response.data.data;
			}
			
			function extractError(response) {
				return response.data || {'code': "Server Connection Failed"};
			}
			
			function validate(response){
				return typeof response.data.data === 'object';
			}

			return {
				get : function(messageId){
					//return $http.get(API_URL + '/message/' + messageId)
					return $http({
						method: 'GET',
						url: API_URL + '/message/' + messageId,
						headers: {
							'Authorization': $rootScope.auth
						}
					})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},
				create : function(messageObj) {
					/*
					"sid": "",
					"messageTitle": "",
					x "content": "",
					"status": "Inactive",
					x "range": 5,
					x "sentTo": "TARGET_FRIENDS",
					x "discoverOn": "enter",
					"startDate": todayFormatted,
					"startTime": "12:01 AM",
					"endDate": todayFormatted,
					"endTime": "11:59 PM"
					
					locationName
					latlng
					startTimestamp
					endTimestamp
					*/
					
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
						"messageRecipient": messageObj.recipients || []
					};
					
					//return $http.post(API_URL + '/message', msgObj)
					return $http({
						method: 'POST',
						url: API_URL + '/message',
						headers: {
							'Authorization': $rootScope.auth
						},
						data: msgObj
					})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},
				list : function(timestamp, limit){
					if (!timestamp){
						// beginning of the month
						var date = new Date();
						timestamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
					}
					
					//return $http.get(API_URL + '/message/' + timestamp + '/limit/' + (limit || 0))
					return $http({
						method: 'GET',
						url: API_URL + '/message/' + timestamp + '/limit/' + (limit || 0),
						headers: {
							'Authorization': $rootScope.auth
						}
					})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},
				remove : function(messageId){
					//return $http.del(API_URL + '/message/' + messageId)
					return $http({
						method: 'DELETE',
						url: API_URL + '/message/' + messageId,
						headers: {
							'Authorization': $rootScope.auth
						}
					})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				}
			};
		}
	]);

})();