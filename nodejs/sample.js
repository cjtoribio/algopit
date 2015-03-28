var config = require("./config");
var debug = require("debug");


var log1 = debug("app:log1");
log1("Should show");

var log2 = debug("app:log2");
log2("Shouldn't show");

var log3 = debug("app:log3");
log1("Should show");
log2("Shouldn't show");
log3("Should show");