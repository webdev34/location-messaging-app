(function() {
  'use strict';

  angular.module('campaigns.campaign-center', [])
  .controller('CampaignCenterCtrl', [
    'CampaignsService',
    function(
      CampaignsService
    ) {
      var vm = this;
      console.log('CampaignCenterCtrl');
    }
  ])
  ;
})();
