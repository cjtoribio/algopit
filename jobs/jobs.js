var config = require('../config');
var logger  = require('../utils/logger').getLogger();
var Agenda = require('agenda');
var codeforces = {
	submissions	: require('./submissions/codeforces'),
	problems	: require('./problems/codeforces'),
};  
var users = {
	userProblems: require('./users/userProblems'),
}
var agenda = new Agenda({
	db: { address: config.db.mongodb }
});
var readline = require('readline');
var _ = require('lodash');
var moment = require('moment');

agenda.define('codeforces.processAllUsers', codeforces.submissions.processAllUsers);
agenda.define('codeforces.updateProblems', codeforces.problems.updateProblems);
agenda.define('users.updateUserProblem', users.userProblems.updateUserProblem);

// agenda.define('spoj.processAllUsers', spoj.processAllUsers);
// agenda.define('spoj.processByDemand', spoj.processByDemand);

agenda.on('ready', function() {

	// agenda.every('5 seconds', 'codeforces.processAllUsers');
	// agenda.every('24 hours', 'codeforces.updateProblems');
	// agenda.every('5 seconds', 'users.updateUserProblem');

	// agenda.every('5 seconds', 'spoj.processAllUsers');
	// agenda.every('5 seconds', 'spoj.processByDemand');

	agenda.start();
	logger.info('Agenda Started.');


	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	function askToExist(){
		rl.question(menu(), function(answer) {
			switch (answer){
				case 'stop':
					graceful();
					return;
				// case 'jobs':
				// 	agenda.jobs({}, function(err, jobs){
				// 		logger.info('----------JOBS-----------');
				// 		_.each(jobs,printJob);
				// 		logger.info('-------------------------');
				// 		setTimeout(askToExist, 10);
				// 	});
				// 	break;
				default:
					setTimeout(askToExist, 10);
			}
		});
	}
	askToExist();


});

process.on('exit', (code) => {
  agenda.stop(() => {
  	console.log('agenda stoped');
  });
});

function graceful() {
  agenda.stop(function() {
    process.exit(0);
  });
}
function menu(){
	logger.info('-------------------------');
	logger.info('[stop] - to exit         ');
	// logger.info('[jobs] - to show jobs    ');
	logger.info('-------------------------');
	return '';
}
function printJob(job){
	job = job.toJSON();
	logger.info('NAME: ' + job.name + ':');
	logger.info('\tnext run at: ' + moment(job.nextRunAt).toNow());
	logger.info('\tlast run at: ' + moment(job.lastRunAt).fromNow());
	logger.info('\tRunning    : ' + (job.lockedAt));
	logger.info('\tDuration   : ' + moment.duration(moment(job.lastFinishedAt).diff(job.lastRunAt)).asSeconds());
}

module.exports = agenda;
