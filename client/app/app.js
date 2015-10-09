(function() {
	'use strict';

	var app = angular.module('enterprise-portal', [
			'ui.router',
			'ngAnimate',
			'ngMap',
			'ngCookies',
			'flow',
			'isteven-multi-select',

			// foundation
			'foundation',
			'foundation.dynamicRouting',
			'foundation.dynamicRouting.animations',

			// Modules
			'followers',
			'users',
			'user-profile',
			'messages',
			'locations',
			'reporting',
			'enterprise',
			'reporting',
			'admin'
		])
		.config(config)
		.run(run);

	app.constant('APP_default_state', 'messages.new');
	
	//var API_SERVER = window.location.host.includes("localhost") ? 'http://dev-external-api-lb-1845231822.us-west-2.elb.amazonaws.com:8000/' : "/";


	//var API_SERVER = 'http://api-dev.quiver.zone:80/';
	var API_SERVER = 'http://localhost:8000/';

	app.constant('API_SERVER', API_SERVER);
	app.constant('API_URL', API_SERVER + '1.1');
	//app.constant('API_URL_DROID', API_SERVER + 'droid1.1');

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

	app.config(['$httpProvider', '$stateProvider', function($httpProvider, $stateProvider) {  
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/home.tmpl.html'
		});
		$httpProvider.interceptors.push([
			'$q',
			'$rootScope',
			'$location',
			'FoundationApi',
			
			function(
				$q,
				$rootScope,
				$location,
				FoundationApi
			) {
				function extractData(response) {
					return response.data.data;
				}

				function extractError(response) {
					return response.data || {
						'code': "QVR_Server_Connection_Failed"
					};
				}

				return {
					request: function(config) {
						// add auth header for each request
						// allows for auth id refresh on new login
						config.headers['Authorization'] = $rootScope.auth;
						return config;
					},
					response: function(response) {
						// filter for only API requests
						if (response.headers()['content-type'] === "application/json; charset=utf-8") {
							var appData = extractData(response);
							var errorData = extractError(response);
							
							if (!response.data){
								return $q.reject(errorData)
							}
							
							switch(response.data.code){
								case 'QVR_RESULT' || 'QVR_RESULT_OK':
									return appData || $q.when(appData)
									break;
								case 'QVR_RESULT_ERROR_NO_SESSION':
									// can't use $state because of cyclical dependency
									$location.path('/');
									return $q.reject(errorData);
									break;
								default:
									return $q.reject(errorData)
									break;
							}
						}
						
						// return unchanged for template requests
						return response || $q.when(response);
					},
					responseError: function(rejection) {
						// transport protocol errors only, application protocol errors all result in status 200
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
			}
		]);
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
					{'title': 'Manage Campaign', 'state': 'messages.manage-campaign'},
					{'title': 'Compose Message', 'state': 'messages.new'},
					{'title': 'Manage Locations', 'state': 'messages.manage-locations'},
					{'title': 'Asset Management', 'state': 'messages.asset'}
				],
				'reporting' : [
					{'title': 'Report Center', 'state': 'reporting.center'}
				],
				'enterprise' : [
					{'title': 'Enterprise Profile', 'state': 'enterprise.profile'},
					{'title': 'User Profile', 'state': 'enterprise.user-profile'},
					{'title': 'Manage Users', 'state': 'enterprise.manage-users'},
					{'title': 'Manage Followers', 'state': 'enterprise.manage-followers'}
				]
			};

			function setNavigationState() {
				appCtrl.gNavStateIs = "";

				var stateArray = ['messages', 'admin', 'enterprise', 'reporting'];

				for (var i = 0; i < stateArray.length; i++) {

					if ( ($state.current.name).includes(stateArray[i]) ) {
						appCtrl.gNavStateIs = stateArray[i];
						break;
					}
				}

				appCtrl.subnav = appCtrl.navObj[appCtrl.gNavStateIs];				
				appCtrl.showHeader = appCtrl.currentState.current.name != 'home';
			}

			/*
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
				$dialogs.error("Something went wrong!", error);
				console.error("$stateChangeError: ", toState, error);
			});
			*/

			$rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
					//console.log(fromState.name, "-->", toState.name);
					setNavigationState();
				}
			);


			function checkIfLoggedIn() {
				//console.log('checking if loggedin');

				if (!UserModel.isLoggedIn) {
					//console.log('not logged in');
					//event.preventDefault();
					goToLogin();
					return;
				}
			}

			$rootScope.$on('$routeChangeStart', function (event) {
				//console.log('routechangestart');
				checkIfLoggedIn();

			});
			
			function init() {
				checkIfLoggedIn();
				setNavigationState();
				goToHomePage();
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
							
							// suppress false positives
							if (!response.code){
								FoundationApi.publish('main-notifications', {
									title: 'Login Succesful',
									content: '',
									color: 'success',
									autoclose: '3000'
								});
								appCtrl.userLoginInfo = {};
								goToHomePage();
							}else{
								FoundationApi.publish('main-notifications', {
									title: 'Login Failed',
									content: response.code,
									color: 'fail',
									autoclose: '3000'
								});
							}
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

			appCtrl.userLogout = function(){
				appCtrl.userLoginInfo = {};
				UserModel.logout();
				goToLogin();
			}



			init();
		}
	]);

	

})();