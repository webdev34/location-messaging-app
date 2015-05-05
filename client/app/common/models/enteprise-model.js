(function() {
  'use strict';

  angular.module('enterprise-portal.models.enterprise', [

  	  ])
  	.service('EnterpriseModel', [
  		'$http', '$q',  
  		function($http, $q) {
  		
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

  		}]);

})();