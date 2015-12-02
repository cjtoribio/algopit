var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:judges');

exports.up = function(ws, model){
    logger.info("Starting");
    
    ws.get('*', function(req, res) {
        // console.log(req.originalUrl);
        res.redirect('/#' + req.originalUrl);
    });
    
    ws.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).body({ message: err.message });
    });
    
    logger.info("Started");
};