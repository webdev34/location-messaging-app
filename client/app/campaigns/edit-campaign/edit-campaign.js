(function() {
	'use strict';

	angular.module('campaigns.edit-campaign', [])
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
		'$stateParams',
		'$http',
		'FoundationApi',
		'MessageListModel',

		function(
			$rootScope,
			$scope,
			$state,
			$stateParams,
			$http,
			FoundationApi,
			MessageListModel
		) {
			var vm = this;

			if ($state.current.name == "campaigns.edit-campaign" ) {
				console.log('editing:' + $stateParams._id);
			}

			//Date Picker display variables need to be abstracted into date-picker directive
			vm.showStartDatePicker = false;
			vm.showEndDatePicker = false;
			vm.showStartTimePicker = false;
			vm.endStartTimePicker = false;


			//var today and tomorrow need to be abstracted into date-picker directive
			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
			var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

			//Disabled Features
			/*
			vm.campaignParticipantsList = [
				{ name: "#MarketingGroup", ticked: false },
				{ name: "#BusinessDevelopment", ticked: false},
				{ name: "#Evangelists", ticked: false},
				{ name: "Bryan Bogensberger", ticked: false},
				{ name: "Scott Trasler", ticked: false}
			];

			// Tags Need to be abstracted
			vm.campaignsTags = [
				{ name: "#SanFrancisco", ticked: false },
				{ name: "#Barcelona", ticked: false},
				{ name: "#Dublin", ticked: true}
			];
			vm.campaignMessageTags = angular.copy(vm.campaignsTags);

			// Assets need to be abstracted
			vm.campaignMarketingAssets = [
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

			*/



			vm.campaigns = [
				{ name: "Quiver Team Building - SF", ticked: false },
				{ name: "Web Summit - Dublin Fade St.", ticked: false},
				{ name: "Web Summit - Dublin Harcourt St.", ticked: false},
				{ name: "Web Summit - Dublin Dame Ln.", ticked: false},
				{ name: "Web Summit - Dublin Camden St.", ticked: false},
				{ name: "MWC - 2016 - Barcelona", ticked: false}
			];

			vm.cloneToCampaigns = [];

			vm.manageCampaign = {
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

			vm.tagFilters = [];

			vm.statuses = ["Live", "Draft", "Ended"];
			vm.cloneCampaign = {
				"campaignName": "",
				"status": "Draft"
			};

			$http.get('assets/data/campaign-messages.json').success(function(data) {
				vm.campaignMessages = data.campaignMessages;
				vm.totalItems = data.campaignMessages.length;
				vm.currentPage = 1;
				vm.entryLimit = 10; // items per page
				vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
				vm.reverse = false;
				vm.sortOrderBy = 'id';
				vm.startAt = 0;
				vm.endAt = 9;
				vm.selectAll = false;
				vm.isAnyInputsSelected = false;

				vm.goToPage = function(direction) {

					if(direction == 'up')
					{
						vm.currentPage++;
					}else if(direction == 'down'){
						vm.currentPage--;
					}
					else if(direction == 'beginning'){
						vm.currentPage = 1;
					}
					else if(direction == 'end'){
						vm.currentPage = vm.noOfPages;
					}

					vm.startAt = (vm.currentPage - 1) * vm.entryLimit;
					vm.endAt = vm.entryLimit * vm.currentPage;

				};

				vm.sortByFunc = function(sortBy, reverse) {
					vm.sortOrderBy = sortBy;
					vm.reverse = reverse;
					vm.currentPage = 1;
					vm.goToPage(1);
				};

				vm.resetCurrentPage = function() {
					vm.currentPage = 1;
				};

				vm.toggleSelected = function() {
					angular.forEach(vm.campaignMessages, function(message) {
				      message.isSelected = vm.selectAll;
				    });
				};

				vm.bulkActions = function() {
					var action = vm.bulkActionSelected;
					angular.forEach(vm.campaignMessages, function(campaign, i) {
						if(campaign.isSelected && action != 'Delete'){
							campaign.status = action;
							campaign.isSelected = false;
						}
						else if(campaign.isSelected && action == 'Delete' && vm.selectAll == false){
							vm.campaignMessages.splice(i, 1);
						}
						else if(action == 'Delete' && vm.selectAll == true){
							vm.campaignMessages = [];
						}
				    });
				    vm.selectAll = false;
				    vm.bulkActionSelected = '';
				};

				vm.cloneMessages = function() {
					vm.clonedMessage = [] ;
					var cleanCopyOfMessages = angular.copy(vm.campaignMessages);
					angular.forEach(cleanCopyOfMessages, function(campaign, i) {
						if(campaign.isSelected){
							//campaign.isSelected = false;
							vm.clonedMessage.push(campaign);
						}
				    });
				    // vm.selectAll = false;
				};

				vm.deleteClonedMessage = function(id) {
					angular.forEach(vm.clonedMessage, function(campaign, i) {
						if(campaign.id == id){
							vm.clonedMessage.splice(i, 1);
						}
				    });
				};

				vm.anyInputsSelected = function() {
					vm.isAnyInputsSelected = false;
					vm.selectAll = true;
					angular.forEach(vm.campaignMessages, function(campaign, i) {
						if(campaign.isSelected){
							vm.isAnyInputsSelected  = true;
						}
						else{
							vm.selectAll = false;
						}
				    });
				};

			});


			function resetForm() {
				vm.manageCampaign = {
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
				if(vm.currentPage > vm.noOfPages ){
					vm.currentPage = vm.noOfPages
				}
				else if(typeof vm.currentPage === "undefined"){
					vm.currentPage = 1;
				}
			}

			vm.updateCampaign = function() {
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
				vm.showStartDatePicker = false;
				vm.showEndDatePicker = false;
				vm.showStartTimePicker = false;
				vm.showEndTimePicker = false;
			}

			$scope.$watch("vm.manageCampaign.startDate", clearTakeOverSelectors);
			$scope.$watch("vm.manageCampaign.endDate", clearTakeOverSelectors);
			$scope.$watch("vm.manageCampaign.startTime", clearTakeOverSelectors);
			$scope.$watch("vm.manageCampaign.endTime", clearTakeOverSelectors);
			$scope.$watch("currentPage", paginationValidation);

			//resetForm();
		}
	]);

})();
