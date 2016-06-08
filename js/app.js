
'use strict';


var app = angular.module('myApp',["ngRoute", "xeditable", "firebase", "googlechart"]);


// exditable option
app.run(function (editableOptions) {
	editableOptions.theme = 'bs3';
});


// redirection si pas autorisé
/*
app.run(["$rootScope", "$location", function ($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function (event, next, previous, error) {

	  	if (error === "AUTH_REQUIRED") {
	    	$location.path("/");
	  	}
	});
}]);
*/



// route
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

			when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'	
		}).
			when('/stock', {
			templateUrl: 'partials/stock.html',
			controller: 'stockCtrl',
			resolve: {
			    // "currentAuth": ["Auth", function (Auth) {
			    //  	return Auth.auth.$requireAuth();
			    // }]
			}
		}).
			otherwise({
			redirectTo: '/'
		});
}]);
