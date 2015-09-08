(function() {
	'use strict';

	angular.module('enterprise-portal.services.enterprise', [])
	
	.factory('EnterpriseService', [
		'$http',
		'API_URL',
		
		function(
			$http,
			API_URL
		) {
			return {
				add : function(enterpriseObj) {
					return $http.post(API_URL + '/enterprise', {'enterprise' : enterpriseObj});
				},

				get : function(enterpriseId) {
					return $http.get(API_URL + '/enterprise/' + enterpriseId);
				},

				update : function(enterpriseId, enterpriseObj) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user', {'enterprise' : enterpriseObj});
				},

				remove : function(enterpriseId) {
					return $http.del(API_URL + '/enterprise/' + enterpriseId + '/user');
				},
				
				getUserList : function(enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user');
				},

				addUser : function(username, usertype, enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user/' + username, {'username' : username, 'type' : usertype});
				},

				removeUser : function(userId, enterpriseId) {
					return $http["delete"](API_URL + '/enterprise/' + enterpriseId + '/user/' + userId);
				}
			}
		}
	]);

})();