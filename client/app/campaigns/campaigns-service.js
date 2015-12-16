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
      var enterpriseSID = UserModel.enterprise;

      return {
        get : function(campaignSID) {
          return $http.get(API_URL + '/campaign/' + campaignSID);
        },
        post : function(campaignObj) {
          campaignObj.campaign.enterprise = enterpriseSID;

          return $http.post(API_URL + '/campaign', campaignObj);
        },
        list : function() {
          return $http.get(API_URL + '/campaign/' + enterpriseSID + '/campaigns');
        },
        delete: function(campaignSID) {
          return $http["delete"](API_URL + '/campaign/' + campaignSID);
        }
      };
    }
  ])

  ;
})();
