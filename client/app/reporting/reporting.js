(function() {
	'use strict';

	angular.module('reporting', [
		'reporting.follower-summary'
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
				templateUrl: 'app/reporting/center/reporting-center.tmpl.html',
				controller: 'ReportingCtrl as reportingCtrl'
			})
			.state('reporting.follower-summary', {
				url: '/follower-summary',
				templateUrl: 'app/reporting/follower-summary/follower-summary.tmpl.html',
				controller: 'FollowerSummaryCtrl as followerSummaryCtrl'
			})
			;

		$urlRouterProvider.otherwise('reporting.center');
	}]).controller('ReportingCtrl', [
		'$state',
		'$scope',
		'$location',
		
		
		function($state, $scope, $location) {
			var reportingCtrl = this;
			
			$scope.goToReport = function(url) {
				$state.go(url);
			}
			
		}
	]);

})();