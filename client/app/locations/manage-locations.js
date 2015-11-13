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
			vm.isEdit = false;

			function setMapCenter() {
				vm.initialMapCenter = vm.newLocation.coordinates.lat + ","+ vm.newLocation.coordinates.lng;
			}

			vm.resetLocationForm = function() {
				var blankSearch = "";
				vm.search = angular.copy(blankSearch);
				vm.newLocation = angular.copy(LocationsModel.newLocationTemplate);
				vm.isEdit = false;
				setMapCenter();
			}

			vm.createNewLocation = function() {
				if(vm.search) {
					vm.newLocation.address = vm.search;
				}

				if(vm.isEdit){
					vm.updateLocation();
					return
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

			vm.totalItems = vm.newLocationFilters.length;
			$scope.currentPage = 1;
			vm.entryLimit = 10; // items per page
			$scope.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
			vm.reverse = false;
			vm.sortOrderBy = 'name'; //initial field orderedBy
			vm.startAt = 0;
			vm.endAt = 9;
			vm.selectAll = false;
			vm.isAnyInputsSelected = false;
			
			vm.editLocation = function(locationSID) {
				console.log('editing: '+ locationSID);
				vm.isEdit = true;

				LocationsModel.getLocation(locationSID)
					.then( 
						function success(response) {
							console.log(JSON.stringify(response));
							vm.newLocation = response;
							vm.search = angular.copy(response.address);

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

			vm.goToPage = function(direction) {

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

				vm.startAt = ($scope.currentPage - 1) * vm.entryLimit;
				vm.endAt = vm.entryLimit * $scope.currentPage;
			};

			vm.sortByFunc = function(sortBy, reverse) {
				vm.sortOrderBy = sortBy;
				vm.reverse = reverse;
				$scope.currentPage = 1;
				vm.goToPage(1);
			};

			vm.resetCurrentPage = function() {
				$scope.currentPage = 1;
			};

			vm.toggleSelected = function() {
				angular.forEach(vm.campaignLocations, function(location) {
			      location.isSelected = vm.selectAll;
			    });
			};

			vm.bulkActions = function() {
				var action = vm.bulkActionSelected;
				angular.forEach(vm.campaignLocations, function(location, i) {
					if(location.isSelected){
						vm.campaignLocations.splice(i, 1);  
					}
			    });
			    vm.selectAll = false;
			};

			vm.anyInputsSelected = function() {
				vm.isAnyInputsSelected = false;
				vm.selectAll = true;
				angular.forEach(vm.campaignLocations, function(location, i) {
					if(location.isSelected){
						vm.isAnyInputsSelected  = true;
					}
					else{
						vm.selectAll = false;
					}
			    });
			};
			
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