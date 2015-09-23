(function() {
	'use strict';

	angular.module('enterprise', [
		'enterprise-portal.models.enterprise',
		'enterprise.profile'
	])
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('enterprise', {
				url: '/enterprise',
				templateUrl: 'app/enterprise/enterprise.tmpl.html',
				abstract: true
			})
		;
		
		$urlRouterProvider.otherwise('enterprise.profile');
	}])
	;

})();