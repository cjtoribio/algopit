/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SignUpController', SignUpController);

	function SignUpController($scope, Auth, Alert){

	    $scope.signUp = function(isValid){
	        if(isValid)
	            Auth.signUp($scope.newUser);
	        else{
	            Alert.alert(Alert.messages.signUpError);
	        }
	    }

	}

})();