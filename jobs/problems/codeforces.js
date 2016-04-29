var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var general = require('./general');
var logger  = require('../../utils/logger').getLogger();
var moment  = require('moment');

module.exports = {
    updateProblems  : updateProblems
};

function updateProblems(job, done){
    var st = moment();
    async.waterfall([
        getAllProblems,          // (next) -> next(null, problems)
        transformProblems,       // (problems,next) -> next(null, problems)
        general.save({save: true, printAfterSave: false})// (problems,next) -> next(null, problems)
    ],  function (err, result){
            (done||_.noop)();
            if(err)return logger.error(err);
            logger.info('codeforces.updateProblems - ' + moment.duration(moment() - st).asSeconds() + 's');
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
            next(null, body.result.problems);
        }else{
            next(err || ('Status Code: ' + response.statusCode));
        }
    });
}
function transformProblems(problems, next){
    problems = _.map(problems, function(prob){
        return {
            name: prob.name,
            url: 'http://codeforces.com/contest/{#contestId}/problem/{#index}'
                 .replace('{#contestId}', prob.contestId)
                 .replace('{#index}', prob.index),
            contest: prob.contestId,
            sourceReferenceId: prob.contestId + prob.index,
            categories: transformCategories(prob.tags),
            judge: 'Codeforces',
            writer: null,
            tags: ['codeforces.api']

        }
    });
    next(null, problems);
    return;
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
