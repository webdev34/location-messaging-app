(function() {
  'use strict';
  angular.module('campaigns', [
    'enterprise-portal.models.campaigns',
    'campaigns.campaign-center',
    'campaigns.edit-campaign'
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
				controller: 'MainCampaignCtrl as campaignCenterCtrl'
			})
      .state('campaigns.new-campaign', {
        url: '/new',
        templateUrl: 'app/campaigns/edit-campaign/edit-campaign.tmpl.html',
        controller: 'ManageCampaignCtrl as manageCampaignCtrl'
      })
      .state('campaigns.edit-campaign', {
        url: '/:_id/edit',
        templateUrl: 'app/campaigns/edit-campaign/edit-campaign.tmpl.html',
        controller: 'ManageCampaignCtrl as manageCampaignCtrl'
      })
			;

		$urlRouterProvider.otherwise('campaigns.campaign-center');
	}])
  ;
})();
