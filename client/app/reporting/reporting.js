(function() {
	'use strict';

	angular.module('reporting', [
		'enterprise-portal.models.reporting'
	])
	
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('reporting', {
					url: '/reporting',
					templateUrl: 'app/reporting/reporting.tmpl.html',
					controller: 'ReportingCtrl as reportingCtrl'
				});

			$urlRouterProvider.otherwise('messages.dashboard');
		}
	])
	
	.controller('ReportingCtrl', [
		'ReportingModel',
		'FoundationApi',
		
		function(
			ReportingModel,
			FoundationApi
		) {
			var reportingCtrl = this;
		}
	]);

})();