(function() {
  'use strict';

  angular.module('enterprise-portal.models.user', [
  	])
  	.service('UserModel', ['$http',  function($http) {
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
			return $http.get(URLS.FETCH).then(cacheUser);
		};

  	}]);


})();