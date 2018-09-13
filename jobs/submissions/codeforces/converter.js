const _ = require('lodash');

const translateVerdict = (verdict) => {
    switch(verdict){
        case 'OK'                   : return 'ACCEPTED';
        case 'COMPILATION_ERROR'    : return 'COMPILATION_ERROR';
        case 'TIME_LIMIT_EXCEEDED'  : return 'TIME_LIMIT_EXCEEDED';
        case 'MEMORY_LIMIT_EXCEEDED': return 'MEMORY_LIMIT_EXCEEDED';
        case 'RUNTIME_ERROR'        : return 'RUNTIME_ERROR';
        case 'WRONG_ANSWER'         : return 'WRONG_ANSWER';
        case 'PRESENTATION_ERROR'   : return 'PRESENTATION_ERROR';
        case 'TESTING'              : return 'TESTING';
        default                     : return 'OTHER';
    }
};

const toProblemId = (problem) => {
	return `${problem.contestId}${problem.index}`;
};

exports.cfToDBSubmission = (user, sub) => {
    return {
        user      : _.property('_id')(user),
        judge     : 'Codeforces',
        extId     : sub.id + '',
        verdict   : translateVerdict(sub.verdict),
        time      : sub.timeConsumedMillis,
        bytes     : sub.memoryConsumedBytes,
        submitDate:new Date(sub.creationTimeSeconds*1000),
        problem   : toProblemId(sub.problem),
        language  : sub.programmingLanguage,
        message   : ''

    };
};