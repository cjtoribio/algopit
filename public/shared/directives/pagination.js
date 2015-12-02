TodoApp.directive("algoPagination", function(){
    return {
    restrict: 'E',
    scope: {
        numPerPage: '=?',
        currentPage: '=?',
        src: '=',
        dst: '='
    },
    templateUrl: 'shared/templates/pagination.html',
    controller: function($scope,$attrs) {
        $scope.numPerPage = $scope.numPerPage || 10;
        $scope.currentPage = $scope.currentPage || 1;
        function refreshPaging(){
            var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
                end   = begin + $scope.numPerPage;
            $scope.pages = [];
            var b = Math.max(1, $scope.currentPage - 5);
            var e = Math.min($scope.numPages()+1, $scope.currentPage + 6);
            b = Math.max(1, Math.min(b , e - 11));
            e = Math.min($scope.numPages()+1, Math.max(e , b + 11));
            for(var i = b; i < e; ++i)
                $scope.pages.push(i);
                
            if($scope.numPages() < $scope.currentPage)
                $scope.currentPage = Math.max($scope.numPages(), 1);
                
            $scope.dst = ($scope.src || []).slice(begin, end);
        }
        $scope.numPages = function () {
            return Math.ceil(($scope.src || []).length / $scope.numPerPage);
        };
        $scope.nextPage = function(){
            $scope.currentPage += $scope.numPages() > $scope.currentPage ? 1 : 0;
        }
        
        $scope.prevPage = function(){
            $scope.currentPage += 1 < $scope.currentPage ? -1 : 0;
        }
        $scope.goTo = function(i){
            $scope.currentPage = i;
        }
        $scope.setNumPerPage = function(i){
            $scope.numPerPage = i;
        }
        
        $scope.$watch("src", refreshPaging);
        $scope.$watch('currentPage + numPerPage', refreshPaging);
        
    }
  };
});