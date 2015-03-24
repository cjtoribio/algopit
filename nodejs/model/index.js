var mongoose = require("mongoose");
var config = require("../config.js")
mongoose.connect(config.db.mongodb);

var Problem = exports.Problem = require("./problem").Problem;
var Category = exports.Category = require("./category").Category;
var Judge = exports.Judge = require("./judge").Judge;
var User = exports.User = require("./user").User;
var UserProblem = exports.UserProblem = require("./userProblem").UserProblem;

// var u = User.findOne({username: 'cjtoribio'}).exec(function(err, u){
//     u.comparePassword('codelioco2', function(err, isMatch){
//         console.log(isMatch);
//     });
// });
