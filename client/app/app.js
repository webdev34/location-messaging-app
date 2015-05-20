(function() {
  'use strict';

  var app = angular.module('enterprise-portal', [
    'ui.router',
    'ngAnimate',

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
    'UserModel', 'FoundationApi', '$state', '$stateParams', '$location','APP_default_state',
    function (UserModel, FoundationApi, $state, $stateParams, $location, APP_default_state) {

      var appCtrl = this;

      appCtrl.user = null;
      appCtrl.userIsLoggedIn = false;
      appCtrl.userLoginInfo = {};


      function init() {
        var stateTest = $state.get('home');
        console.log(stateTest);

        // if (!appCtrl.userIsLoggedIn) {
        //   $state.go('home');
        // }

      }


      function userLoginMock(loginInfo) {
        UserModel.getUserDetail()
        .then(function(result) {
          appCtrl.user = result;
        }); 
      };

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

      appCtrl.init = init;
      appCtrl.userLoginMock = userLoginMock;
      appCtrl.userLogin = userLogin;

      appCtrl.init();


  }]);


  

})();
