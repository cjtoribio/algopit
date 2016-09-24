const Q = require('q');
const _ = require('lodash');

// models
const model = require('../model');
const { List } = model;



function findList(params) { // {user, listId}
	return Q.ninvoke(
		List.findById(params.listId)
            .populate('author', 'username name')
            .populate('problems')
            .populate('party', 'username name')
            .populate('admins', 'username name'),
        'exec'
	).then((list) => {
		return list;	
	}); 	
}

function findListWithStatus(params){ // {user, listId}
	return findList(params)
	.then((list) => {
	    if(!list)throw new Error('List not found');
	    return Q.ninvoke(
	    	model.UserProblem.find({
		    	user   : { $in: _.map(list.party   , '_id') },
		    	problem: { $in: _.map(list.problems, '_id') }
	    	})
	    	.populate('user', 'username')
	    	,'exec'
	    ).then((userProblems) => {
	    	var objList = list.toObject();
	    	objList.status = {};
	    	var idProblems = {};
	    	_.forEach(list.problems, (problem, i) => { idProblems[problem._id] = i; });
	    	_.forEach(list.party   , (user) => {
	    		var status = new Array(list.problems.length);
	    		_.fill(status, 'UNSOLVED');
	    		objList.status[user.username] = status;
	    	});
	    	_.forEach(userProblems, (userProblem) => {
	    		var idProblem = idProblems[userProblem.problem];
	    		objList.status[userProblem.user.username][idProblem] = userProblem.state;
	    	});
	    	return objList;
	    });
	    // async.map(
	    //     list.party,
	    //     function(user, callback){
	    //         async.map(
	    //             list.problems, 
	    //             function(problem, callback){
	    //                 model.UserProblem.findOne({
	    //                     user: user._id,
	    //                     problem: problem._id
	    //                 }).exec(function(err, ret){
	    //                     callback(err, _.property('state')(ret) || 'UNSOLVED');
	    //                 });
	    //             },
	    //             function(err, status){
	    //                 if(err)return reject(err);
	    //                 callback(err, status);
	    //             }
	    //         );
	    //     },
	    //     function(err, statusList){
	    //         var objList = list.toObject();
	    //         objList.status = {};
	    //         _.forEach(list.party, function(user, idx){
	    //             objList.status[user.username] = statusList[idx];
	    //         });
	    //         resolve(null, objList);
	    //     }
	    // );
	});
}


module.exports = {
	findList : findList,
	findListWithStatus : findListWithStatus
};