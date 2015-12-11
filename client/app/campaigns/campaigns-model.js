(function() {
  'use strict';
  angular.module('enterprise-portal.models.campaigns', [
    'enterprise-portal.services.campaigns'
  ])
  .service('CampaignsModel', [
    'CampaignsService',

    function(
      CampaignsService
    ) {
      var model = this;
      console.log('Campaigns Model');
    }
  ])
  ;
})();
