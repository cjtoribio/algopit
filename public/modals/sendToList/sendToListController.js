/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SendToListController', SendToListController);

	function SendToListController($scope, Resource, close, $timeout, problem){
		console.log(problem);
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 200);
		var exit = $scope.exit = function(){
			close(null, 200);
			$scope.active = false;
		}


		console.log($scope);
		$scope.title = 'Send To List';
		$scope.content = 'Hellos this is a message';
		Resource.List.query(function(lists){
			$scope.lists = lists;
		});

		$scope.addToList = function(list){
			list.problems.push(problem._id);
			list.$update();
			exit();
		}
	}

})();