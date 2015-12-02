/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');

	app.controller('LoginController', loginController);

	function loginController($scope, Auth){
	    $scope.login = function(credentials){
	        Auth.login(credentials);
	    };
	}

})();