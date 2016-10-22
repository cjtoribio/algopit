(function() {
'use strict';

    angular
        .module('TodoApp')
        .controller('JudgesController', JudgesController);

    function JudgesController($scope, Resource, Aside) {
        
		var Judge = Resource.Judge;

		// inits
		$scope.criteria = { name : '' };
		var judges = $scope.judges = Judge.query();

		$scope.edit = function(judge) {
			Aside.showInputText({
				text: judge.name,
				title: "Judge Name",
				label: "New Judge Name"
			}).then(function(name) {
				judge.name = name;
				judge.$update();
			});
		};

		$scope.remove = function(judge) {
			Aside.confirm('Deleting Judge', 'Are you sure? Deleting this might affect some problems')
			.then(function(saidYes){
				if(saidYes){
					judge.$remove().then(function() {
						_.pull(judges, judge);
					});	
				}
			});
		};

		$scope.newJudge = function() {
			Aside.showInputText({
				title: "Judge Name",
				label: "New Judge Name"
			}).then(function(name) {
				var judge = new Judge({name: name});
				judge.$save().then(function(argument) {
					judges.push(judge);
				});
			});
		};
    }
})();