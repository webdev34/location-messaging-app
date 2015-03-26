(function() {
  'use strict';

  var app = angular.module('enterprise-portal', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  app.controller('UserController', ['$scope', function($scope){
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

  app.controller('EntepriseController', ['$scope', function($scope){
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

  app.controller('AdminController', ['$scope', function($scope){
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
