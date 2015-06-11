(function() {
	'use strict';

	angular.module('enterprise-portal.services.enterprise', [])
	
	.factory('EnterpriseService', [
		'$http',
		'$q',
		'API_URL',
		
		function($http, $q, API_URL) {
			function extract(result) {
				return result.data;
			}
			
			function validate(result){
				return typeof result.data.data === 'object';
			}

			return {
				add : function(enterpriseObj) {
					return $http.post(API_URL + '/enterprise', {'enterprise' : enterpriseObj})
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},

				get : function(enterpriseId) {
					return $http.get(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},

				update : function(enterpriseId, enterpriseObj) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user', {'enterprise' : enterpriseObj})
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},

				remove : function(enterpriseId) {
					return $http.del(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},
				
				getUserList : function(enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},

				addUser : function(username, usertype, enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user/' + username, {'username' : username, 'type' : usertype})
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				},

				removeUser : function(userId, enterpriseId) {
					return $http.del(API_URL + '/enterprise/' + enterpriseId + '/user/' + userId)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}
			}
		}
	]);

})();