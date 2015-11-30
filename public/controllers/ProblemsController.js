TodoApp.controller('ProblemsController', [
    '$scope','ProblemsService', '$location', '$stateParams', '$filter','Alert','Auth', 'lodash',
function($scope, ProblemsService, $location, $stateParams, $filter, Alert, Auth, lodash){
    
    var _ = lodash;

    // types
    var Problem = ProblemsService.Problem;
    var UserProblem = ProblemsService.UserProblem;

    // variables
    $scope.user = Auth;
    $scope.numPerPage = 10;
    $scope.currentPage = 1;
    $scope.filteredProblems1 = [];
    $scope.filteredProblems2 = [];
    $scope.criteria = {};
    $scope.problemsSolved = {};
    // loading
    $scope.categories = ProblemsService.Category.query();
    $scope.judges = ProblemsService.Judge.query();
    if(Auth.isAuthenticated()){
        ProblemsService.UserProblem.query(
            function(ret){
                $scope.problemsSolved = lodash.indexBy(ret, 'problem');
                console.log($scope.problemsSolved);
            }
        );
    }
    $scope.$watch( 
        function(){ 
            return angular.copy($scope.criteria); 
        }, 
        function(){ 
            refreshFiltered(); 
        }, true
    );
    if($stateParams.id){
        $scope.problem = Problem.get({id:$stateParams.id});
        $scope.isEdit = true;
    }else{
        $scope.problem = { categories:[] };
        $scope.isNew = true;
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

    function addUserProblem(prob, type){
        new UserProblem({
            user    : Auth.currentUser._id,
            problem : prob._id,
            state   : type
        })
        .$save(function(up){
            $scope.problemsSolved[up.problem] = up;
            var message = null;
            if(type === "PENDING_SOLVED") message = Alert.messages.solved.success;
            if(type === "TODO") message = Alert.messages.todo.success;
            Alert.alert(message);
        });
    }

    function getProblemState(id){
        if( !(_.has($scope.problemsSolved, id)) || 
            !(_.has($scope.problemsSolved[id], 'state')) )
            return '';
        return $scope.problemsSolved[id].state;
    }


    $scope.loadProblems = function(){
        Problem.query(function(data){
            $scope.problems = data;
            refreshFiltered();
        });
    }

    $scope.isSolved = function(prob){
        var problemState = getProblemState(prob._id);
        return problemState === "SOLVED";
    }

    $scope.isPending = function(prob){
        var problemState = getProblemState(prob._id);
        return problemState === "PENDING_SOLVED";
    }

    $scope.isTodo = function(prob){
        var problemState = getProblemState(prob._id);
        return problemState === "TODO";
    }
    $scope.editProblem = function(prob){
        $location.path('/problems/edit/' + prob._id);
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
    }

    $scope.setCategory = function(category){
        $scope.criteria.categories = category;
    }

    $scope.reset = function(){
        $scope.criteria = {};
    }

    $scope.toggleSolved = function(prob){
        if(!_.has($scope.problemsSolved, prob._id)){
            addUserProblem(prob, 'PENDING_SOLVED');
        }else{
            var problemState = getProblemState(prob._id);
            if(problemState === "PENDING_SOLVED"){
                var userProblem = $scope.problemsSolved[prob._id],
                    problemId   = userProblem.problem;
                userProblem.$remove(function(ret){
                    delete $scope.problemsSolved[problemId];
                });
            }else{
                Alert.alert(
                    Alert.messages.solved.verified
                );
            }
        }
    }

    $scope.toggleTodo = function(prob){
        if(!_.has($scope.problemsSolved, prob._id)){
            addUserProblem(prob, 'TODO');
        }else {
            var message = null;
            if($scope.isTodo(prob)) message = Alert.messages.todo.duplicated;
            else                    message = Alert.messages.todo.solved;
            Alert.alert(message);
        }
    }

}]);