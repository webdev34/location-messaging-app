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
			$http.defaults.headers.common['Authorization'] = "Basic " + $rootScope.auth;
			
			function extractData(response) {
				return response.data.data;
			}
			
			function extractError(response) {
				return response.data;
			}
			
			function validate(response){
				return typeof response.data.data === 'object';
			}

			return {
				/*
				comment: {
					text: 'some text'
				},
				messageLocation: [
					{
						//name: 'Toronto',
						//geoFence: {
						//    type: 'Point',
						//    coordinates: [-79.383184, 43.653226]
						//},
						//distance: 500,
						//trigger: 1,
						//startTime: new Date().getTime() + 60,
						//endTime: new Date().getTime() + 600

						distance: 0.0,
						trigger: 0,
						startTime: 1434064463343,
						endTime: 0
					}
				],
				envelope: {
					target: 3
				},
				messageRecipient: [
				]
				*/
				create : function(messageObj) {
					var msgObj = {
						comment: { text: messageObj.content },
						messageLocation: messageObj.locationArray,
						envelope: { target: messageObj.range },
						messageRecipient: []
					};
					
					return $http.post(API_URL + '/message', msgObj)
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								console.error(response);
								return $q.reject(extractError(response));
							}
						);
				}
			};
		}
	]);

})();