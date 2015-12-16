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

      /*
      API Configuration:

      QvrCampaign.DRAFT   = 0;
      QvrCampaign.LIVE    = 1;
      QvrCampaign.ENDED   = 2;
      */
      model.createCampaignStatusList =  ["Draft", "Live"];
      model.campaignStatusList =        ["Draft", "Live", "Ended"];

      model.getCampaignList = function() {
          return CampaignsService.list().then(
            function success(response) {
              //console.log('campaign list(model):');
              //console.log(response);

              var formattedResponse = response;

              angular.forEach(response.campaign, function(campaign) {
                //console.log(campaign.status);
                campaign.status = model.campaignStatusList[campaign.status];
                //console.log(campaign.status);
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

            //formatting for timestamps
            var formattedCampaign = response.campaign;
            formattedCampaign.status = model.campaignStatusList[formattedCampaign.status];

            return formattedCampaign;
          },
          function error() {
            alert('Campaign failed to load');
          }
        )
      };

      function processCampaign(campaignObj) {

        var formattedCampaign = {}

        formattedCampaign.campaign = {
          "name": campaignObj.name,
  				"description": campaignObj.description,
  				"status": model.createCampaignStatusList.indexOf(campaignObj.status, 0),
          "startTime": new Date(campaignObj.startDate + " " + campaignObj.startTime).getTime(),
          "endTime": new Date(campaignObj.endDate + " " + campaignObj.endTime).getTime(),
        };

        return formattedCampaign;

      }

      model.createCampaign = function (campaignObj) {
        var formattedCampaign = processCampaign(campaignObj);

        return CampaignsService.post(formattedCampaign).then(
          function success(response) {
            //console.log('campaign create(model):');
            //console.log(response);
            return response;
          },
          function error() {
            alert('Campaign creation failed.');
          }
        )
      };

      model.updateCampaign = function (campaignObj) {
        var formattedCampaign = processCampaign(campaignObj);
        formattedCampaign.campaign.sid = campaignObj.sid;

        return CampaignsService.post(formattedCampaign).then(
          function success(response) {
            //console.log('campaign create(model):');
            //console.log(response);
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
            //console.log('campaign deleted(model):');
            //console.log(response);
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
