TodoApp.directive("algoPagination", function(){
    return {
    restrict: 'E',
    scope: {
        numPerPage: '=?',
        currentPage: '=?',
        src: '=',
        dst: '=',
        label: '@'
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
        $scope.getCurrentPage = function(){ return $scope.currentPage; };
        $scope.getNumPerPage  = function(){ return $scope.numPerPage; };
        
        $scope.$watch("src", refreshPaging);
        $scope.$watch('currentPage + numPerPage', refreshPaging);
        
    }
  };
});

TodoApp.directive("algoPagination2", function($parse){
    return {
    restrict: 'E',
    templateUrl: 'shared/templates/pagination.html',
    controller: function($scope,$attrs) {
        var sourceExpr = $attrs.src;
        $scope['label'] = $attrs.label || 'Problems';

        var match = sourceExpr.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
        if (!match) {
            throw ngRepeatMinErr('iexp', 'Expected expression in form of \'_item_ in _collection_[ track by _id_]\' but got \'{0}\'.',
            sourceExpr);
        }

        var lhs = match[1];
        var rhs = match[2];
        var src = [];

        if(!numPerPage()) numPerPage(10);
        if(!currentPage())currentPage(1);
        function refreshPaging(){
            var begin = ((currentPage() - 1) * numPerPage()), 
                end   = begin + numPerPage();
            $scope.pages = [];
            var b = Math.max(1, currentPage() - 5);
            var e = Math.min($scope.numPages()+1, currentPage() + 6);
            b = Math.max(1, Math.min(b , e - 11));
            e = Math.min($scope.numPages()+1, Math.max(e , b + 11));
            for(var i = b; i < e; ++i)
                $scope.pages.push(i);
                
            if($scope.numPages() < currentPage())
                currentPage(Math.max($scope.numPages(), 1));
            $scope[$attrs.dst] = (src || []).slice(begin, end);
        }
        $scope.numPages = function (){
            return Math.ceil((src || []).length / numPerPage());
        };
        $scope.nextPage = function(){
            currentPage(currentPage() + ($scope.numPages() > currentPage() ? 1 : 0));
            refreshPaging();
        }
        
        $scope.prevPage = function(){
            currentPage(currentPage() + (1 < currentPage() ? -1 : 0));
            refreshPaging();
        }
        $scope.goTo = function(i){
            currentPage(i);
            refreshPaging();
        }
        $scope.setNumPerPage = function(i){
            numPerPage(i);
            refreshPaging();
        }
        $scope.$watch(rhs, function (newSrc) {
            src = newSrc;
            refreshPaging();
        }, true);
        
        ////////
        $scope.getCurrentPage = function(){ return _currentPage; };
        $scope.getNumPerPage  = function(){ return _numPerPage; };
        var _currentPage, _numPerPage;
        function currentPage(a) {
            if(arguments.length === 0){
                return _currentPage;
            }else{
                $scope[$attrs.currentPage] = arguments[0];
                return _currentPage = arguments[0];
            }
        }

        function numPerPage(a) {
            if(arguments.length === 0){
                return _numPerPage;
            }else{
                $scope[$attrs.currentPage] = arguments[0];
                return _numPerPage = arguments[0];
            }
        }
    }
  };
});