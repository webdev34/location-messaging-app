(function() {
	'use strict';

	angular.module('reporting.follower-summary', [])
	
	.controller('FollowerSummaryCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'FoundationApi',
		
		function(
			$rootScope,
			$scope,
			$state,
			FoundationApi
		) {
			var followerSummaryCtrl = this;

			followerSummaryCtrl.showStartDatePicker = false;
			followerSummaryCtrl.showEndDatePicker = false;
			followerSummaryCtrl.showStartTimePicker = false;
			followerSummaryCtrl.endStartTimePicker = false;
			
			function resetForm() {
				var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

				followerSummaryCtrl.followerSummaryQuery = {
					"startDate": todayProperFormatted,
					"endDate": tomorrowProperFormatted,
					"startTime": "12:01 AM",
					"endTime": "11:59 PM",
				};
				console.log(followerSummaryCtrl)
			

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