var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;
var User = new Schema({
    username: { type: String, unique: true },
    password: String,
    spoj: {
        username: String
    },
    codeforces: {
        handle: String,
        refresh: Date
    },
    email: String,
    name: String
});

User.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(function(err, salt){
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

User.methods.comparePassword = function(candPassword, callback){
    bcrypt.compare(candPassword, this.password, function(err, isMatch){
        if(err)return callback(err);
        return callback(null, isMatch);
    });
};



exports.User = mongoose.model('users', User);
