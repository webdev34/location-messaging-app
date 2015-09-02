(function() {
	'use strict';

	angular.module('messages.manage-campaign', [])
	
	.controller('ManageCampaignCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		'FoundationApi',
		'MessageListModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			$http,
			FoundationApi,
			MessageListModel
		) {
			var manageCampaignCtrl = this;
			
			manageCampaignCtrl.showStartDatePicker = false;
			manageCampaignCtrl.showEndDatePicker = false;
			manageCampaignCtrl.showStartTimePicker = false;
			manageCampaignCtrl.endStartTimePicker = false;


			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();
				
			manageCampaignCtrl.manageCampaign = {
				"campaignID": "00131",
				"campaignName": "Drive A Dream - Vancouver BC",
				"campaignParticipants": ["group 1", "group 2", "group 3" ],
				"campaignDescription": "Tesla's Drive A Dream in Vancouver BC will be target- ing the true auto enthusiast having a passion for performance and luxury. The campaign will be physi- cally centered around our two locations. The Quiver campaign will be run simultaneously with a local television campaign spanning the campaign period.",
				"marketingAssets": ["asset 1", "asset 2", "asset 3" ],
				"campaignsTags": ["tag 1", "tag 2", "tag 3"],
				"status": "Draft",
				"startDate": todayProperFormatted,
				"startTime": "12:01 AM",
				"endDate": tomorrowProperFormatted,
				"endTime": "11:59 PM",
				"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
				"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime()
			};

			manageCampaignCtrl.statuses = ["Live", "Draft"]; 

			$http.get('assets/data/campaign-messages.json').success(function(data) {
				manageCampaignCtrl.campaignMessages = data.campaignMessages;	
				$scope.totalItems = data.campaignMessages.length;
				$scope.currentPage = 1;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.reverse = false;
				$scope.sortOrderBy = 'id';

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
				};

				$scope.sortByFunc = function(sortBy, reverse) {
					$scope.sortOrderBy = sortBy;
					$scope.reverse = reverse;
					$scope.currentPage = 1;
				};
			});
			



			function resetForm() {
				manageCampaignCtrl.manageCampaign = {
					"campaignID": "",
					"campaignName": "",
					"campaignParticipants": [],
					"campaignDescription": "",
					"marketingAssets": [],
					"campaignsTags": [],
					"status": "Draft",
					"startDate": todayProperFormatted,
					"startTime": "12:01 AM",
					"endDate": tomorrowProperFormatted,
					"endTime": "11:59 PM",
					"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
					"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime()
				};
			}

			function paginationValidation(){
				if($scope.currentPage > $scope.noOfPages ){
					$scope.currentPage = $scope.noOfPages
				}
				else if(typeof $scope.currentPage === "undefined"){
					$scope.currentPage = 1;
				}
			}
			
			manageCampaignCtrl.updateCampaign = function() {
				// MessageListModel.createNewMessage(newMessageCtrl.newMessage).then(
				// 	function success(response){
				// 		$state.go('messages.dashboard');
						
				// 		FoundationApi.publish('main-notifications', {
				// 			title: 'Message Sent',
				// 			content: '',
				// 			color: 'success',
				// 			autoclose: '3000'
				// 		});
				// 	},
				// 	function error(response) {
				// 		FoundationApi.publish('main-notifications', {
				// 			title: 'Message Was Not Sent',
				// 			content: response.code,
				// 			color: 'fail',
				// 			autoclose: '3000'
				// 		});
				// 	}
				// );
			}

			
			function clearTakeOverSelectors(){
				manageCampaignCtrl.showStartDatePicker = false;
				manageCampaignCtrl.showEndDatePicker = false;
				manageCampaignCtrl.showStartTimePicker = false;
				manageCampaignCtrl.showEndTimePicker = false;
			}
			
			$scope.$watch("manageCampaignCtrl.manageCampaign.startDate", clearTakeOverSelectors);
			$scope.$watch("manageCampaignCtrl.manageCampaign.endDate", clearTakeOverSelectors);
			$scope.$watch("manageCampaignCtrl.manageCampaign.startTime", clearTakeOverSelectors);
			$scope.$watch("manageCampaignCtrl.manageCampaign.endTime", clearTakeOverSelectors);
			$scope.$watch("currentPage", paginationValidation);
			
			//resetForm();
		}
	]);

})();