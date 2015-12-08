// normalize codeforces URLs
db.problems.find({url: {'$regex':'//(www\.)?codeforces.com/(problemset)?'}}).forEach(function(prob){
//'http://codeforces.com/contest/{#contestId}/problem/{#index}'
	prob.url = prob.url.replace('www.codeforces.com', 'codeforces.com');
	prob.url = prob.url.replace(/problemset\/problem\/(\d+)/,'contest/$1/problem');
	// db.problems.save(prob);
	print(prob.url);
});

// Normalizing "sourceReferenceId" and "url" in SPOJ problems
(function(){
	var a = 1;
	db.problems.find({
	  judge: 'SPOJ'
	}).forEach(function(prob){
		if(getSourceReferenceId(prob.url) != prob.sourceReferenceId){
			prob.sourceReferenceId = getSourceReferenceId(prob.url);
			db.problems.save(prob);
            print(a++);
		}
	});
	function getSourceReferenceId(url){
		url = url.replace(/http:\/\/(www\.)?spoj.((pl)|(com))\/problems\//,'');
		url = url.replace(/\/.*/g,'');
		return url;
	}
})();

// Normalizing "sourceReferenceId" and "url" in Codeforces problems
(function(){
    var a = 1;
    db.problems.find({
      judge: 'Codeforces'
    }).forEach(function(prob){
//          print (prob.url + ' ' + prob.sourceReferenceId);
        if(getSourceReferenceId(prob.url) != prob.sourceReferenceId){
            prob.sourceReferenceId = getSourceReferenceId(prob.url);
             db.problems.save(prob);
             print(a++);
        }
    });
    function getSourceReferenceId(url){
        url = url.replace(/http:\/\/(www\.)?codeforces.com\/contest\//,'');
        url = url.replace(/\/problem\//g,'');
        return url;
    }
})();


