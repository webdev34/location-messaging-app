(function() {
	'use strict';

	angular.module('reporting.follower-summary', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
	.controller('FollowerSummaryCtrl', [
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
			
			var followerSummaryCtrl = this;
			followerSummaryCtrl.currentView = 'Yearly';

			$http.get('assets/data/follower-summary.json').success(function(data) {
				followerSummaryCtrl.followerSummaryData = data.followerSummary;
				followerSummaryCtrl.totalItems = data.followerSummary.length;
				followerSummaryCtrl.currentPage = 1;
				followerSummaryCtrl.entryLimit = 10; // items per page
				followerSummaryCtrl.noOfPages = Math.ceil(followerSummaryCtrl.totalItems / followerSummaryCtrl.entryLimit);
				followerSummaryCtrl.reverse = false;
				followerSummaryCtrl.sortOrderBy = 'id';
				followerSummaryCtrl.startAt = 0;
				followerSummaryCtrl.endAt = 9;
			});

			$http.get('assets/data/follower-monthly-summary.json').success(function(data) {
				followerSummaryCtrl.followerMonthlySummaryData = data.followerMonthlySummary.reverse();
			});

			$http.get('assets/data/follower-daily-summary.json').success(function(data) {
				followerSummaryCtrl.followerDailySummaryData = data;
			});

			followerSummaryCtrl.goToPage = function(direction) {

				if(direction == 'up')
				{
					followerSummaryCtrl.currentPage++;
				}else if(direction == 'down'){
					followerSummaryCtrl.currentPage--;
				}
				else if(direction == 'beginning'){
					followerSummaryCtrl.currentPage = 1;
				}
				else if(direction == 'end'){
					followerSummaryCtrl.currentPage = followerSummaryCtrl.noOfPages;
				}

				followerSummaryCtrl.startAt = (followerSummaryCtrl.currentPage - 1) * followerSummaryCtrl.entryLimit;
				followerSummaryCtrl.endAt = followerSummaryCtrl.entryLimit * followerSummaryCtrl.currentPage;
			};

			followerSummaryCtrl.sortByFunc = function(sortBy, reverse) {
				followerSummaryCtrl.sortOrderBy = sortBy;
				followerSummaryCtrl.reverse = reverse;
				followerSummaryCtrl.currentPage = 1;
				followerSummaryCtrl.goToPage(1);
			};


			followerSummaryCtrl.changeCurrentView = function(view, obj) {
				followerSummaryCtrl.currentView = view;
				followerSummaryCtrl.resetCurrentPage();
				if(view == 'Daily'){
				   followerSummaryCtrl.currentMonthView = obj.period;
			       followerSummaryCtrl.currentDailyObj = followerSummaryCtrl.followerDailySummaryData[followerSummaryCtrl.currentMonthView];
				}
				else if(view == 'Monthly'){
					if(obj){
						followerSummaryCtrl.currentYearView = obj.period;	
					}
					followerSummaryCtrl.currentMonthObj = followerSummaryCtrl.followerMonthlySummaryData;
				}
			};

			followerSummaryCtrl.resetCurrentPage = function() {
                followerSummaryCtrl.currentPage = 1;
                followerSummaryCtrl.startAt = 0;
				followerSummaryCtrl.endAt = 9;
            };

            followerSummaryCtrl.clearSearchField = function() {
                followerSummaryCtrl.search = '';
            };
			
			function paginationValidation(){
				if(followerSummaryCtrl.currentPage > followerSummaryCtrl.noOfPages ){
					followerSummaryCtrl.currentPage = followerSummaryCtrl.noOfPages;
				}
				else if(typeof followerSummaryCtrl.currentPage === "undefined"){
					followerSummaryCtrl.currentPage = 1;
				}
			}

			$scope.$watch("followerSummaryCtrl.currentPage", paginationValidation);
		}
	]);

})();