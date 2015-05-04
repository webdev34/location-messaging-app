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

    model.loginMock = function() {
      console.log('loginMock start');

      var body = { 
          'username': 'ninjacheez',
          'password': 'secret',
          'device': {
              '_id': '<hex key>',
              'type': 'ios'
          }
      }

      $http.get('http://private-af2d8-qvr.apiary-mock.com/me')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available

        console.log('success' + data);
      })
      .error(function(data, status, headers, config) {
        console.log('error');

        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      console.log('loginMock end');
    }

		model.updateUser = function(updatedUser) {
          //console.log('from the model' + updatedUser.username);
          user = updatedUser;
        };

  	}]);


})();