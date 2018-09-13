var logger = require('../utils/logger').getLogger('endpoints:agenda');
var Agendash = require('agendash');
const agenda = require('../jobs/jobs');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");

    ws.use('/dash', ensureAuthenticated, Agendash(agenda));

    logger.info("Started");
}