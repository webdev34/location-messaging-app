(function() {
    'use strict';

    angular.module('users', [
        'enterprise-portal.models.users'

    ])
    .filter('startFrom', function () {
        return function (input, start) {
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
                .state('enterprise.user-management', {
                    url: '/user-management',
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

                    manageUsersCtrl.editUser = {};
                   
                    manageUsersCtrl.bulkActionSelected = '';
                    manageUsersCtrl.flowImgPlaceholder = 'assets/img/default-profile-avatar.png';
                    manageUsersCtrl.flowImgPlaceholderEdit = 'assets/img/profile_bryan.jpg';

                    function init() {
                        getAccounts();
                    }

                    function getAccounts() {
                        $http.get('assets/data/users.json').success(function(data) {
                            manageUsersCtrl.users = data.users;
                            manageUsersCtrl.totalItems = data.users.length;
                            manageUsersCtrl.currentPage = 1;
                            manageUsersCtrl.entryLimit = 10; // items per page
                            manageUsersCtrl.noOfPages = Math.ceil(manageUsersCtrl.totalItems / manageUsersCtrl.entryLimit);
                            manageUsersCtrl.reverse = false;
                            manageUsersCtrl.sortOrderBy = 'firstName';
                            manageUsersCtrl.startAt = 0;
                            manageUsersCtrl.endAt = 9;
                            manageUsersCtrl.selectAll = false;
                            manageUsersCtrl.isAnyInputsSelected = false;

                            manageUsersCtrl.goToPage = function(direction) {

                                if (direction == 'up') {
                                    manageUsersCtrl.currentPage++;
                                } else if (direction == 'down') {
                                    manageUsersCtrl.currentPage--;
                                } else if (direction == 'beginning') {
                                    manageUsersCtrl.currentPage = 1;
                                } else if (direction == 'end') {
                                    manageUsersCtrl.currentPage = manageUsersCtrl.noOfPages;
                                }

                                manageUsersCtrl.startAt = (manageUsersCtrl.currentPage - 1) * manageUsersCtrl.entryLimit;
                                manageUsersCtrl.endAt = manageUsersCtrl.entryLimit * manageUsersCtrl.currentPage;

                            };


                            manageUsersCtrl.resetCurrentPage = function() {
                                manageUsersCtrl.currentPage = 1;
                            };

                            manageUsersCtrl.sortByFunc = function(sortBy, reverse) {
                                manageUsersCtrl.sortOrderBy = sortBy;
                                manageUsersCtrl.reverse = reverse;
                                manageUsersCtrl.currentPage = 1;
                                manageUsersCtrl.goToPage(1);
                            };

                            manageUsersCtrl.toggleSelected = function() {
                                angular.forEach(manageUsersCtrl.users, function(user) {
                                    user.isSelected = manageUsersCtrl.selectAll;
                                });
                            };

                            manageUsersCtrl.anyInputsSelected = function() {
                                manageUsersCtrl.isAnyInputsSelected = false;
                                manageUsersCtrl.selectAll = true;
                                angular.forEach(manageUsersCtrl.users, function(user, i) {
                                    if (user.isSelected) {
                                        manageUsersCtrl.isAnyInputsSelected = true;
                                    } else {
                                        manageUsersCtrl.selectAll = false;
                                    }
                                });
                            };

                        });
                    }

                    manageUsersCtrl.uploaderNewUser = {};
                    manageUsersCtrl.uploaderEditUser = {};

                    manageUsersCtrl.processFiles = function(files, section) {
                        
                        angular.forEach(files, function(flowFile, i) {
                            var fileReader = new FileReader();
                            fileReader.onload = function(event) {
                                var uri = event.target.result;
                                if (section == 'New User') {
                                    manageUsersCtrl.newUser.newAvatar = null;
                                    manageUsersCtrl.newUser.newAvatar = uri;
                                    manageUsersCtrl.flowImgPlaceholder = angular.copy(uri);
                                } else {
                                     manageUsersCtrl.editUser.newAvatar = null;
                                     manageUsersCtrl.editUser.newAvatar = uri;
                                     manageUsersCtrl.flowImgPlaceholderEdit = angular.copy(uri);
                                     manageUsersCtrl.uploaderEditUser.flow.files = [];
                                }
                            };
                            fileReader.readAsDataURL(flowFile.file);
                        });
                    };

                    manageUsersCtrl.removeFiles = function(section) {
                        if (section = 'New User') {
                            manageUsersCtrl.uploaderNewUser.flow.files = [];
                        } else {
                            manageUsersCtrl.uploaderEditUser.flow.files = [];
                        }
                    };

                    manageUsersCtrl.editUserFunc = function(user) {
                        manageUsersCtrl.isEditing = true;
                        manageUsersCtrl.editUser = user;
                        manageUsersCtrl.flowImgPlaceholderEdit = user.avatar;
                    };

                    manageUsersCtrl.deleteUser = function(id) {
                        angular.forEach(manageUsersCtrl.users, function(user, i) {
                            if (user.id == id) {
                                manageUsersCtrl.users.splice(i, 1);
                            }
                        });
                    };

                    manageUsersCtrl.bulkActions = function() {
                        var action = manageUsersCtrl.bulkActionSelected;
                        angular.forEach(manageUsersCtrl.users, function(user, i) {
                            if(user.isSelected && action == 'Delete' && manageUsersCtrl.selectAll == false){
                                manageUsersCtrl.users.splice(i, 1);  
                            }
                            else if(action == 'Delete' && manageUsersCtrl.selectAll == true){
                                manageUsersCtrl.users = []; 
                            }
                        });
                        manageUsersCtrl.selectAll = false;
                        manageUsersCtrl.bulkActionSelected = '';
                    };


                    // userProfileCtrl.saveChanges = function() {
                    // 	userProfileCtrl.updatedUser = userProfileCtrl.editedUser;
                    // 	UserModel.updateAccount(userProfileCtrl.updatedUser);
                    // 	FoundationApi.publish('saveProfileChangesModal', 'close');
                    // 	userProfileCtrl.isEditing = false;
                    // }

                    init();


				function paginationValidation(){
					if(manageUsersCtrl.currentPage > manageUsersCtrl.noOfPages ){
						manageUsersCtrl.currentPage = manageUsersCtrl.noOfPages
					}
					else if(typeof manageUsersCtrl.currentPage === "undefined"){
						manageUsersCtrl.currentPage = 1;
					}
				}

                    $scope.$watch("currentPage", paginationValidation);

                }
            ]);

})();