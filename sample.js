var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('./model');
var cheerio = require('cheerio');
var Q       = require('q');
var logger  = require('./utils/logger').getLogger();
var moment  = require('moment');
var brush   = require('./utils/brush');





function processUser(user) {
	console.log(user);
	return model.Submission
	.find({user: user._id})
	.then((submissions) => {
		console.log(submissions.length);
	})
}


getUsers({'refresh' : {'$lte' : new Date()}})
.get(0)
.then(processUser)
.then(() => {
	console.log('done');
})
.catch(ex => {
	console.log(ex);
});

function getUsers(criteria, next){
    return Q.when(model.User.find(criteria));
}