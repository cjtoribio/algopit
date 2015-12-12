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
		$scope.lists = null;
		Resource.List.query(function(lists){

			$scope.lists = _.filter(lists,function(list){
				return !_.contains(list.problems, problem._id);
			});
		});

		$scope.addToList = function(list){
			list.problems.push(problem._id);
			list.$update(function(){
				exit();	
			});
			
		}
	}

})();