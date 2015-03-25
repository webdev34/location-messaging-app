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
      "title": "Iron Man",
      "department": "The Avengers",
      "phone": "555-123-1122",
      "avatar": "images/avatar.jpg"
    };
  }]);

})();
