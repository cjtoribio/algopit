var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var logger  = require('../../utils/logger').getLogger();


function addInfoToExisting(problems, next){
    var ids = _.chain(problems)
                .map('sourceReferenceId')
                .uniq()
                .sort()
                .value();
    model.Problem.find({
        sourceReferenceId: { '$in' : ids },
        judge: _.property('0.judge')(problems)
    }).exec(function(err, probs){
        var probMap = _.indexBy(probs, 'sourceReferenceId');
        var updatedProbs = 0, newProbs = 0;
        problems = _.map(problems, function(prob, idx){
            var oldProb = probMap[prob.sourceReferenceId];
            if(oldProb){
                // count updated problems
                updatedProbs++;
                var allCats = _.uniq(oldProb.categories.concat(prob.categories || []));
                var allTags = _.uniq(oldProb.tags.concat(prob.tags || []));
                oldProb.categories = allCats;
                oldProb.tags       = allTags;
                return oldProb;
            }else{
                newProbs++;
                return prob;
            }
        });
        logger.info('Updating(' + updatedProbs + ') Inserting(' + newProbs + ')');
        next(null, problems);
    });
}
function wrapInProblemsObject(problems, next){
    next(null, _.map(problems, function(prob){
        if(prob._id){
            return prob;
        }else{
            return new model.Problem(prob);
        }
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
            addInfoToExisting,
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
