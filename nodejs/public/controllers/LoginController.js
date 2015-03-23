TodoApp.controller('LoginController', ['$scope', '$alert' ,'Auth',
function($scope, $alert, Auth){
    
    $scope.login = function(credentials){
        Auth.login(credentials);
    };
   

}]);