var config = {
    "dev" : {
        "db": {
            "mongodb": 'mongodb://algopit:algopit@algopit.cpfat.mongodb.net/algopit?retryWrites=true&w=majority'
        },
        "logger": {
            "api": "logs/api.log",
            "exception": "logs/exceptions.log"
        }
    }
    
}; 

process.env.DEBUG = "endpoints:*,app:*";
process.env.AGENDA = 'off';

module.exports = config.dev;