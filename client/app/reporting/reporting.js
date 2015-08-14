(function() {
	'use strict';

	angular.module('reporting', [

	])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('reporting', {
				url: '/reporting',
				templateUrl: 'app/reporting/reporting.tmpl.html',
				abstract: true
			})
			.state('reporting.center', {
				url: '/',
				templateUrl: 'app/reporting/center/reporting-center.tmpl.html'
			})
			.state('reporting.follower-summary', {
				url: '/follower-summary',
				templateUrl: 'app/reporting/follower-summary/follower-summary.tmpl.html'
			})
			;

		$urlRouterProvider.otherwise('reporting.center');
	}])
	;

})();