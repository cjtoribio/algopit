TodoApp.directive('algoTab', function(){
    return {
        restrict: 'E',
        templateUrl: 'shared/templates/tab.html',
        transclude: true,
        scope: {
        },
        controller: function($scope,lodash){
            var panes = $scope.panes = [];
            
            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };
            
            this.register = function(pane) {
                if (panes.length === 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        }
    };
});
TodoApp.directive('algoPane', function(){
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        require: '^algoTab',
        template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',
        scope: {
            title: '@'
        },
        link: function(scope, element, attrs, tabsCtrl){
            tabsCtrl.register(scope);
        }
    };
});