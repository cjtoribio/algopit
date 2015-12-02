TodoApp.factory('Alert', ['$alert',
function($alert){
    var service = {};
    
    service.messages = {
        signInSuccess: {
            title: 'Cheers!',
            content: 'You have successfully logged in.',
            type: 'success',
        },
        signOutSuccess: {
            content: 'You have been Signed Out.',
            type: 'info',
        },
        signUpSuccess: {
            title: 'Welcome!',
            content: 'You have successfully sign up.',
            type: 'success',
        },
        signUpError: {
            title: 'Error!',
            content: 'Couldnt create your profile.',
            type: 'danger'
        },
        signInErrorInvalidLogin: {
            title: 'Error!',
            content: 'Invalid username or password.',
            placement: 'top-right',
            type: 'danger',
        },
        solved: {
            success: { 
               type: 'success',
               content: 'Problem marked as solved. &nbsp;'
            },
            verified: {
                type: 'success',
                content: 'This problem cannot be unmarked because it was verified'
            }
        },
        todo: {
            success: { 
               type: 'success',
               content: 'Problem marked as TODO. &nbsp;'
            },
            duplicated: { 
               type: 'success',
               content: 'This problem was marked as TODO already. &nbsp;'
            },
            solved: { 
               type: 'success',
               content: 'This problem was marked as solved already. &nbsp;'
            }
        },
        lists: {
            joinSuccess: {
                type: 'success',
                content: 'Successfuly joined the list'
            },
            leaveSuccess: {
                type: 'success',
                content: 'Successfuly leaved the list'
            },
            error: {
                type: 'error',
                content: 'An error occurred'
            }
        }
    }
    
    service.alert = function(message){
        // log when message is null for future debugs
        if(message == null){
            console.log('Null message reached');
            return;
        }
        if(!message.duration)
            message.duration = 3;
        if(!message.placement)
            message.placement = 'top-right';
        if(!message.container)
            message.container = '.alertsContainer';
        $alert(message);
    }
    
    return service;
}]
);