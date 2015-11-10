(function() {
	'use strict';

	angular.module('locations', [
		'enterprise-portal.models.locations'
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
		'LocationsModel',
	
		function(
			$rootScope,
			$scope,
			$state,
			$http,
			FoundationApi,
			LocationsModel
		) {
			var vm = this;
			vm.noSavedLocations = false;




			function setMapCenter() {
				vm.initialMapCenter = vm.newLocation.coordinates.lat + ","+ vm.newLocation.coordinates.lng;
			}

			vm.resetLocationForm = function() {
				var blankSearch = "";
				vm.search = angular.copy(blankSearch);
				vm.newLocation = angular.copy(LocationsModel.newLocationTemplate);
				setMapCenter();
			}

			vm.createNewLocation = function() {
				if(vm.search) {
					vm.newLocation.address = vm.search;
				}

				LocationsModel.createNewLocation(vm.newLocation)
					.then(
						function success(response) {
							FoundationApi.publish('main-notifications', {
								title: 'Location Saved',
								content: '',
								color: 'success',
								autoclose: '3000'
							});							
							init();
						},
						function error(response) {
							console.log("error from ctrl");

						});
			}

			
			
			function getLocationList() {
				LocationsModel.getLocationList()
				.then(
					function success(response) {
						//console.log(JSON.stringify(response));

						/*
						What the reponse looks like:

						{
							"code": "QVR_RESULT",
							"data": {
								"location": [{
									"sid": "563a36d2e6f2218974738272",
									"deleted": false,
									"created": 1446655698231,
									"lastModified": 1446655698230,
									"user": "563a2f451870789d6999448c",
									"name": "Here ",
									"latitude": -79.3962386995554,
									"longitude": 43.64850856651995,
									"distance": 79.93313598632812,
									"trigger": 1
								}, {
									"sid": "563a3777fee5325075debdfa",
									"deleted": false,
									"created": 1446655863586,
									"lastModified": 1446655863585,
									"user": "563a2f451870789d6999448c",
									"name": "Here and Now",
									"latitude": -79.3962386995554,
									"longitude": 43.64850856651995,
									"distance": 79.93313598632812,
									"trigger": 1
								}],
								"lastModified": 1446674115222
							}
						}
						*/

						if (!response.location) {
							vm.noSavedLocations = true;
						} else {
							vm.campaignLocations = response.location;	
							//console.log('cm locations: '+ JSON.stringify(vm.campaignLocations));
						}

					},
					function error(response) {
						console.log('error');
					});
			}

			function init() {
				getLocationList();
				vm.resetLocationForm();
			}
			init();
		
			vm.tagFilters = [];	
			vm.locationFilters = [
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
			vm.newLocationFilters = angular.copy(vm.locationFilters);
			
			vm.editLocation = function(locationSID) {
				console.log('editing: '+ locationSID);

				LocationsModel.getLocation(locationSID)
					.then( 
						function success(response) {
							console.log(JSON.stringify(response));
						},
						function error(response) {

						});
			}

			vm.updateLocation = function() {
					LocationsModel.updateLocation(vm.newLocation)
					.then(
						function success(response) {
							FoundationApi.publish('main-notifications', {
								title: 'Location Updated',
								content: '',
								color: 'success',
								autoclose: '3000'
							});							
							init();
						},
						function error(response) {
							console.log("error from ctrl");

						});

			}

			vm.deleteLocation = function(locationSID) {
				console.log('deleting: '+ locationSID);
				LocationsModel.deleteLocation(locationSID)
					.then( 
						function success(response) {
							console.log(JSON.stringify(response));
						},
						function error(response) {

						});
			}



			// $http.get('assets/data/campaign-locations.json').success(function(data) {
			// 	vm.campaignLocations = data.campaignLocations;	
			// 	$scope.totalItems = data.campaignLocations.length;
			// 	$scope.currentPage = 1;
			// 	$scope.entryLimit = 10; // items per page
			// 	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			// 	$scope.reverse = false;
			// 	$scope.sortOrderBy = 'locationLabel';
			// 	$scope.startAt = 0;
			// 	$scope.endAt = 9;
			// 	$scope.selectAll = false;
			// 	$scope.isAnyInputsSelected = false;

			// 	$scope.goToPage = function(direction) {

			// 		if(direction == 'up')
			// 		{
			// 			$scope.currentPage++;
			// 		}else if(direction == 'down'){
			// 			$scope.currentPage--;
			// 		}
			// 		else if(direction == 'beginning'){
			// 			$scope.currentPage = 1;
			// 		}
			// 		else if(direction == 'end'){
			// 			$scope.currentPage = $scope.noOfPages;
			// 		}

			// 		$scope.startAt = ($scope.currentPage - 1) * $scope.entryLimit;
			// 		$scope.endAt = $scope.entryLimit * $scope.currentPage;
			// 	};

			// 	$scope.sortByFunc = function(sortBy, reverse) {
			// 		$scope.sortOrderBy = sortBy;
			// 		$scope.reverse = reverse;
			// 		$scope.currentPage = 1;
			// 		$scope.goToPage(1);
			// 	};

			// 	$scope.resetCurrentPage = function() {
			// 		$scope.currentPage = 1;
			// 	};

			// 	$scope.toggleSelected = function() {
			// 		angular.forEach(vm.campaignLocations, function(location) {
			// 	      location.isSelected = $scope.selectAll;
			// 	    });
			// 	};

			// 	$scope.bulkActions = function() {
			// 		var actionDropDown = document.getElementById("bulk-actions");
			// 		var action = actionDropDown.options[actionDropDown.selectedIndex].value;
			// 		angular.forEach(vm.campaignLocations, function(location, i) {
			// 			if(location.isSelected && action != 'Delete'){
			// 				location.status = action;
			// 				location.isSelected = false;
			// 			}
			// 			else if(location.isSelected && action == 'Delete' && $scope.selectAll == false){
			// 				vm.campaignLocations.splice(i, 1);  
			// 			}
			// 			else if(action == 'Delete' && $scope.selectAll == true){
			// 				vm.campaignLocations = []; 
			// 			}
			// 	    });
			// 	    $scope.selectAll = false;
			// 	};

				
			// 	$scope.deleteLocation = function(id) {
			// 		console.log(id);
			// 		angular.forEach(vm.campaignLocations, function(location, i) {
			// 			if(location.id == id){
			// 				vm.campaignLocations.splice(i, 1); 
			// 			}
			// 	    });
			// 	};

			// 	// $scope.cloneMessages = function() {
			// 	// 	manageCampaignCtrl.clonedMessage = [] ;
			// 	// 	var cleanCopyOfMessages = angular.copy(manageCampaignCtrl.campaignMessages);
			// 	// 	angular.forEach(cleanCopyOfMessages, function(campaign, i) {
			// 	// 		if(campaign.isSelected){
			// 	// 			//campaign.isSelected = false;
			// 	// 			manageCampaignCtrl.clonedMessage.push(campaign);
			// 	// 		}
			// 	//     });
			// 	//     // $scope.selectAll = false;
			// 	// };

			// 	// $scope.deleteClonedMessage = function(id) {
			// 	// 	angular.forEach(manageCampaignCtrl.clonedMessage, function(campaign, i) {
			// 	// 		if(campaign.id == id){
			// 	// 			manageCampaignCtrl.clonedMessage.splice(i, 1);  
			// 	// 		}
			// 	//     });
			// 	// };

			// 	$scope.anyInputsSelected = function() {
			// 		$scope.isAnyInputsSelected = false;
			// 		$scope.selectAll = true;
			// 		angular.forEach(vm.campaignLocations, function(location, i) {
			// 			if(location.isSelected){
			// 				$scope.isAnyInputsSelected  = true;
			// 			}
			// 			else{
			// 				$scope.selectAll = false;
			// 			}
			// 	    });
			// 	};

			// });

			

	





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