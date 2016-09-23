/*globals _,angular*/
(function(){'use strict';

	var app = angular.module('TodoApp');
	app.controller('ViewListController', ViewListController);

	function ViewListController($scope, Resource, $state, $interval, Time, Auth, Alert){
		$scope.params = $state.params;
		$scope.list   = null;
		$scope.remaining = null;

		Resource.List.stats($state.params).$promise.then(
			function(list){
				$scope.list = list;
				list.problems = _.map(list.problems, function(problem){
					return new Resource.Problem(problem);
				});
				computeAllSolvedBy();
				computeAllProgress();

			}
		);

		// timers
		var inter = $interval(function(){
			$scope.remaining = Time
				.remaining(_.property('list.endDate')($scope))
				.format('{D}d {H}h {M}m {S}s');
		}, 1000);



	    $scope.toggleSolved = function(prob){
	    	var verdict = GetSetVerdict(prob);
	    	var nverdict= verdict == 'PENDING_SOLVED' ? 'UNSOLVED' : 'PENDING_SOLVED';
	    	Resource.Problem.toggleSolved(prob).$promise.then(
	    		function(up){
					var message = null;
					if(up.state === "PENDING_SOLVED") 
						message = Alert.messages.problems.solved.success;
					if(up.state === "UNSOLVED") 
						message = Alert.messages.problems.unsolved.success;
					Alert.alert(message);
					GetSetVerdict(prob, nverdict);
					computeAllSolvedBy();
					computeAllProgress();
	    		}
	    	);
	    }
	    $scope.getProgress = function(user){
	    	var status = $scope.list.status[user.username];
	    	var cnt = _.filter(status, _.partial(_.isEqual, 'PENDING_SOLVED')).length + 
	    			  _.filter(status, _.partial(_.isEqual, 'SOLVED')).length;
	    	var tot = status.length;
	    	return tot ? (cnt / tot * 100) : 0;
	    }
	    $scope.isListAdmin = function(list) {
	    	return list.isAdmin(Auth.currentUser);
	    }
		$scope.isOwner = function(list){
			return _.property('author._id')(list) == _.property('currentUser._id')(Auth);
		}


		return;
		///////////////////
		function computeAllProgress(){
			_.each($scope.list.party, computeProgress);
		}
		function computeProgress(user){
	    	var status = $scope.list.status[user.username];
	    	var cntS= _.filter(status, _.partial(_.isEqual, 'SOLVED')).length;
	    	var cntP= _.filter(status, _.partial(_.isEqual, 'PENDING_SOLVED')).length;
	    	var tot = status.length;
	    	user.progress = {
	    		solved: tot ? cntS / tot * 100 : 0,
	    		pending_solved: tot ? cntP / tot * 100 : 0
	    	};
		}
		function computeAllSolvedBy(){
			_.each($scope.list.problems, computeSolvedBy);
		}
		function computeSolvedBy(prob){
	    	var idx = _.indexOf($scope.list.problems, prob);
	    	var solvedBy = _.map($scope.list.party, function(user){
				return {
					status: $scope.list.status[user.username][idx],
					username: user.username
				};
			});
			prob.solvedBy = solvedBy;
		}
		function GetSetVerdict(prob, verdict){
			var idx = _.indexOf($scope.list.problems, prob);
			if(verdict){
				return $scope.list.status[Auth.currentUser.username][idx] = verdict;
			}else{
				return $scope.list.status[Auth.currentUser.username][idx] || 'UNSOLVED';
			}
		}

	}

})();