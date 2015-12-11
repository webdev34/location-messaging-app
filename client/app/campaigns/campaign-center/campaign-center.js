(function() {
  'use strict';

  angular.module('campaigns.campaign-center', [])
  .controller('MainCampaignCtrl', [
    'CampaignsService',
    '$scope',
		'$http',
		'MessageListModel',

    function(
      CampaignsService,
      $scope,
			$http,
			MessageListModel
    ) {
      var vm = this;
      console.log('MainCampaignCtrl');

      var vm = this;

      var today = new Date(),
          todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
          todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

      var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
        tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
        tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

      vm.statuses = ["Live", "Draft", "Ended"];
      vm.tagFilters = [];
      vm.campaignTags = [
        { name: "#SanFrancisco", ticked: false },
        { name: "#Barcelona", ticked: false},
        { name: "#Dublin", ticked: false}
      ];

      vm.bulkActionSelected = '';

      $http.get('assets/data/campaigns.json').success(function(data) {
        vm.campaignData = data.campaigns;
        vm.totalItems = data.campaigns.length;
        vm.currentPage = 1;
        vm.entryLimit = 10; // items per page
        vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
        vm.reverse = false;
        vm.sortOrderBy = 'id';
        vm.startAt = 0;
        vm.endAt = 9;
        vm.selectAll = false;
        vm.isAnyInputsSelected = false;

        vm.goToPage = function(direction) {

          if(direction == 'up')
          {
            vm.currentPage++;
          }else if(direction == 'down'){
            vm.currentPage--;
          }
          else if(direction == 'beginning'){
            vm.currentPage = 1;
          }
          else if(direction == 'end'){
            vm.currentPage = vm.noOfPages;
          }

          vm.startAt = (vm.currentPage - 1) * vm.entryLimit;
          vm.endAt = vm.entryLimit * vm.currentPage;

        };

        vm.sortByFunc = function(sortBy, reverse) {
          vm.sortOrderBy = sortBy;
          vm.reverse = reverse;
          vm.currentPage = 1;
          vm.goToPage(1);
        };

        vm.resetCurrentPage = function() {
          vm.currentPage = 1;
        };

        vm.toggleSelected = function() {
          angular.forEach(vm.campaignData, function(campaign) {
              campaign.isSelected = vm.selectAll;
            });
        };

        vm.bulkActions = function() {
          var actionDropDown = document.getElementById("bulk-actions");
          var action = actionDropDown.options[actionDropDown.selectedIndex].value;
          angular.forEach(vm.campaignData, function(campaign, i) {
            if(campaign.isSelected && action != 'Delete'){
              campaign.status = action;
              campaign.isSelected = false;
            }
            else if(campaign.isSelected && action == 'Delete' && vm.selectAll == false){
              vm.campaignData.splice(i, 1);
            }
            else if(action == 'Delete' && vm.selectAll == true){
              vm.campaignData = [];

            }
            });
            vm.selectAll = false;
            vm.bulkActionSelected = '';
        };

        vm.anyInputsSelected = function() {
          vm.isAnyInputsSelected = false;
          vm.selectAll = true;
          angular.forEach(vm.campaignData, function(campaign, i) {
            if(campaign.isSelected){
              vm.isAnyInputsSelected  = true;
            }
            else{
              vm.selectAll = false;
            }
            });
        };


      });



      function paginationValidation(){
        if(vm.currentPage > vm.noOfPages ){
          vm.currentPage = vm.noOfPages
        }
        else if(typeof vm.currentPage === "undefined"){
          vm.currentPage = 1;
        }
      }

      $scope.$watch("currentPage", paginationValidation);

    }
  ])
  ;
})();
