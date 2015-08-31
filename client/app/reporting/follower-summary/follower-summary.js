(function() {
	'use strict';

	angular.module('reporting.follower-summary', [])
	
	.controller('FollowerSummaryCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		'FoundationApi',
		
		function(
			$rootScope,
			$scope,
			$state,
			$http,
			FoundationApi
		) {
			var followerSummaryCtrl = this;

			followerSummaryCtrl.showStartDatePicker = false;
			followerSummaryCtrl.showEndDatePicker = false;

			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
				tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
				tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

			$http.get('assets/data/follower-summary.json').success(function(data) {
				followerSummaryCtrl.followerSummaryData = data.followerSummary;	
			});
			
			function resetForm() {
				
				followerSummaryCtrl.followerSummaryQuery = {
					"startDate": todayProperFormatted,
					"endDate": tomorrowProperFormatted,
					"startTime": "12:01 AM",
					"endTime": "12:01 AM"
				};
			}

			
			function clearTakeOverSelectors(){
				followerSummaryCtrl.showStartDatePicker = false;
				followerSummaryCtrl.showEndDatePicker = false;
			}
			
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.startDate", clearTakeOverSelectors);
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.endDate", clearTakeOverSelectors);

			resetForm();
		}
	]);

})();