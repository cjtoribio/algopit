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
        problems: {
            unsolved : {
                success: {
                   type: 'success',
                   content: 'Problem marked as unsolved.'
                }
            },       
            solved: {
                success: { 
                   type: 'success',
                   content: 'Problem marked as solved. &nbsp;'
                },
                verified: {
                    type: 'danger',
                    content: 'This problem cannot be unmarked because it was verified'
                }
            },
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
        },
        settings: {
            success: {
                type: 'success',
                content: 'Settings saved.'
            },
            error: {
                type: 'error',
                content: 'Error while saving settings.'
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