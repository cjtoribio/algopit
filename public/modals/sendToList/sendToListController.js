/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SendToListController', SendToListController);

	function SendToListController($scope, Resource, close, $timeout, problem, Auth){
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
			lists = _.filter(lists, function(list){
				return _.includes(list.admins, Auth.currentUser._id) || list.author == Auth.currentUser._id;
			});
			$scope.lists = lists;
			$scope.listsToAdd = _.filter(lists,function(list){
				return !_.find(list.tasks, {problem: problem._id});
			});
			$scope.listsToRemove = _.filter(lists,function(list){
				return _.find(list.tasks, {problem: problem._id});
			});
		});

		$scope.canAddTo = function(list){
			return !_.find(list.tasks, {problem: problem._id});
		}

		$scope.addToList = function(list){
			list.tasks.push({problem: problem._id});
			list.$update(function(){
				exit(true);	
			});
		}
		$scope.removeFromList = function(list){
			_.remove(list.tasks, {problem: problem._id});
			list.$update(function(){
				exit(true);	
			});
		}
	}

})();