(function() {
  'use strict';
  angular.module('enterprise-portal.services.campaigns', [])

  .factory('CampaignsService', [
    '$http',
    'API_URL',

    function(
      $http,
      API_URL
    ) {
      console.log('campaign service');
      return {

      };
    }
  ])

  ;
})();
