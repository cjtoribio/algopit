/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SendToListController', SendToListController);

	function SendToListController($scope, Resource, close, $timeout, problem){
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 10);
		var exit = $scope.exit = function(result){
			$scope.active = false;
			close(result || false, 300);
		}


		console.log($scope);
		$scope.title = 'Send To List';
		$scope.content = 'Hellos this is a message';
		$scope.lists = null;
		Resource.List.query(function(lists){

			$scope.lists = lists;
			$scope.listsToAdd = _.filter(lists,function(list){
				return !_.includes(list.problems, problem._id);
			});
			$scope.listsToRemove = _.filter(lists,function(list){
				return _.includes(list.problems, problem._id);
			});
		});

		$scope.canAddTo = function(list){
			return !_.includes(list.problems, problem._id);
		}

		$scope.addToList = function(list){
			list.problems.push(problem._id);
			list.$update(function(){
				exit(true);	
			});
		}
		$scope.removeFromList = function(list){
			_.pull(list.problems, problem._id);
			list.$update(function(){
				exit(true);	
			});
		}
	}

})();