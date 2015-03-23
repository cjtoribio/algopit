var _ = require('lodash');

exports.up = function(ws, model){
    ws.get('/api/judges', function(req, res){
        model.Judge.find({}).exec(function(err, cats){
            if(err)res.send(err);
            else res.send(cats || []);
        });
    });
    console.log("Judges Service Started");
};