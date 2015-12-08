var config = require('../config');
var logger  = require('../utils/logger').getLogger();
var Agenda = require('agenda');
var codeforces = require('./submissions/codeforces');
var agenda = new Agenda({
	db: { address: config.db.mongodb }
});


agenda.define('codeforces.processAllUsers', codeforces.processAllUsers);
agenda.define('codeforces.processByDemand', codeforces.processByDemand);

// agenda.define('spoj.processAllUsers', spoj.processAllUsers);
// agenda.define('spoj.processByDemand', spoj.processByDemand);

agenda.on('ready', function() {

	agenda.every('0 0 * * *', 'codeforces.processAllUsers');

	agenda.every('*/5 * * * * *', 'codeforces.processByDemand');

	agenda.start();
	logger.info('Agenda Started.');

});