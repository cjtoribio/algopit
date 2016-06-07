var mongoose = require("mongoose");
var Category = require("./category").Category;
var _ = require('lodash');

var Schema = mongoose.Schema;
var Problem = new Schema({
    name: String,
    difficulty: Number,
    computedDifficulty: Number,
    url: String,
    contest: String,
    entryDate: { type: Date, default: Date.now },
    sourceReferenceId: String,
    lastUpdated: { type: Date, default: Date.now },
    categories: [String],
    judge: String,
    writer: String,
    tags: [String]
}, {
    timestamps: { createdAt: 'createdAt' }
});

Problem.pre('save', function(next){
    if(this.entryDate == null)
        this.entryDate = new Date();
    this.lastUpdated = new Date();
    next();
});

exports.Problem = mongoose.model('problems', Problem);
