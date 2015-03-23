var persist = require("persist");

var connectionPool = {};

exports.exec = function (dbConfig, callback) {
    
    if(connectionPool[dbConfig.name])
        callback(null, connectionPool[dbConfig.name]);
    else {
        persist.connect(dbConfig, function(err,connection){
            connectionPool[dbConfig.name] = connection;
            callback(null, connection);
        });
    }
}

exports.conn = {
    MEMORY: {
        name: "MEMORY",
        driver: 'sqlite3',
        filename: ':memory:',
        trace: true
    }
}