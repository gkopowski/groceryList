app.controller('HomeController', ['$scope', 'GroceryService', function($scope, GroceryService){
	$scope.appTitle = "Grocery List";

	$scope.removeItem = function(entry) {
		GroceryService.removeItem(entry);
	};

	$scope.groceryItems = GroceryService.groceryItems;

	$scope.markCompleted = function(entry) {
		GroceryService.markCompleted(entry);
	};

	$scope.$watch(function(){ return GroceryService.groceryItems; }, function(groceryItems) {
		$scope.groceryItems = groceryItems;
	});
}])