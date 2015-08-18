(function() {
	'use strict';

	angular.module('messages.manage-campaign', [])
	
	.controller('ManageCampaignCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'FoundationApi',
		'MessageListModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			FoundationApi,
			MessageListModel
		) {
			var manageCampaignCtrl = this;
			
			manageCampaignCtrl.showStartDatePicker = false;
			manageCampaignCtrl.showEndDatePicker = false;
			manageCampaignCtrl.showStartTimePicker = false;
			manageCampaignCtrl.endStartTimePicker = false;
			
			function resetForm() {
				var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();
				
				manageCampaignCtrl.manageCampaign = {
					"campaignID": "",
					"campaignName": "",
					"campaignParticipants": "",
					"campaignDescription": "",
					"marketingAssets": "",
					"campaignsTags": "",
					"status": "Draft",
					"startDate": todayFormatted,
					"startTime": "12:01 AM",
					"endDate": tomorrowFormatted,
					"endTime": "11:59 PM",
					"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
					"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime()
				};
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
			
			//resetForm();
		}
	]);

})();