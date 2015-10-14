(function() {
	'use strict';

	angular.module('reporting.campaign-summary', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
	.controller('CampaignSummaryCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		
		function(
			$rootScope,
			$scope,
			$state,
			$http
		) {
			var campaignSummaryCtrl = this;
			campaignSummaryCtrl.currentView = 'Campaign';
			campaignSummaryCtrl.currentMessageName = '';

			$http.get('assets/data/campaign-summary.json').success(function(data) {
				campaignSummaryCtrl.campaignSummaryData = data.campaignSummary;
				campaignSummaryCtrl.totalItems = data.campaignSummary.length;
				campaignSummaryCtrl.currentPage = 1;
				campaignSummaryCtrl.entryLimit = 10; // items per page
				campaignSummaryCtrl.noOfPages = Math.ceil(campaignSummaryCtrl.totalItems / campaignSummaryCtrl.entryLimit);
				campaignSummaryCtrl.reverse = false;
				campaignSummaryCtrl.sortOrderBy = 'id';
				campaignSummaryCtrl.startAt = 0;
				campaignSummaryCtrl.endAt = 9;
			});

			$http.get('assets/data/campaign-messages-summary.json').success(function(data) {
				console.log(data);
				campaignSummaryCtrl.campaignMessagesSummaryData = data;
			});

			campaignSummaryCtrl.goToPage = function(direction) {

				if(direction == 'up')
				{
					campaignSummaryCtrl.currentPage++;
				}else if(direction == 'down'){
					campaignSummaryCtrl.currentPage--;
				}
				else if(direction == 'beginning'){
					campaignSummaryCtrl.currentPage = 1;
				}
				else if(direction == 'end'){
					campaignSummaryCtrl.currentPage = campaignSummaryCtrl.noOfPages;
				}

				campaignSummaryCtrl.startAt = (campaignSummaryCtrl.currentPage - 1) * campaignSummaryCtrl.entryLimit;
				campaignSummaryCtrl.endAt = campaignSummaryCtrl.entryLimit * campaignSummaryCtrl.currentPage;
			};

			campaignSummaryCtrl.sortByFunc = function(sortBy, reverse) {
				campaignSummaryCtrl.sortOrderBy = sortBy;
				campaignSummaryCtrl.reverse = reverse;
				campaignSummaryCtrl.currentPage = 1;
				campaignSummaryCtrl.goToPage(1);
			};

			campaignSummaryCtrl.changeCurrentView = function(view, obj) {
				campaignSummaryCtrl.currentView = view;
				campaignSummaryCtrl.resetCurrentPage();
				if(view == 'Messages'){
				   campaignSummaryCtrl.currentMessageNameView = obj.campaign;
			       campaignSummaryCtrl.currentMessageObj = campaignSummaryCtrl.campaignMessagesSummaryData[campaignSummaryCtrl.currentMessageNameView];
				}
			};

			campaignSummaryCtrl.resetCurrentPage = function() {
                campaignSummaryCtrl.currentPage = 1;
                campaignSummaryCtrl.startAt = 0;
				campaignSummaryCtrl.endAt = 9;
            };

            campaignSummaryCtrl.clearSearchField = function() {
                campaignSummaryCtrl.search = '';
            };
			
			function paginationValidation(){
				if(campaignSummaryCtrl.currentPage > campaignSummaryCtrl.noOfPages ){
					campaignSummaryCtrl.currentPage = campaignSummaryCtrl.noOfPages;
				}
				else if(typeof campaignSummaryCtrl.currentPage === "undefined"){
					campaignSummaryCtrl.currentPage = 1;
				}
			}

			$scope.$watch("campaignSummaryCtrl.currentPage", paginationValidation);
		}
	]);

})();