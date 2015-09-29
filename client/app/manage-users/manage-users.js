(function() {
    'use strict';

    angular.module('users', [
        'enterprise-portal.models.users'

    ])

    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('enterprise.manage-users', {
                    url: '/manage-users',
                    templateUrl: 'app/manage-users/manage-users.tmpl.html',
                    controller: 'ManageUsersCtrl as manageUsersCtrl'
                });
        }
    ])
        .controller(
            'ManageUsersCtrl', ['UsersModel', 'FoundationApi', '$scope', '$http',
                function(UsersModel, FoundationApi, $scope, $http) {

                    var manageUsersCtrl = this;
                    manageUsersCtrl.isEditing = false;

                    manageUsersCtrl.newUser = {
                        "id": null,
                        "firstName": "-",
                        "lastName": "-",
                        "email": "-",
                        "contactNumber": "-",
                        "userRights": "-",
                        "avatar": "assets/img/default-profile-avatar.png"
                    };
                   
                    manageUsersCtrl.bulkActions = '';
                    manageUsersCtrl.flowImgPlaceholder = 'assets/img/default-profile-avatar.png';
                    manageUsersCtrl.flowImgPlaceholderEdit = 'assets/img/default-profile-avatar.png';

                    function init() {
                        getAccounts();
                    }

                    function getAccounts() {
                        $http.get('assets/data/users.json').success(function(data) {
                            manageUsersCtrl.users = data.users;
                            $scope.totalItems = data.users.length;
                            $scope.currentPage = 1;
                            $scope.entryLimit = 10; // items per page
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.reverse = false;
                            $scope.sortOrderBy = 'firstName';
                            $scope.startAt = 0;
                            $scope.endAt = 9;
                            $scope.selectAll = false;
                            $scope.isAnyInputsSelected = false;

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

                            $scope.sortByFunc = function(sortBy, reverse) {
                                $scope.sortOrderBy = sortBy;
                                $scope.reverse = reverse;
                                $scope.currentPage = 1;
                                $scope.goToPage(1);
                            };

                            $scope.toggleSelected = function() {
                                angular.forEach(manageUsersCtrl.users, function(user) {
                                    user.isSelected = $scope.selectAll;
                                });
                            };

                            $scope.anyInputsSelected = function() {
                                $scope.isAnyInputsSelected = false;
                                $scope.selectAll = true;
                                angular.forEach(manageUsersCtrl.users, function(user, i) {
                                    if (user.isSelected) {
                                        $scope.isAnyInputsSelected = true;
                                    } else {
                                        $scope.selectAll = false;
                                    }
                                });
                            };

                        });
                    }

                    $scope.uploaderNewUser = {};
                    $scope.uploaderEditUser = {};

                    $scope.processFiles = function(files, section) {

                        angular.forEach(files, function(flowFile, i) {
                            var fileReader = new FileReader();
                            fileReader.onload = function(event) {
                                var uri = event.target.result;
                                
                                if (section = 'New User') {
                                    manageUsersCtrl.newUser.newAvatar = null;
                                    manageUsersCtrl.newUser.newAvatar = uri;
                                    manageUsersCtrl.flowImgPlaceholder = angular.copy(uri);
                                } else {
                                     uploaderEditUser.flow.files = null;
                                     manageUsersCtrl.editUser.newAvatar = uri;
                                     manageUsersCtrl.flowImgPlaceholderEdit = angular.copy(uri);
                                }
                            };
                            fileReader.readAsDataURL(flowFile.file);
                        });
                    };

                    $scope.removeFiles = function(section) {
                        if (section = 'New User') {
                            $scope.uploaderNewUser.flow.files = [];
                        } else {
                            $scope.uploaderEditUser.flow.files = [];
                        }
                    };

                    $scope.editUser = function(user) {
                        manageUsersCtrl.isEditing = true;
                        manageUsersCtrl.editUser = user;
                        manageUsersCtrl.flowImgPlaceholderEdit = user.avatar;
                    };

                    $scope.deleteUser = function(id) {
                        angular.forEach(manageUsersCtrl.users, function(user, i) {
                            if (user.id == id) {
                                manageUsersCtrl.users.splice(i, 1);
                            }
                        });
                    };

                    // userProfileCtrl.saveChanges = function() {
                    // 	userProfileCtrl.updatedUser = userProfileCtrl.editedUser;
                    // 	UserModel.updateAccount(userProfileCtrl.updatedUser);
                    // 	FoundationApi.publish('saveProfileChangesModal', 'close');
                    // 	userProfileCtrl.isEditing = false;
                    // }

                    init();


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