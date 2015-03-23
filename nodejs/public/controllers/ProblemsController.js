TodoApp.controller('ProblemsController', ['$scope','ProblemsService', '$location', '$stateParams', '$filter','$alert','Auth',
function($scope, ProblemsService, $location, $stateParams, $filter, $alert, Auth){
    $scope.user = Auth;
    
    $scope.numPerPage = 10;
    $scope.currentPage = 1;
    
    // $alert({
    //     content: 'You have been logged in&nbsp;&nbsp;&nbsp;',
    //     type: 'success',
    //     duration: 120,
    //     placement: 'top-right'
    // });
    
    $scope.filteredProblems1 = [];
    $scope.filteredProblems2 = [];
    
    $scope.criteria = {};
    var Problem = ProblemsService.Problem;
    
    function refreshPaging(){
        
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;
        $scope.pages = [];
        var b = Math.max(1, $scope.currentPage - 5);
        var e = Math.min($scope.numPages()+1, $scope.currentPage + 6);
        b = Math.max(1, Math.min(b , e - 11));
        e = Math.min($scope.numPages()+1, Math.max(e , b + 11));
        for(var i = b; i < e; ++i)
            $scope.pages.push(i);
        $scope.filteredProblems2 = ($scope.filteredProblems1 || []).slice(begin, end);
    }
    function refreshFiltered() {
        if($scope.problems == null){
            $scope.filteredProblems1 = [];
        }
        $scope.filteredProblems1 = $filter('filter')(
            $scope.problems, 
            $scope.criteria
        );
        if($scope.filteredProblems1 == null){
            $scope.filteredProblems2 = [];
            return;
        }
        if($scope.numPages() < $scope.currentPage)
            $scope.currentPage = $scope.numPages();
        refreshPaging();
    }
    
    $scope.loadProblems = function(){
        Problem.query(function(data){
            $scope.problems = data;
            refreshFiltered();
        });
    }
    
    $scope.numPages = function () {
        return Math.ceil(($scope.filteredProblems1 || []).length / $scope.numPerPage);
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
    
    $scope.$watch(
        function(){
            return angular.copy($scope.criteria);
        }, function(){
            refreshFiltered();
    }, true);
    $scope.$watch('currentPage + numPerPage', refreshPaging);
    
    $scope.categories = ProblemsService.Category.query();
    $scope.judges = ProblemsService.Judge.query();
    
    console.log($stateParams);
    if($stateParams.id){
        $scope.problem = Problem.get({id:$stateParams.id}, function(){
            var i = 1;
        });
        $scope.isEdit = true;
    }else{
        $scope.problem = { categories:[] };
        $scope.isNew = true;
    }
    
    $scope.removeProblem = function(problem, idx){
        if(confirm("Are you sure you want to remove this problem?")){
            problem.$remove(function(obj){
                $scope.problems.splice(idx,1);
                setTimeout(function(){refreshFilters();},100);
            });
        }
    }
    $scope.sendProblem = function(problem){
        function callback(){
            $location.path('/problems').replace();
        }
        if($scope.isEdit)
            $scope.problem.$update(callback);
        else
            (new Problem($scope.problem)).$save(callback);
    }
    
    $scope.toggleSelection = function (category) {
        var idx = $scope.problem.categories.indexOf(category);
        if (idx > -1) {
            $scope.problem.categories.splice(idx, 1);
        }
        else {
            $scope.problem.categories.push(category);
        }
    };
    $scope.setCategory = function(category){
        $scope.criteria.categories = category;
    };
    $scope.reset = function(){
        $scope.criteria = {};
    }

}]);