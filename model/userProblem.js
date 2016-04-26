var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var problemStates = ['PENDING_SOLVED', 'SOLVED', 'TODO', 'UNSOLVED'];
var UserProblem = new Schema({
    user: { type: Schema.ObjectId, ref: 'users' },
    problem: { type: Schema.ObjectId, ref: 'problems' },
    state: { type: String, enum: problemStates },
    difficulty: Number
});

exports.UserProblem = mongoose.model('usersProblems', UserProblem);
