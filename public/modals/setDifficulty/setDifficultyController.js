/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SetDifficultyController', SetDifficultyController);

	function SetDifficultyController($scope, Resource, close, $timeout, problem, userProblem, Auth){
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 10);
		
		$scope.difficulty = _.property('difficulty')(userProblem) || 1;
		$scope.setDifficulty = function(number){
			$scope.difficulty = number;
		}

		var exit = $scope.exit = function(result){
			$scope.active = false;
			close(result || userProblem, 300);
		}

		$scope.remove = function(){
			$scope.save(null);
		}
		$scope.save = function(difficulty){
			Resource.Problem.setDifficulty({
				_id: problem._id,
				difficulty: difficulty
			}).$promise.then(
				function(up){
					exit(new Resource.UserProblem(up));
				}
			);
		}

	}

})();