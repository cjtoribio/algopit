/*globals _,angular*/
(function(){"use strict";

	var app = angular.module('TodoApp');
	app.factory('Time', Time);

	function Time(){

		var service = {};



		service.dateDiff = function(end, start){
			if(_.isString(end))end = new Date(end);
			if(_.isString(start))start = new Date(start);
			return new DateDiff(end, start);
		}
		service.remaining = function(end){
			if(_.isString(end))end = new Date(end);
			return new DateDiff(end, new Date());
		}
		service.ellapsed = function(start){
			if(_.isString(start))start = new Date(start);
			return new DateDiff(new Date(), start);
		}


		return service;
	}


	function DateDiff(end, start){

		var mPs = 1000;
		var mPm = mPs * 60;
		var mPh= mPm * 60;
		var mPd = mPh * 24;
		var mPw= mPd * 7;

		this.millis = (end || new Date()) - (start || new Date());
		this.totalWeeks = function(){ return millis / mPw; }
		this.totalDays  = function(){ return millis / mPd;  }
		this.totalHours = function(){ return millis / mPh; }
		this.totalMins  = function(){ return millis / mPm;  }
		this.totalSecs  = function(){ return millis / mPs;  }
		this.weeks = function(){ return ~~(millis / mPw); }
		this.days  = function(){ return ~~((millis % mPw) / mPd); }
		this.hours  = function(){ return ~~((millis % mPw) / mPd); }
		
		this.format     = function(str){
			var millis = this.millis;
			var weeks = ~~(millis / mPw); // {W}
			var days  = ~~((millis % mPw) / mPd); // {D}
			var hours = ~~((millis % mPd) / mPh); // {H}
			var mins  = ~~((millis % mPh) / mPm); // {M}
			var secs  = ~~((millis % mPm) / mPs); // {S}
			var mill  = millis % mPs; // {m}
			var accum = 0;

			
			var chars = ['W','D','H','M','S','m'];
			var values= [weeks,days,hours,mins,secs,mill];
			var rates = [7,24,60,60,1000,1];
			var acum = 0;
			_.each(chars, function(c, idx){
				var added = values[idx] + accum;
				var nStr = setField(c, added, str);
				if(nStr != str)accum = 0;
				else accum = added * rates[idx];
				str = nStr;
			});
			return str;

			if( !_.includes(str,'{W}') )accum += weeks * mPw;
			if( !_.includes(str,'{D}') )accum += days  * mPd; 
			else { days  += accum / mPd; accum = 0; }
			if( !_.includes(str,'{H}') )accum += hours * mPh;
			else { hours += accum / mPh; accum = 0; }
			if( !_.includes(str,'{M}') )accum += mins  * mPm;
			else { mins  += accum / mPm; accum = 0; }
			if( !_.includes(str,'{S}') )accum += secs  * mPs;
			else { secs  += accum / mPs; accum = 0; }
			if( !_.includes(str,'{m}') )accum += mill  * 1;
			else { mill  += accum / 1; accum = 0; }
			return str.replace(/{W}/g,weeks)
					  .replace(/{D}/g,days)
					  .replace(/{H}/g,hours)
					  .replace(/{M}/g,mins)
					  .replace(/{S}/g,secs)
					  .replace(/{m}/g,mill);
		}

		function setField(letter, value, str){
			var ok = false;
			var regex = new RegExp('{' + letter + '}', 'g');
			str = str.replace(regex, value);

			regex = new RegExp('{' + letter + '+}', 'g');
			var matches = str.match(regex);
			if(matches){
				_.forEach(matches, function(match){
					var l = match.length - 2;
					str = str.replace(match, _.padLeft(value,l,'0'));
				});
			}

			regex = new RegExp('{' + letter + '+:[^}]}', 'g');
			var matches = str.match(regex);
			if(matches){
				_.forEach(matches, function(match){
					var patt = match.split(':').slice(1).join().slice(1,-1);
					var l = match.length - 1;
					str = str.replace(match, _.padLeft(value,l,patt));
				});
			}
			return str;
		}

	}

})();