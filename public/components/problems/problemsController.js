/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	
	app.controller('ProblemsController', ProblemsController);

	function ProblemsController($scope, Resource, $location, $stateParams, $filter, Alert, Auth, Aside){

		// types
	    var Problem = Resource.Problem;
	    var UserProblem = Resource.UserProblem;
	    var Category = Resource.Category;
	    var Judge = Resource.Judge;

	    // variables
	    $scope.user = Auth;
	    $scope.filteredProblems1 = [];
	    $scope.filteredProblems2 = [];
	    $scope.criteria = {};
	    $scope.problemsSolved = {};
	    // loading
	    $scope.categories = Category.query();
	    $scope.judges = Judge.query();
	    if(Auth.isAuthenticated()){
	        UserProblem.query(
	            function(ret){
	                $scope.problemsSolved = _.keyBy(ret, 'problem');
	            }
	        );
	    }

	    // Watches filter
	    $scope.$watch(
	    	function(){ return angular.copy($scope.criteria); }, 
	        function(){ refreshFiltered(); }, 
	        true
	    );


	    // Table Logic
		$scope.isSolved = function(prob){
			var problemState = getProblemState(prob);
			return problemState === "SOLVED";
		}

		$scope.isPending = function(prob){
		    var problemState = getProblemState(prob);
		    return problemState === "PENDING_SOLVED";
		}
		$scope.isUnsolved = function(prob){
		    var problemState = getProblemState(prob);
		    return problemState === "UNSOLVED";
		}
		$scope.localDifficulty = function(prob){
			return ($scope.problemsSolved[prob._id] || {}).difficulty;
		}
	    $scope.sortBy = function(field){
	    	var withoutNulls = _.filter($scope.problems, field);
	    	var nullValued   = _.reject($scope.problems, field);

	    	var np = _.sortBy(withoutNulls, field).concat(nullValued);
	    	if(_.every($scope.problems, function(p, idx){
	    		return p._id == np[idx]._id;
	    	})){
	    		np = _.orderBy(withoutNulls, [field], ['desc']).concat(nullValued);
	    	}
	    	$scope.problems = np;
	    	refreshFiltered();
	    }
	    // /Table Logic
	    
	    // Criteria Logic
	    $scope.setCategory = function(category){
	        $scope.criteria.categories = category;
	    }
	    $scope.reset = function(){
	        $scope.criteria = {};
	    }
	    // /Criteria Logic


	    // Actions Logic
	    $scope.sendToList = function(prob){
	    	Aside.showSendToList(prob).then(
	    		function(result){
	    			console.log(result);
	    		}
	    	)
	    }
	    $scope.toggleSolved = function(prob){
	    	var state = getProblemState(prob);
	    	switch (state){
	    		case 'PENDING_SOLVED' : {
	    			// new state UNSOLVED
	    			setProblemState(prob, 'UNSOLVED');
	    			break;
	    		}
	    		case 'SOLVED' : {
	                Alert.alert(
	                    Alert.messages.problems.solved.verified
	                );
	    			break;
	    		}
	    		case 'UNSOLVED' : {
	    			setProblemState(prob, 'PENDING_SOLVED');
	    			break;
	    		}
	    	}
	    }
	    $scope.setDifficulty = function(prob){
	    	Aside.showSetDifficulty(prob, $scope.problemsSolved[prob._id]).then(
	    		function(up){
	    			$scope.problemsSolved[prob._id] = up;
	    		}
	    	);
	    }
	    $scope.removeProblem = function(problem, idx){
	    	Aside.confirm('Confirm Delete', 'Are you sure you want to remove this problem?')
			.then(function(ok){
				if(ok){
					problem.$remove(function(obj){
						$scope.problems.splice(idx,1);
						setTimeout(function(){refreshFiltered();},100);
					});
				}
			});
	    	return;
	    }
	    // /Actions Logic

		loadProblems();
	    return;

	    function refreshFiltered() {
	        if($scope.problems == null){
	            $scope.filteredProblems1 = [];
	        }else{
	            $scope.filteredProblems1 = $filter('filter')(
	                $scope.problems, 
	                $scope.criteria
	            );
	        }
	    }

	    function setProblemState(prob, state){
	    	Resource.Problem.toggleSolved(prob).$promise.then(
	    		function(up){
	    			$scope.problemsSolved[prob._id] = up;
	    			var msg = null;
	    			if(up.state === 'PENDING_SOLVED')
	    				msg = Alert.messages.problems.solved.success;
	    			if(up.state === 'UNSOLVED')
	    				msg = Alert.messages.problems.unsolved.success;
	    			Alert.alert(msg);
	    		}
	    	);
	    }

	    function getProblemState(prob){
	        if( !(_.has($scope.problemsSolved, prob._id)) || 
	            !(_.has($scope.problemsSolved[prob._id], 'state')) )
	            return 'UNSOLVED';
	        return $scope.problemsSolved[prob._id].state;
	    }


	    function loadProblems(){
	    	$scope.loading = true;
	    	fetch('','', 100, $scope, done);
	        function fetch(lastName, lastId, qty, $scope, done) {
	            Problem.query({
	                lastName: lastName,
	                lastId: lastId,
	                limit: qty
	            }, function(data) {
	                if (_.size(data) == 0) return done();
	                if ($scope.$$destroyed) return;
	                if ($scope.problems == null) $scope.problems = [];
	                $scope.problems.push.apply($scope.problems, data);
	                refreshFiltered();
	                if (_.size(data) < qty) return done();
	                fetch(data[data.length - 1].name,
	                    data[data.length - 1]._id,
	                    qty * 3,
	                    $scope,
	                    done
	                );
	            });
	        }
	    	function done(){
	    		$scope.loading = false;
	    	}
	    }

	}

})();