var mongoose = require("mongoose");
var Category = require("./category").Category;
var _ = require('lodash');

var Schema = mongoose.Schema;
var Problem = new Schema({
    name: String,
    difficulty: Number,
    url: String,
    contest: String,
    entryDate: { type: Date, default: Date.now },
    sourceReferenceId: String,
    lastUpdated: { type: Date, default: Date.now },
    categories: [String],
    judge: String,
    url: String,
    writer: String
});

exports.Problem = mongoose.model('problems', Problem);
