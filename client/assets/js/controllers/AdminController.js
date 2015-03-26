(function() {
  'use strict';

  angular.module('enterprise-portal').controller('AdminController', ['$scope', function($scope){
    $scope.enteprises = {
      "enteprises": [
        {
          "companyName": "Tesla Motors, Inc.",
          "username": "teslamotors",
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
          ]
        },
        {
          "companyName": "Space X",
          "username": "teslamotors",
          "logo": "images/logo.jpg",
          "administrators": [
            {
              "name": "Elon Musk",
              "title": "Executive",
              "username": "elonmusk",
              "avatar": "images/avatar.jpg"
            },
            {
              "name": "Alber Einstein",
              "title": "Research & Development",
              "username": "albert",
              "avatar": "images/avatar.jpg"
            }
          ]
        }
      ]
    }
  }]);

 

})();
