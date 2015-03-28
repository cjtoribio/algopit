TodoApp.controller('LoginController', ['$scope' ,'Auth',
function($scope, Auth){
    
    $scope.login = function(credentials){
        Auth.login(credentials);
    };
   

}]);