var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('./model');
var cheerio = require('cheerio');
var Q       = require('q'); Q.longStackSupport = true;
var logger  = require('./utils/logger').getLogger();
var moment  = require('moment');
var brush   = require('./utils/brush');


var Codeforces = require('./lib/codeforces');

var codeforces = new Codeforces();

codeforces.getProblems()
.then( (result) => {
	var problems = result.problems;
	var filt = _.filter(problems, {contestId : 31});
	console.log(filt);
	return model.Problem.find({name: 'Sysadmin Bob'})
	.then( (problems) => {
		console.log(problems);
	})
	.catch( (err) => {
		console.log(err);
	})
})
.catch( (err) => {
	console.log(err);
})

if(false)
codeforces.getContests()
.then((contests => {
	contests = contests.slice(0, 10);
	var res = [];
	function lookup(){
		if(contests.length == 0){
			return Q.when(res);
		}
		var contest = contests.shift();
		console.log("Searching: ", contest.id);
		var handles = ['cjtoribio', 'angelg', 'mjgonzales'];
		return codeforces.getStandings({ 
			contestId: contest.id, 
			handles: handles.join(';'), 
			showUnofficial: true 
		})
		.then((result) => {
			if(result.rows.length == 0){
				console.log(contest);
				res.push(contest);
			}
		})
		.then(lookup, lookup);
	}
	lookup().then(contests => {
		console.log(contests);
	})
}))
.done();