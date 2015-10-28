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

	//default view
	app.constant('APP_default_state', 'messages.new');
	

	var API_SERVER = 'http://api-dev.quiver.zone:80/';
	//var API_SERVER = 'http://localhost:8000/';

	app.constant('API_SERVER', API_SERVER);
	app.constant('API_URL', API_SERVER + '1.1');

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
		// $httpProvider.interceptors.push([
		// 	'$q',
		// 	'$rootScope',
		// 	'$location',
		// 	'FoundationApi',
		// 	function($q, $rootScope, $location, FoundationApi) {
		// 		function extractData(response) {
		// 			return response.data.data;
		// 		}

		// 		function extractError(response) {

		// 			return response.data || {
		// 				'code': "QVR_Server_Connection_Failed"
		// 			};
		// 		}

		// 		return {
		// 			request: function(config) {
		// 				// add auth header for each request
		// 				// allows for auth id refresh on new login
		// 				config.headers['Authorization'] = $rootScope.auth;
		// 				return config;
		// 			},
		// 			response: function(response) {
		// 				// filter for only API requests
		// 				if (response.headers()['content-type'] === "application/json; charset=utf-8") {
		// 					var appData = extractData(response);
		// 					var errorData = extractError(response);
							
		// 					if (!response.data){
		// 						return $q.reject(errorData)
		// 					}
							
		// 					switch(response.data.code){
		// 						case 'QVR_RESULT' || 'QVR_RESULT_OK':
		// 							return appData || $q.when(appData)
		// 							break;
		// 						case 'QVR_RESULT_ERROR_NO_SESSION':
		// 							// can't use $state because of cyclical dependency
		// 							$location.path('/');
		// 							return $q.reject(errorData);
		// 							break;
		// 						default:
		// 							return $q.reject(errorData)
		// 							break;
		// 					}
		// 				}
						
		// 				// return unchanged for template requests
		// 				return response || $q.when(response);
		// 			},
		// 			responseError: function(rejection) {
		// 				// transport protocol errors only, application protocol errors all result in status 200

		// 				if (rejection.status == 401) {
		// 					rejection.data = {
		// 						status: 401,
		// 						descr: 'unauthorized',
		// 						code: 'QVR_Autherization_Failed'
		// 					}
		// 					return rejection.data;
		// 				}

		// 				rejection = extractError(rejection);
						
		// 				FoundationApi.publish('main-notifications', {
		// 					title: rejection.code.replace("QVR_", "").replace(/_/g, " "),
		// 					content: '',
		// 					color: 'fail',
		// 					autoclose: '3000'
		// 				});
						
		// 				return $q.reject(rejection);
		// 			}
		// 		}
		// 	}
		// ]);
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

			//appCtrl.user = UserModel.user;
			appCtrl.user = {
	      "sid": "56312b71a01df5eb414ac376",
	      "deleted": false,
	      "created": 1446062961619,
	      "lastModified": 1446062969931,
	      "username": "quiver",
	      "usernameKey": "quiver",
	      "emailAddress": "quiver@quiver.zone",
	      "suspended": false,
	      "firstName": "Quiver",
	      "lastName": "Media",
	      "fullName": "Quiver Media",
	      "enterprise": "56312b71a01df5eb414ac377",
	      "title": "",
	      "description": "Quiver brings innovation to mobile communications by delivering the world's most flexible, fun and feature-rich messaging platform.",
	      "likeCount": 0,
	      "messageCount": 0,
	      "friendCount": 0,
	      "followingCount": 0,
	      "followerCount": 16
	    }
			
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
					{'title': 'All Messages (Temp)', 'state': 'messages.all-messages'},

					{'title': 'Manage Locations', 'state': 'messages.manage-locations'},
					{'title': 'Asset Management', 'state': 'messages.asset'},
					{'title': 'Communications', 'state': 'messages.communications'}
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

			
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
				$dialogs.error("Something went wrong!", error);
				console.error("$stateChangeError: ", toState, error);
			});
			

			$rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {

					if (!fromState.name) {
						//console.log('refresh or logged in land');
						checkIfLoggedIn();

						//console.log('state: ' + JSON.stringify(toState));

						if (toState.name == 'home') {
							goToHomePage();
						}

						if (!appCtrl.user) {
							appCtrl.getAccount();
						}	
					}
					//console.log(fromState.name, "-->", toState.name);
					setNavigationState();
				}
			);

			$rootScope.$on('$routeChangeStart', function (event) {
				//console.log('routechangestart');
				checkIfLoggedIn();
			});

			$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
			    console.log(unfoundState.to); // "lazy.state"
			    console.log(unfoundState.toParams); // {a:1, b:2}
			    console.log(unfoundState.options); // {inherit:false} + default options
			});


			function checkIfLoggedIn() {
				//console.log('checking if loggedin');

				if (!UserModel.isLoggedIn) {
					//console.log('not logged in');
					event.preventDefault();
					appCtrl.goToLogin();
					return;
				}
			}

			function goToHomePage() {
				//console.log('going home');
				$state.go(APP_default_state);
			}

			// function userModelUpdated() {
			// 	appCtrl.user = UserModel.user;
			// }

			appCtrl.goToLogin = function() {
				//console.log('going to login');
				$state.go('home');

			}

			appCtrl.getAccount = function () {
				appCtrl.user = UserModel.user;

				if (!UserModel.user) {
					UserModel.getAccount(UserModel.userID)
						.then (
							function success(response) {
								
							},
							function error(response) {
								appCtrl.userLogout();

								FoundationApi.publish('main-notifications', {
									title: 'Login Failed',
									content: response.code,
									color: 'fail',
									autoclose: '3000'
								});

							});
				} else {
					appCtrl.user = UserModel.user;
				}
				//console.log('userModel: ' + JSON.stringify(UserModel.user));
			}
	
			appCtrl.userLogin = function() {
				UserModel.login(appCtrl.userLoginInfo)
					.then(
						function success(response) {
							appCtrl.user = UserModel.user;
							//console.log('appctrl user:' + JSON.stringify(appCtrl.user));
							
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
				appCtrl.goToLogin();
			}






		}
	]);

	

})();