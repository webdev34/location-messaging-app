(function() {
  'use strict';

  angular.module('enterprise-portal.models.messages', [
  ])
  	.service('MessageDetailModel', ['$http', '$q',  function($http, $q) {
  		var model = this,
  			URLS = {
  				FETCH: 'assets/data/message-detail.json'
  			},
  			message,
        currentMessage;

		function extract(result) {
			return result.data;
		}

		function cacheMessage(result) {
			message = extract(result);
			return message;
		}

    model.setCurrentMessage = function() {

    }

		model.getMessageDetail = function() {
			return (message) ? $q.when(message) : $http.get(URLS.FETCH).then(cacheMessage);
		}

  	}]);
  	
})();