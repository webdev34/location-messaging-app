(function() {
	'use strict';

	angular.module('reporting.follower-summary', [])
	
	.controller('FollowerSummaryCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		
		function(
			$rootScope,
			$scope,
			$state
		) {
			var followerSummaryCtrl = this;
			
			followerSummaryCtrl.showStartDatePicker = false;
			followerSummaryCtrl.showEndDatePicker = false;
			
			function resetForm() {
				var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

				followerSummaryCtrl.followerSummaryQuery = {
					"startDate": todayProperFormatted,
					"endDate": tomorrowProperFormatted
				};

			}

			
			function clearTakeOverSelectors(){
				followerSummaryCtrl.followerSummaryQuery.showStartDatePicker = false;
				followerSummaryCtrl.followerSummaryQuery.showStartTimePicker = false;
			}
			
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.startDate", clearTakeOverSelectors);
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.endDate", clearTakeOverSelectors);

			resetForm();
		}
	]);

})();