var _ = require('lodash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('../utils/logger').getLogger('endpoints:users');
var moment = require('moment');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}

exports.up = function(ws, model){
    logger.info("Starting");
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        model.User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
      model.User.findOne({ username: username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        user.comparePassword(password, function(err, isMatch) {
          if (err) return done(err);
          if (isMatch) return done(null, user);
          return done(null, false);
        });
      });
    }));
    
    ws.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });
    
    ws.post('/api/signup', function(req, res, next){
        var user = new model.User(req.body);
        console.log(user);
        user.save(function(err){
            if(err) return next(err);
            else {
                req.login(user, function(err) {
                    if (err) { next(err) }
                    return res.send(user);
                });
            }
        });
    });

    ws.get('/api/users/checkAvailable/:username', function(req, res){
        model.User.find({username: req.params.username}, function(err, list){
            if(err)throw err;
            res.status(200).send(list.length == 0 ? true : false);
        });
    });
    
    ws.get('/api/logout', function(req, res){
        console.log('Entered');
        req.logout();
        res.sendStatus(200);
    });

    ws.get('/api/users/search', function(req, res){
        var ors = [];
        if(req.query.name)      ors.push({name:     new RegExp(req.query.name,'i')});
        if(req.query.username)  ors.push({username: new RegExp(req.query.username,'i')});
        if(ors.length == 0){
            return res.status(200).send([]);
        }
        model.User.find({
                '$or': ors
            })
            .limit(10)
            .exec(function(err, users){
                if(err)res.send(err);
                else res.send(users);
            });
    });
    
    ws.put('/api/users/:id/refresh', ensureAuthenticated, function(req, res){
        model.User.findById(req.user._id, function(err, user){

            if(!_.property('codeforces.refresh')(user)){
                var date  = moment().add(10, 'seconds');
                _.set(user, 'codeforces.refresh', date);
            }
            user.save(function(err){
                if(err)res.status(500).send(err);
                else res.status(200).send(user);
            });

        });
    });

    ws.put('/api/users/:id', ensureAuthenticated, function(req, res, next){
        
        model.User.update( { _id:req.params.id }, req.body, function(err){
            if(err) 
                next(err);
            else {
                res.send(req.body);
            }
        });
    });

    
    
    logger.info("Started");
};