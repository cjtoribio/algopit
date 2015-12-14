var TodoApp = angular.module('TodoApp', 
	['ngResource', 'ui.router', 'mgcrea.ngStrap','ngCookies',
	 'ngAnimate','ngMessages','ngSanitize','angularModalService',
	 'angular-loading-bar']
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
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
}])
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
					templateUrl:"components/problems/problems.html",
					controller:"ProblemsController"
				},
				'header': {
					resolve: { selected: function(){ return "problems"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('editProblem', {
			url: "/problems/edit/:id",
			views: {
				"body": {
					templateUrl:"components/problems/editProblem.html",
					controller:"EditProblemController"
				},
				'header': {
					resolve: { selected: function(){ return "problems"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('addProblem', {
			url: "/problems/add",
			views: {
				"body": {
					templateUrl:"components/problems/editProblem.html",
					controller:"EditProblemController"
				},
				'header': {
					resolve: { selected: function(){ return "problems"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('login', {
		  	url: "/login",
			views: {
				"body": {
					templateUrl:"components/login/login.html",
					controller:"LoginController"
				},
				'header': {
					resolve: { selected: function(){ return "login"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('settings', {
		  	url: "/settings",
			views: {
				"body": {
					templateUrl:"components/settings/settings.html",
					controller:"SettingsController"
				},
				'header': {
					resolve: { selected: function(){ return "settings"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('signup', {
		  	url: "/signup",
			views: {
				"body": {
					templateUrl:"components/signup/signup.html",
					controller:"SignUpController"
				},
				'header': {
					resolve: { selected: function(){ return "signup"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('lists', {
			abstract: true,
			url: "/lists",
			views: {
				"body" : {
					template: "<div ui-view='body'></div>",
					controller: function(){

					}
				},
				"header": {
					resolve: { selected: function(){ return "lists"; } },
					templateUrl:"components/navbar/navbar.html",
					controller:"NavbarController"
				}
			}
		})
		.state('lists.all', {
			url: "",
			views: {
				"body" : {
					templateUrl: "components/lists/lists.html",
					controller: "ListController"
				}
			}
		})
		.state('lists.view', {
			url: "/:id",
			views: {
				"body" : {
					templateUrl: "components/lists/viewList.html",
					controller: "ViewListController"
				}
			}
		})
		.state('lists.edit', {
			url: "/:id/edit",
			views: {
				"body" : {
					templateUrl: "components/lists/editList.html",
					controller: "EditListController"
				}
			}
		})
		.state('lab', {
		  url: "/lab",
		  templateUrl: "components/lab/lab.html"
		})
	;
})
.run(function(Auth){
    console.log(Auth.currentUser);
});