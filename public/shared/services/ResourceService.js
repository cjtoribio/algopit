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
        }
    );
    
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
        '/api/userProb/:id', { id:'@_id'},
        {'update': { method:'PUT' }}
    );
    
    service.User = $resource(
        '/api/users/:id/:action', { id:'@_id'},
        {
            'update': { method:'PUT' },
            'search': { method: 'GET' , params: {action:'search'}, isArray: true } ,
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