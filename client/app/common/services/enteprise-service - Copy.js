(function() {
	'use strict';

	angular.module('enterprise-portal.services.enterprise', [])
		.service('EnterpriseService', [
			'$http', '$q', 'API_URL',
			function($http, $q) {
				var serv = this;

				function extract(result) {
					return result.data;
				}
				
				function validate(result){
					return typeof response.data.data === 'object';
				}

				serv.createEnterprise = function(enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user', enterprise)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				serv.getEnterprise = function(enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user', enterprise)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				serv.updateEnterprise = function(enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user', enterprise)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				serv.deleteEnterprise = function(enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user', enterprise)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				
				serv.getUserList = function(enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user', enterprise)
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				serv.addUser = function(user, enterprise) {
					return $http.post(API_URL + '/enterprise/:enterprise/user/:user', {"user" : user, "" : enterprise})
						.then(
							function(response) {
								return validate(response) ? extract(response) : $q.reject(response);
							},
							function(response) {
								return $q.reject(response);
							}
						);
				}

				serv.removeUser = function(userDetail) {
					return $http.del(API_URL + '/enterprise/:enterprise/user/:user', {"user" : user, "" : enterprise})
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
		]);

})();