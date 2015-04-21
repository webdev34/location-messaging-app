(function() {
  'use strict';

  angular.module('enterprise-portal.models.messages', [
  ])
  	.service('MessageDetailModel', ['$http',  function($http) {
  		var model = this,
  			URLS = {
  				FETCH: 'assets/data/message-detail.json'
  			},
  			message;

		function extract(result) {
			return result.data;
		}

		function cacheMessage(result) {
			message = extract(result);
			return message;
		}

		model.getMessageDetail = function() {
			return $http.get(URLS.FETCH).then(cacheMessage);
		};

  	}]);
  	
})();