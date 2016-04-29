/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	app.controller('SettingsController', SettingsController);


    function SettingsController($scope, Auth, Resource, Alert){
        $scope.user = Auth.currentUser;
        $scope.save = function(){
            new Resource.User($scope.user).$update(function(){
                Alert.alert(Alert.messages.settings.success);
            });
        }

        $scope.refresh = function(judge){
            $scope.user.$refresh({judge: judge});
        }

        $scope.isRefreshing = function(judge){
            var dt = $scope.user[judge].refresh;
            if(dt && dt < new Date())
                return true;
            return false;
        }
    
    }

})();