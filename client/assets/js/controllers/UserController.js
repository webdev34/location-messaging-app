(function() {
  'use strict';

  angular.module('enterprise-portal').controller('UserController', ['$scope', function($scope){
    $scope.user = {
      "_id": "<hex key>",
      "username": "elonmusk",
      "type": "enterprise-user", // "enterprise-user" "enterprise-admin" "system-admin" 
      "email": "elon@teslamotors.com",
      "fullName": "Elon Musk",
      "description": "The real Iron Man. This is the user description. Up to 140 characters",
      "company": "Tesla Motors, Inc.",
      "companyLogo": "images/logo.jpg",
      "companyUsername": "teslamotors",
      "title": "Iron Man",
      "department": "The Avengers",
      "phone": "555-123-1122",
      "avatar": "images/avatar.jpg"
    };
  }]);

 

})();
