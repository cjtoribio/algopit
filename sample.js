var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('./model');

processCF();

/*
http.get('http://codeforces.com/api/problemset.problems', function(res) {
    var finalData = "";

    res.on("data", function(data) {
        finalData += data.toString();
    });

    res.on("end", function() {
        var subs = JSON.parse(finalData);
        var allProblems = _(subs.result.problems)
            .map('tags')
            .flatten()
            .uniq()
            .value();
        console.log(allProblems);
        console.log(allProblems.length);
    });
}).end();
//*/



function processCF(){
    async.waterfall([
        getCFUsers,
        function(users){
            async.map(
                users,
                function (user, next){
                    async.waterfall([
                        function(next){
                            next(null, user);
                        },
                        getCFSubmissions,
                        transformCFSubmissions,
                        attachProblem,
                        removeUknownPrblems,
                        removeKnownSubmissions,
                        wrapInSubmissionObject,
                        saveAll,
                        print,
                        countSubmissions
                    ], next );
                },
                function (err, result){
                    if(err)console.log(err);
                    else{
                        console.log(result.length + ' users processed and ' + _.sum(result) + ' submissions added ');
                    }
                }
            );
        }
    ]);
}
function getCFUsers(next){
    model.User.find({
        'codeforces.handle' : {'$ne' : null}
    }).exec(function(err, users){
        next(err, users);
    });
}
function getCFSubmissions(user, next){
    var handle = _.property('codeforces.handle')(user);
    var options = {
        url: 'http://codeforces.com/api/user.status?handle='+handle+'&from=1',
        method: 'GET',
        json:true
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            next(null, user, body.result);
        }else{
            next(err || ('Status Code: ' + response.statusCode));
        }
    });
}
function transformCFSubmissions(user, submissions, next){
    // console.log(submissions);
    var tSubmissions = _.map(submissions, function(sub){
        return {
            user      : _.property('_id')(user),
            judge     : '550d046403d18fda650a3a24',
            extId     : sub.id + '',
            verdict   : translateVerdict(sub.verdict),
            time      : sub.timeConsumedMillis,
            bytes     : sub.memoryConsumedBytes,
            submitDate:new Date(sub.creationTimeSeconds),
            problem   : buildProblemUrl(sub.problem),
            language  : sub.programmingLanguage,
            message   : ''

        }
    });
    return next(null, user, tSubmissions);
    ////////////////
    function translateVerdict(verdict){
        switch(verdict){
            case 'OK'                   : return 'ACCEPTED';
            case 'COMPILATION_ERROR'    : return 'COMPILATION_ERROR';
            case 'TIME_LIMIT_EXCEEDED'  : return 'TIME_LIMIT_EXCEEDED';
            case 'MEMORY_LIMIT_EXCEEDED': return 'MEMORY_LIMIT_EXCEEDED';
            case 'RUNTIME_ERROR'        : return 'RUNTIME_ERROR';
            case 'WRONG_ANSWER'         : return 'WRONG_ANSWER';
            case 'PRESENTATION_ERROR'   : return 'PRESENTATION_ERROR';
            case 'TESTING'              : return 'TESTING';
            default                     : return 'OTHER';
        }
    }
    function buildProblemUrl(problem){
        var str = 'http://www.codeforces.com/problemset/problem/{#contestId}/{#index}';
        return str.replace('{#contestId}',problem.contestId)
                  .replace('{#index}'    ,problem.index    );
    }
}
function attachProblem(user, submissions, next){
    var urls = _.chain(submissions)
                .map('problem')
                .uniq()
                .value();
    model.Problem.find({
        url: { '$in' : urls }
    }).exec(function(err, probs){
        var probMap = _.indexBy(probs, 'url');
        _.each(submissions, function(sub){
            sub.problem = _.property('_id')(probMap[sub.problem]);
        });
        next(null, user, submissions);
    });
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
    var funcs = _.map(submissions, 'save');
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
function print(user, submissions, next){
    console.log('Saved ' + submissions.length + ' submissions of ' + user.username);
    next(null, user, submissions);
}
function countSubmissions(user, submissions, next){
    return next(null, _.size(submissions));
}







