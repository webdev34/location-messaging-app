(function() {
	'use strict';

	angular.module('enterprise-portal.services.enterprise', [])
	
	.factory('EnterpriseService', [
		'$http',
		'$q',
		'API_URL',
		
		function($http, $q, API_URL) {
			function extractData(response) {
				//return response.data.data;
				return response.data;
			}
			
			function extractError(response) {
				return response.data;
			}
			
			function validate(result){
				//return typeof result.data.data === 'object';
				return true;
			}

			return {
				add : function(enterpriseObj) {
					return $http.post(API_URL + '/enterprise', {'enterprise' : enterpriseObj})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				get : function(enterpriseId) {
					return $http.get(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				update : function(enterpriseId, enterpriseObj) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user', {'enterprise' : enterpriseObj})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				remove : function(enterpriseId) {
					return $http.del(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},
				
				getUserList : function(enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user')
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				addUser : function(username, usertype, enterpriseId) {
					return $http.post(API_URL + '/enterprise/' + enterpriseId + '/user/' + username, {'username' : username, 'type' : usertype})
						.then(
							function(response) {
								return validate(response) ? extractData(response) : $q.reject(extractError(response));
							},
							function(response) {
								return $q.reject(extractError(response));
							}
						);
				},

				removeUser : function(userId, enterpriseId) {
					return $http.del(API_URL + '/enterprise/' + enterpriseId + '/user/' + userId)
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