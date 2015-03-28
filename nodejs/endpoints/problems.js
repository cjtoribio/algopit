var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:problems');

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/problems', function(req, res){
        model.Problem.find({}).sort({name: 1}).exec(function(err, results){
            var ret = _.map(results, function(item){
                return {
                    _id: item._id,
                    categories: item.categories,
                    name: item.name,
                    difficulty: item.difficulty,
                    url: item.url,
                    judge: item.judge,
                    sourceReferenceId: item.sourceReferenceId
                };
            });
            if(err)res.send(err);
            else res.send(ret || []);
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