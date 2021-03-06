var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var general = require('./general');
var logger  = require('../../utils/logger').getLogger();
var moment  = require('moment');
var brush   = require('../../utils/brush');

module.exports = {
    updateProblems  : updateProblems
};

function updateProblems(job, done){
    var st = moment();
    logger.info('Started ' + brush.cyan(job.toJSON().name));
    async.waterfall([
        getAllProblems,          // (next) -> next(null, problems)
        transformProblems,       // (problems,next) -> next(null, problems)
        general.save({save: true, printAfterSave: false})// (problems,next) -> next(null, problems)
    ],  function (err, result){
            (done||_.noop)();
            if(err)return logger.error(err);
            var dur = moment.duration(moment() - st).asSeconds();
            logger.info('Finished '  + 
                brush.cyan(job.toJSON().name) + ' after ' + 
                brush.magenta(dur + 's'));
        }
    );
}
function getAllProblems(next){
    var options = {
        url: 'http://codeforces.com/api/problemset.problems',
        method: 'GET',
        json:true
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // logger.info(body.results.problems);
            next(null, body.result.problems, body.result.problemStatistics);
        }else{
            next(error || ('Status Code: ' + response.statusCode));
        }
    });
}
function transformProblems(problems, statistics, next){
    var orderedStats = _.orderBy(statistics, ['solvedCount'], ['asc']);
    orderedStats.forEach(function(obj, rank){
        obj.rank = rank;
    });
    var mapById = _.keyBy(orderedStats, getId), total = orderedStats.length;
    problems = _.map(problems, function(prob){
        return {
            name: prob.name,
            url: 'http://codeforces.com/contest/{#contestId}/problem/{#index}'
                 .replace('{#contestId}', prob.contestId)
                 .replace('{#index}', prob.index),
            contest: prob.contestId,
            computedDifficulty: 5 - (mapById[getId(prob)].rank / total) * 4,
            sourceReferenceId: getId(prob),
            categories: transformCategories(prob.tags),
            judge: 'Codeforces',
            writer: null,
            tags: ['codeforces.api']

        }
    });
    next(null, problems);
    return;
    function getId(prob){
        return prob.contestId + prob.index;
    }
    // url -> http://codeforces.com/contest/{#contestId}/problem/{#index}'
    function transformCategories(tags){
        var dic = {
            'implementation': 'Implementation',
            'dp'            : 'Dynamic Programming',
            'brute force'   : 'Brute Force',
            'greedy'        : 'Greedy',
            'string suffix structures' : 'Suffix Array',
            'dfs and similar': 'Graph Theory',
            'bitmasks'      : 'Bitmask',
            'sortings'      : 'Bucket Sort',
            'math'          : 'Math',
            'hashing'       : 'String Hash',
            'graphs'        : 'Graph Theory',
            'number theory' : 'Number Theory',
            'games'         : 'Game Theory',
            'combinatorics' : 'Combinatorics',
            'dsu'           : 'Disjoint Set',
            'geometry'      : 'Geometry',
            'binary search' : 'Binary Search',
            'constructive algorithms': 'Implementation',
            'two pointers'  : 'Two Pointers',
            'ternary search': 'Ternary Search',
            'matrices'      : 'Matrix Exponentiation',
            'trees'         : 'Trees',
            'shortest paths': 'Shortest Path',
            'expression parsing': 'Parsing',
            'schedules'     : null,
        }
        var transformed = 
            _.map(tags, function(tag){
                return dic[tag];
            });
        return _.chain(transformed)
                .filter()
                .uniq()
                .sort()
                .value();
    }
}
