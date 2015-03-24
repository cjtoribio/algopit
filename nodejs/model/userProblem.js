var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserProblem = new Schema({
    user: { type: Schema.ObjectId, ref: 'users' },
    problem: { type: Schema.ObjectId, ref: 'problems' },
    temporary: Boolean
});

UserProblem.index({user: 1, problems: 1});

exports.UserProblem = mongoose.model('usersProblems', UserProblem);
