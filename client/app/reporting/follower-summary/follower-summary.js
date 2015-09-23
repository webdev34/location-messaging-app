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
				$scope.totalItems = data.followerSummary.length;
				$scope.currentPage = 1;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.reverse = false;
				$scope.sortOrderBy = 'startDate';
				$scope.startAt = 0;
				$scope.endAt = 9;
				$scope.selectAll = false;
				$scope.isAnyInputsSelected = false;

				$scope.goToPage = function(direction) {

					if(direction == 'up')
					{
						$scope.currentPage++;
					}else if(direction == 'down'){
						$scope.currentPage--;
					}
					else if(direction == 'beginning'){
						$scope.currentPage = 1;
					}
					else if(direction == 'end'){
						$scope.currentPage = $scope.noOfPages;
					}

					$scope.startAt = ($scope.currentPage - 1) * $scope.entryLimit;
					$scope.endAt = $scope.entryLimit * $scope.currentPage;

				};

				$scope.sortByFunc = function(sortBy, reverse) {
					$scope.sortOrderBy = sortBy;
					$scope.reverse = reverse;
					$scope.currentPage = 1;
					$scope.goToPage(1);
				};

				$scope.toggleSelected = function() {
					angular.forEach(followerSummaryCtrl.followerSummaryData, function(followerSummary) {
				      followerSummary.isSelected = $scope.selectAll;
				    });
				};

				$scope.anyInputsSelected = function() {
					$scope.isAnyInputsSelected = false;
					$scope.selectAll = true;
					angular.forEach(followerSummaryCtrl.followerSummaryData, function(campaign, i) {
						if(campaign.isSelected){
							$scope.isAnyInputsSelected  = true;
						}
						else{
							$scope.selectAll = false;
						}
				    });
				};

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

			function paginationValidation(){
				if($scope.currentPage > $scope.noOfPages ){
					$scope.currentPage = $scope.noOfPages
				}
				else if(typeof $scope.currentPage === "undefined"){
					$scope.currentPage = 1;
				}
			}
			
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.startDate", clearTakeOverSelectors);
			$scope.$watch("followerSummaryCtrl.followerSummaryQuery.endDate", clearTakeOverSelectors);
			$scope.$watch("currentPage", paginationValidation);

			resetForm();
		}
	]);

})();