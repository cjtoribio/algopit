var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');

var logger  = require('../../utils/logger').getLogger();
var moment  = require('moment');
var brush   = require('../../utils/brush');

module.exports = {
    updateUserProblem : updateUserProblem
}

// For Codeforces
function updateUserProblem(job, done){
    var st = moment();
    logger.info('Started ' + brush.cyan(job.toJSON().name));
    getUsers({
        'refresh' : {'$lte' : new Date()}
    },function(err, users){
        if (err) return (done||_.noop) (err);
        async.map(
            users,
            processUser,
            function (err, result){
                (done||_.noop) (err);
                if (err) return logger.error(err);
                var dur = moment.duration(moment() - st).asSeconds();
                logger.info('Finished '  + 
                    brush.cyan(job.toJSON().name) + ' after ' + 
                    brush.magenta(dur + 's'));
            }
        );
    });
}



function processUser(user, next){
    async.waterfall([
        function(next){
            next(null, user);
        },
        getUserProblems,
        updateUserProblemByUser,
        saveAll,
        removeRefreshFlag
    ], function(err, user, userProblems){
        next(err, user, userProblems);
    });
}
function getUsers(criteria, next){
    model.User.find(criteria).exec(function(err, users){
        next(err, users);
    });
}

function getUserProblems(user, next){
    model.UserProblem.find({
        user: user._id
    }).exec(
        function(err, userProblems){
            next(err, user, userProblems);
        }
    );
}
function updateUserProblemByUser(user, userProblems, next){
    model.Submission.find({user: user._id}).exec(
        function(err, submissions){
            attachInfo(user, submissions, userProblems);
            next(err, user, userProblems);
        }
    );
    function attachInfo(user, submissions, userProblems){
        var subByProb = _.groupBy(submissions, 'problem');
        var upByProb  = _.groupBy(userProblems, 'problem');
        var notRegisterd = _.map(subByProb, function(val, key){ return key; })
        _.each(userProblems, function(up){
            var subs = subByProb[up.problem];
            up.attempts = _.property('length')(subs);
            if(_.filter(subs,{verdict: 'ACCEPTED'}).length > 0)
                up.state = 'SOLVED';
        });
        _.each(notRegisterd, function(problemId){
            if(upByProb[problemId])return;
            var subs = subByProb[problemId];
            userProblems.push(new model.UserProblem({
                problem: problemId,
                user: user._id,
                attempts: _.property('length')(subs),
                state : ((_.filter(subs,{verdict: 'ACCEPTED'}).length > 0) ? 'SOLVED' : 'TRIED')
            }));
        })
    }
}
function saveAll(user, userProblems, next){
    async.map(
        userProblems,
        function(userProb, next){
            userProb.save(function(err){
                next(err, userProb);
            });
        }, 
        function(err, userProblems){
            next(err, user, userProblems);
        }
    );
}

function removeRefreshFlag(user, userProblems, next){
    _.set(user, 'refresh', moment().add(1, 'day'));
    user.save(function(err){
        next(err, user, userProblems);
    });
}


