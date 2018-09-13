var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../../model');
var cheerio = require('cheerio');


function attachProblem(user, submissions, next){
    let ids = _.chain(submissions).map('problem').uniq().sort().value();
    let judges = _.chain(submissions).map('judge').uniq().sort().value();
    model.Problem.find({
        sourceReferenceId: { '$in' : ids },
        judge: { '$in' : judges }
    })
    .exec()
    .then(probs => {
        var probMap = _.keyBy(probs, 'sourceReferenceId');
        _.each(submissions, function(sub){
            sub.problem = _.property('_id')(probMap[sub.problem]);
        });
        next(null, user, submissions);
    })
    .catch(next);
}
function removeUknownPrblems(user, submissions, next){
    next(null, user, _.filter(submissions,'problem'));
}
function removeKnownSubmissions(user, submissions, next){
    var ors = _.map(submissions, function(sub){
        return {judge: sub.judge, extId: sub.extId};
    });
    model.Submission.find({
        '$or' : ors,
    }).exec(function(err, knownSubs){
        var known = _.chain(knownSubs)
                     .map(serializeSubmission)
                     .sort()
                     .value();
        submissions = _.filter(submissions, function(sub){
            var ser = serializeSubmission(sub);
            return _.indexOf(known, ser) == -1;
        });
        next(null, user, submissions);
    });
    function serializeSubmission(sub){
        return sub.judge+'_'+sub.extId;
    }
}
function wrapInSubmissionObject(user, submissions, next){
    next(null, user, _.map(submissions, function(sub){
        return new model.Submission(sub);
    }));
}
function saveAll(user, submissions, next){
    async.map(
        submissions,
        function(sub, next){
            sub.save(function(err){
                next(err, sub);
            });
        }, 
        function(err,subs){
            next(err, user, subs);
        }
    );
}
function printDetail(user, submissions, next){
    console.log(submissions);
    next(null, user, submissions);
}
function countSubmissions(str, user, submissions, next) {
    console.log(str + submissions.length + ' for ' + _.property('username')(user));
    return next(null, user, submissions);
}
function noop(user, submissions, next){
    next(null, user, submissions);
}

exports.save = function(options){ 
    options = _.defaults(options || {}, {
        save: true,
        printAfterSave: false,
        countAfterSave: true,
        countReceived: false,
    });
    return function(user, submissions, next){
        async.waterfall([
            _.partial(noop, user, submissions),
            options.countReceived ? _.partial(countSubmissions,'Received ') : noop,
            attachProblem,
            removeUknownPrblems,
            removeKnownSubmissions,
            wrapInSubmissionObject,
            options.save ? saveAll : noop,
            options.printAfterSave ? printDetail : noop,
            options.countAfterSave ? _.partial(countSubmissions,'Saved ') : noop,
            function (user, submissions){
                next(null, user, submissions);
            }
        ]);
    }
}

