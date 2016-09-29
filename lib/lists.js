const Q = require('q');
const _ = require('lodash');

// models
const model = require('../model');
const { List } = model;



function findList(params) { // {user, listId}
	return List.findById(params.listId)
    .populate('author', 'username name')
    .populate('problems')
    .populate('tasks.problem')
    .populate('party', 'username name')
    .populate('admins', 'username name')
    .then((list) => {
		return list;	
	}); 	
}

function findListWithStatus(params){ // {user, listId}
	return findList(params)
	.then((list) => {
	    if(!list)throw new Error('List not found');
	    return model.UserProblem.find({
		    	user   : { $in: _.map(list.party   , '_id') },
		    	problem: { $in: _.map(list.tasks   , 'problem._id') }
	    	})
    	.populate('user', 'username')
    	.then((userProblems) => {
	    	var objList = list.toObject();
	    	objList.status = {};
	    	var idProblems = {};
	    	_.forEach(list.tasks, (task, i) => { idProblems[task.problem._id] = i; });
	    	_.forEach(list.party   , (user) => {
	    		var status = new Array(list.tasks.length);
	    		_.fill(status, 'UNSOLVED');
	    		objList.status[user.username] = status;
	    	});
	    	_.forEach(userProblems, (userProblem) => {
	    		var idProblem = idProblems[userProblem.problem];
	    		objList.status[userProblem.user.username][idProblem] = userProblem.state;
	    	});
	    	return objList;
	    });
	});
}


module.exports = {
	findList : findList,
	findListWithStatus : findListWithStatus
};