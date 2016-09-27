var _       = require("lodash");
var model   = require('./model');
var Q       = require('q');

Q.ninvoke(
    model.List.find({})
)
.then((lists) => {
    console.log(lists);
})
.catch((err) => {
    console.log(err);
})