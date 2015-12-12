var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var logger  = require('../../utils/logger').getLogger();


function removeExisting(problems, next){
    var ids = _.chain(problems)
                .map('sourceReferenceId')
                .uniq()
                .sort()
                .value();
    model.Problem.find({
        // sourceReferenceId: { '$in' : ids },
        judge: _.property('0.judge')(problems)
    }).exec(function(err, probs){
        var probMap = _.indexBy(probs, 'sourceReferenceId');
        var fProblems = _.filter(problems, function(prob){
            return !probMap[prob.sourceReferenceId];
        });
        logger.info('Filtered ' + fProblems.length);
        next(null, fProblems);
    });
}
function wrapInProblemsObject(problems, next){
    next(null, _.map(problems, function(prob){
        return new model.Problem(prob);
    }));
}
function saveAll(problems, next){
    async.map(
        problems,
        function(prob, next){
            prob.save(function(err){
                next(err, prob);
            });
        }, 
        function(err,probs){
            logger.info('Saved all');
            next(err, probs);
        }
    );
}
function printDetail(problems, next){
    logger.info(problems);
    next(null, problems);
}
function countProblems(str, problems, next){
    logger.info(str + problems.length);
    return next(null, problems);
}
function noop(problems, next){
    next(null, problems);
}

exports.save = function(options){ 
    options = _.defaults(options || {}, {
        save: true,
        printAfterSave: false,
        countAfterSave: true,
        countReceived: true,
    });
    return function(problems, next){
        async.waterfall([
            _.partial(noop, problems),
            options.countReceived ? _.partial(countProblems,'Received ') : noop,
            removeExisting,
            wrapInProblemsObject,
            options.save ? saveAll : noop,
            options.printAfterSave ? printDetail : noop,
            options.countAfterSave ? _.partial(countProblems,'Saved ') : noop,
            function (problems){
                next(null, problems);
            }
        ]);
    }
}

