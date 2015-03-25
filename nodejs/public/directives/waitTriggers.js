TodoApp.directive('waitTrigger', function(){
	return {
		restrict: 'A',
		scope:{
			waitCallback: '&',
			waitIdleTime: '@'
		},
		controller: function($scope, $element, $timeout, $alert){
			if($scope.waitIdleTime == null)
				$scope.waitIdleTime = 1000;
			else
				$scope.waitIdleTime = parseInt($scope.waitIdleTime);
			$scope.timer = null;
			$element.on('keyup', function(event){
				if($scope.timer)
					$timeout.cancel($scope.timer);
				$scope.timer = $timeout(function(){
					$scope.waitCallback();
					$alert({
						duration: 3,
						content: 'wtf',
						placement: 'top-right',
						type: 'info'
					})
				}, $scope.waitIdleTime);
			});
		}
	};
});