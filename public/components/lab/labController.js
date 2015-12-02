/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('LabController', LabController);

	function LabController($scope, $stateParams){
		$scope.open = function(){
			alert(1);
		};
		console.log($stateParams);
		$scope.a = "carlos";

	}

})();