var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:lists');
var async = require('async');
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/lists', ensureAuthenticated, function(req, res){
        model.List
            .find({"$or": [{author: req.user._id}, {shared: req.user._id}]})
            .sort({name: 1})
            .exec(function(err, lists){
                if(err)return res.status(500).send([]);
                res.status(200).send(lists);
            });
    });
    
 
    ws.get('/api/lists/:id',function(req, res){
        async.waterfall([
            findList
        ], respond);
        /////////////////////
        function findList(next){
            model.List
                .find({_id: req.params.id})
                .populate('author', 'username')
                .populate('problems')
                .populate('shared', 'username')
                .exec(next);
        }
        function respond(err, list){
            if(err)return res.status(500).send(err);
            return res.status(200).send(list);
        }  
    });

    ws.post('/api/lists', function(req, res){
        var p = new model.List(req.body);
        p.save(function(){
            res.send(p);
        });
    });

    ws.put('/api/lists/:id', function(req, res){
        var list = req.body; 
        model.List.update({_id: req.params.id }, list, function(err, count){
            if(err)res.status(500).send(err);
            else res.send({affected: count});
        });
    });

    ws.delete('/api/lists/:id', function(req, res){
        model.List.find({_id: req.params.id}, function(err, list){
            if(err)return res.status(500).send(err);
            list.remove(function(){
                res.status(200).send(list);
            });
        });
    });
    

    logger.info("Started");
};





