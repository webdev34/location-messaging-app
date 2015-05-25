(function() {
  'use strict';

  var app = angular.module('enterprise-portal', [
    'ui.router',
    'ngAnimate',
    'ngCookies',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    //Modules
    'user-profile',
    'messages',
    'enterprise',
    'admin'
  ])
    .config(config)
    .run(run)
  ;

  app.constant('APP_default_state', 'messages.dashboard');
  app.constant('API_URL', 'http://localhost:8000/web-1.1');


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

  app.controller('AppCtrl', [
    'UserModel',
    'FoundationApi',
    '$rootScope', 
    '$state',
    '$location',
    '$cookieStore',
    'APP_default_state',
    function (UserModel, FoundationApi, $rootScope, $state, $location, $cookieStore, APP_default_state) {

      var appCtrl = this;

      appCtrl.currentState = $rootScope.$state;
      appCtrl.user = null;
      appCtrl.userIsLoggedIn = false;
      appCtrl.userLoginInfo = {};

      appCtrl.gNavStateIs = "";

      

      $rootScope.$on('$stateChangeSuccess', 
      function(event, toState, toParams, fromState, fromParams){ 
          whatIsState();
      });


      function init() {
        var landingState = $location.url();
        whatIsState();
        userLoginMock();
      }


      function whatIsState() {
        appCtrl.gNavStateIs = "";

        var stateArray = ['messages','admin','enterprise'];

        for (var i = 0; i < stateArray.length; i++) {
          if (appCtrl.currentState.includes(stateArray[i])) {
            appCtrl.gNavStateIs = stateArray[i];
          }
         
        }

      }


      function getAccountInfo(userID) {
        UserModel.getAccountInfo(userID);

      }

      function userLoginMock(loginInfo) {
        UserModel.getUserDetail()
        .then(function(result) {
          //console.log(result);
          appCtrl.user = result;
          appCtrl.userIsLoggedIn = true;
          //goToHomePage();
        });



      };

      function goToLogin() {
        $state.go('home');
      }

      function goToHomePage() {
        $state.go(APP_default_state);
      }

      function userLogin() {
        UserModel.login(appCtrl.userLoginInfo)
          .then(function success(response) {
            appCtrl.user = {};
            appCtrl.user._id = response.data.user;
            appCtrl.userIsLoggedIn = true;
            FoundationApi.publish('main-notifications', 
              { 
                title: 'Login Succesful', 
                content: '',
                color: 'success',
                autoclose: '3000'
              });
            goToHomePage();
            // console.log('user is: ');
            // console.log(appCtrl.user._id);
          });
      }

      function userLogout() {
        appCtrl.user = null;
        appCtrl.userIsLoggedIn = false;

      }

      appCtrl.init = init;
      appCtrl.userLoginMock = userLoginMock;
      appCtrl.userLogin = userLogin;
      appCtrl.getAccountInfo = getAccountInfo;

      appCtrl.init();


  }]);

})();