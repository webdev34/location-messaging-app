(function() {
	'use strict';

	angular.module('enterprise-portal.services.user', [])
	
	.factory('UserService', [
		'$http',
		'$q',
		'API_URL',
		
		function($http, $q, API_URL) {
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
				login : function(userObj) {
					return $http.post(API_URL + '/session', {'user' : userObj})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				logout : function(userObj) {
					return $http.del(API_URL + '/session')
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				//*** doesn't exist yet
				register : function(userObj) {
					return $http.post(API_URL + '/register', {'user' : userObj})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				//*** doesn't exist yet
				get : function(userId) {
					return $http.get(API_URL + '/user/' + userId + '/user')
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				//*** doesn't exist yet
				update : function(userId, userObj) {
					return $http.post(API_URL + '/user/' + userId + '/user', {'user' : userObj})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				}
			}
		}
	]);

})();