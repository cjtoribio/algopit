var TodoApp = angular.module('TodoApp', 
	['ngResource', 'ui.router','pasvaz.bindonce','ui.bootstrap',
	 'mgcrea.ngStrap','ngCookies','ngLodash','ngAnimate']
)
// .config(function($locationProvider, $routeProvider) {
//     $locationProvider.html5Mode(true);
//     $routeProvider
//       .when('/problems', {
//         templateUrl: 'views/problems.html',
//         controller: 'ProblemsController'
//       })
//       .when('/problems/add', {
//         templateUrl: 'views/editProblem.html',
//         controller: 'ProblemsController'
//       })
//       .when('/problems/edit/:id', {
//         templateUrl: 'views/editProblem.html',
//         controller: 'ProblemsController'
//       })
//       .when('/login', {
//         templateUrl: 'views/login.html'
//       })
//       .when('/lab', {
//         templateUrl: 'views/lab.html'
//       })
//       .otherwise({
//         redirectTo: '/problems'
//       });
// })
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/problems");
  $locationProvider.html5Mode(true);
  //
  // Now set up the states
  $stateProvider
		.state('problems', {
			url: "/problems",
			views: {
				"body": {
					templateUrl:"partials/problems.html",
					controller:"ProblemsController"
				},
				'header': {
					resolve: { selected: function(){ return "problems"; } },
					templateUrl:"partials/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('editProblem', {
			url: "/problems/edit/:id",
			views: {
				"body": {
					templateUrl:"partials/editProblem.html",
					controller:"ProblemsController"
				},
				'header': {
					resolve: { selected: function(){ return "problems"; } },
					templateUrl:"partials/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('login', {
		  url: "/login",
			views: {
				"body": {
					templateUrl:"partials/login.html",
					controller:"LoginController"
				},
				'header': {
					resolve: { selected: function(){ return "login"; } },
					templateUrl:"partials/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('settings', {
		  url: "/settings",
			views: {
				"body": {
					templateUrl:"partials/settings.html",
					controller:"SettingsController"
				},
				'header': {
					resolve: { selected: function(){ return "settings"; } },
					templateUrl:"partials/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('lab', {
		  url: "/lab",
		  templateUrl: "views/lab.html"
		})
	;
});