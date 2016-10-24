var _ = require('lodash');
var logger = require('../utils/logger').getLogger('endpoints:lists');
var async = require('async');
var listsManager = require('../lib/lists');
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");
    ws.get('/api/lists', ensureAuthenticated, function(req, res){
        model.List
            .find({"$or": [{author: req.user._id}, {party: req.user._id}, {admin: req.user._id}]})
            .sort({name: 1})
            .exec(function(err, lists){
                if(err)return res.status(500).send([]);
                res.status(200).send(lists);
            });
    });
    
 
    ws.get('/api/lists/:id',function(req, res, next){
        listsManager.findList({ user: req.user, listId: req.params.id })
        .then((list) => {
            res.status(200).send(list);
        })
        .catch(next)
        .done();
    });

    ws.get('/api/lists/:id/stats', ensureAuthenticated,function(req, res, next){

        listsManager.findListWithStatus({ user: req.user, listId: req.params.id })
        .then((list) => {
            res.status(200).send(list);
        })
        .catch(next)
        .done();

        return;
        async.waterfall([
            findList,
            attachProblemStatus
        ], respond);
        /////////////////////
        function findList(next){
            model.List
                .findById(req.params.id)
                .populate('author', 'username name')
                .populate('problems')
                .populate('party', 'username name')
                .populate('admins', 'username name')
                .exec(next);
        }
        function attachProblemStatus(list, next){
            if(!list)return next('List not found');
            async.map(
                list.party,
                function(user, callback){
                    async.map(
                        list.problems, 
                        function(problem, callback){
                            model.UserProblem.findOne({
                                user: user._id,
                                problem: problem._id
                            }).exec(function(err, ret){
                                callback(err, _.property('state')(ret) || 'UNSOLVED');
                            });
                        },
                        function(err, status){
                            if(err)return next(err);
                            callback(err, status);
                        }
                    );
                },
                function(err, statusList){
                    var objList = list.toObject();
                    objList.status = {};
                    _.forEach(list.party, function(user, idx){
                        objList.status[user.username] = statusList[idx];
                    });
                    next(null, objList);
                }
            );
        }
        function respond(err, list){
            if(err)return res.status(500).send(err);
            return res.status(200).send(list);
        }  




    });

    ws.post('/api/lists', ensureAuthenticated, function(req, res){
        var list = _.clone(req.body);
        list = new model.List(model.List.cleanPopulated(list));
        list.author = req.user._id;
        if(!_.includes(list.admins, req.user._id)){
            list.admins.unshift(req.user.id);
        }
        list.save(function(err){
            if(err)return res.status(500).send(err);
            else res.status(200).send(list);
        });
    });


    ws.put('/api/lists/:id', function(req, res){
        var list = req.body;
        model.List.findById(req.params.id, function(err, oList){
            oList.problems  = list.problems;
            oList.party     = list.party;
            oList.admins    = list.admins;
            oList.tasks     = list.tasks;
            oList.startDate = list.startDate;
            oList.endDate   = list.endDate;
            oList.name      = list.name;
            oList.save(function(err){
                if(err)res.status(500).send(err);
                else res.status(200).send(list);
            });
        });
    });

    ws.post('/api/lists/:id/join', ensureAuthenticated, function(req, res){
        var list = req.body; 
        model.List.findOneAndUpdate(
            {_id: req.params.id }, 
            {'$addToSet': {party: req.user._id}}, 
            {'new': true},
            function(err, newList){
                if(err)res.status(500).send(err);
                else res.status(200).send(newList);
            }
        );
    });

    ws.post('/api/lists/:id/leave', ensureAuthenticated, function(req, res){
        var list = req.body; 
        model.List.findOneAndUpdate(
            {_id: req.params.id }, 
            {'$pull': {party: req.user._id}}, 
            {'new': true},
            function(err, newList){
                if(err)res.status(500).send(err);
                else res.status(200).send(newList);
            }
        );
    });

    ws.delete('/api/lists/:id', function(req, res){
        model.List.findById(req.params.id, function(err, list){
            if(err || !list)return res.status(500).send(err);
            list.remove(function(){
                res.status(200).send(list);
            });
        });
    });
    
    ws.all('/api/lists/*', (err, req, res, nex) => {
        console.log(err);
        res.status(500).send(err);
    });

    logger.info("Started");
};





