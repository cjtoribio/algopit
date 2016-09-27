var mongoose = require("mongoose");
var config = require("../config.js")
var logger = require('../utils/logger').getLogger();
var Q      = require('q');
mongoose.connect(config.db.mongodb);
mongoose.Promise = Q.Promise;

module.exports = {
	Problem 	: require("./problem"		).Problem		,
	Category 	: require("./category"		).Category		,
	Judge   	: require("./judge"			).Judge			,
	User    	: require("./user"			).User			,
	UserProblem : require("./userProblem"	).UserProblem	,
	List        : require("./list"			).List			,
	Submission  : require("./submission"	).Submission	,
};

// var u = User.findOne({username: 'cjtoribio'}).exec(function(err, u){
//     u.comparePassword('codelioco2', function(err, isMatch){
//         console.log(isMatch);
//     });
// });
