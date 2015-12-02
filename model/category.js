var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Category = new Schema({
    name: String,
    source: String,
    entryDate: { type: Date, default: Date.now }
});

exports.Category = mongoose.model('categories', Category);
