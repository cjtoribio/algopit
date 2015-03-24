
exports.up = function(ws , model){
    require("./users").up(ws, model);
    require("./problems").up(ws, model);
    require("./judges").up(ws, model);
    require("./categories").up(ws, model);
    require("./usersProblems").up(ws, model);
    require("./defaults").up(ws,model);
}