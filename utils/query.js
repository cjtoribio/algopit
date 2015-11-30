var _ = require('lodash');


function dbToJs(col, value){
	if(value == null)return null;
	if(col.jsType == 'BOOLEAN')return !!value;
	if(col.type == 'NUMBER')return value;
	if(col.type == 'TEXT')return value;
	return value;
}

var Query = (function(){
	function Query(db, clazz){
		this.clazz = clazz;
		this.db = db;
		this.conditions = [];
	}
	Query.prototype.list = function(callback){
		var schema = this.clazz.def;
		var clazz = this.clazz;
		var columns = _.pluck(schema.columns, 'name');
		var query = "SELECT " + columns.join(", ") + " FROM " + schema.table;
		if(this.conditions.length > 0){
			query = query + " WHERE " + this.conditions.join(" AND ");
		}
		this.db.all(query, function(err, rows) {
			if(err){ callback(err, null); return; }
			var ret = [];
			_.forEach(rows, function(row){
				var obj = new clazz(); 
				_.forEach(schema.columns, function(col){
					this[col.name] = dbToJs(col,row[col.name]);
				}, obj);
				ret.push(obj);
			});
			if(callback)callback(null, ret);
		});
	}
	Query.prototype.propertyEq = function(prop, value){
		this.conditions.push("(" + prop + " = " + value + ")");
		return this;
	}
	return Query;
})();


exports.Query = Query;