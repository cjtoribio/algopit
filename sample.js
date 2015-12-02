var http = require("http");
var _ = require("lodash");

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



http.get('http://codeforces.com/api/user.status?handle=cjtoribio&from=1', function(res) {
    var finalData = "";

    res.on("data", function(data) {
        finalData += data.toString();
    });

    res.on("end", function() {
        var subs = JSON.parse(finalData);
        var acProblems = _(subs.result).reverse()
            // .filter({'verdict':'OK'})
            // .map('problem')
            // .uniq(false, function(p){
                // return p.name;
            // })
            .value();
        
        console.log(acProblems.length);
    });
}).end();



//*/