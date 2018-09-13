var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var logger  = require('../../utils/logger').getLogger();
var moment  = require('moment');
var brush   = require('../../utils/brush');
const converter = require('./codeforces/converter');
const submissionsManager = require('./common/manager');
const codeforcesApi = require('./codeforces/api');

module.exports = {
    processAllUsers : processAllUsers
}

// For Codeforces
function processAllUsers(job, done){
    var st = moment();
    console.log(job.attrs);
    logger.info('Started ' + brush.cyan(job.toJSON().name));
    getCFUsers({
        'codeforces.refresh': {'$lte': new Date()},
        'codeforces.handle' : {'$ne' : null}
    },function(err, users){
        if (err) return;
        async.map(
            users,
            processCFUser,
            function (err, result){
                done();
                if(err)return logger.error(err);
                var dur = moment.duration(moment() - st).asSeconds();
                logger.info('Finished '  + 
                    brush.cyan(job.toJSON().name) + ' after ' + 
                    brush.magenta(dur + 's'));
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
        submissionsManager.save({save: true}),
        removeRefreshFlag,
    ], function(err, user, submissions){
        next(err, user, submissions);
    });
}
function getCFUsers(criteria, next) {
    model.User.find(criteria).exec(function(err, users){
        next(err, users);
    });
}
function getCFSubmissions(user, next) {
    var handle = _.property('codeforces.handle')(user);
    codeforcesApi.getSubmissions(handle, (err, submissions) => {
        next(err, user, submissions)
    });
}

function transformCFSubmissions(user, submissions, next){
    return next(null, user, _.map(submissions, (sub) => converter.cfToDBSubmission(user, sub)));
}
function removeRefreshFlag(user, submissions, next){
    _.set(user, 'codeforces.refresh', moment().add(1,'day'));
    _.set(user, 'refresh', moment());
    user.save(function(err){
        next(err, user, submissions);
    });
}

