var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Judge = new Schema({
    name: String,
    entryDate: { type: Date, default: Date.now }
});

exports.Judge = mongoose.model('judges', Judge);
