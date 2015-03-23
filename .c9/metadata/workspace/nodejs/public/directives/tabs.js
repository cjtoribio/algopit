{"filter":false,"title":"tabs.js","tooltip":"/nodejs/public/directives/tabs.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":26,"column":14},"end":{"row":26,"column":15},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":15},"end":{"row":26,"column":16},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":16},"end":{"row":26,"column":17},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":17},"end":{"row":26,"column":18},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":19},"end":{"row":26,"column":21},"action":"insert","lines":["''"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":20},"end":{"row":26,"column":21},"action":"insert","lines":["@"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":18},"end":{"row":24,"column":19},"action":"remove","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":17},"end":{"row":24,"column":18},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":16},"end":{"row":24,"column":17},"action":"remove","lines":["U"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":19},"end":{"row":24,"column":41},"action":"remove","lines":["../templates/pane.html"]},{"start":{"row":24,"column":19},"end":{"row":29,"column":0},"action":"insert","lines":["","","<div class=\"tab-pane\" ng-show=\"selected\" ng-transclude>","</div>","",""]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":19},"end":{"row":25,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":74},"end":{"row":25,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":80},"end":{"row":25,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":44},"end":{"row":16,"column":13},"action":"remove","lines":["","            var panes = $scope.panes = [];","            $scope.register = function(pane){","                panes.push(pane);","            }","            $scope.select = function(pane){","                lodash.each(panes, function(tpane, idx){","                    tpane.hide();","                });","                pane.show();","            }"]},{"start":{"row":6,"column":44},"end":{"row":21,"column":8},"action":"insert","lines":["","      var panes = $scope.panes = [];","","      $scope.select = function(pane) {","        angular.forEach(panes, function(pane) {","          pane.selected = false;","        });","        pane.selected = true;","      };","","      this.addPane = function(pane) {","        if (panes.length === 0) {","          $scope.select(pane);","        }","        panes.push(pane);","      };"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"remove","lines":["    "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"remove","lines":["    "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"remove","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"remove","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"remove","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"remove","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"remove","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"remove","lines":["    "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"remove","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"remove","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"remove","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"remove","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":2},"action":"remove","lines":["  "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":2},"action":"remove","lines":["  "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"remove","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"remove","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"remove","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"remove","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":2},"action":"remove","lines":["  "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":2},"action":"remove","lines":["  "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"remove","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"remove","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"remove","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"remove","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":0},"end":{"row":11,"column":2},"action":"remove","lines":["  "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"insert","lines":["    "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"insert","lines":["    "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"insert","lines":["    "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"insert","lines":["    "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"insert","lines":["    "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"insert","lines":["    "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":16},"end":{"row":11,"column":20},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":16},"end":{"row":18,"column":20},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":17},"end":{"row":16,"column":24},"action":"remove","lines":["addPane"]},{"start":{"row":16,"column":17},"end":{"row":16,"column":25},"action":"insert","lines":["register"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":45},"end":{"row":4,"column":21},"action":"insert","lines":["","    transclude: true,"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":4},"end":{"row":4,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":22},"end":{"row":29,"column":25},"action":"insert","lines":["","        transclude: true,"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":19},"end":{"row":30,"column":25},"action":"remove","lines":["myTabs"]},{"start":{"row":30,"column":19},"end":{"row":30,"column":26},"action":"insert","lines":["algoTab"]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":56},"end":{"row":36,"column":0},"action":"insert","lines":["",""]},{"start":{"row":36,"column":0},"end":{"row":36,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":12},"end":{"row":36,"column":13},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":13},"end":{"row":36,"column":14},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":14},"end":{"row":36,"column":15},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":14},"end":{"row":36,"column":15},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":13},"end":{"row":36,"column":14},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":12},"end":{"row":36,"column":13},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":56},"end":{"row":36,"column":12},"action":"remove","lines":["","            "]}]}],[{"group":"doc","deltas":[{"start":{"row":29,"column":25},"end":{"row":30,"column":0},"action":"insert","lines":["",""]},{"start":{"row":30,"column":0},"end":{"row":30,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":10},"end":{"row":30,"column":11},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":11},"end":{"row":30,"column":12},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":14},"end":{"row":30,"column":15},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":15},"end":{"row":30,"column":16},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":16},"end":{"row":30,"column":17},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":39},"end":{"row":32,"column":40},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":40},"end":{"row":32,"column":41},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":41},"end":{"row":32,"column":42},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":42},"end":{"row":32,"column":43},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":43},"end":{"row":32,"column":44},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":44},"end":{"row":32,"column":45},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":45},"end":{"row":32,"column":46},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":40},"end":{"row":32,"column":46},"action":"remove","lines":["active"]},{"start":{"row":32,"column":40},"end":{"row":32,"column":41},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":40},"end":{"row":32,"column":41},"action":"remove","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":39},"end":{"row":32,"column":40},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":40},"end":{"row":32,"column":41},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":41},"end":{"row":32,"column":42},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":42},"end":{"row":32,"column":43},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":43},"end":{"row":32,"column":44},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":44},"end":{"row":32,"column":45},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":45},"end":{"row":32,"column":46},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":46},"end":{"row":32,"column":47},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":47},"end":{"row":32,"column":48},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":48},"end":{"row":32,"column":49},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":49},"end":{"row":32,"column":50},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":50},"end":{"row":32,"column":51},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":51},"end":{"row":32,"column":52},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":51},"end":{"row":32,"column":52},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":51},"end":{"row":32,"column":52},"action":"insert","lines":["{"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":52},"end":{"row":32,"column":53},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":53},"end":{"row":32,"column":54},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":54},"end":{"row":32,"column":55},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":55},"end":{"row":32,"column":56},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":56},"end":{"row":32,"column":57},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":57},"end":{"row":32,"column":58},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":58},"end":{"row":32,"column":59},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":59},"end":{"row":32,"column":60},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":60},"end":{"row":32,"column":61},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":61},"end":{"row":32,"column":62},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":62},"end":{"row":32,"column":63},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":63},"end":{"row":32,"column":64},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":64},"end":{"row":32,"column":65},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":65},"end":{"row":32,"column":66},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":66},"end":{"row":32,"column":67},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":67},"end":{"row":32,"column":68},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":68},"end":{"row":32,"column":69},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":69},"end":{"row":32,"column":70},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":71},"end":{"row":32,"column":90},"action":"remove","lines":["ng-show=\"selected\" "]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":12},"end":{"row":10,"column":44},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1427135842165,"hash":"f4f7b7059e4c364fd4f3ea2fef79c7be6bee35d0"}