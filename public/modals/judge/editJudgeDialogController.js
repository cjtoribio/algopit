(function() {
'use strict';

    angular
        .module('TodoApp')
        .controller('EditJudgeDialogController', EditJudgeDialogController);

    function EditJudgeDialogController($scope, Resource, judge, $timeout, close) {
		$scope.active = false;
		$timeout(function() { $scope.active = true; }, 10);
		var exit = $scope.exit = function(result){
			$scope.active = false;
			close(result || false, 300);
		}

		var Judge = Resource.Judge;
		$scope.judge = judge;

		$scope.save = function() {
			judge.$update()
			.then(function(){
				exit(true);
			});
		}

    }
})();