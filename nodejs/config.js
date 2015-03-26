var config = {
    "dev" : {
        "db": {
            "mongodb": 'mongodb://' + process.env.IP + '/my_database'
        },
        "logger": {
            "api": "logs/api.log",
            "exception": "logs/exceptions.log"
        }
    }
    
}; 

process.env.DEBUG = "endpoints:*,app:*";

module.exports = config.dev;