require("../config");
exports.getLogger = function(name){
    var logger = {
        info: require("debug")(name + ":info"),
        error: require("debug")(name + ":error"),
        logUser: function(req, message){
            var user = (req.user || {id:'anonymous'}).id;
            this.info(message.replace(new RegExp('{user}','i'), user));
        }
    }
    return logger;
};