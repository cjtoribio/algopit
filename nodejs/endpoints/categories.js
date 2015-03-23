var _ = require('lodash');

exports.up = function(ws, model){
    ws.get('/api/categories', function(req, res){
        model.Category.find({}).exec(function(err, cats){
            if(err)res.send(err);
            else res.send(cats || []);
        });
    });
    console.log("Category Service Started");
};