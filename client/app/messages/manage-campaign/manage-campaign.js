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
				{ name: "#MarketingGroup", ticked: false },
				{ name: "#BusinessDevelopment", ticked: false},
				{ name: "#Evangelists", ticked: false},
				{ name: "Bryan Bogensberger", ticked: false},
				{ name: "Scott Trasler", ticked: false}
			];

			manageCampaignCtrl.campaignsTags = [
				{ name: "#SanFrancisco", ticked: false },
				{ name: "#Barcelona", ticked: false},
				{ name: "#Dublin", ticked: true}
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
				{ name: "Quiver Team Building - SF", ticked: false },
				{ name: "Web Summit - Dublin Fade St.", ticked: false},
				{ name: "Web Summit - Dublin Harcourt St.", ticked: false},
				{ name: "Web Summit - Dublin Dame Ln.", ticked: false},
				{ name: "Web Summit - Dublin Camden St.", ticked: false},
				{ name: "MWC - 2016 - Barcelona", ticked: false}
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
				manageCampaignCtrl.totalItems = data.campaignMessages.length;
				manageCampaignCtrl.currentPage = 1;
				manageCampaignCtrl.entryLimit = 10; // items per page
				manageCampaignCtrl.noOfPages = Math.ceil(manageCampaignCtrl.totalItems / manageCampaignCtrl.entryLimit);
				manageCampaignCtrl.reverse = false;
				manageCampaignCtrl.sortOrderBy = 'id';
				manageCampaignCtrl.startAt = 0;
				manageCampaignCtrl.endAt = 9;
				manageCampaignCtrl.selectAll = false;
				manageCampaignCtrl.isAnyInputsSelected = false;

				manageCampaignCtrl.goToPage = function(direction) {

					if(direction == 'up')
					{
						manageCampaignCtrl.currentPage++;
					}else if(direction == 'down'){
						manageCampaignCtrl.currentPage--;
					}
					else if(direction == 'beginning'){
						manageCampaignCtrl.currentPage = 1;
					}
					else if(direction == 'end'){
						manageCampaignCtrl.currentPage = manageCampaignCtrl.noOfPages;
					}

					manageCampaignCtrl.startAt = (manageCampaignCtrl.currentPage - 1) * manageCampaignCtrl.entryLimit;
					manageCampaignCtrl.endAt = manageCampaignCtrl.entryLimit * manageCampaignCtrl.currentPage;

				};

				manageCampaignCtrl.sortByFunc = function(sortBy, reverse) {
					manageCampaignCtrl.sortOrderBy = sortBy;
					manageCampaignCtrl.reverse = reverse;
					manageCampaignCtrl.currentPage = 1;
					manageCampaignCtrl.goToPage(1);
				};

				manageCampaignCtrl.resetCurrentPage = function() {
					manageCampaignCtrl.currentPage = 1;
				};

				manageCampaignCtrl.toggleSelected = function() {
					angular.forEach(manageCampaignCtrl.campaignMessages, function(message) {
				      message.isSelected = manageCampaignCtrl.selectAll;
				    });
				};

				manageCampaignCtrl.bulkActions = function() {
					var action = manageCampaignCtrl.bulkActionSelected;
					angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
						if(campaign.isSelected && action != 'Delete'){
							campaign.status = action;
							campaign.isSelected = false;
						}
						else if(campaign.isSelected && action == 'Delete' && manageCampaignCtrl.selectAll == false){
							manageCampaignCtrl.campaignMessages.splice(i, 1);
						}
						else if(action == 'Delete' && manageCampaignCtrl.selectAll == true){
							manageCampaignCtrl.campaignMessages = [];
						}
				    });
				    manageCampaignCtrl.selectAll = false;
				    manageCampaignCtrl.bulkActionSelected = '';
				};

				manageCampaignCtrl.cloneMessages = function() {
					manageCampaignCtrl.clonedMessage = [] ;
					var cleanCopyOfMessages = angular.copy(manageCampaignCtrl.campaignMessages);
					angular.forEach(cleanCopyOfMessages, function(campaign, i) {
						if(campaign.isSelected){
							//campaign.isSelected = false;
							manageCampaignCtrl.clonedMessage.push(campaign);
						}
				    });
				    // manageCampaignCtrl.selectAll = false;
				};

				manageCampaignCtrl.deleteClonedMessage = function(id) {
					angular.forEach(manageCampaignCtrl.clonedMessage, function(campaign, i) {
						if(campaign.id == id){
							manageCampaignCtrl.clonedMessage.splice(i, 1);
						}
				    });
				};

				manageCampaignCtrl.anyInputsSelected = function() {
					manageCampaignCtrl.isAnyInputsSelected = false;
					manageCampaignCtrl.selectAll = true;
					angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
						if(campaign.isSelected){
							manageCampaignCtrl.isAnyInputsSelected  = true;
						}
						else{
							manageCampaignCtrl.selectAll = false;
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
				if(manageCampaignCtrl.currentPage > manageCampaignCtrl.noOfPages ){
					manageCampaignCtrl.currentPage = manageCampaignCtrl.noOfPages
				}
				else if(typeof manageCampaignCtrl.currentPage === "undefined"){
					manageCampaignCtrl.currentPage = 1;
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
