(function() {
	'use strict';

	angular.module('enterprise-portal.services.followers', [])
	
	.factory('FollowersService', [
		'$http',
		'API_URL',
		
		function(
			$http,
			API_URL
		) {
			return {
				// login : function(userObj) {
				// 	return $http.post(API_URL + '/session', {'user' : userObj});
				// },

				// logout : function(userObj) {
				// 	return $http.del(API_URL + '/session');
				// },

				// register : function(userObj) {
				// 	return $http.post(API_URL + '/register', {'user' : userObj});
				// },

				// get : function(userId) {
				// 	return $http.get(API_URL + '/account/' + userId);
				// },

				// update : function(userObj) {
				// 	return $http.post(API_URL + '/account', {'user' : userObj});
				// }
			}
		}
	]);

})();