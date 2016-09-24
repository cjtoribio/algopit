/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');
	
	app.controller('CategoriesController', CategoriesController);

	function CategoriesController($scope, Resource, $filter, Auth, Alert, $state, Aside){
		
		var Category = Resource.Category;

		// inits
		$scope.criteria = { name : '' };
		$scope.categories = Category.query();

		$scope.edit = function(category) {
			Aside.showInputText({
				text: category.name,
				title: "Category Name",
				label: "New Category Name"
			}).then(function(name) {
				category.name = name;
				category.$update();
			});
		};

		$scope.remove = function(category) {
			Aside.confirm('Deleting Category', 'Are you sure? Deleting this might make harder to find problems')
			.then(function(saidYes){
				if(saidYes){
					category.$remove().then(function() {
						_.pull($scope.categories, category);
					});	
				}
			});
		};

		$scope.newCategory = function() {
			Aside.showInputText({
				title: "Category Name",
				label: "New Category Name"
			}).then(function(name) {
				var category = new Category({name: name});
				category.$save().then(function(argument) {
					$scope.categories.push(category);
				});
			});
		};

	}
})();