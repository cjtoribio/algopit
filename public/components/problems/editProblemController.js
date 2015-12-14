/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('EditProblemController', EditProblemController);

	function EditProblemController($scope, Resource, $location, $stateParams, $filter, Alert, Auth){

		// types
	    var Problem = Resource.Problem;
	    var UserProblem = Resource.UserProblem;
	    var Category = Resource.Category;
	    var Judge = Resource.Judge;

	    // variables
	    $scope.user = Auth;

	    // loading
	    $scope.categories = Category.query();
	    $scope.judges = Judge.query();
	    $scope.$watch('problem.tags',
	    	function(nv){
	    		$scope.editingTags = (nv||[]).join(',');
	    	}
	    );
	    if($stateParams.id){
	    	$scope.problem = Problem.get({id:$stateParams.id});
	        $scope.isEdit = true;
	    }else{
	        $scope.problem = { categories:[] };
	    	$scope.editingTags = '';
	        $scope.isNew = true;
	    }
	    
	    $scope.toggleSelection = function (category) {
	        var idx = $scope.problem.categories.indexOf(category);
	        if (idx > -1) {
	            $scope.problem.categories.splice(idx, 1);
	        }
	        else {
	            $scope.problem.categories.push(category);
	        }
	    }
	   	$scope.setTags = function(tags){
	    	$scope.problem.tags = _.filter(_.map((tags||'').split(','),_.trim));
	    }

	    $scope.sendProblem = function(problem){
	        function callback(){
	            $location.path('/problems').replace();
	        }
	        if($scope.isEdit)
	            $scope.problem.$update(callback);
	        else
	            (new Problem($scope.problem)).$save(callback);
	    }

	}

})();