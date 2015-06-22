(function() {
	'use strict';

	var app = angular.module('enterprise-portal', [
			'ui.router',
			'ngAnimate',
			'ngMap',
			'ngCookies',

			// foundation
			'foundation',
			'foundation.dynamicRouting',
			'foundation.dynamicRouting.animations',

			// Modules
			'user-profile',
			'messages',
			'enterprise',
			'admin'
		])
		.config(config)
		.run(run);

	app.constant('APP_default_state', 'messages.dashboard');
	
	//var API_SERVER = 'http://localhost:8000/';
	var API_SERVER = 'http://dev-external-api-lb-1845231822.us-west-2.elb.amazonaws.com:8000/';
	app.constant('API_SERVER', API_SERVER);
	app.constant('API_URL', API_SERVER + 'web1.1');
	app.constant('API_URL_DROID', API_SERVER + 'droid1.1');

	config.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider'];

	function config($httpProvider, $urlProvider, $locationProvider) {
		$urlProvider.otherwise('/');

		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});

		$locationProvider.hashPrefix('!');
	}

	function run() {
		FastClick.attach(document.body);
	}

	app.controller('AppCtrl', [
		'$http',
		'UserModel',
		'FoundationApi',
		'$rootScope',
		'$state',
		'APP_default_state',
		
		function(
			$http,
			UserModel,
			FoundationApi,
			$rootScope,
			$state,
			APP_default_state
		) {
			var appCtrl = this;

			appCtrl.user = UserModel.user;
			
			appCtrl.currentState = $rootScope.$state;
			appCtrl.userLoginInfo = {};
			
			appCtrl.showHeader = false;
			
			appCtrl.gNavStateIs = "";
			appCtrl.subnav = [];
			appCtrl.navObj = {
				'admin' : [
					{'title': 'Admin Center', 'state': 'admin'}
				],
				'messages' : [
					{'title': 'Campaign Center', 'state': 'messages.dashboard'},
					{'title': 'Manage Campaign', 'state': 'messages.dashboard'},
					{'title': 'Compose Message', 'state': 'messages.new'},
					{'title': 'Asset Management', 'state': 'messages.dashboard'}
				],
				'reports' : [
					{'title': 'Report Center', 'state': 'messages.dashboard'}
				],
				'enterprise' : [
					{'title': 'Enterprise Profile', 'state': 'enterprise.profile'}
				]
			};

			/*
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
				$dialogs.error("Something went wrong!", error);
				console.error("$stateChangeError: ", toState, error);
			});
			*/

			$rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
					console.log(fromState.name, "-->", toState.name);
					setNavigationState();
				}
			);

			$rootScope.$on('$routeChangeStart', function (event) {
				if (!UserModel.isLoggedIn) {
					event.preventDefault();
					goToLogin();
				}
			});
			
			function init() {
				setNavigationState();
				goToHomePage();
			}

			function setNavigationState() {
				appCtrl.gNavStateIs = "";

				var stateArray = ['messages', 'admin', 'enterprise'];
				
				for (var i = 0; i < stateArray.length; i++) {
					if (appCtrl.currentState.current.name.includes(stateArray[i])) {
						appCtrl.gNavStateIs = stateArray[i];
						break;
					}
				}
				
				appCtrl.subnav = appCtrl.navObj[appCtrl.gNavStateIs];
				
				appCtrl.showHeader = appCtrl.currentState.current.name != 'home';
			}

			function goToLogin() {
				$state.go('home');
			}

			function goToHomePage() {
				$state.go(APP_default_state);
			}

			appCtrl.userLogin = function() {
				UserModel.login(appCtrl.userLoginInfo)
					.then(
						function success(response) {
							//$http.defaults.headers.common.Authorization = response.authorization
							$http.defaults.headers.common['Authorization'] = "Basic " + response.authorization;
							
							appCtrl.user = UserModel.user;
							
							FoundationApi.publish('main-notifications', {
								title: 'Login Succesful',
								content: '',
								color: 'success',
								autoclose: '3000'
							});

							goToHomePage();
						},
						function error(response) {
							FoundationApi.publish('main-notifications', {
								title: 'Login Failed',
								content: response.code,
								color: 'fail',
								autoclose: '3000'
							});
						}
					);
			}

			init();
		}
	]);

})();