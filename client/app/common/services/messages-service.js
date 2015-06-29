(function() {
	'use strict';

	angular.module('enterprise-portal.services.messages', [])
	
	.config(['$httpProvider', function($httpProvider) {  
		$httpProvider.interceptors.push(['$q', '$rootScope', 'FoundationApi', function($q, $rootScope, FoundationApi) {
			function extractData(response) {
				return response.data.data;
			}

			function extractError(response) {
				return response.data || {
					'code': "QVR_Server_Connection_Failed"
				};
			}

			function validate(response) {
				return typeof response.data.data === 'object';
			}

			return {
				request: function(config) {
					config.headers['Authorization'] = $rootScope.auth;
					console.log("request", config);
					return config;
				},
				response: function(response) {
					if (response.config.url.includes("/web1.1/") || response.config.url.includes("/droid1.1/")) {
						response = validate(response) ? extractData(response) : $q.reject(extractError(response));
					}
					return response || $q.when(response);
				},
				responseError: function(rejection) {
					if (rejection.status == 401) {
						rejection.data = {
							status: 401,
							descr: 'unauthorized',
							code: 'QVR_Autherization_Failed'
						}
						return rejection.data;
					}

					rejection = extractError(rejection);
					
					FoundationApi.publish('main-notifications', {
						title: rejection.code.replace("QVR_", "").replace(/_/g, " "),
						content: '',
						color: 'fail',
						autoclose: '3000'
					});
					
					return $q.reject(rejection);
				}
			}
		}]);
	}])
	
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
					
					return $http.post(API_URL + '/message', msgObj);
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