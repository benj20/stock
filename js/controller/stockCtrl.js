
'use strict';


app.controller('stockCtrl', function ($scope, $filter, $location, $firebaseArray, Factory, Auth) {


    var nouvellePalette = false;

    var tableau_cmd_Z = [];




    $scope.logout = function () {

        console.log('logout');

        /*
        $scope.stock.$destroy();
        $scope.objetPrix.$destroy();
        $scope.dernierNum.$destroy();

        Auth.auth.$unauth();
        */

        $location.path("/");
    }





    //var authData = Auth.auth.$getAuth();

    //if (authData) {
    if (true) {

        /*
        $scope.uid = authData.uid;

        var ref = Auth.ref;

        $scope.stock = $firebaseArray(ref.child('douelles'));
        $scope.objetPrix = $firebaseArray(ref.child('prixRef'));
        $scope.dernierNum = $firebaseArray(ref.child('dernierNum'));
        */


        $scope.stock = [{
            qualite: '1',
            grain: 'grosgrain',
            numero: 1,
            longueur: "105",
            ep: '27',
            couches: "17",
            ml: "100",
            date: "01/01/2016",
            provenance: "Paris",
            lot: "001",
            m3: "0,482",
            prix: "482"
        }];
        $scope.objetPrix = [{
            p1GG27: 1000,
            p1GF27: 1500,
            p1GF22: 2000,
            p2GG27: 700,
            p2GF27: 1000,
            p2GF22: 1500
        }];
        $scope.dernierNum = [{numero: 1}];





        if ($scope.stock !== undefined && $scope.objetPrix !== undefined && $scope.dernierNum !== undefined) {
            

            $scope.predicate = 'numero';
            $scope.reverse = true;


            $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };






            $scope.calculNombrePalettes = function(grain, qualite, ep) {

                if ($scope.stock.length) {

                    var recherche = {
                            grain: grain,
                            qualite: qualite,
                            ep: ep
                        },
                        stockFilter = $filter('filter')($scope.stock, recherche);

                    return stockFilter.length;
                };
            };



            $scope.calculM3 = function(data) {

                var m3 = 0,
                    m3Filter;

                m3 = (data.longueur/100)*(data.ml/100)*(data.ep/1000)*data.couches;
                m3Filter = $filter('number')(m3, 3);

                //Factory.calculM3(m3Filter, data.$id);
                $scope.stock[$scope.stock.indexOf(data)].m3 = m3Filter;
            
                return m3Filter;
            };


            $scope.calculPrix = function(data) {

                if ($scope.idPrix.prix !== undefined) {

                    var prix = 0;

                    prix = data.m3 * $scope.idPrix.prix;

                    //Factory.calculPrix(prix, data.$id);
                    $scope.stock[$scope.stock.indexOf(data)].prix = prix;
                    
                    return prix;

                } else {

                    return data.prix;               
                };  
            };


            $scope.totalM3 = function() {

                if ($scope.stock.length) {

                    var totalM3 = 0,
                        stockFilter = $filter('filter')($scope.stock, $scope.rechercher);

                    for (var i = 0; i < stockFilter.length; i++) {
                        totalM3 += stockFilter[i].m3 * 1;
                    };

                    return totalM3;
                };
            };


            $scope.totalPrix = function() {

                if ($scope.stock.length) {

                    var totalPrix = 0,
                        stockFilter = $filter('filter')($scope.stock, $scope.rechercher);

                    for (var i = 0; i < stockFilter.length; i++) {
                        totalPrix += stockFilter[i].prix * 1;
                    };
                
                    return totalPrix;
                };
            };


            $scope.total_G_m3 = function() {

                if ($scope.stock.length) {

                    var total_G_m3 = 0;

                    for (var i = 0; i < $scope.stock.length; i++) {
                        total_G_m3 += $scope.stock[i].m3 * 1;
                    };

                    return total_G_m3;
                };
            };


            $scope.total_G_prix = function() {

                if ($scope.stock.length) {

                    var total_G_prix = 0;

                    for (var i = 0; i < $scope.stock.length; i++) {
                        total_G_prix += $scope.stock[i].prix * 1;
                    };

                    return total_G_prix;
                };
            };


            $scope.newPrix = function() {

                //Factory.newPrix($scope.objetPrix);


                switch($scope.idPrix.id) {
                    case 0:
                        $scope.idPrix.prix = $scope.objetPrix[0].p1GG27;
                        break;
                    case 1:
                        $scope.idPrix.prix = $scope.objetPrix[0].p1GF27;
                        break;
                    case 2:
                        $scope.idPrix.prix = $scope.objetPrix[0].p1GF22;
                        break;
                    case 3:
                        $scope.idPrix.prix = $scope.objetPrix[0].p2GG27;
                        break;
                    case 4:
                        $scope.idPrix.prix = $scope.objetPrix[0].p2GF27;
                        break;
                    case 5:
                        $scope.idPrix.prix = $scope.objetPrix[0].p2GF22;
                        break;
                    
                };
            };





            // Angular-xeditable

            $scope.saveUser = function(data, id) {

                //Factory.save(data, id);

                $scope.inserted = {};

                if (nouvellePalette) {

                    //Factory.dernierNum(data);
                    $scope.dernierNum = [{numero: parseInt(data.numero)}];
                    nouvellePalette = false;
                };
            };


            $scope.checkNumero = function(data, numero) {

                var nbEgal = 0;

                for (var p in $scope.stock) {

                    if ($scope.stock[p].numero === data) {

                        //console.log('numero existant', $scope.stock[p].numero);
                        if ((($scope.dernierNum[0].numero*1) + 1) !== data) {

                            if (!nouvellePalette && numero === data) {

                            } else {
                                return "Numéro existant";
                            };

                        } else if ((($scope.dernierNum[0].numero*1) + 1) === data) {

                            nbEgal++;

                            if (nbEgal > 1) {
                                return "Numéro existant";
                            };
                        };
                    };
                };
            };


            $scope.checkDate = function(data, p, form) {

                if (/^[0123]{1}[0-9]{1}\/[01]{1}[0-9]{1}\/20[0-9]{2}$/.test(data)) {

                } else {

                    if (/^[0123]{1}[0-9]{1}-[01]{1}[0-9]{1}-20[0-9]{2}$/.test(data)) {

                        var newDate = data.split("-");
                        newDate = newDate.join("/");

                        var index = $scope.stock.indexOf(p);
                        $scope.stock[index].date = newDate; 

                        form.$data.date = newDate;

                        return true;

                    } else {

                        return "Date invalide";
                    };
                };
            };


            $scope.cancel = function(p) {

                $scope.inserted = {};

                if (nouvellePalette) {

                    $scope.removeUser(p);
                    $scope.removeUser();
                    
                    nouvellePalette = false;
                };
            };


            $scope.editeUser = function() {

                if ($scope.idPrix.prix === undefined) {

                    $scope.idPrix.prix = $scope.objetPrix[0].p1GG27;
                };
            };


            $scope.removeUser = function(p) {

                if (p) {

                    $scope.sup = p;

                } else {

                    //Factory.removed($scope.sup.$id);
                    $scope.stock.splice($scope.stock.indexOf(p), 1);

                    tableau_cmd_Z.push($scope.sup);
                    $scope.sup = {};

                    document.getElementById("undoRemove").disabled = false;
                };
            };


            $scope.undoRemove = function() {

                //$scope.stock.$add(tableau_cmd_Z[tableau_cmd_Z.length-1]);
                $scope.stock.push(tableau_cmd_Z[tableau_cmd_Z.length-1]);
                tableau_cmd_Z.pop();

                if (tableau_cmd_Z.length == 0) {
                    document.getElementById("undoRemove").disabled = true;
                };
            };


            $scope.addUser = function() {

                nouvellePalette = true;

                $scope.inserted = {

                    qualite: $scope.rechercher.qualite,
                    grain: $scope.rechercher.grain,
                    numero: ($scope.dernierNum[0].numero*1) + 1,
                    longueur: "",
                    ep: $scope.rechercher.ep,
                    couches: "17",
                    ml: "100",
                    date: "",
                    provenance: "",
                    lot: "",
                    m3: "",
                    prix: ""
                };

                //$scope.stock.$add($scope.inserted);
                $scope.stock.push($scope.inserted);
            };


            $scope.keypress = function(e, form) {
                if (e.which === 13) {
                    form.$submit();
                };
            };






            // angular-google-chart
                        
            $scope.chartObject = {};

            $scope.chartObject.type = "PieChart";

            $scope.NB45 = [
                                {v: "45"},
                                {v: 0}
                            ];
            $scope.NB50 = [
                                {v: "50"},
                                {v: 0}
                            ];
            $scope.NB60 = [
                                {v: "60"},
                                {v: 0}
                            ];
            $scope.NB70 = [
                                {v: "70"},
                                {v: 0}
                            ];
            $scope.NB90 = [
                                {v: "90"},
                                {v: 0}
                            ];
            $scope.NB95 = [
                                {v: "95"},
                                {v: 0}
                            ];
            $scope.NB100 = [
                                {v: "100"},
                                {v: 0}
                            ];
            $scope.NB105 = [
                                {v: "105"},
                                {v: 0}
                            ];

            $scope.chartObject.data = {"cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Nombre de palettes", type: "number"}
            ], "rows": [
                {c: $scope.NB45},
                {c: $scope.NB50},
                {c: $scope.NB60},
                {c: $scope.NB70},
                {c: $scope.NB90},
                {c: $scope.NB95},
                {c: $scope.NB100},
                {c: $scope.NB105}
                
            ]};

            $scope.chartObject.options = {
                'title': 'Pourcentage de palettes par longueur'
            };


            $(document).ready(function(){

                $("#myModalDia").on('shown.bs.modal', function () {

                    $(window).resize(); 

                    if ($scope.stock.length) {

                        var longueur = [45, 50, 55, 60, 65, 70, 75, 90, 95, 100, 105],
                            NB = [],
                            recherche = {};

                        for (var i = 0; i < longueur.length; i++) {

                            recherche = {
                                longueur: longueur[i]
                            };

                            NB[i] = ($filter('filter')($scope.stock, recherche)).length;
                        };

                        $scope.NB45[1].v = NB[0];
                        $scope.NB50[1].v = NB[1] + NB[2];
                        $scope.NB60[1].v = NB[3] + NB[4];
                        $scope.NB70[1].v = NB[5] + NB[6];
                        $scope.NB90[1].v = NB[7];
                        $scope.NB95[1].v = NB[8];
                        $scope.NB100[1].v = NB[9];
                        $scope.NB105[1].v = NB[10];

                        $scope.nombreDePalettes = 0;


                        for (var i in NB) {
                            $scope.nombreDePalettes = $scope.nombreDePalettes + NB[i];
                        };

                    };              
                });
            });
                   


                

            





        };






    } else {

        console.log("Logged out stockCtrl");
    };





});