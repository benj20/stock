
'use strict';


app.controller('loginCtrl', function ($scope, $location, Factory, Auth) {




    $scope.message = null;
    //$scope.auth = Auth.auth;

    

    $scope.login = function() {

    	if ($scope.user !== undefined) {

			/*
            $scope.auth.$authWithPassword({
				email    : $scope.user.email,
                password : $scope.user.password
			})
			.then(function(authData) {

                console.log("Authenticated successfully with payload:", authData.password.email);
            */

        		$scope.user.email = '';
		    	$scope.user.password = '';

                $scope.message = null;
                $scope.classErrorEmail = null;
                $scope.classErrorPassword = null;
                $scope.borderRed = null;

		    	$location.path("/stock");

            /*
      		})
      		.catch(function(error) {

                $scope.message = '';
                $scope.classErrorEmail = null;
                $scope.classErrorPassword = null;
                $scope.borderRed = null;

                if (($scope.user.password === '' || $scope.user.password === undefined) && 
                    ($scope.user.email !== '' || $scope.user.email !== undefined)) {

                    $scope.message = "Etrez un mot de passe";
                    $scope.classErrorPassword = 'has-error';

                } else if (($scope.user.password !== '' || $scope.user.password !== undefined) && 
                          ($scope.user.email !== '' || $scope.user.email !== undefined)) {

        		switch (error.code) {

      				case "INVALID_EMAIL":
        				console.log("The specified user account email is invalid.", error.code);
                        $scope.message = "Email invalide";
                        $scope.classErrorEmail = 'has-error';
                        $scope.borderRed = 'borderRed';
       					break;

      				case "INVALID_PASSWORD":
        				console.log("The specified user account password is incorrect.", error.code);
                        $scope.message = "Mot de passe incorrect";
                        $scope.classErrorPassword = 'has-error';
        				break;

      				case "INVALID_USER":
        				console.log("The specified user account does not exist.", error.code);
                        $scope.message = "Compte utilisateur inexistant";
                        $scope.classErrorEmail = 'has-error';
                        $scope.borderRed = 'borderRed';
        				break;

      				default:
        				console.log("The specified user account email is invalid.", error.code);
                        $scope.message = "Email invalide";
                        $scope.classErrorEmail = 'has-error';
                        $scope.borderRed = 'borderRed';
                        
    				}
                };
      		});
            */
		
        } else {

            $scope.message = "Entrez un email et un mot de passe";
            $scope.classErrorPassword = 'has-error';
            $scope.classErrorEmail = 'has-error';
        }
	};

	

	

});