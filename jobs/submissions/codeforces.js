var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var general = require('./general');
var logger  = require('../../utils/logger').getLogger();

module.exports = {
    processAllUsers : processAllUsers,
    processByDemand : processByDemand
}

// For Codeforces
function processAllUsers(job, done){
    getCFUsers({
        'codeforces.handle' : {'$ne' : null}
    },function(err, users){
        if(err)return;
        logger.profile('codeforces.processAllUsers');
        async.map(
            users,
            processCFUser,
            function (err, result){
                done();
                if(err)return logger.error(err);
                logger.profile('codeforces.processAllUsers');
            }
        );
    });
}
function processByDemand(job, done){
    getCFUsers({
        'codeforces.refresh' : {'$lte' : new Date()}
    },function(err, users){
        if(err)return done();
        logger.profile('codeforces.processByDemand');
        async.map(
            users,
            processCFUser,
            function (err, result){
                done();
                if(err)return logger.error(err);
                logger.profile('codeforces.processByDemand');
            }
        );
    });
}
function processCFUser(user, next){
    async.waterfall([
        function(next){
            next(null, user);
        },
        getCFSubmissions,
        transformCFSubmissions,
        general.save({save: true}),
        removeRefreshFlag,
    ], function(err, user, submissions){
        next(err, user, submissions);
    });
}
function getCFUsers(criteria, next){
    model.User.find(criteria).exec(function(err, users){
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
function removeRefreshFlag(user, submissions, next){
    _.set(user, 'codeforces.refresh', null);
    user.save(function(err){
        next(err, user, submissions);
    });
}
