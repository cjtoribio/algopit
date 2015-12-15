/*globals _,angular*/
(function(){"use strict";
	var app = angular.module('TodoApp');
	app.directive('xpChart', xpChart);


	function xpChart(){
		return {
			restrict: 'E',
			template: '<canvas class="xChart" width="400" height="400" style="border:1px solid #000000;"></canvas>',
			scope: true,
			replace: true,
			link: function(scope, element, attr){
				
				var arr = [0.9,0.2,0.4,0.5,0.6,0.7,0.3,0.2];
				var w = element.width();
				var h = element.height();

				var ctx = scope.ctx = element[0].getContext('2d');
				ctx.translate(200,200);


				var board = new Board(ctx, w, h);
				{
					var r = w/2;
					var m = _.map(_.range(0,r+1,r/5).reverse(), function(r){
						var ngon = new Regulargon(arr.length,r);
						ngon.setPosition(new Point(0,0));
						ngon.rotate(-90,true);
						board.addFigure(ngon);
						return ngon;
					});
					var stat = new Regulargon(arr.length, r);
					stat.setPosition(new Point(0,0));
					stat.rotate(-90,true);
					_.each(stat.points, function(pt, idx){
						stat.points[idx] = pt.sub(stat.position).scale(arr[idx]).add(stat.position);
					});
					board.addFigure(stat);
					setInterval(function(){
						stat.rotate(10,true);
					}, 100);
				}




				board.start();
			}
		}
	}
	


	function Board(ctx, w,h){
		this.w = Number(w) || 0;
		this.h = Number(h) || 0;
		this.ctx = ctx;
		this.figures = [];
		this.refreshRate = 10;
		this.draw = function(){
			// Store the current transformation matrix
			this.ctx.save();

			// Use the identity matrix while clearing the canvas
			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.ctx.clearRect(0, 0, 400, 400);

			// Restore the transform
			this.ctx.restore();
			_.each(this.figures, function(fig){
				fig.draw(this.ctx);
			}, this);
		}
		this.addFigure = function(fig){
			this.figures.push(fig);
		}
		this.start = function(){
			this.draw();
			setTimeout(_.bind(this.start, this), this.refreshRate);
		}

	}
	function Poligon(points){

	}
	function Regulargon(n, r){
		this.n = Math.max(~~Number(n),3);
		this.r = Math.max(Number(r), 1e-9);
		this.position = new Point(0,0);
		this.color = '#' + _.map(_.range(0,6),function(){return _.random(9);}).join('');
		this.points = _.map(
			_.range(0,360,360/n),new Point(r,0).rotate
		);
		this.setPosition = function(x,y){
			if(x instanceof Point) return this.position = x;
			this.position = new Point(x,y);
		}
		this.clone = function(){
			return new Ngon(this.n, this.r);
		}
		this.draw = function(ctx){
			ctx.beginPath();
			_.each(this.points.concat([this.points[0]]), function(act, idx){
				ctx[idx == 0 ? 'moveTo' : 'lineTo'](act.x ,act.y);
			}, this);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
		this.rotate = function(ang, degree){
			ang = degree ? ang * Math.PI/180 : ang;
			var self = this;
			this.points = _.map(this.points, function(p){
				return p.sub(self.position).rotate(ang).add(self.position);
			});
		}
	}
	function Point(x,y){
		this.x = Number(x) || 0;
		this.y = Number(y) || 0;
		this.rotate = function(ang, degree){
			ang = degree ? ang * Math.PI/180 : ang;
			return new Point(
				x * Math.cos(ang) - y * Math.sin(ang),
				x * Math.sin(ang) + y * Math.cos(ang)
			);
		}
		this.mag = function(){
			return Math.sqrt(x*x + y*y);
		}
		this.add = function(p){
			return new Point(this.x+p.x, this.y+p.y);
		}
		this.sub = function(p){
			return new Point(this.x-p.x, this.y-p.y);	
		}
		this.scale = function(r){
			return new Point(this.x*r, this.y*r);		
		}
	}



})();











