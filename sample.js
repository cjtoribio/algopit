var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('./model');
var cheerio = require('cheerio');


// processCF();
// processSP();

model.UserProblem.find({})
.exec(function(err, userProb){
    var ups = _.filter(userProb, function(up){
        return up.attempts !== undefined;
    });
    console.log(ups.length);
    // return;
    var idx = 0;
    async.map(ups, function(up, cb){
        up.remove(function(){
            idx++;
            if(idx % 1000 == 0){
                console.log(idx);
            }
            cb();
        });
    }, function(){
        console.log('DONE');
    });
});
// For Spoj
function processSP(){
    async.waterfall([
        getSPUsers,
        processSPUsers
    ], function(err, result){
        if(err)console.log(err);
        else{
            var str = '';
                result.length +
                ' users processed and ' +
                _.sum(result) + 
                ' submissions added ';
            console.log(str);
        }
    });
}
function processSPUsers(users, next){
    async.map(
        users,
        function (user, next){
            async.waterfall([
                function(next){
                    next(null, user);
                },
                getNewSPSubmissions,
                transformSPSubmissions,
                attachProblem,
                removeUknownPrblems,
                removeKnownSubmissions,
                wrapInSubmissionObject,
                saveAll,

            ], next );
        },
        next
    );
}
function getSPUsers(next){
    return next(null, [{
        _id: '123',
        spoj: {
            username: 'cjtoribio'
        }
    }]);
    model.User.find({
        'spoj.username' : {'$ne' : null}
    }).exec(function(err, users){
        next(err, users);
    });
}
function getSPSubmissions(user, next){

}
function getNewSPSubmissions(user, next){
    var handle = _.property('spoj.username')(user);
    var options = {
        url: 'http://www.spoj.com/status/' + handle + '/',
        method: 'GET',
        // json:true
    }
    request(options, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            // next(null, user, body.result);
            var $ = cheerio.load(body);
            var elems = $('table.problems.table.newstatus tr.kol, table.problems.table.newstatus tr.kol1');
            var subs = _.map(elems, function(elem){
                var row = elem;
                var cells = _.filter(row.children, {name: 'td'});
                return {
                    id: Number($(cells[0]).text()),
                    submitDate: new Date($(cells[1]).text()),
                    problem: extractProblem(cells[2], $),
                    verdict: clean($(cells[3]).text()).toUpperCase(),
                    time   : getTime(cells[4],$),
                    memory : extractMemory(cells[5], $),
                    language: clean($(cells[6]).text())
                };
            });
            next(null, user, subs);
        }else{
            next(err || ('Status Code: ' + response.statusCode));
        }
    });

    return;
    ///////////////////
    function getTime(cell, $){
        var ret = Number($(cell).text()) * 1000;
        if(_.isNaN(ret))return 0;
        return ret;
    }
    function extractProblem(cell, $){
        return cell.children[0].attribs.title;
    }
    function extractMemory(cell, $){
        var m = $(cell).text();
        if(_.contains(m,'G')){
            return Number(m.replace('M','')) * (1<<30);
        }
        if(_.contains(m,'M')){
            return Number(m.replace('M','')) * (1<<20);
        }
        if(_.contains(m,'K')){
            return Number(m.replace('M','')) * (1<<10);
        }
        return 0;
    }
    function clean(str){
        return str.replace('\n','').replace('\t','').trim();
    }
}
function transformSPSubmissions(user, submissions, next){
    var tSubmissions = _.map(submissions, function(sub){
        return {
            user      : _.property('_id')(user),
            judge     : 'SPOJ',
            extId     : sub.id + '',
            verdict   : translateVerdict(sub.verdict),
            time      : sub.time,
            bytes     : sub.memory,
            submitDate: sub.submitDate,
            problem   : sub.problem,
            language  : sub.language,
            message   : ''

        }
    });
    console.log(tSubmissions);
    return;
    ////////////////////////    
    function translateVerdict(verdict){
        var arr = {
            'ACCEPTED'            : /ACCEPTED/,
            'COMPILATION_ERROR'   : /COMPILATION ERROR/,
            'RUNTIME_ERROR'       : /RUNTIME ERROR/,
            'TIME_LIMIT_EXCEEDED' : /TIME LIMIT EXCEEDED/,
            'TESTING'             : /RUNNING JUDGE/
        }
        var ret = '';
        _.each(arr, function(value, key){
            if(value.test(verdict))
                ret = key;
        });
        return ret || 'OTHER';
    }
    function buildProblemUrl(problem){
        var str = 'http://codeforces.com/contest/{#contestId}/problem/{#index}';
        return str.replace('{#contestId}',problem.contestId)
                  .replace('{#index}'    ,problem.index    );
    }
}




// For Codeforces
function processCF(){
    async.waterfall([
        getCFUsers,
        function(users){
            async.map(
                users,
                function (err, result){
                    if(err)console.log(err);
                    else{
                        var str = '';
                            result.length +
                            ' users processed and ' +
                            _.sum(result) + 
                            ' submissions added ';
                        console.log(str);
                    }
                }
            );
        }
    ]);
}
function processCFUsers(user, next){
    async.waterfall([
        function(next){
        next(null, user);
        },
        getCFSubmissions,
        transformCFSubmissions,
        // attachProblem,
        // removeUknownPrblems,
        // removeKnownSubmissions,
        // wrapInSubmissionObject,
        // saveAll,
        // print,
        // countSubmissions
    ], next );
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
    var tSubmissions = _.map(submissions, function(sub){
        return {
            user      : _.property('_id')(user),
            judge     : 'Codeforces',
            extId     : sub.id + '',
            verdict   : translateVerdict(sub.verdict),
            time      : sub.timeConsumedMillis,
            bytes     : sub.memoryConsumedBytes,
            submitDate:new Date(sub.creationTimeSeconds*1000),
            problem   : buildProblemUrl(sub.problem),
            language  : sub.programmingLanguage,
            message   : ''

        }
    });
    console.log(tSubmissions);
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
        var str = '{#contestId}{#index}';
        return str.replace('{#contestId}',problem.contestId)
                  .replace('{#index}'    ,problem.index    );
    }
}


// For All Judges
function attachProblem(user, submissions, next){
    var ids = _.chain(submissions)
                .map('problem')
                .uniq()
                .sort()
                .value();
    model.Problem.find({
        sourceReferenceId: { '$in' : ids },
        judge: _.property('0.judge')(submissions)
    }).exec(function(err, probs){
        console.log(ids);
        var probMap = _.keyBy(probs, 'sourceReferenceId');
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
function printDetail(user, submissions, next){
    console.log(submissions);
    next(null, user, submissions);
}
function countSubmissions(user, submissions, next){
    return next(null, _.size(submissions));
}







