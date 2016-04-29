var _       = require("lodash");
var request = require('request');
var async   = require('async');
var model   = require('../../model');
var cheerio = require('cheerio');
var general = require('./general');

module.exports = {
    processAllUsers : processAllUsers,
    processSPUser   : processSPUser
}

// processAllUsers();

// For Spoj
function processAllUsers(){
    getSPUsers(function(err, users){
        if(err)return;
        console.time('spoj.processAllUsers');
        async.map(
            users,
            processSPUser,
            function (err, result){
                if(err)return logger.error(err);
                console.timeEnd('spoj.processAllUsers');
            }
        );
    })
}
function processSPUser(user, next){
    async.waterfall([
        function(next){
            next(null, user);
        },
        getAllSPSubmissions,
        transformSPSubmissions,
        general.save({save: false})
    ], function(err, user, submissions){
        next(err, user, submissions);
    });
}
function getSPUsers(next){
    model.User.find({
        'spoj.username' : {'$ne' : null},
        'spoj.password' : {'$ne' : null}
    }).exec(function(err, users){
        next(err, users);
    });
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
    next(null, user, submissions);
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




