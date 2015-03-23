TodoApp.controller('NavbarController', ['$scope', 'selected', 'Auth',
function($scope, selected, Auth){
    $scope.selected = selected;
    $scope.user = Auth;
}]);