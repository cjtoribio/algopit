var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:problems');
var async  = require('async');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/problems', function(req, res){
        model.Problem.find({}).sort({name: 1}).exec(function(err, problems){
            if(err)res.send(err);
            else res.send(problems || []);
        });
    });

    ws.get('/api/problems/search', function(req, res){
        var ors = [];
        if(req.query.name)      ors.push({name:       new RegExp(req.query.name,'i')});
        if(req.query.category)  ors.push({categories: new RegExp(req.query.category,'i')});
        if(req.query.judge)     ors.push({judge:      new RegExp(req.query.judge,'i')});
        if(ors.length == 0){
        	return res.status(200).send([]);
        }
        model.Problem.find({
                '$or': ors
            })
            .limit(10)
            .exec(function(err, problems){
                if(err)res.send(err);
                else res.send(problems);
            });
    });
    ws.post('/api/problems/:id/toggleSolved', function(req, res){
        model.Problem.findById(req.params.id, function(err, prob){
            model.UserProblem
                .findOne({problem: prob._id, user: req.user._id})
                .exec(function(err, up){
                    if(err){
                        logger.error(err);
                        return res.sendStatus(500);
                    }
                    if(up == null){
                        up = new model.UserProblem({problem: prob._id, user: req.user._id});
                    }
                    if(up.state == 'SOLVED'){
                        logger.error('Cannot edit after SOLVED');
                        return res.sendStatus(401);
                    }
                    var nstate = req.query.state || (up.state == 'PENDING_SOLVED' ? 'UNSOLVED' : 'PENDING_SOLVED');
                    if(nstate == 'UNSOLVED'){
                        up.remove(function(err){
                            res.status(200).send(prob); 
                        });
                    }else{
                        up.state = nstate;
                        up.save(function(){
                            res.status(200).send(prob);
                        });
                    }
                });
        });
    });
    
    ws.get('/api/problems/:id',function(req, res){
        model.Problem.find({_id: req.params.id }, function(err, results){
            if(err)res.send(err);
            else res.send(results[0] || {});
        });
    });
    
    ws.post('/api/problems', function(req, res){
        var p = new model.Problem(req.body);
        p.save(function(){
            res.send(p);
        });
    });
    
    ws.put('/api/problems/:id', function(req, res){
        var problem = req.body; 
        model.Problem.update({_id: req.params.id }, problem, function(err, count){
            if(err)res.send(err);
            else res.send({affected: count});
        });
    });
    
    ws.delete('/api/problems/:id', function(req, res){
        model.Problem.remove({_id: req.params.id}, function(err, obj){
            if(err)res.send(err);
            else res.send({affected: obj});
        });
    });
    logger.info("Started");
};