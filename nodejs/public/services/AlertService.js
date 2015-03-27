TodoApp.factory('Alert', ['$alert',
function($alert){
    var service = {};
    
    service.messages = {
        signInSuccess: {
            title: 'Cheers!',
            content: 'You have successfully logged in.',
            placement: 'top-right',
            type: 'success',
            duration: 3
        },
        signOutSuccess: {
            content: 'You have been Signed Out.',
            placement: 'top-right',
            type: 'info',
            duration: 3
        },
        signUpSuccess: {
            title: 'Welcome!',
            content: 'You have successfully sign up.',
            placement: 'top-right',
            type: 'success',
            duration: 3
        },
        signUpError: {
            title: 'Error!',
            content: 'Couldnt create your profile.',
            placement: 'top-right',
            type: 'danger',
            duration: 3
        },
        signInErrorInvalidLogin: {
            title: 'Error!',
            content: 'Invalid username or password.',
            placement: 'top-right',
            type: 'danger',
            duration: 3
        },
        problemSolvedError: {
            type: 'success',
            content: 'This problem cannot be unmarked because it was verified',
            duration: 3,
            placement: 'top-right'
        },
        problemSolvedSuccess: { 
           type: 'success',
           content: 'Problem marked as solved. &nbsp;',
           duration: 3,
           placement: 'top-right'
        }
    }
    
    service.alert = function(message){
        $alert(message);
    }
    
    return service;
}]
);