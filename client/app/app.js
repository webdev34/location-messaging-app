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

	app.constant('APP_default_state', 'messages.new');
	
	var API_SERVER = window.location.host.includes("localhost") ? 'http://dev-external-api-lb-1845231822.us-west-2.elb.amazonaws.com:8000/' : "/";
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

	app.config(['$httpProvider', function($httpProvider) {  
		$httpProvider.interceptors.push(['$q', '$rootScope', 'FoundationApi', function($q, $rootScope, FoundationApi) {
			function extractData(response) {
				return response.data.data;
			}

			function extractError(response) {
				return response.data || {
					'code': "QVR_Server_Connection_Failed"
				};
			}

			function validate(response) {
				return typeof response.data.data === 'object';
			}

			return {
				request: function(config) {
					config.headers['Authorization'] = $rootScope.auth;
					return config;
				},
				response: function(response) {
					if (response.config.url.includes("/web1.1/") || response.config.url.includes("/droid1.1/")) {
						return validate(response) ? extractData(response) || $q.when(extractData(response)) : $q.reject(extractError(response));
					}else{
						return response || $q.when(response);
					}
				},
				responseError: function(rejection) {
					if (rejection.status == 401) {
						rejection.data = {
							status: 401,
							descr: 'unauthorized',
							code: 'QVR_Autherization_Failed'
						}
						return rejection.data;
					}

					rejection = extractError(rejection);
					
					FoundationApi.publish('main-notifications', {
						title: rejection.code.replace("QVR_", "").replace(/_/g, " "),
						content: '',
						color: 'fail',
						autoclose: '3000'
					});
					
					return $q.reject(rejection);
				}
			}
		}]);
	}]);
	
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
					{'title': 'Manage Campaign', 'state': 'home'},
					{'title': 'Compose Message', 'state': 'messages.new'},
					{'title': 'Asset Management', 'state': 'home'}
				],
				'reports' : [
					{'title': 'Report Center', 'state': 'home'}
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
							$rootScope.auth = response.authorization;
							
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