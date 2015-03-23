TodoApp.factory('Auth', ['$http','$alert', '$rootScope','$cookieStore', '$location',
function($http, $alert, $rootScope, $cookieStore, $location){
    
    var user = $cookieStore.get('user');
    $cookieStore.remove('user');
    
    
    var service = {};
    service.currentUser = user;
    service.isAuthenticated = function(){
        return service.currentUser != null;
    }
    service.login = function (user) {
        var service = this;
        $http.post('/api/login', user)
        .success(function(data){
            service.currentUser = data;
            $location.path('/');
            $alert({
                title: 'Cheers!',
                content: 'You have successfully logged in.',
                placement: 'top-right',
                type: 'success',
                duration: 3
            });
        })
        .error(function(){
            $alert({
                title: 'Error!',
                content: 'Invalid username or password.',
                placement: 'top-right',
                type: 'danger',
                duration: 3
            });
        });
    };
    service.logout = function (user) {
        var service = this;
        $http.get('/api/logout', user)
        .success(function(data){
            $location.path('/login');
            service.currentUser = null;
            $cookieStore.remove('user');
            $alert({
                content: 'You have been logged out.',
                placement: 'top-right',
                type: 'info',
                duration: 3
            });
        });
    };
    
    
    return service;
}]);