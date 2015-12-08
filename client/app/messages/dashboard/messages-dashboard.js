(function() {
	'use strict';

	angular.module('messages.dashboard', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
	.controller('CampaignCenterCtrl', [
		'$scope',
		'$http',
		'MessageListModel',

		function(
			$scope,
			$http,
			MessageListModel
		) {

			var campaignCenterCtrl = this;

			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
				tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
				tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

			campaignCenterCtrl.statuses = ["Live", "Draft", "Ended"];
			campaignCenterCtrl.tagFilters = [];
			campaignCenterCtrl.campaignTags = [
				{ name: "#SanFrancisco", ticked: false },
				{ name: "#Barcelona", ticked: false},
				{ name: "#Dublin", ticked: false}
			];

			campaignCenterCtrl.bulkActionSelected = '';

			$http.get('assets/data/campaigns.json').success(function(data) {
				campaignCenterCtrl.campaignData = data.campaigns;
				campaignCenterCtrl.totalItems = data.campaigns.length;
				campaignCenterCtrl.currentPage = 1;
				campaignCenterCtrl.entryLimit = 10; // items per page
				campaignCenterCtrl.noOfPages = Math.ceil(campaignCenterCtrl.totalItems / campaignCenterCtrl.entryLimit);
				campaignCenterCtrl.reverse = false;
				campaignCenterCtrl.sortOrderBy = 'id';
				campaignCenterCtrl.startAt = 0;
				campaignCenterCtrl.endAt = 9;
				campaignCenterCtrl.selectAll = false;
				campaignCenterCtrl.isAnyInputsSelected = false;

				campaignCenterCtrl.goToPage = function(direction) {

					if(direction == 'up')
					{
						campaignCenterCtrl.currentPage++;
					}else if(direction == 'down'){
						campaignCenterCtrl.currentPage--;
					}
					else if(direction == 'beginning'){
						campaignCenterCtrl.currentPage = 1;
					}
					else if(direction == 'end'){
						campaignCenterCtrl.currentPage = campaignCenterCtrl.noOfPages;
					}

					campaignCenterCtrl.startAt = (campaignCenterCtrl.currentPage - 1) * campaignCenterCtrl.entryLimit;
					campaignCenterCtrl.endAt = campaignCenterCtrl.entryLimit * campaignCenterCtrl.currentPage;

				};

				campaignCenterCtrl.sortByFunc = function(sortBy, reverse) {
					campaignCenterCtrl.sortOrderBy = sortBy;
					campaignCenterCtrl.reverse = reverse;
					campaignCenterCtrl.currentPage = 1;
					campaignCenterCtrl.goToPage(1);
				};

				campaignCenterCtrl.resetCurrentPage = function() {
					campaignCenterCtrl.currentPage = 1;
				};

				campaignCenterCtrl.toggleSelected = function() {
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign) {
				      campaign.isSelected = campaignCenterCtrl.selectAll;
				    });
				};

				campaignCenterCtrl.bulkActions = function() {
					var actionDropDown = document.getElementById("bulk-actions");
					var action = actionDropDown.options[actionDropDown.selectedIndex].value;
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign, i) {
						if(campaign.isSelected && action != 'Delete'){
							campaign.status = action;
							campaign.isSelected = false;
						}
						else if(campaign.isSelected && action == 'Delete' && campaignCenterCtrl.selectAll == false){
							campaignCenterCtrl.campaignData.splice(i, 1);
						}
						else if(action == 'Delete' && campaignCenterCtrl.selectAll == true){
							campaignCenterCtrl.campaignData = [];

						}
				    });
				    campaignCenterCtrl.selectAll = false;
				    campaignCenterCtrl.bulkActionSelected = '';
				};

				campaignCenterCtrl.anyInputsSelected = function() {
					campaignCenterCtrl.isAnyInputsSelected = false;
					campaignCenterCtrl.selectAll = true;
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign, i) {
						if(campaign.isSelected){
							campaignCenterCtrl.isAnyInputsSelected  = true;
						}
						else{
							campaignCenterCtrl.selectAll = false;
						}
				    });
				};


			});



			function paginationValidation(){
				if(campaignCenterCtrl.currentPage > campaignCenterCtrl.noOfPages ){
					campaignCenterCtrl.currentPage = campaignCenterCtrl.noOfPages
				}
				else if(typeof campaignCenterCtrl.currentPage === "undefined"){
					campaignCenterCtrl.currentPage = 1;
				}
			}

			$scope.$watch("currentPage", paginationValidation);


					//console.log("Active Messages");
			// MessageListModel.getMessageList().then(
			// 	function(response){
			// 		console.log("------>", response);
			// 		$scope.active = response;
			// 	}
			// );


		}
	])

	/*
	.controller('LiveFeedController', ['$scope', '$http', function($scope, $http) {
		$http.get('assets/data/live-feed.json').
		success(function(data) {
			$scope.feed = data;
		});
	}]);
	*/
})();
