var config = {
    "dev" : {
        "db": {
            "mongodb": 'mongodb://algopit:algopit@algopit-shard-00-00.cpfat.mongodb.net:27017,algopit-shard-00-01.cpfat.mongodb.net:27017,algopit-shard-00-02.cpfat.mongodb.net:27017/algopit?ssl=true&replicaSet=atlas-f3224k-shard-0&authSource=admin&retryWrites=true&w=majority'
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