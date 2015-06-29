(function() {
	'use strict';

	angular.module('enterprise-portal.services.user', [])
	
	.factory('UserService', [
		'$http',
		'$q',
		'API_URL',
		
		function($http, $q, API_URL) {
			return {
				login : function(userObj) {
					return $http.post(API_URL + '/session', {'user' : userObj});
				},

				logout : function(userObj) {
					return $http.del(API_URL + '/session');
				},

				register : function(userObj) {
					return $http.post(API_URL + '/register', {'user' : userObj});
				},

				get : function(userId) {
					return $http.get(API_URL + '/user/' + userId + '/user');
				},

				update : function(userId, userObj) {
					return $http.post(API_URL + '/user/' + userId + '/user', {'user' : userObj});
				}
			}
		}
	]);

})();