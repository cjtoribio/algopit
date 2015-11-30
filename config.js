var config = {
    "dev" : {
        "db": {
            "mongodb": 'mongodb://algopit:algopit@ds057934.mongolab.com:57934/algopit'
        },
        "logger": {
            "api": "logs/api.log",
            "exception": "logs/exceptions.log"
        }
    }
    
}; 

process.env.DEBUG = "endpoints:*,app:*";

module.exports = config.dev;