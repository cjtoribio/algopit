/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('ConfirmController', ConfirmController);

	function ConfirmController($scope, Resource, close, $timeout, title, message){
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 10);
		var exit = $scope.exit = function(result){
			$scope.active = false;
			close(result || false, 300);
		}

		$scope.title = title || 'Confirm';
		$scope.message = message || 'Are you sure?';

		$scope.sendYes = function(){
			exit(true);
		}

	}

})();