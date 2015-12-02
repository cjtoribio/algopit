/*globals _,angular*/
(function(){'use strict';

	var app = angular.module('TodoApp');
	app.controller('ViewListController', ViewListController);

	function ViewListController($scope, Resource, $state, $interval, Time, Auth){
		$scope.params = $state.params;
		$scope.list   = null;
		$scope.remaining = null;

		Resource.List.stats($state.params).$promise.then(
			function(list){
				$scope.list = list;
				_.each(list.problems, function(problem, idx){
					var solvedBy = [];
					_.each(list.party, function(user){
						solvedBy.push({
							status: list.status[user.username][idx],
							username: user.username
						});
					});
					problem.solvedBy = solvedBy;
				});

			}
		);

		// timers
		var inter = $interval(function(){
			$scope.remaining = Time
				.remaining(_.property('list.endDate')($scope))
				.format('{D}d {H}h {M}m {S}s');
		}, 1000);


		$scope.isOwner = function(list){
			return _.property('author._id')(list) == _.property('currentUser._id')(Auth);
		}


		$scope.$on('$destroy', function(){
			$interval.cancel(inter);
		});

		return;
		///////////////////

	}

})();