/*globals _,angular*/
(function(){'use strict';

	var app = angular.module('TodoApp');
	app.controller('ViewListController', ViewListController);

	function ViewListController($scope, Resource, $state, $interval, Time, Auth, Alert){
		$scope.params = $state.params;
		$scope.list   = null;
		$scope.remaining = null;
		$scope.taskTimers = [];

		Resource.List.stats($state.params).$promise.then(
			function(list){
				$scope.list = list;
				list.problems = _.map(list.problems, function(problem){
					return new Resource.Problem(problem);
				});
				list.tasks = _.map(list.tasks, function(task){
					task.problem = new Resource.Problem(task.problem);
					return task;
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
			$scope.taskTimers = _.map($scope.list.tasks, function (task) {
				var obj = {};
				if(!task.timed){
					task.$visible = true;
				} else {
					if(Time.ellapsed(task.startDate).millis < 0){
						task.$visible = false;
						task.$remaining = 'Comming: ' + Time.remaining(task.startDate).format('{H}h {M}m {S}s');
					}else{
						if(Time.ellapsed(task.endDate).millis > 0){
							task.$visible = false;
							task.$remaining = 'Expired';
						}else{
							task.$visible = true;
							task.$remaining = 'Ending ' + Time.remaining(task.endDate).format('{H}h {M}m {S}s');
						}
					}
				}
			});
		}, 1000);



	    $scope.toggleSolved = function(task){
	    	var verdict = GetSetVerdict(task);
	    	var nverdict= verdict == 'PENDING_SOLVED' ? 'UNSOLVED' : 'PENDING_SOLVED';
	    	Resource.Problem.toggleSolved(task.problem).$promise.then(
	    		function(up){
					var message = null;
					if(up.state === "PENDING_SOLVED") 
						message = Alert.messages.problems.solved.success;
					if(up.state === "UNSOLVED") 
						message = Alert.messages.problems.unsolved.success;
					Alert.alert(message);
					GetSetVerdict(task, nverdict);
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
	    	return list && list.isAdmin(Auth.currentUser);
	    }
	    $scope.isListParty = function(list) {
	    	return list && list.isParty(Auth.currentUser);
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
			_.each($scope.list.tasks, computeSolvedBy);
		}
		function computeSolvedBy(task){
	    	var idx = _.indexOf($scope.list.tasks, task);
	    	var solvedBy = _.map($scope.list.party, function(user){
				return {
					status: $scope.list.status[user.username][idx],
					username: user.username
				};
			});
			task.problem.solvedBy = solvedBy;
		}
		function GetSetVerdict(task, verdict){
			var idx = _.indexOf($scope.list.tasks, task);
			if(verdict){
				return $scope.list.status[Auth.currentUser.username][idx] = verdict;
			}else{
				return $scope.list.status[Auth.currentUser.username][idx] || 'UNSOLVED';
			}
		}

	}

})();