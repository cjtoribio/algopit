var mongoose = require("mongoose");
var _ = require('lodash');

var Schema = mongoose.Schema;
var List = new Schema({
    name: String,
    createDate: Date,
    startDate: Date,
    endDate: Date,
    author: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    admins: [{
        type: Schema.ObjectId,
        ref: 'users'  
    }],
    party: [{
        type: Schema.ObjectId,
        ref: 'users'
    }],
    problems: [{
        type: Schema.ObjectId,
        ref: 'problems'
    }],
    tasks: [{
        problem   : { type: Schema.ObjectId, ref: 'problems' },
        startDate : Date,
        endDate   : Date,
        timed     : Boolean,
    }],
    runs: [{
        submission: { type: Schema.ObjectId , red: 'submissions' }
    }]
}, {
    timestamps: {}
});

List.pre('save', function(next){
    if(this.startDate == null)this.startDate = new Date();
    if(this.createDate == null)this.createDate = new Date();
    next();
});

List.statics.cleanPopulated = function(obj, next){
    if(_.isObject(obj.author))obj.author = obj.author._id;
    obj.problems = _.uniq(_.map(obj.problems, function(prob){
        return _.has(prob,'_id') ? prob._id : prob;
    }));
    obj.party = _.uniq(_.map(obj.party, function(user){
        return _.has(user,'_id') ? user._id : user;
    }));
    (next || _.noop)(obj);
    return obj;
}

exports.List = mongoose.model('lists', List);
