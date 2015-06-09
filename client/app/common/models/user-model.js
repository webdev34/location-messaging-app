(function() {
	'use strict';

	angular.module('enterprise-portal.models.user', [])
		.service('UserModel', [
			'$http', '$q', 'API_URL',
			function($http, $q, API_URL) {
				var model = this,
					URLS = {
						FETCH: 'assets/data/user.json'
					},
					user;

				function extract(result) {
					return result.data;
				}

				function cacheUser(result) {
					user = extract(result);
					return user;
				}

				model.getUserDetail = function() {
					return (user) ? $q.when(user) : $http.get(URLS.FETCH).then(cacheUser);
				};

				model.registerUser = function(userDetail) {
					//console.log(userDetail);
					$http.post(URLS.APIURL + '/register', userDetail)
						.success(function(data, status, headers, config) {
							console.log('success' + data);
						})
						.error(function(data, status, headers, config) {
							console.log('error' + data);
						});
				};

				model.login = function(userDetail) {
					return $http.post(API_URL + '/session', {'user' : userDetail})
						.then(
							function(response) {
								if (typeof response.data.data === 'object') {
									return response;
								} else {
									// invalid response
									return $q.reject(response);
								}
							},
							function(response) {
								// something went wrong
								return $q.reject(response);
							}
						);
				}

				model.updateUser = function(updatedUser) {
					//console.log('from the model' + updatedUser.username);
					user = updatedUser;
				};

			}
		]);

})();