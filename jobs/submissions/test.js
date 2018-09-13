const model   = require('../../model');
const codeforces = require('./codeforces');
const moment  = require('moment');
const async = require('async');

// function JOB() { }
// JOB.prototype.toJSON = () => {
// 	return {name : 'aa'};
// };
// codeforces.processAllUsers(new JOB(), () => {
// 	console.log("done");
// });
model.User.find({})
.exec()
.then(users => {
	async.map(
		users,
		(user, next) => {
			user.codeforces.refresh = moment();
			user.save(next);
		},
        (err,subs) => {
        	console.log(subs);
        }
    );
})