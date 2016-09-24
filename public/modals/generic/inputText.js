/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('InputTextDialogController', InputTextDialogController);

	function InputTextDialogController($scope, Resource, close, $timeout, options, Auth){
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 10);
		
		$scope.text = options.text;
		$scope.label= options.label || options.title;
		$scope.title= options.title || options.label;
		var exit = $scope.exit = function(code, body){
			$scope.active = false;
			close({code: code, body: body}, 300);
		}

	}

})();