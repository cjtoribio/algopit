/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('NavbarController', NavbarController);

	function NavbarController($scope, selected, Auth){
	    $scope.selected = selected;
	    $scope.user = Auth;
	    $scope.currentUser = Auth.currentUser;
	}

})();
