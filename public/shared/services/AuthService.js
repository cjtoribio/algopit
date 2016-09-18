TodoApp.factory('Auth', ['$http','Alert', '$rootScope','$cookieStore', '$location', 'Resource',
function($http, Alert, $rootScope, $cookieStore, $location, Resource){
    
    var user = $cookieStore.get('user');
    $cookieStore.remove('user');
    
    
    var service = {};
    service.currentUser = user ? new Resource.User(user) : null;
    service.isAuthenticated = function(){
        return service.currentUser != null;
    };
    service.isAdmin = function(){
        return (service.currentUser || {}).role == 'ADMIN';
    };
    service.getUserId = function(){
        return (service.currentUser || {_id:0})._id;
    };
    service.login = function (user) {
        Resource.User.login(
            user,
            function(user){
                service.currentUser = new Resource.User(user);
                console.log(service.currentUser);
                $location.path('/');
                Alert.alert(Alert.messages.signInSuccess);
            },
            function(){
                Alert.alert(Alert.messages.signInErrorInvalidLogin);
            }
        );
        // $http.post('/api/login', user)
        // .success(function(data){
        //     service.currentUser = data;
        //     console.log(data);
        //     $location.path('/');
        //     Alert.alert(Alert.messages.signInSuccess);
        // })
        // .error(function(){
        //     Alert.alert(Alert.messages.signInErrorInvalidLogin);
        // });
    };
    service.logout = function (user) {
        $http.get('/api/logout', user)
        .success(function(data){
            $location.path('/login');
            service.currentUser = null;
            $cookieStore.remove('user');
            Alert.alert(Alert.messages.signOutSuccess);
        });
    };
    service.signUp = function (user) {
        $http.post('/api/signup', user)
        .success(function(data){
            service.currentUser = new Resource.User(data);
            console.log(data);
            $location.path('/');
            Alert.alert(Alert.messages.signUpSuccess);
        })
        .error(function(){
            Alert.alert(Alert.messages.signUpError);
        });
    };
    service.getAvailability = function (username, callback) {
        var service = this;
        $http.get('/api/find', {
            params: {username: username}
        })
        .success(function(data){
            callback(data);
        });
    };
    
    
    return service;
}]);