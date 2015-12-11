(function() {
  'use strict';
  angular.module('campaigns', [
    'enterprise-portal.models.campaigns'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('campaigns', {
				url: '/campaigns',
				templateUrl: 'app/campaigns/campaigns.tmpl.html',
				abstract: true
			})
			.state('campaigns.campaign-center', {
				url: '/',
				templateUrl: 'app/campaigns/campaign-center/campaign-center.tmpl.html',
				controller: 'CampaignCenterCtrl as campaignCenterCtrl'
			})
			;

		$urlRouterProvider.otherwise('campaigns.campaign-center');
	}])
  ;
})();
