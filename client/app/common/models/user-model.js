(function() {
  'use strict';

  angular.module('enterprise-portal.models.user', [
  	])
  	.service('UserModel', ['$http', '$q',  function($http, $q) {
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

		model.updateUser = function(updatedUser) {
          //console.log('from the model' + updatedUser.username);
          user = updatedUser;
        };

  	}]);


})();