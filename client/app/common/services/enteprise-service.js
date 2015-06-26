(function() {
	'use strict';

	angular.module('enterprise-portal.services.enterprise', [])
	
	.factory('httpRequestInterceptor', [
		'$q',
		'$rootScope',
	
		function (
			$q,
			$rootScope
		) {
			return {
				'request': function(config) {
					config.headers['Authorization'] = $rootScope.auth;
					return config;
				},

				'response': function(response) {
					return response;
				},

				'responseError': function(rejection) {
					return $q.reject(rejection);
				}
			};
		}
	])
	
	.config(['$httpProvider', function($httpProvider) {  
		$httpProvider.interceptors.push('httpRequestInterceptor');
	}])
	
	.factory('EnterpriseService', [
		'$http',
		'$q',
		'API_URL',
		
		function(
			$http,
			$q,
			API_URL
		) {
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