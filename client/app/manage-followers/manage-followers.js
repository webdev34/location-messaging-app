(function() {
    'use strict';

    angular.module('followers', [
        'enterprise-portal.models.followers'

    ])
    .filter('startFrom', function() {
        return function(input, start) {
            if (input) {
                start = +start;

                return input;
            }
            return [];
        };
    })

    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('enterprise.follower-management', {
                    url: '/follower-management',
                    templateUrl: 'app/manage-followers/manage-followers.tmpl.html',
                    controller: 'ManageFollowersCtrl as manageFollowersCtrl'
                });
        }
    ])
    .controller(
        'ManageFollowersCtrl', ['FollowersModel', 'FoundationApi', '$scope', '$http',
            function(FollowersModel, FoundationApi, $scope, $http) {

                var manageFollowersCtrl = this;

                manageFollowersCtrl.bulkActions = '';

                manageFollowersCtrl.tagFilters = [{
                    name: "Tag 1",
                    ticked: false
                }, {
                    name: "Tag 2",
                    ticked: false
                }, {
                    name: "Tag 3",
                    ticked: false
                }, {
                    name: "Tag 4",
                    ticked: false
                }, {
                    name: "Tag 5",
                    ticked: false
                }, {
                    name: "Tag 6",
                    ticked: false
                }, {
                    name: "Tag 7",
                    ticked: false
                }, {
                    name: "Tag 8",
                    ticked: false
                }, {
                    name: "Tag 9",
                    ticked: false
                }, {
                    name: "Tag 10",
                    ticked: false
                }];

                manageFollowersCtrl.selectedTagFilters = null;

                manageFollowersCtrl.activeSearchFilter = 'ALL';

                function init() {
                    getFollowers(false);
                }

                function getFollowers(resetData) {
                    $http.get('assets/data/followers.json').success(function(data) {
                        manageFollowersCtrl.currentPage = 1;
                        manageFollowersCtrl.followers = data.followers;
                        manageFollowersCtrl.totalItems = data.followers.length;
                        manageFollowersCtrl.entryLimit = 10; // items per page
                        manageFollowersCtrl.noOfPages = Math.ceil(manageFollowersCtrl.totalItems / manageFollowersCtrl.entryLimit);
                        manageFollowersCtrl.reverse = false;
                        manageFollowersCtrl.sortOrderBy = 'firstName';
                        manageFollowersCtrl.startAt = 0;
                        manageFollowersCtrl.endAt = 9;
                        manageFollowersCtrl.selectAll = false;
                        manageFollowersCtrl.isAnyInputsSelected = false;

                        if (!resetData) {
                            if (manageFollowersCtrl.activeSearchFilter == 'ALL') {
                                manageFollowersCtrl.search = '';
                                manageFollowersCtrl.sortOrderBy = 'firstName';
                            } else {
                                manageFollowersCtrl.sortOrderBy = 'lastName';
                                manageFollowersCtrl.search = manageFollowersCtrl.activeSearchFilter;
                                manageFollowersCtrl.arrayHolder = [];
                                angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                                    if (manageFollowersCtrl.activeSearchFilter == follower.lastName[0].toUpperCase()) {
                                        manageFollowersCtrl.arrayHolder.push(follower);
                                    }
                                });
                                manageFollowersCtrl.followers = manageFollowersCtrl.arrayHolder;
                                manageFollowersCtrl.noOfPages = Math.ceil(manageFollowersCtrl.followers.length / manageFollowersCtrl.entryLimit);
                            }
                        }
                    });
                }

                manageFollowersCtrl.goToPage = function(direction) {

                    if (direction == 'up') {
                        manageFollowersCtrl.currentPage++;
                    } else if (direction == 'down') {
                        manageFollowersCtrl.currentPage--;
                    } else if (direction == 'beginning') {
                        manageFollowersCtrl.currentPage = 1;
                    } else if (direction == 'end') {
                        manageFollowersCtrl.currentPage = manageFollowersCtrl.noOfPages;
                    }

                    manageFollowersCtrl.startAt = (manageFollowersCtrl.currentPage - 1) * manageFollowersCtrl.entryLimit;
                    manageFollowersCtrl.endAt = manageFollowersCtrl.entryLimit * manageFollowersCtrl.currentPage;

                };

                manageFollowersCtrl.resetCurrentPage = function() {
                    if (manageFollowersCtrl.activeSearchFilter != 'ALL') {
                        getFollowers(true);
                        manageFollowersCtrl.activeSearchFilter = 'ALL';
                    }
                    manageFollowersCtrl.currentPage = 1;
                };

                manageFollowersCtrl.sortByFunc = function(sortBy, reverse) {
                    manageFollowersCtrl.sortOrderBy = sortBy;
                    manageFollowersCtrl.reverse = reverse;
                    manageFollowersCtrl.currentPage = 1;
                    manageFollowersCtrl.goToPage(1);
                };

                manageFollowersCtrl.toggleSelected = function() {
                    angular.forEach(manageFollowersCtrl.followers, function(follower) {
                        follower.isSelected = manageFollowersCtrl.selectAll;
                    });
                };

                manageFollowersCtrl.anyInputsSelected = function() {
                    manageFollowersCtrl.isAnyInputsSelected = false;
                    manageFollowersCtrl.selectAll = true;
                    angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                        if (follower.isSelected) {
                            manageFollowersCtrl.isAnyInputsSelected = true;
                        } else {
                            manageFollowersCtrl.selectAll = false;
                        }
                    });
                };

                manageFollowersCtrl.deleteUser = function(id) {
                    angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                        if (follower.id == id) {
                            manageFollowersCtrl.followers.splice(i, 1);
                        }
                    });
                };

                manageFollowersCtrl.changeActiveSearchFilter = function(searchBy) {
                    getFollowers();
                    manageFollowersCtrl.activeSearchFilter = searchBy;
                    setTimeout(alphabetSearch, 200)
                };

                function alphabetSearch() {
                    if (manageFollowersCtrl.activeSearchFilter == 'ALL') {
                        manageFollowersCtrl.search = '';
                    } else {
                        manageFollowersCtrl.search = manageFollowersCtrl.activeSearchFilter;
                        manageFollowersCtrl.arrayHolder = [];
                        angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                            if (manageFollowersCtrl.activeSearchFilter == follower.lastName[0].toUpperCase()) {
                                manageFollowersCtrl.arrayHolder.push(follower);
                            }
                        });
                        manageFollowersCtrl.followers = manageFollowersCtrl.arrayHolder;
                    }
                }

                function paginationValidation() {
                    if (manageFollowersCtrl.currentPage > manageFollowersCtrl.noOfPages) {
                        manageFollowersCtrl.currentPage = manageFollowersCtrl.noOfPages
                    } else if (typeof manageFollowersCtrl.currentPage === "undefined") {
                        manageFollowersCtrl.currentPage = 1;
                    }
                }

                $scope.$watch("manageFollowersCtrl.currentPage", paginationValidation);

                init();
            }
    ]);

})();