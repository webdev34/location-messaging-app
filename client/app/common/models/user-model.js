(function() {
  'use strict';

  angular.module('enterprise-portal.models.user', [
  	])
  	.service('UserModel', ['$http', '$q',  function($http, $q) {
  		var model = this,
  			URLS = {
          APIURL: 'http://ec2-52-24-89-10.us-west-2.compute.amazonaws.com:8000/web-1.1',
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
      
      console.log(userDetail);
      
      $http.post(URLS.APIURL+'/register', userDetail)
        .success(function(data, status, headers, config) {
         // this callback will be called asynchronously
         // when the response is available

          console.log('success' + data);
        })
        .error(function(data, status, headers, config) {
          console.log('error' + data);

        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    };

    model.login = function(userDetail) {
      console.log('model login start');
      console.log(userDetail);

      $http.post(URLS.APIURL + '/login', userDetail)
        .success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('success');
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        })
        .error(function(data, status, headers, config) {
          console.log('error');
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

        console.log('login end');
    }

		model.updateUser = function(updatedUser) {
          //console.log('from the model' + updatedUser.username);
          user = updatedUser;
        };

  	}]);


})();