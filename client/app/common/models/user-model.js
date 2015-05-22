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

        model.getAccountInfo = function(userID) {
           return $http.get(API_URL + '/enterprise/' + userID )
            .success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              console.log('success');
              console.log(data);
              // console.log(status);
              // console.log(headers);
              // console.log(config);
            })
            .error(function(data, status, headers, config) {
              console.log('error');
              // console.log(data);
              // console.log(status);
              // console.log(headers);
              // console.log(config);
              // // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
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


          return $http.post(API_URL + '/login', userDetail)
            .success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              console.log('success');
              console.log(data);
              // console.log(status);
              // console.log(headers);
              // console.log(config);
            })
            .error(function(data, status, headers, config) {
              // console.log('error');
              // console.log(data);
              // console.log(status);
              // console.log(headers);
              // console.log(config);
              // // called asynchronously if an error occurs
              // or server returns response with an error status.
            });

        }

    		model.updateUser = function(updatedUser) {
              //console.log('from the model' + updatedUser.username);
              user = updatedUser;
            };

      	}]);


})();