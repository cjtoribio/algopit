var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:categories');

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/categories', function(req, res){
        logger.logUser(req, "User {user} requesting GET:/api/categories");
        model.Category.find({}).exec(function(err, cats){
            if(err){
                res.send(err);
                logger.error("GET:/api/categories/ " + JSON.stringify(err));
            }
            else {
                res.send(cats || []);
                logger.info("GET:/api/categories/ array size: " + cats.length);
            }
        });
        
    });
    logger.info("Up");
};