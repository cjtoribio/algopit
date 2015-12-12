/*globals _,angular*/
(function(){'use strict';

	var app = angular.module('TodoApp');
	app.controller('EditList', EditList);

	function EditList($scope, $state, Resource, Auth){
		$scope.params = $state.params;

		if($state.params.id != 'new'){
			Resource.List.get($state.params).$promise.then(
				function(list){
					$scope.list = list;
				}
			);
			
		}else{
			$scope.list = createList();
		}

		$scope.getProblems = function(text){
			if(_.size(text) < 3)return;
			return Resource.Problem.search({
					name: text, 
					category: text
			}).$promise.then(function(probs){
				_.each(probs, function(prob){
					var pn = '';
					if(prob.judge)pn += prob.judge + ': ';
					pn += makeBold(prob.name, text);
					if(prob.categories && prob.categories.length){
						var cats = _.map(prob.categories, function(cat){
							return makeBold(cat, text);
						});
						pn += '(' + _.trunc(cats.join(', '),40) + ')';
					}
					prob.prettyName = pn;
				});
				return probs;
			});
		}

		$scope.getUsers = function(text){
			return Resource.User.search({
					name: text, 
					username: text
			}).$promise.then(function(users){
				_.each(users, function(user){
					var pn = makeBold(user.username, text);
					if(user.name)
						pn += "(" + makeBold(user.name, text) + ")";
					user.prettyName = pn;
				});
				return users;
			});
		}

		$scope.$watch('newProblem', function(nv){
			if(!_.isObject(nv))return;
			$scope.list.problems.push(nv);
			$scope.newProblem = null;
		});
		$scope.$watch('newUser', function(nv){
			if(!_.isObject(nv))return;
			$scope.list.party.push(nv);
			$scope.newUser = null;
		});

		$scope.remove = function(item,items){
			_.pull(items,item);
		}
	    $scope.moveProblem = function(prob, delta){
	    	var idx = _.indexOf($scope.list.problems, prob);
	    	if(idx + delta < 0 || idx + delta >= $scope.list.problems.length)return;
	    	var tmp = $scope.list.problems[idx+delta];
	    	$scope.list.problems[idx+delta] = prob;
	    	$scope.lislist.problemsts[idx] = tmp;
	    }

		$scope.submit = function(list){
			if(list._id){
				list.$update(redirectToView);
			}else{
				list.$save(redirectToView);
			}
			function redirectToView(){
				$state.go('lists.view', {id: $scope.list._id});
			}
		}

		return;
		///////////////////
		function makeBold(text, patt) {
		    return text.replace(
		        new RegExp('(' + patt + ')', 'gi'),
		        '<b>$1</b>'
		    );
		}
		function createList(){
			return new Resource.List({
				startDate : new Date(),
				endDate	  : null,
				author    : Auth.currentUser,
				party     : [],
				problems  : [],
				name      : 'Untitled',
			});
		}
	}

})();