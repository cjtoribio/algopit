TodoApp.controller('SignUpController', ['$scope','Auth',
function($scope, Auth){
    
    $scope.checkAvailability = function(username){
    	console.log($scope.username);
    	Auth.getAvailability(username, function(data){
    		if(data.length > 0){
    			$scope.username.$setValidity('exists', false);
    		}else{
    			$scope.username.$setValidity('exists', true);
    		}
    	});
    };
    

}
]);