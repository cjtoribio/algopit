TodoApp.controller('RootController', ['$scope','$rootScope','Auth',
function($scope, $rootScope, Auth){
    $rootScope.isAuthenticated = function(){
        return $scope.currentUser != null;
    }
}]);