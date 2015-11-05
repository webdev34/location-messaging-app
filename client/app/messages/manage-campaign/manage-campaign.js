(function() {
	'use strict';

	angular.module('messages.manage-campaign', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
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
				
			manageCampaignCtrl.campaignParticipantsList = [
				{ name: "Group 1", ticked: false },
				{ name: "Group 2", ticked: false},
				{ name: "Group 3", ticked: false},
				{ name: "Group 4", ticked: false},
				{ name: "Group 5", ticked: false},
				{ name: "Group 6", ticked: false},
				{ name: "Group 7", ticked: false},
				{ name: "Group 8", ticked: false},
				{ name: "Group 9", ticked: false},
				{ name: "Group 10",ticked: false}
			];

			manageCampaignCtrl.campaignsTags = [
				{ name: "Tag 1", ticked: false },
				{ name: "Tag 2", ticked: false},
				{ name: "Tag 3", ticked: false},
				{ name: "Tag 4", ticked: false},
				{ name: "Tag 5", ticked: false},
				{ name: "Tag 6", ticked: false},
				{ name: "Tag 7", ticked: false},
				{ name: "Tag 8", ticked: false},
				{ name: "Tag 9", ticked: false},
				{ name: "Tag 10", ticked: false}
			];

			manageCampaignCtrl.campaignMessageTags = angular.copy(manageCampaignCtrl.campaignsTags);

			manageCampaignCtrl.campaignMarketingAssets = [
				{ name: "Asset 1", ticked: false },
				{ name: "Asset 2", ticked: false},
				{ name: "Asset 3", ticked: false},
				{ name: "Asset 4", ticked: false},
				{ name: "Asset 5", ticked: false},
				{ name: "Asset 6", ticked: false},
				{ name: "Asset 7", ticked: false},
				{ name: "Asset 8", ticked: false},
				{ name: "Asset 9", ticked: false},
				{ name: "Asset 10", ticked: false}
			];

			manageCampaignCtrl.campaigns = [
				{ name: "Campaign 1", ticked: false },
				{ name: "Campaign 2", ticked: false},
				{ name: "Campaign 3", ticked: false},
				{ name: "Campaign 4", ticked: false},
				{ name: "Campaign 5", ticked: false},
				{ name: "Campaign 6", ticked: false},
				{ name: "Campaign 7", ticked: false},
				{ name: "Campaign 8", ticked: false},
				{ name: "Campaign 9", ticked: false},
				{ name: "Campaign 10", ticked: false}
			];
			
			manageCampaignCtrl.cloneToCampaigns = [];

			manageCampaignCtrl.manageCampaign = {
				"campaignID": 48,
				"campaignName": "Web Summit - Dublin Fade St.",
				"campaignParticipants": [],
				"campaignDescription": "N/A",
				"marketingAssets": [ ],
				"campaignsTags": [],
				"status": "Live",
				"startDate": "11/2/2015",
				"startTime": "12:01 AM",
				"endDate": "11/3/2015",
				"endTime": "11:59 PM",
				"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
				"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime()
			};

			manageCampaignCtrl.tagFilters = [];

			manageCampaignCtrl.statuses = ["Live", "Draft", "Ended"]; 
			manageCampaignCtrl.cloneCampaign = {
				"campaignName": "",
				"status": "Draft"
			};

			$http.get('assets/data/campaign-messages.json').success(function(data) {
				manageCampaignCtrl.campaignMessages = data.campaignMessages;	
				$scope.totalItems = data.campaignMessages.length;
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
					angular.forEach(manageCampaignCtrl.campaignMessages, function(message) {
				      message.isSelected = $scope.selectAll;
				    });
				};

				$scope.bulkActions = function() {
					var actionDropDown = document.getElementById("bulk-actions");
					var action = actionDropDown.options[actionDropDown.selectedIndex].value;
					angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
						if(campaign.isSelected && action != 'Delete'){
							campaign.status = action;
							campaign.isSelected = false;
						}
						else if(campaign.isSelected && action == 'Delete' && $scope.selectAll == false){
							manageCampaignCtrl.campaignMessages.splice(i, 1);  
						}
						else if(action == 'Delete' && $scope.selectAll == true){
							manageCampaignCtrl.campaignMessages = []; 
						}
				    });
				    $scope.selectAll = false;
				};

				$scope.cloneMessages = function() {
					manageCampaignCtrl.clonedMessage = [] ;
					var cleanCopyOfMessages = angular.copy(manageCampaignCtrl.campaignMessages);
					angular.forEach(cleanCopyOfMessages, function(campaign, i) {
						if(campaign.isSelected){
							//campaign.isSelected = false;
							manageCampaignCtrl.clonedMessage.push(campaign);
						}
				    });
				    // $scope.selectAll = false;
				};

				$scope.deleteClonedMessage = function(id) {
					angular.forEach(manageCampaignCtrl.clonedMessage, function(campaign, i) {
						if(campaign.id == id){
							manageCampaignCtrl.clonedMessage.splice(i, 1);  
						}
				    });
				};

				$scope.anyInputsSelected = function() {
					$scope.isAnyInputsSelected = false;
					$scope.selectAll = true;
					angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
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