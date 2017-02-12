angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.loading = true;
				$scope.currLat = 1;
				$scope.currLong = 1;
				$scope.geoLoad = 'inprogress';
				$scope.assending = 1;

				if ($scope.geoLoad != 'done'){ 
					if (navigator.geolocation) {
				        navigator.geolocation.getCurrentPosition(function(position) {
							$scope.currLat = position.coords.latitude;
							$scope.currLong = position.coords.longitude;


							for (i = 0; i < data.length; i++) {
								data[i].distance = Math.round(Todos.distance($scope.currLat,$scope.currLong,data[i].latitude,data[i].longitude));
							}

							data.sort(function(a, b){return a.distance - b.distance});
							console.log(data);							
							$scope.todos = data;

							console.log($scope.currLat+', long='+$scope.currLong);
							$scope.geoLoad = 'done';
	
				        });
				    } else { 
				        alert("Geolocation is not supported by this browser.");
				    }
				}
			 //    var i = 0;
				// for (; i < 1000000; i++) {
				//     if ($scope.status === 'done'){
				//       break;
				//     }
				// }
				// console.log('after loop='+i);
				// $scope.status = 'inprogress';

				console.log(data);

				$scope.todos = data;
				console.log($scope.currLat+', loading completed **, long at 2='+$scope.currLong);
  				$scope.loading = false;

			});

		//Sorting
		$scope.changeSorting = function(field){
			var data = $scope.todos
			if (field == 'state') { 
				data.sort(function(a, b){return (a.state > b.state? 1 : -1) * $scope.assending });
			} else if (field == 'distance') { 
				data.sort(function(a, b){return (a.distance - b.distance) * $scope.assending });
			} else if(field == 'city') { 
				data.sort(function(a, b){return (a.city > b.city? 1 : -1) * $scope.assending  });
			} 
			$scope.todos = data

			$scope.assending = $scope.assending * -1;
		}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);