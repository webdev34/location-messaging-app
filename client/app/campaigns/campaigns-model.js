(function() {
  'use strict';
  angular.module('enterprise-portal.models.campaigns', [
    'enterprise-portal.services.campaigns'
  ])
  .service('CampaignsModel', [
    'CampaignsService',
    'UserModel',

    function(
      CampaignsService,
      UserModel
    ) {
      var model = this;

      model.campaignStatusList = ["Draft", "Live", "Ended"];

      model.getCampaignList = function() {
          return CampaignsService.list().then(
            function success(response) {
              console.log('campaign list(model):');
              console.log(response);

              var formattedResponse = response;

              angular.forEach(response.campaign, function(campaign) {
                console.log(campaign.status);
                campaign.status = model.campaignStatusList[campaign.status];
                console.log(campaign.status);
              });

              return formattedResponse;
            },
            function error() {
              alert('Campaign List failed to load');
            }
          );
      }

      model.getCampaign = function (campaignSID) {
        return CampaignsService.get(campaignSID).then(
          function success(response) {
            console.log('campaign loaded(model):');
            console.log(response);
            return response;
          },
          function error() {
            alert('Campaign failed to load');
          }
        )
      };

      model.createCampaign = function (campaignObj) {
        var enterpriseSID = UserModel.enterprise;
        var formattedCampaign = campaignObj;

        formattedCampaign.campaign.enterprise = enterpriseSID;

        return CampaignsService.post(formattedCampaign).then(
          function success(response) {
            console.log('campaign create(model):');
            console.log(response);
            return response;
          },
          function error() {
            alert('Campaign creation failed.');
          }
        )
      };

      model.updateCampaign = function (campaignObj) {
        //campaignObj should have .sid
        return CampaignsService.post(campaignObj).then(
          function success(response) {
            console.log('campaign create(model):');
            console.log(response);
            return response;
          },
          function error() {
            alert('Campaign creation failed.');
          }
        )
      };

      model.deleteCampaign = function (campaignSID) {
        return CampaignsService.delete(campaignSID).then(
          function success(response) {
            console.log('campaign deleted(model):');
            console.log(response);
            return response;
          },
          function error() {
            alert('Campaign deletion failed');
          }
        )
      };

    }
  ])
  ;
})();
