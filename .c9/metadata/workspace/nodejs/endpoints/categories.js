{"filter":false,"title":"categories.js","tooltip":"/nodejs/endpoints/categories.js","undoManager":{"mark":49,"position":49,"stack":[[{"group":"doc","deltas":[{"start":{"row":3,"column":17},"end":{"row":3,"column":25},"action":"remove","lines":["problems"]},{"start":{"row":3,"column":17},"end":{"row":3,"column":18},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":18},"end":{"row":3,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":19},"end":{"row":3,"column":20},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":20},"end":{"row":3,"column":21},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":21},"end":{"row":3,"column":22},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":22},"end":{"row":3,"column":23},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":23},"end":{"row":3,"column":24},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":24},"end":{"row":3,"column":25},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":25},"end":{"row":3,"column":26},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":26},"end":{"row":3,"column":27},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":14},"end":{"row":4,"column":21},"action":"remove","lines":["Problem"]},{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"insert","lines":["C"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":16},"end":{"row":4,"column":17},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":17},"end":{"row":4,"column":18},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":18},"end":{"row":4,"column":19},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":19},"end":{"row":4,"column":20},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":20},"end":{"row":4,"column":21},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":22},"end":{"row":4,"column":23},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":23},"end":{"row":4,"column":24},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":62},"end":{"row":14,"column":15},"action":"remove","lines":["","            var ret = _.map(results, function(item){","                return {","                    _id: item._id,","                    categories: item.categories,","                    name: item.name,","                    difficulty: item.difficulty,","                    url: item.url,","                    judge: item.judge","                };","            });"]},{"start":{"row":4,"column":62},"end":{"row":4,"column":63},"action":"insert","lines":["\\"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":62},"end":{"row":4,"column":63},"action":"remove","lines":["\\"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":53},"end":{"row":4,"column":60},"action":"remove","lines":["results"]},{"start":{"row":4,"column":53},"end":{"row":4,"column":54},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":54},"end":{"row":4,"column":55},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":55},"end":{"row":4,"column":56},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":56},"end":{"row":4,"column":57},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":26},"end":{"row":6,"column":29},"action":"remove","lines":["ret"]},{"start":{"row":6,"column":26},"end":{"row":6,"column":30},"action":"insert","lines":["cats"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":4},"end":{"row":37,"column":7},"action":"remove","lines":["","    ws.get('/api/problems/:id',function(req, res){","        model.Problem.find({_id: req.params.id }, function(err, results){","            if(err)res.send(err);","            else res.send(results[0] || {});","        });","    });","    ","    ws.post('/api/problems', function(req, res){","        var p = new model.Problem(req.body);","        p.save(function(){","            res.send(p);","        });","    });","    ","    ws.put('/api/problems/:id', function(req, res){","        var problem = req.body;","        model.Problem.update({_id: req.params.id }, problem, function(err, count){","            if(err)res.send(err);","            else res.send({affected: count});","        });","    });","    ","    ws.delete('/api/problems/:id', function(req, res){","        model.Problem.remove({_id: req.params.id}, function(err, obj){","            if(err)res.send(err);","            else res.send({affected: obj});","        });","    });"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":7},"end":{"row":9,"column":4},"action":"remove","lines":["","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":23},"end":{"row":4,"column":24},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":22},"end":{"row":4,"column":23},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":17},"end":{"row":9,"column":32},"action":"remove","lines":["ProblemsService"]},{"start":{"row":9,"column":17},"end":{"row":9,"column":18},"action":"insert","lines":["C"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":18},"end":{"row":9,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":19},"end":{"row":9,"column":20},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":22},"end":{"row":9,"column":23},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":23},"end":{"row":9,"column":24},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":24},"end":{"row":9,"column":25},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":25},"end":{"row":9,"column":26},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":26},"end":{"row":9,"column":27},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":27},"end":{"row":9,"column":28},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":28},"end":{"row":9,"column":29},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":29},"end":{"row":9,"column":30},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":30},"end":{"row":9,"column":31},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":31},"end":{"row":9,"column":32},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":32},"end":{"row":9,"column":33},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":34},"end":{"row":9,"column":36},"action":"remove","lines":["Up"]},{"start":{"row":9,"column":34},"end":{"row":9,"column":41},"action":"insert","lines":["Started"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":41},"end":{"row":9,"column":41},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":13,"mode":"ace/mode/javascript"}},"timestamp":1427045084965,"hash":"167a04ecbebc2db59f4ff402e6ca010901f5486f"}