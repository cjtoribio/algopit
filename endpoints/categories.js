var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:categories');

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/categories', function(req, res){
        // logger.info(req, "User {user} requesting GET:/api/categories");
        model.Category.find({}).exec(function(err, cats){
            if(err){
                res.send(err);
                logger.error("GET:/api/categories/ " + JSON.stringify(err));
            }
            else {
                res.send(_.orderBy(cats,['name']));
                logger.info("GET:/api/categories/ array size: " + cats.length);
            }
        });
        
    });


    ws.put('/api/categories/:id', function(req, res){
        var category = req.body;
        model.Category.findById(req.params.id, function(err, oCategory){

            oCategory.name      = category.name;
            oCategory.save(function(err){
                if(err)res.status(500).send(err);
                else res.status(200).send(oCategory);
            });
        });
    });

    ws.post('/api/categories', function(req, res){
        var category = new model.Category(req.body);
        category.save(function(err) {
            if(err)res.status(500).send(err);
            else res.status(200).send(category);
        });
    });

    ws.delete('/api/categories/:id', function(req, res){
        
        model.Category.findById(req.params.id, function(err, category){
            if(err)res.status(500).send(err);
            category.remove(function(err) {
                if(err)res.status(500).send(err);
                else   res.status(200).send(category);
            });
        });
    });


    logger.info("Up");
};