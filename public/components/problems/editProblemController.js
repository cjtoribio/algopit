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
	    };

	    $scope.predict = function(problem) {
	    	if(!problem.url)return;
	    	predict(problem);
	    };

	    ///// helpers /////
	    function predict(problem) {
	    	var strategies = {
	    		codeforces: {
	    			belongs: function () {
	    				var regex = /codeforces\.com/;
	    				return regex.exec(problem.url);
	    			},
	    			predict: function () {
	    				var url = problem.url;
	    				var regex = /.*codeforces\.com\/(contest|problemset\/problem)\/(\d+).*\/([A-Z0-9]+)/;
	    				var match = url.match(regex);
	    				if(!match)return false;
	    				var contestId = match[2];
	    				var letter    = match[3];
	    				problem.sourceReferenceId = contestId + '|' + letter;
	    				problem.judge = 'Codeforces';
	    				return true;
	    			}
	    		}, 
	    		spoj: {
	    			belongs: function () {
	    				var regex = /spoj\.(com|pl)/;
	    				return regex.exec(problem.url);
	    			},
	    			predict: function () {
	    				var url = problem.url;
	    				var regex = /.*spoj\.(com|pl)\/problems\/([A-Z0-9]+)/;
	    				var match = url.match(regex);
	    				if(!match)return false;
	    				var sourceId = match[2];
	    				problem.sourceReferenceId = sourceId;
	    				problem.judge = 'SPOJ';
	    				return true;
	    			}
	    		}
	    	};
	    	for(var judge in strategies){
	    		var strategy = strategies[judge];
	    		if(strategy.belongs() && strategy.predict()){
	    			break;
	    		}
	    	}
	    }

	}



})();
