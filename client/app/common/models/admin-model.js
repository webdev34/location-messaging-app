(function() {
'use strict';

	angular.module('enterprise-portal.models.admin', [])
	
	.service('AdminModel', ['$http',  function($http) {
		var model = this,
			URLS = {
				FETCH: 'assets/data/admin.json'
			},
			adminData;

		function extract(result) {
			return result.data;
		}

		function cacheAdminData(result) {
			adminData = extract(result);
			//console.log(adminData);
			return adminData;
		}

		model.getAdminData = function() {
			// return $http.get(URLS.FETCH).then(cacheAdminData);
			return (adminData) ? $q.when(adminData) : $http.get(URLS.FETCH).then(cacheAdminData);

		};

		model.addEnterprise = function(newEnterprise) {
			adminData.enterprise.push(newEnterprise);

		}
	}]);

})();