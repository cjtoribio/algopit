var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config'); 

console.log(config.db.mongodb);

describe('Api Test',function(){
     var url = 'https://demo-project-cjtoribio.c9.io';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect(config.db.mongodb);
        done();
    }); 
    
    describe('Problem Api', function() {
        var arrayCount = -1;
        it('should return list', function(done) {
            request(url)
                .get('/api/problems')
                .send() 
                .end(function(err, res) {
                    if (err) throw err;
                    // this is should.js syntax, very clear
                    res.should.have.property('status',200);
                    res.body.should.be.Array;
                    arrayCount = res.body.length;
                    done();
                });
            
        });
        var _id = null;
        it('should assign id on save', function(done) {
            var problem = {
                name: "TEST_PROB",
                dificulty: 4,
                url: "google.com"  
            };
            request(url)
                .post('/api/problems')
                .send(problem) 
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have._id;
                    _id = res.body._id;
                    
                    done();
                });
        });
        it('should return list with one more', function(done) {
            request(url)
                .get('/api/problems')
                .send() 
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.length.should.be.equal(arrayCount+1);
                    
                    done();
                });
            
        });
        var createdProb = null;
        it('should get problem created', function(done) {
            request(url)
                .get('/api/problems/' + _id)
                .send() 
                // end handles the response
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have.property("_id");
                    res.body._id.should.be.equal(_id);
                    createdProb = res.body;
                    
                    done();
                });
        });
        it('should update problem created', function(done) {
            createdProb.name = "TEST_PROB2";
            request(url)
                .put('/api/problems/' + _id)
                .send({name: "TEST_PROB2"}) 
                // end handles the response
                .end(function(err, res) {
                    if (err) throw err;
                    // this is should.js syntax, very clear
                    res.body.should.have.property("affected");
                    res.body.affected.should.be.equal(1);
                    done();
                });
        });
        it('should get problem created with update', function(done) {
            request(url)
                .get('/api/problems/' + _id)
                .send() 
                // end handles the response
                .end(function(err, res) {
                    if (err) throw err;
                    // this is should.js syntax, very clear
                    res.body.should.have.property("name");
                    res.body.name.should.be.equal("TEST_PROB2");
                    done();
                });
        });
        it('should delete problem created', function(done) {
            request(url)
                .delete('/api/problems/' + _id)
                .send() 
                // end handles the response
                .end(function(err, res) {
                    if (err) throw err;
                    // this is should.js syntax, very clear
                    res.body.should.have._id;
                    done();
                });
        });
        it('should return list with one less', function(done) {
            request(url)
                .get('/api/problems')
                .send() 
                .end(function(err, res) {
                    if (err) throw err;
                    // this is should.js syntax, very clear
                    res.body.length.should.be.equal(arrayCount);
                    done();
                });
            
        });
        
    });
});