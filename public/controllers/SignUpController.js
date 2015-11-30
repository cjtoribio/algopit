TodoApp.controller('SignUpController', ['$scope','Auth','Alert',
function($scope, Auth, Alert){
    

    $scope.signUp = function(isValid){
        if(isValid)
            Auth.signUp($scope.newUser);
        else{
            Alert.alert(Alert.messages.signUpError);
        }
    }

}
]);