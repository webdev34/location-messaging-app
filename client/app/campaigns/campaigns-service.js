(function() {
  'use strict';
  angular.module('enterprise-portal.services.campaigns', [])

  .factory('CampaignsService', [
    '$http',
    'API_URL',
    'UserModel',

    function(
      $http,
      API_URL,
      UserModel
    ) {
      //console.log('campaign service');
      return {
        get : function() {

        },
        post : function() {

        },
        list : function() {

        },
        remove: function() {

        }
      };
    }
  ])

  ;
})();
