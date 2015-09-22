(function() {
	'use strict';

	angular.module('messages.manage-locations', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
	.controller('ManageLocationsCtrl', [
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
			var manageLocationsCtrl = this;
			
			manageLocationsCtrl.showStartDatePicker = false;
			manageLocationsCtrl.showEndDatePicker = false;
			manageLocationsCtrl.showStartTimePicker = false;
			manageLocationsCtrl.endStartTimePicker = false;

			var today = new Date(),
					todayFormatted = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
					todayProperFormatted = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
				
				var tomorrow = new Date(today.getTime() + (24*60*60*1000 * 7)),
					tomorrowFormatted = tomorrow.getDate() + "/" + (tomorrow.getMonth() + 1) + "/" + tomorrow.getFullYear(),
					tomorrowProperFormatted = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();
			
			manageLocationsCtrl.tagFilters = [];	
			manageLocationsCtrl.locationFilters = [
				{ name: "Tag 1", ticked: false },
				{ name: "Tag 2", ticked: false},
				{ name: "Tag 3", ticked: false},
				{ name: "Tag 4", ticked: false},
				{ name: "Tag 5", ticked: false},
				{ name: "Tag 6", ticked: false},
				{ name: "Tag 7", ticked: false},
				{ name: "Tag 8", ticked: false},
				{ name: "Tag 9", ticked: false},
				{ name: "Tag 10",ticked: false}
			];
			manageLocationsCtrl.newLocationFilters = angular.copy(manageLocationsCtrl.locationFilters);
			

			
			// manageCampaignCtrl.manageCampaign = {
			// 	"campaignID": "00131",
			// 	"campaignName": "Drive A Dream - Vancouver BC",
			// 	"campaignParticipants": [],
			// 	"campaignDescription": "Tesla's Drive A Dream in Vancouver BC will be target- ing the true auto enthusiast having a passion for performance and luxury. The campaign will be physi- cally centered around our two locations. The Quiver campaign will be run simultaneously with a local television campaign spanning the campaign period.",
			// 	"marketingAssets": [ ],
			// 	"campaignsTags": [],
			// 	"status": "Draft",
			// 	"startDate": todayProperFormatted,
			// 	"startTime": "12:01 AM",
			// 	"endDate": tomorrowProperFormatted,
			// 	"endTime": "11:59 PM",
			// 	"startTimestamp": new Date(todayProperFormatted + " 12:01 AM").getTime(),
			// 	"endTimestamp": new Date(tomorrowProperFormatted + " 11:59 PM").getTime()
			// };

			

			
			// manageCampaignCtrl.cloneCampaign = {
			// 	"campaignName": "",
			// 	"status": "Draft"
			// };

			$http.get('assets/data/campaign-locations.json').success(function(data) {
				manageLocationsCtrl.campaignLocations = data.campaignLocations;	
				$scope.totalItems = data.campaignLocations.length;
				$scope.currentPage = 1;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.reverse = false;
				$scope.sortOrderBy = 'locationLabel';
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
					angular.forEach(manageLocationsCtrl.campaignLocations, function(location) {
				      location.isSelected = $scope.selectAll;
				    });
				};

				$scope.bulkActions = function() {
					var actionDropDown = document.getElementById("bulk-actions");
					var action = actionDropDown.options[actionDropDown.selectedIndex].value;
					angular.forEach(manageLocationsCtrl.campaignLocations, function(location, i) {
						if(location.isSelected && action != 'Delete'){
							location.status = action;
							location.isSelected = false;
						}
						else if(location.isSelected && action == 'Delete' && $scope.selectAll == false){
							manageLocationsCtrl.campaignLocations.splice(i, 1);  
						}
						else if(action == 'Delete' && $scope.selectAll == true){
							manageLocationsCtrl.campaignLocations = []; 
						}
				    });
				    $scope.selectAll = false;
				};

				
				$scope.deleteLocation = function(id) {
					console.log(id);
					angular.forEach(manageLocationsCtrl.campaignLocations, function(location, i) {
						if(location.id == id){
							manageLocationsCtrl.campaignLocations.splice(i, 1); 
						}
				    });
				};

				// $scope.cloneMessages = function() {
				// 	manageCampaignCtrl.clonedMessage = [] ;
				// 	var cleanCopyOfMessages = angular.copy(manageCampaignCtrl.campaignMessages);
				// 	angular.forEach(cleanCopyOfMessages, function(campaign, i) {
				// 		if(campaign.isSelected){
				// 			//campaign.isSelected = false;
				// 			manageCampaignCtrl.clonedMessage.push(campaign);
				// 		}
				//     });
				//     // $scope.selectAll = false;
				// };

				// $scope.deleteClonedMessage = function(id) {
				// 	angular.forEach(manageCampaignCtrl.clonedMessage, function(campaign, i) {
				// 		if(campaign.id == id){
				// 			manageCampaignCtrl.clonedMessage.splice(i, 1);  
				// 		}
				//     });
				// };

				$scope.anyInputsSelected = function() {
					$scope.isAnyInputsSelected = false;
					$scope.selectAll = true;
					angular.forEach(manageLocationsCtrl.campaignLocations, function(location, i) {
						if(location.isSelected){
							$scope.isAnyInputsSelected  = true;
						}
						else{
							$scope.selectAll = false;
						}
				    });
				};

			});
			



			function resetForm() {
				manageLocationsCtrl.newLocation = {
					"id": "",
					"locationName": "",
					"coordinates": [-79.383184, 43.653226],
					"locationTags": []
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
			
			// manageCampaignCtrl.updateCampaign = function() {
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
			// }
	
			
			$scope.$watch("currentPage", paginationValidation);
			
			resetForm();
		}
	]);

})();