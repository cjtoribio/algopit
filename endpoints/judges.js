var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:judges');

exports.up = function(ws, model){
    logger.info("Starting");
    
    ws.get('/api/judges', function(req, res){
        model.Judge.find({}).exec(function(err, cats){
            if(err)res.send(err);
            else res.send(cats || []);
        });
    });
    
    logger.info("Started");
};