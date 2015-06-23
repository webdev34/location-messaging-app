(function() {
	'use strict';

	angular.module('enterprise-portal.services.messages', [])
	
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
					return $http.get(API_URL + '/message/' + messageId)
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
					// TARGET_MYSELF      = 1;
					// TARGET_RECIPIENTS  = 2;
					// TARGET_FRIENDS     = 3;

					var msgObj = {
						comment: { text: messageObj.content || "" },
						messageLocation: messageObj.locations || [],
						envelope: { target: messageObj.target || 3 },
						messageRecipient: messageObj.recipients || []
					};
					
					return $http.post(API_URL + '/message', msgObj)
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
					return $http.get(API_URL + '/message/' + (timestamp || (new Date().getTime())) + '/limit/' + (limit || 0))
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
					return $http.del(API_URL + '/message/' + messageId)
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