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

			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
				tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
				tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();


			followerSummaryCtrl.followerSummaryData = [{
					"startDate": todayProperFormatted,
					"startNumber": 307.6,
					"new": 4320,
					"losted": 65,
					"returned": 190,
					"total": '312.0 k',
					"margin": '+.014%'
				},{
					"startDate": todayProperFormatted,
					"startNumber": 107.6,
					"new": 420,
					"losted": 5,
					"returned": 19,
					"total": '912.0 k',
					"margin": '+.25%'
				},{
					"startDate": todayProperFormatted,
					"startNumber": 307.6,
					"new": 4320,
					"losted": 65,
					"returned": 190,
					"total": '312.0 k',
					"margin": '+.014%'
				},{
					"startDate": todayProperFormatted,
					"startNumber": 307.6,
					"new": 4320,
					"losted": 65,
					"returned": 190,
					"total": '312.0 k',
					"margin": '+.014%'
				}];
			
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