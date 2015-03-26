TodoApp.controller('ProblemsController', [
    '$scope','ProblemsService', '$location', '$stateParams', '$filter','$alert','Auth', 'lodash',
function($scope, ProblemsService, $location, $stateParams, $filter, $alert, Auth, lodash){
    
    // variables
    $scope.user = Auth;
    $scope.numPerPage = 10;
    $scope.currentPage = 1;
    $scope.filteredProblems1 = [];
    $scope.filteredProblems2 = [];
    $scope.criteria = {};
    $scope.problemsSolved = {};
    
    // types
    var Problem = ProblemsService.Problem;
    var UserProblem = ProblemsService.UserProblem;
    
    
    // loading
    $scope.categories = ProblemsService.Category.query();
    $scope.judges = ProblemsService.Judge.query();
    if(Auth.isAuthenticated()){
        ProblemsService.UserProblem.queryByUser({ id: Auth.getUserId() },
            function(ret){
                $scope.problemsSolved = lodash.indexBy(ret, 'problem');
            }
        );
    }
    $scope.loadProblems = function(){
        Problem.query(function(data){
            $scope.problems = data;
            refreshFiltered();
        });
    }
    
    
    
    
    // Criteria Filtering
    function refreshFiltered() {
        if($scope.problems == null){
            $scope.filteredProblems1 = [];
        }else{
            $scope.filteredProblems1 = $filter('filter')(
                $scope.problems, 
                $scope.criteria
            );
        }
    }
    $scope.$watch( 
        function(){ 
            return angular.copy($scope.criteria); 
        }, 
        function(){ 
            refreshFiltered(); 
        }, true
    );
    
    
    
    
    $scope.problemStatus = function(prob){
        var problemState = $scope.problemsSolved[prob._id].state;
        if(problemState === "PENDING_SOLVED")
            return "warning";
        else if(problemState === "SOLVED")
            return "success";
        return "info";
    }
    
    if($stateParams.id){
        $scope.problem = Problem.get({id:$stateParams.id});
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
    $scope.toggleSolved = function(prob){
        var userProblem = $scope.problemsSolved[prob._id];
        if(userProblem == null){
            (new UserProblem({user: Auth.currentUser._id, problem: prob._id, state: 'PENDING_SOLVED'}))
            .$save(function(up){
                $scope.problemsSolved[up.problem] = up;
                $alert({
                   type: 'success',
                   content: 'Problem marked as solved. &nbsp;',
                   duration: 3,
                   placement: 'top-right'
                });
            });
        }
        else if(userProblem.state === "PENDING_SOLVED"){
            var id = userProblem.problem;
            userProblem.$remove(function(ret){
                delete $scope.problemsSolved[id];
            });
        }else{
            $alert({
               type: 'success',
               content: 'This problem cannot be unmarked because it was verified',
               duration: 3,
               placement: 'top-right'
            });
        }
    }
    $scope.toggleTodo = function(prob){
        var userProblem = $scope.problemsSolved[prob._id];
        if(userProblem == null){
            (new UserProblem({user: Auth.currentUser._id, problem: prob._id, state: 'TODO'}))
            .$save(function(up){
                $scope.problemsSolved[up.problem] = up;
                $alert({
                   type: 'success',
                   content: 'Problem marked as TODO. &nbsp;',
                   duration: 3,
                   placement: 'top-right'
                });
            });
        }else{
            $alert({
               type: 'success',
               content: 'This problem was marked as solved already.',
               duration: 3,
               placement: 'top-right'
            });
        }
    }

}]);