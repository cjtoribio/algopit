TodoApp.directive('navbar', function(){
    return {
        restrict: 'E',
        templateUrl: '../templates/navbar.html',
        scope: {
            active: '='
        },
        controller: function($scope){
            
        }
    };
});