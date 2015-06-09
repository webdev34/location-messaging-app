(function() {
	'use strict';

	angular.module('enterprise-portal.models.enterprise', [
		'enterprise-portal.services.enterprise'
	])
		.service('EnterpriseModel', [
			'$http', '$q', 'EnterpriseService',
			function($http, $q, EnterpriseService) {
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
					return (company) ? $q.when(company) : $http.get(URLS.FETCH).then(cacheCompany);
					//return (company) ? $q.when(company) : EnterpriseService.get(/*** This id comes from where? ***/).then(cacheCompany);
				};

				model.updateCompany = function(updatedCompany) {
					company = updatedCompany;
				}

				model.addAdmin = function(newAdmin) {
					company.administrators.push(newAdmin);
				}

				model.addUser = function(newUser) {
					company.users.push(newUser);
				}
			}
		]);

})();