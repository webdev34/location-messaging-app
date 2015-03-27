(function() {
  'use strict';

  angular.module('enterprise-portal').controller('EntepriseController', ['$scope', function($scope){
    $scope.company = {
      "_id": "<hex key>",
      "username": "teslamotors",
      "type": "enterprise", 
      "email": "marketing@teslamotors.com",
      "companyName": "Tesla Motors, Inc.",
      "description": "We like electric cars. (Up to 140 characters).",
      "logo": "images/logo.jpg",
      "administrators": [
        {
          "name": "Elon Musk",
          "title": "Executive",
          "username": "elonmusk",
          "avatar": "images/avatar.jpg"
        },
        {
          "name": "Nikola Tesla",
          "title": "Research & Development",
          "username": "nikola",
          "avatar": "images/avatar.jpg"
        }
      ],
      "users": [
        {
          "name": "Jane Appleseed",
          "title": "Marketing",
          "username": "jane_a",
          "avatar": "images/avatar.jpg"
        },{
          "name": "Jane Appleseed",
          "title": "Marketing",
          "username": "jane_a",
          "avatar": "images/avatar.jpg"
        },
        {
          "name": "John Appleseed",
          "title": "Marketing",
          "username": "john_a",
          "avatar": "images/avatar.jpg"
        }
      ]
    }
  }]);
 

})();