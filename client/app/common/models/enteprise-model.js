(function() {
  'use strict';

  angular.module('enterprise-portal.models.enterprise', [

  	  ])
  	.service('EnterpriseModel', ['$http',  function($http) {
  		var model = this,
  			URLS = {
  				FETCH: 'assets/data/company.json'
  			},
  			company;

		function extract(result) {
			return result.data;
		}

		function cacheCompany(result) {
			company = extract(result);
			return company;
		}

		model.getEnterpriseInfo = function() {
			return $http.get(URLS.FETCH).then(cacheCompany);
		};

  	}]);

})();