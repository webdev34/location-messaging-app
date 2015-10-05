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
                .state('enterprise.manage-followers', {
                    url: '/manage-followers',
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
                    manageFollowersCtrl.activeSearchReset = false;

                    function init() {
                        getFollowers(false);
                    }

                    function getFollowers(resetData) {
                        $http.get('assets/data/followers.json').success(function(data) {
                            manageFollowersCtrl.followers = data.followers;
                            $scope.totalItems = data.followers.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10; // items per page
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.reverse = false;
                            $scope.sortOrderBy = 'firstName';
                            $scope.startAt = 0;
                            $scope.endAt = 9;
                            $scope.selectAll = false;
                            $scope.isAnyInputsSelected = false;

                            if (!resetData) {
                                if (manageFollowersCtrl.activeSearchFilter == 'ALL') {
                                    $scope.search = '';
                                    $scope.sortOrderBy = 'firstName';
                                } else {
                                    $scope.sortOrderBy = 'lastName';
                                    $scope.search = manageFollowersCtrl.activeSearchFilter;
                                    manageFollowersCtrl.arrayHolder = [];
                                    angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                                        if (manageFollowersCtrl.activeSearchFilter == follower.lastName[0].toUpperCase()) {
                                            manageFollowersCtrl.arrayHolder.push(follower);
                                        }
                                    });
                                    manageFollowersCtrl.followers = manageFollowersCtrl.arrayHolder;
                                    $scope.noOfPages = Math.ceil(manageFollowersCtrl.followers.length / $scope.entryLimit);
                                }
                            }
                        });
                    }

                    $scope.goToPage = function(direction) {

                        if (direction == 'up') {
                            $scope.currentPage++;
                        } else if (direction == 'down') {
                            $scope.currentPage--;
                        } else if (direction == 'beginning') {
                            $scope.currentPage = 1;
                        } else if (direction == 'end') {
                            $scope.currentPage = $scope.noOfPages;
                        }

                        $scope.startAt = ($scope.currentPage - 1) * $scope.entryLimit;
                        $scope.endAt = $scope.entryLimit * $scope.currentPage;

                    };

                    $scope.resetCurrentPage = function() {
                        if (manageFollowersCtrl.activeSearchFilter != 'ALL') {
                            getFollowers(true);
                            manageFollowersCtrl.activeSearchFilter = 'ALL';
                        }
                        $scope.currentPage = 1;
                    };

                    $scope.sortByFunc = function(sortBy, reverse) {
                        $scope.sortOrderBy = sortBy;
                        $scope.reverse = reverse;
                        $scope.currentPage = 1;
                        $scope.goToPage(1);
                    };

                    $scope.toggleSelected = function() {
                        angular.forEach(manageFollowersCtrl.followers, function(follower) {
                            follower.isSelected = $scope.selectAll;
                        });
                    };

                    $scope.anyInputsSelected = function() {
                        $scope.isAnyInputsSelected = false;
                        $scope.selectAll = true;
                        angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                            if (follower.isSelected) {
                                $scope.isAnyInputsSelected = true;
                            } else {
                                $scope.selectAll = false;
                            }
                        });
                    };

                    $scope.deleteUser = function(id) {
                        angular.forEach(manageFollowersCtrl.followers, function(follower, i) {
                            if (follower.id == id) {
                                manageFollowersCtrl.followers.splice(i, 1);
                            }
                        });
                    };

                    $scope.changeActiveSearchFilter = function(searchBy) {
                        getFollowers();
                        manageFollowersCtrl.activeSearchFilter = searchBy;
                        setTimeout(alphabetSearch, 200)
                    };

                    function alphabetSearch() {
                        if (manageFollowersCtrl.activeSearchFilter == 'ALL') {
                            $scope.search = '';
                        } else {
                            $scope.search = manageFollowersCtrl.activeSearchFilter;
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
                        if ($scope.currentPage > $scope.noOfPages) {
                            $scope.currentPage = $scope.noOfPages
                        } else if (typeof $scope.currentPage === "undefined") {
                            $scope.currentPage = 1;
                        }
                    }

                    $scope.$watch("currentPage", paginationValidation);

                    init();
                }
            ]);

})();