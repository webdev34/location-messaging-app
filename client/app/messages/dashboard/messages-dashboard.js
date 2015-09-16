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
			
			$http.get('assets/data/campaigns.json').success(function(data) {
				campaignCenterCtrl.campaignData = data.campaigns;
				$scope.totalItems = data.campaigns.length;
				$scope.currentPage = 1;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.reverse = false;
				$scope.sortOrderBy = 'id';
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

				$scope.resetCurrentPage = function() {
					$scope.currentPage = 1;
				};

				$scope.toggleSelected = function() {
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign) {
				      campaign.isSelected = $scope.selectAll;
				    });
				};

				$scope.bulkActions = function() {
					var actionDropDown = document.getElementById("bulk-actions");
					var action = actionDropDown.options[actionDropDown.selectedIndex].value;
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign, i) {
						if(campaign.isSelected && action != 'Delete'){
							campaign.status = action;
							campaign.isSelected = false;
						}
						else if(campaign.isSelected && action == 'Delete' && $scope.selectAll == false){
							campaignCenterCtrl.campaignData.splice(i, 1);   
						}
						else if(action == 'Delete' && $scope.selectAll == true){
							campaignCenterCtrl.campaignData = [];  
							
						}
				    });
				    $scope.selectAll = false;
				};

				$scope.anyInputsSelected = function() {
					$scope.isAnyInputsSelected = false;
					$scope.selectAll = true;
					angular.forEach(campaignCenterCtrl.campaignData, function(campaign, i) {
						if(campaign.isSelected){
							$scope.isAnyInputsSelected  = true;
						}
						else{
							$scope.selectAll = false;
						}
				    });
				};


			});
			


			function paginationValidation(){
				if($scope.currentPage > $scope.noOfPages ){
					$scope.currentPage = $scope.noOfPages
				}
				else if(typeof $scope.currentPage === "undefined"){
					$scope.currentPage = 1;
				}
			}

			$scope.$watch("currentPage", paginationValidation);
			

					console.log("Active Messages");
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