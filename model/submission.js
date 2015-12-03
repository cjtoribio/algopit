var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var verdicts  = ['ACCEPTED', 'PRESENTATION_ERROR', 'WRONG_ANSWER', 
				 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR',
				 'COMPILATION_ERROR', 'TESTING', 'OTHER'];
var languages = ['C/C++', 'JAVA', 'PYTHON', 'C#', 'OTHER'];

var Submission = new Schema({
    user      : { type: Schema.ObjectId, ref: 'users' },
    judge     : { type: Schema.ObjectId, ref: 'judges' },
    extId     : String, // Id of the submission in the external judge
    verdict   : { type: String, enum: verdicts },
    time      : Number, // in milliseconds
    bytes     : Number, // in KB
    submitDate: Date,
    problem   : { type: Schema.ObjectId, ref: 'problems' },
    laguage	  : String,
    createDate: Date,
    message	  : Date
});

exports.Submission = mongoose.model('submissons', Submission);
