var config  = require("../config");
var _ 		= require('lodash');
var winston = require('winston');
winston.emitErrs = true;
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            // handleExceptions: true,
            json: false,
            colorize: true,
            prettyPrint: true,
			// handleExceptions: true,
			// humanReadableUnhandledException: true,
			timestamp: function() {
				return new Date().toGMTString();
			},
			formatter: function(options) {


				// Return string will be passed to logger.
				var format = '[{#timestamp}] {#caller} {#level}: {#message} {#object}';
				var time = '';
				if(_.size(options.meta) == 1 && _.has(options.meta,'duration')){
					format = '[{#timestamp}] {#caller} {#level}: {#message} {#time}';
					time = options.meta.duration;
				}


				var caller = getCaller();
				var message = options.message;
				var level = winston.config.colorize(options.level,_.padRight(options.level.toUpperCase(), 5, ' '));
				var timestamp = colorize(options.timestamp(), 'grey');
				var obj = 
					(options.meta && Object.keys(options.meta).length ? '\n'+ JSON.stringify(options.meta, null, '   ') : '' );

				return format.replace('{#timestamp}', timestamp )
							 .replace('{#level}'	, level		)
							 .replace('{#message}'	, message	)
							 .replace('{#object}'	, obj 		)
							 .replace('{#caller}'	, caller	)
							 .replace('{#time}'		, time);


				function getCaller(){
					var stk = getStack()[10];
					if(!stk)return _.padRight(' ',20,' ');
					var filename = stk.getFileName().match(/(\/?[^\/]*){2}$/)[0];
					var line 	 = stk.getLineNumber();
					var func     = stk.getFunctionName();
					var rFname   = _.trunc(
						filename.split('').reverse().join('')
						,{
							length: 20,
							omission: ''
						}
					).split('').reverse().join('');
					return _.padRight(rFname,20,' ');

				}
			}
        })
    ],
    exitOnError: false
});
module.exports.getLogger = function (name){
	return logger;
};


function colorize(txt, color){
	var colors = {
	    bold: [1, 22],
	    italic: [3, 23],
	    underline: [4, 24],
	    inverse: [7, 27],
	    white: [37, 39],
	    grey: [90, 39],
	    black: [30, 39],
	    blue: [34, 39],
	    cyan: [36, 39],
	    green: [32, 39],
	    magenta: [35, 39],
	    red: [31, 39],
	    yellow: [33, 39]
	};
	return '\033[' + colors[color][0] + 'm' + txt + '\033[' + colors[color][1] + 'm';

}

function getStack() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
        return stack;
    };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
}
