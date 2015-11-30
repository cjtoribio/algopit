var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var List = new Schema({
	name: String,
	createDate: Date,
	startDate: Date,
	endDate: Date,
    author: { type: Schema.ObjectId, ref: 'users' },
    shared: [{ type: Schema.ObjectId, ref: 'users' }],
    problems: [{ type: Schema.ObjectId, ref: 'problems' }]
});

exports.List = mongoose.model('lists', List);
