const moment = require('moment');
const _ = require('lodash');
const request = require('request');

const MAX_REQUESTS_PER_SECOND = 4;

function Api() {
	this.lastRequest = moment().subtract(1, 'day');
	this.requests = [];
	this.mutex = false;
	this.getSubmissions = (handle, next) => {
		this.startQueue(_.partial(getSubmissions, handle, next));
	};
	this.startQueue = (func) => {
		this.requests.push(func);
		if (this.mutex) return;
		this.mutex = true;
		setTimeout(_.bind(this.processRequest, this));
	}
	this.processRequest = () => {
		if (this.requests.length == 0) {
			this.mutex = false;
			return;
		}
		var func = this.requests.shift();
		func();
		setTimeout(_.bind(this.processRequest, this), 1000 / MAX_REQUESTS_PER_SECOND);
	}
}


function getSubmissions(handle, next) {
    var options = {
        url: 'http://codeforces.com/api/user.status?handle='+handle+'&from=1',
        method: 'GET',
        json:true
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            next(null, body.result);
        } else if (response.statusCode == 400) {
        	next(null, []);
        }else{
            next(error || (`Status Code: for ${options.url} ${response.statusCode}`));
        }
    });
}

module.exports = new Api();