(function() {
	'use strict';

	angular.module('messages.dashboard', [])

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
			
			campaignCenterCtrl.statuses = ["Live", "Draft"];
			
			$http.get('assets/data/campaigns.json').success(function(data) {
				campaignCenterCtrl.campaignData = data.campaigns;	
			});
			
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