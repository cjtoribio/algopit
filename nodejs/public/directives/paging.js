TodoApp.directive("pagedTable", function(){
    return {
    restrict: 'E',
    transclude: true,
    scope: {
        collection: '=',
        numPerPage: '=',
        currentPage:'=',
        open:'='
    },
    templateUrl: '../templates/pagedTable.html',
    controller: function($scope,$attrs) {
        var columns = $scope.columns = [];
        this.addColumn = function(column) {
            columns.push(column);
        };
    }
  };
});

TodoApp.directive("columnDef", function(){
    return {
        require: '^pagedTable',
        restrict: 'E',
        transclude: true,
        scope: {
            header: '@',
            type: '@',
            property: '@',
            linkProperty: '@',
            separator: '@',
            edit: '&',
            open: '=',
            remove: '&'
        },
        template: '',
        link: function(scope, element, attrs, pagedTableCtrl) {
            // console.log(scope.open);
            // console.log(scope.open());
            // console.log(scope.open()());
            pagedTableCtrl.addColumn(scope);
        }
  };
});
TodoApp.directive("columnText", function(){
    return {
        restrict: 'E',
        scope: {
            text: '@'
        },
        template: '<td><span ng-bind="text"></span></td>',
        link: function(scope, element, attrs) {
        }
  };
});
TodoApp.directive("columnLink", function(){
    return {
        restrict: 'E',
        scope: {
            text: '@',
            link: '@'
        },
        template: '<td><a href="{{link}}">{{text}}</span></td>',
        link: function(scope, element, attrs) {
            console.log(scope.link);
        }
  };
});
TodoApp.directive("columnList", function(){
    return {
        restrict: 'E',
        scope: {
            list: '=',
            separator: '@'
        },
        template: '<td><span ng-bind="text"></span></td>',
        link: function(scope, element, attrs) {
            scope.text = scope.list.join(scope.separator);
        }
    };
});
TodoApp.directive("columnActions", function(){
    return {
        restrict: 'E',
        scope: {
            edit: '&',
            remove: '&',
            open: '&'
        },
        template: ' <td>\
                        <button ng-if="open" ng-click="open()" class="btn btn-default btn-xs">Open</button></a>\
                        <button ng-if="edit" ng-click="edit()" class="btn btn-default btn-xs">Edit</button>&nbsp\
                        <button ng-if="remove" ng-click="remove()" class="btn btn-default btn-xs">Remove</button></a>\
                    </td>',
        link: function(scope, element, attrs) {
            console.log(scope.open()());
        }
    };
});

