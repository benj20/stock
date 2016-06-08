
'use strict';


app.factory("Auth", function ($firebaseAuth){

	/*
	var ref = new Firebase("https://");

  	function auth () {
    	return $firebaseAuth(ref);
  	}
  	

  	return {
  		auth: auth(),
  		ref: ref
  	}
  	*/
  	return true;
});







app.factory("Factory", function (Auth){


	function calculM3 (m3Filter, id) {

		if (m3Filter !== undefined && id !== undefined) {

			Auth.ref.child('douelles').child(id).update({
				m3: m3Filter
			});
		};
	};

	function calculPrix (prix, id) {

		if (prix !== undefined && id !== undefined) {

			Auth.ref.child('douelles').child(id).update({
				prix: prix
			});
		};
	};

	function newPrix (objetPrix) {

		if (objetPrix !== undefined) {

			Auth.ref.child('prixRef').child('-KFKROwpuCZvVKVv2lZl').update({
				p1GG27: parseInt(objetPrix[0].p1GG27),
				p1GF27: parseInt(objetPrix[0].p1GF27),
				p1GF22: parseInt(objetPrix[0].p1GF22),
				p2GG27: parseInt(objetPrix[0].p2GG27),
				p2GF27: parseInt(objetPrix[0].p2GF27),
				p2GF22: parseInt(objetPrix[0].p2GF22)
			});
		};
	};

	function save (data, id) {

		if (data !== undefined && id !== undefined) {

			Auth.ref.child('douelles').child(id).update({
				numero: data.numero,
			    longueur: data.longueur,
			    couches: data.couches,
			    ml: data.ml,
			    date: data.date,
			    provenance: data.provenance,
			    lot: data.lot
			});
		};
	};

	function dernierNum (data) {

		if (data !== undefined) {

			Auth.ref.child('dernierNum').child('-KFKPaJ7dh_Jka3GOFNB').update({
				numero: parseInt(data.numero)
			});
		};
	};

	function removed (id) {

		if (id !== undefined) {

			Auth.ref.child('douelles').child(id).remove();
		};
	};

    return{

        calculM3: function (m3Filter, id) {
        	calculM3(m3Filter, id);
        },
        calculPrix: function (prix, id) {
        	calculPrix(prix, id);
        },
        newPrix: function (objetPrix) {
        	newPrix(objetPrix);
        },
        save: function (data, id) {
        	save(data, id);
        },
        dernierNum: function (data) {
        	dernierNum(data);
        },
        removed: function (id) {
        	removed(id);
        }
    }
});