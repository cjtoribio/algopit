db.problems.find({url: {'$regex':'//(www\.)?codeforces.com/problemset'}},{url:1}).forEach(function(prob){
//'http://codeforces.com/contest/{#contestId}/problem/{#index}'
	prob.url = prob.url.replace('www.codeforces.com', 'codeforces.com');
	prob.url = prob.url.replace(/problemset\/problem\/(\d+)/,'contest/$1/problem');
//	db.problems.save(prob);
	print(prob.url);
});
