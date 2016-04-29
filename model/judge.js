var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Judge = new Schema({
    name: String,
    entryDate: { type: Date, default: Date.now },
    url: String
}, {
	timestamps: {}
});

exports.Judge = mongoose.model('judges', Judge);
