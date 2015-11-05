(function() {
	'use strict';

	angular.module('locations', [

	])

	.config([
		'$stateProvider', 
		'$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('messages.manage-locations', {
				url: '/manage-locations',
				templateUrl: 'app/locations/manage-locations.tmpl.html',
				controller: 'ManageLocationsCtrl as manageLocationsCtrl'
			})
			;
	}])


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
			

			manageLocationsCtrl.newLocation = {
				"locationName": "",
				"range": 5,
				"coordinates":{"H":43.657504642319005,"L":-79.3760706718750},
			};

			manageLocationsCtrl.initialMapCenter = manageLocationsCtrl.newLocation.coordinates.H + ","+ manageLocationsCtrl.newLocation.coordinates.L;





			function paginationValidation(){
				if($scope.currentPage > $scope.noOfPages ){
					$scope.currentPage = $scope.noOfPages
				}
				else if(typeof $scope.currentPage === "undefined"){
					$scope.currentPage = 1;
				}
			}
			
			
			$scope.$watch("currentPage", paginationValidation);
			
		}
	]);

})();