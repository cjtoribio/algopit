/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	
	app.controller('ListController', ListController);

	function ListController($scope, Resource, $filter, Auth, Alert, $state){
		
		var List = Resource.List;

		// inits
		List.query(function(lists){
			$scope.lists = lists;
			applyFilter1({})
		});

		// watches
		$scope.$watch( 
	        function(){ return angular.copy($scope.criteria); }, 
	        function(newCriteria){ 
	        	applyFilter1(newCriteria);
	        }, true
	    );

	    // public functions
	    $scope.canLeave = function(list){
	    	return _.includes(list.party, Auth.currentUser._id);
	    }
	    $scope.canJoin = function(list){
	    	return !$scope.canLeave(list);
	    }
	    $scope.isOwner = function(list){
	    	return list.author == Auth.currentUser._id;
	    }
	    $scope.isListAdmin = function(list){
	    	return list.isAdmin(Auth.currentUser);
	    }
	    $scope.joinList = function(list){
	    	list.$join(function(){
	    		Alert.alert(Alert.messages.lists.joinSuccess);
	    	});
	    }
	    $scope.leaveList = function(list){
	    	list.$leave(function(){
	    		Alert.alert(Alert.messages.lists.leaveSuccess);
	    	});
	    }
	    $scope.viewList = function(list){
	    	$state.go('lists.view', {id: list._id});
	    }
	    $scope.editList = function(list){
	    	$state.go('lists.edit', {id: list._id});
	    }
	    $scope.removeList = function(list){
	    	list.$remove(function(err){
	    		_.pull($scope.lists, list);	
	    		applyFilter1($scope.criteria);
	    	});	
	    }


		return;
		//////////////// NO EXECUTION PASS THIS POINT ////////////////
		function applyFilter1(criteria){			
	        $scope.lists1 = $filter('filter')($scope.lists || [], function(e) {
				return (criteria.name == null || _.includes(e.name, criteria.name))
					&& (criteria.user == null 
						|| _(e.admins || []).some(_.partial(userMatchesSearchString, criteria.user))
						|| _(e.party || []).some(_.partial(userMatchesSearchString, criteria.user))
						|| _([e.author]).some(_.partial(userMatchesSearchString, criteria.user)));
			});
		}
		function userMatchesSearchString(txt, user) {
			if (user == null) return false;
			return txt == null 
				|| _.includes(user.name, txt) 
				|| _.includes(user.username, txt)
				|| _.includes(_.get(user, 'spoj.username'), txt)
				|| _.includes(_.get(user, 'codeforces.handle'), txt);
		}
	}
})();