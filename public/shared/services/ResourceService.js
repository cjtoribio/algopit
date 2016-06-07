TodoApp.factory('Resource', ['$resource',function($resource){
    var service = {};
    service.Problem =  $resource(
        '/api/problems/:id/:action', 
        {
            id:'@_id'
        }, 
        {
            'update': { method:'PUT' },
            'search': { method: 'GET' , params: {action:'search'}, isArray: true } ,
            'toggleSolved' : { method: 'POST' , params: {action:'toggleSolved' } } ,
            'setDifficulty': { method: 'POST' , params: {action:'setDifficulty'} } ,
        }
    );
    Object.defineProperty(service.Problem.prototype, "finalDifficulty", {
        get: function() { return this.computedDifficulty || this.difficulty; }
    });
    
    
    service.Category =  $resource(
        '/api/categories/:id', 
        {
            id:'@_id'
        }, 
        {'update': { method:'PUT' }}
    );
    
    service.Judge =  $resource(
        '/api/judges/:id', 
        {
            id:'@_id'
        }, 
        {'update': { method:'PUT' }}
    );
    
    service.UserProblem = $resource(
        '/api/userProb/:id/:action', { id:'@_id'},
        {
            'update': { method:'PUT' },
            'toggleSolved': {method: 'POST' , params: {action:'toggleSolved'} }
        }
    );
    
    service.User = $resource(
        '/api/users/:id/:action', { id:'@_id'},
        {
            'update': { method:'PUT' },
            'search': { method: 'GET'  , params: {action:'search'}, isArray: true } ,
            'refresh':{ method: 'PUT'  , params: {action:'refresh'} },
            'login' : { method: 'POST' , params: {action:'login'}, url: '/api/login' }
        }
    );

    service.List = $resource(
        '/api/lists/:id/:action', {id: '@_id'},
        {
            'update': { method:'PUT' } ,
            'leave' : { method: 'POST', params: {action:'leave'} } ,
            'join'  : { method: 'POST', params: {action:'join' } } ,
            'stats' : { method: 'GET' , params: {action:'stats'} } ,
        }
    );
    
    return service;
}])