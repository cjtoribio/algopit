TodoApp.factory('Auth', ['$http','Alert', '$rootScope','$cookieStore', '$location',
function($http, Alert, $rootScope, $cookieStore, $location){
    
    // $cookieStore.remove('user');
    
    
    var service = {};
    service.currentUser = $cookieStore.get('user');
    service.isAuthenticated = function(){
        return service.currentUser != null;
    };
    service.getUserId = function(){
        return (service.currentUser || {_id:0})._id;
    };
    service.login = function (user) {
        $http.post('/api/login', user)
        .success(function(data){
            service.currentUser = data;
            console.log(data);
            $location.path('/');
            Alert.alert(Alert.messges.signInSuccess);
        })
        .error(function(){
            Alert.alert(Alert.messges.signInErrorInvalidPassword);
        });
    };
    service.logout = function (user) {
        $http.get('/api/logout', user)
        .success(function(data){
            $location.path('/login');
            service.currentUser = null;
            $cookieStore.remove('user');
            Alert.alert(Alert.messges.signOutSuccess);
        });
    };
    service.signUp = function (user) {
        $http.post('/api/signup', user)
        .success(function(data){
            service.currentUser = data;
            console.log(data);
            $location.path('/');
            Alert.alert(Alert.messges.signUpSuccess);
        })
        .error(function(){
            Alert.alert(Alert.messges.signUpError);
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