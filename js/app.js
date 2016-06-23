var app = angular.module("groceryApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/groceryList.html",
			controller: "HomeController"
		})
		.when("/addItem", {
			templateUrl: "views/addItem.html",
			controller: "GroceryListItemController"
		})
		.when("/addItem/edit/:id", {
			templateUrl: "views/addItem.html",
			controller: "GroceryListItemController"
		})
		.otherwise({
			redirectTo: "/"
		})
});

app.service('GroceryService', function($http) {

	var groceryService = {}

	groceryService.groceryItems = [];

	$http.get("data/server_data.json")
		.success(function(data) {
			groceryService.groceryItems = data;

			for(var item in groceryService.groceryItems) {
				groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
			}
		})
		.error(function(data, status) {
			alert("Something went wrong with loading data: " + status)
		});

	groceryService.findById = function(id) {
		for(var item in groceryService.groceryItems) {
			if (groceryService.groceryItems[item].id === id) 
				return groceryService.groceryItems[item];
		}
	};

	groceryService.getNewId = function() {
		if(groceryService.newId) {
			groceryService.newId++;
			return groceryService.newId;
		} else {
			var maxId = _.max(groceryService.groceryItems, function(item) { return item.id;})
			groceryService.newId = maxId.id + 1;
			return groceryService.newId;
		}
	};

	groceryService.removeItem = function(entry) {
		var index = groceryService.groceryItems.indexOf(entry);
		groceryService.groceryItems.splice(index, 1);
	}

	groceryService.markCompleted = function(entry) {
		entry.completed = !entry.completed;
	}

	groceryService.save = function(entry) {

		var updatedItem = groceryService.findById(entry.id);
			if(updatedItem) {
				updatedItem.completed = entry.completed;
				updatedItem.itemName = entry.itemName;
				updatedItem.date = entry.date;
			} else {
				entry.id = groceryService.getNewId();
				groceryService.groceryItems.push(entry);
			}
		
	};

	return groceryService;

})