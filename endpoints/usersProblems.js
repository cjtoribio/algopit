var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:usersProblems');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");
    
    
    ws.post('/api/userProb/', ensureAuthenticated, function(req, res, next){
        var userProb = new model.UserProblem(req.body);
        userProb.user = req.user.id;
        userProb.temporary = true;
        userProb.save(function(){
            logger.info(userProb);
            res.send(userProb);
        });
    });
    
    ws.delete('/api/userProb/:id', ensureAuthenticated, function(req, res, next){
        logger.info(req.params);
        logger.info(req.user.id);
        model.UserProblem.remove({
            _id: req.params.id,
            user: req.user.id
        }).exec(function(err, cnt){
            if(err)throw err;
            res.sendStatus(200);
        });
    });
    
    
    ws.get('/api/userProb/', ensureAuthenticated, function(req, res, next){
        model.UserProblem.find({
            user: req.user.id,
        }).exec(function(err, ret){
            if(err)throw err;
            res.send(ret);
        });
    });
    
    
    
    logger.info("Started");
};