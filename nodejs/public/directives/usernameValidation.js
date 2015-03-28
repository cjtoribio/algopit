TodoApp.directive('usernameValidation', function($http, $q, $timeout){
	return {
		restrict: 'A',
		require: '^ngModel',
        link: function(scope, element, attrs, ngModel) {
            scope.timer = null;
            ngModel.$asyncValidators.username = function(modelValue, viewValue) {
            	if(scope.timer)
            		$timeout.cancel(scope.timer);
            	scope.timer = $timeout(function(){
            		return $http.get('/api/users/checkAvailable/' + viewValue).then(
	                    function(response) {
	                        if (!response.data) {
	                            return $q.reject('unavailable');
	                        }
	                        return true;
	                    }
	                );
            	}, 1000);
                return scope.timer;
            };
        }

	};
});