var config = require("../config");
var model = require("../model");
var _ = require("lodash");
var logger = require('../utils/logger').getLogger('app:script');


model.Judge.find({name: 'COJ'}).exec(function(err, judge){
    if(judge.length != 1){
        logger.error(judge.length + " judges found");
    }else{
        judge = judge[0];
        judge.url = "http://www.spoj.pl/";
        logger.info(judge);
        judge.save();
        logger.info(judge);
        
    }
});
if(true)return;


var fs = require("fs");

function Document(txt){
    this.txt = txt;
}

function DocumentIterator(doc){
    this.doc = doc;
    this.idx = 0;
}
DocumentIterator.prototype.next = function(){
    var st = this.doc.txt.indexOf("<tr", this.idx);
    if(st == -1) throw "StopIteration";
    var en = this.doc.txt.indexOf("</tr", st);
    if(en == -1) throw "StopIteration";
    this.idx = en;
    return {st: st, en: en};
}
Document.prototype.__iterator__ = function(){
    return new DocumentIterator(this);
}

function nullStr(val){
    if(val == null || val == "null")
        return null;
    return val;
}

fs.readFile('olddata.txt', function(err, data){
    var d = new Document(data.toString());
    var it = d.__iterator__();
    var count = 0;
    function processNext(){
        try{
            // if(count++ >= 200)return;
            var obj = it.next();
            
            var str = d.txt.substr(obj.st,obj.en - obj.st+10);
            str = str.replace(/\n/g,'');
            str = str.replace(/&lt;/g,'');
            str = str.replace(/&gt;/g,'');
            str = str.replace(/<\/td>/g,'');
            var arr = str.split("<td>");
            _.map(arr, function(obj, idx){
                return obj
                    .replace(/^.*<a[^>]*>/,'')
                    .replace(/<\/a.*$/,'')
                    .replace(/<!--.*$/,'');
            });
            // console.log(arr);
            // console.log(count);
            var topicNames = arr[1] == "missing" ? [] : eval(arr[1]);
            // console.log(arr[7]);
            // console.log(topicNames);
            
            
            var p = {}
            p.categories = topicNames;
            p.contest = nullStr(arr[2]);
            p.difficulty = nullStr(arr[3]);
            p.entryDate = new Date(arr[4]);
            p.sourceReferenceId = nullStr(arr[5]);
            p.lastUpdated = new Date(arr[6]);
            p.name = nullStr(arr[7]);
            p.judge = nullStr(arr[8].replace(/Source: name=/,''));
            p.url = nullStr(arr[9]);
            p.writer = nullStr(arr[10]);
            var pr = new model.Problem(p);
            // console.log(pr);
            // pr.save();
            // console.log("-------------");
            processNext();
        }catch (e) {
            console.log(e);
        }
    }
    processNext();
});
