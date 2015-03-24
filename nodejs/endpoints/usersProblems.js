var _ = require('lodash');


exports.up = function(ws, model){
    
    
    ws.post('/api/userProb/', function(req, res, next){
        var userProb = new model.UserProblem(req.body);
        userProb.temporary = true;
        userProb.save(function(){
            console.log(userProb);
            res.send(userProb);
        });
    });
    
    ws.delete('/api/userProb/:id', function(req, res, next){
        console.log(req.params.id);
        model.UserProblem.remove({
            _id: req.params.id
        }).exec(function(err, cnt){
            console.log(err);
            console.log(cnt);
            if(err)throw err;
            res.sendStatus(200);
        });
    });
    
    
    ws.get('/api/userProb/user/:uId', function(req, res, next){
        console.log(req.params.uId);
        model.UserProblem.find({
            user: req.params.uId,
        }).exec(function(err, ret){
            if(err)throw err;
            res.send(ret);
        });
    });
    
    
    
    console.log("Users Problems Service Up");
};