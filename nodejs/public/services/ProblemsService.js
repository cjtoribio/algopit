TodoApp.factory('ProblemsService', ['$resource',function($resource){
    var service = {};
    service.Problem =  $resource(
        '/api/problems/:id', 
        {
            id:'@_id'
        }, 
        {'update': { method:'PUT' }}
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
    
    return service;
}])