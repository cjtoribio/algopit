TodoApp.controller('LabController', ['$scope','$stateParams',
function($scope, $stateParams){
    
    $scope.open = function(){
        alert(1);
    };
    console.log($stateParams);
    $scope.a = "carlos";

}]);