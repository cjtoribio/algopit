TodoApp.controller('SignUpController', ['$scope','Auth',
function($scope, Auth){
    

    $scope.signUp = function(newUser){
        Auth.signUp(newUser);
    }

}
]);