var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:judges');

exports.up = function(ws, model){
    logger.info("Starting");
    
    ws.get('/api/judges', function(req, res){
        model.Judge.find({}).exec(function(err, judges){
            if(err)res.send(err);
            else res.send(_.orderBy(judges,['name']));
        });
    });

    

    ws.put('/api/judges/:id', function(req, res){
        var judge = req.body;
        model.Judge.findById(req.params.id, function(err, oJudge){

            oJudge.name = judge.name;
            oJudge.url = judge.url;
            oJudge.save(function(err){
                if(err)res.status(500).send(err);
                else res.status(200).send(oJudge);
            });
        });
    });

    ws.post('/api/judges', function(req, res){
        var judge = new model.Judge(req.body);
        judge.save(function(err) {
            if(err)res.status(500).send(err);
            else res.status(200).send(judge);
        });
    });

    ws.delete('/api/judges/:id', function(req, res){
        
        model.Judge.findById(req.params.id, function(err, judge){
            if(err)res.status(500).send(err);
            judge.remove(function(err) {
                if(err)res.status(500).send(err);
                else   res.status(200).send(judge);
            });
        });
    });

    
    logger.info("Started");
};