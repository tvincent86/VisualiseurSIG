/*
 * File name : map.js
 * Version 0.1
 * Date (mm/dd/yyyy) : 12/01/2014
 * Author : Tony VINCENT
 */

/**** Initialisation des variables ****/



// Déclaration de l'étendu
//var extent = new OpenLayers.Bounds(-1.61913,44.96020,1.25998,47.34050);
//var extent = new OpenLayers.Bounds(-2.61913,42.96020,1.35998,48.34050);
var extent = new OpenLayers.Bounds(-11, 39, 12, 53);
//var extent = new OpenLayers.Bounds(-200037508.34, -200037508.34, 200037508.34, 200037508.34);

// Déclaration des projections utilisées 
var epsg4326 = new OpenLayers.Projection("EPSG:4326");
var epsg3857 = new OpenLayers.Projection("EPSG:3857");
var epsg2154 = new OpenLayers.Projection("EPSG:2154");

// On transforme l'étendu dans la nouvelle projection
extent.transform(epsg4326,epsg3857);

//var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg900913);
//var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg3857);
var center = new OpenLayers.LonLat(-0.12640,46.18390).transform(epsg4326,epsg3857);

//
var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 20);

//var scales = [6933487, 3466743, 1733372, 866686, 433343, 216671, 108336, 54168, 27084, 13542, 6771, 3385, 1693, 846];


// Déclaration des options de la carte
var mapOptions = {	
    maxExtent: extent,
    restrictedExtent: extent,
    maxResolution: "auto",
    projection: epsg3857,
    units: "m",
    displayProjection: epsg4326,
    resolutions: resolutions,
    numZoomLevels: 12,
    minZoomLevel: 6,
    maxZoomLevel: 18,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Attribution(),
        //new OpenLayers.Control.ArgParser(),
        //new OpenLayers.Control.MousePosition(),
        //new OpenLayers.Control.Scale(),
        //new OpenLayers.Control.MousePosition({
			//div: document.getElementById("MousePosition") ,
			  //target: document.getElementById('mouse-position'),
  //undefinedHTML: '&nbsp;',
			//div: OpenLayers.Util.getElement('MousePosition'),
			//div: OpenLayers.Util.getElement("MousePosition").innerHTML = position;
			//prefix: "XY : ", 
            //numdigits: 5
		//}),
        //new OpenLayers.Control.MousePosition({
            //div: document.getElementById("coordinates") 
            //div: OpenLayers.Util.getElement('attribution1')
            //div: Ext.fly('attribution1').dom,
            //prefix: "Coordonnées (m):",
            //displayProjection: epsg4326
        //}),
        //new OpenLayers.Control.MousePosition({
            //div: document.getElementById("coordinates") ,
                        //div: OpenLayers.Util.getElement("coordinates") ,

            //div: OpenLayers.Util.getElement('attribution1'),
            //prefix: "Lon - Lat : ",
            //prefix: "XY : ",
            //suffix: "---",
            //numdigits: 5
            //,
            //emptyString: 'La souris n\'est pas sur la carte',
            //formatOutput: function(lonLat) {
               //var markup = 'X : '+lonLat.lat.toFixed(parseInt(this.numdigits));
               //markup += ', ';
               //markup += 'Y : '+lonLat.lon.toFixed(parseInt(this.numdigits));
               //return markup
            //}
            //,
            //,displayProjection: map.displayProjection
            //,displayProjection: epsg4326
        //}),
        //new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.ScaleLine({bottomOutUnits: ''})
    ],
    allOverlays: false
};
//
map = new OpenLayers.Map(mapOptions);
                     
        // Couche OSM
        var l_osm = new OpenLayers.Layer.OSM('OSM', null, {
            isBaseLayer:true,
            visibility: false,
            zoomOffset: 6,
            resolutions: resolutions,
            //transitionEffect: 'resize',
            //buffer: 16, // Permet de charger les tuiles péripherique à l'affichage
            displayInLayerSwitcher:true
        });
        map.addLayer(l_osm);
        
        // Couche Google Maps
        var l_gmap = new OpenLayers.Layer.Google(
            'Google - Plan', // the default
            {
                isBaseLayer:true,
                numZoomLevels: 14,
                visibility: false,
                attribution: 'Données cartographiques ©2014 Google'
            }
        );
        map.addLayer(l_gmap);
        
        var l_ghyb = new OpenLayers.Layer.Google(
            'Google - Photo aérienne', // the default
            {
                type: google.maps.MapTypeId.HYBRID,
                isBaseLayer:true,
                numZoomLevels: 14,
                visibility: false,
                attribution: 'Données cartographiques ©2014 Google'
            }
        );
        map.addLayer(l_ghyb);   
        
       // Fond vierge (blanc)
        var l_fond_vierge = new OpenLayers.Layer(
            'Fond blanc',
            {
                isBaseLayer: true,
                zoomOffset: 6,
                resolutions: resolutions,
                visibility: true,
                color: 'blue',
                transitionEffect: 'none'
            }
        );
        map.addLayer(l_fond_vierge);
        
	// Limites administratives
    
	// Limites des régions de France
	var l_regions_autres = new OpenLayers.Layer.Vector("Autres régions", {
	    //minResolution: 152.87405654907226, 
	    minResolution: 76.43702827453613,
	    projection: map.displayProjection,
	    strategies: [new OpenLayers.Strategy.Fixed()],
	    protocol: new OpenLayers.Protocol.HTTP({
		url: "xml/region_france.geojson",
		format: new OpenLayers.Format.GeoJSON({
		    extractStyles: true,
		    extractAttributes: true
		}),
		visibility: true
	    }),
	    styleMap: new OpenLayers.StyleMap({
		"default": new OpenLayers.Style({
		    title: "aaaaa",
		    fillColor: "#fff",
		    fillOpacity: 0,
		    strokeColor: "#000",		    
		    strokeWidth: 2,
		    strokeOpacity: 0.8 
		})
		//,
		//"select": { 
		    //fillColor: "#8aeeef",
		    //strokeColor: "#32a8a9",
		    //labelYOffset:13,
		    //label:"${NOM}"
		//} //Text entspricht feature.attributes.name
	    }),
	    displayInLayerSwitcher: false,
	    attribution: " - &copy;IGN-Paris 2010 ROUTE 500"
	});
	//var l_regions_autres = new OpenLayers.Layer.Vector("Régions", {
	    //projection: map.displayProjection,
	    //strategies: [new OpenLayers.Strategy.Fixed()],
	    //protocol: new OpenLayers.Protocol.HTTP({
		//url: "xml/l_regions_limitrophes_pc.kml",
		//format: new OpenLayers.Format.KML({
		    //extractStyles: true,
		    //extractAttributes: true
		//}),
		//visibility: true
	    //}),
	    //attribution: " - &copy;IGN-Paris 2010 ROUTE 500"
	//});
	
	// Ajout des couches à la carte
	map.addLayer(l_regions_autres);
	

    var tabLayers = new Array();
    //if(typeof tabLayers =='undefined') {var tabLayers = new Array();} 
    var layers = [];
    
    //
    var source_ign_bdcarto = "&copy; IGN - BD Carto 2013";
    var source_ign_bdtopo = "&copy; IGN - BD Topo 2013";
    var source_ign_bdcarthage = "&copy; IGN - BD Carthage 2013";
    var source_ign_route500 = "&copy; IGN - route500 2013";
    
    /*
     * Parametres :
     *  - 1 : Libellé de la couche
     *  - 2 : Nom du layer dans le mapfile
     *  - 3 : BaseLayer (oui/non)
     *  - 4 : Opacité de la couche
     *  - 5 : Classification de la couche
     *  - 6 : Affiché au chargement (oui/non))
     *  - 7 : Source de la donnée
     *  - 8 : Echelle
     */
    // Fonds de carte
    tabLayers[tabLayers.length] = new Array("l_fond_iaat","Fond blanc");
    tabLayers[tabLayers.length] = new Array("l_osm","OpenStreetMap");
    tabLayers[tabLayers.length] = new Array("l_gmap","Google Maps -- Plan");
    tabLayers[tabLayers.length] = new Array("l_gphy","Google Maps -- Photo");
    tabLayers[tabLayers.length] = new Array("l_regions_autres","Régions");
    //

    // Equipement
    tabLayers[tabLayers.length] = new Array("Construction_elevee","Construction élevée",true,1,"bdcarto:equipement:construction_elevee",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Digue","Digue",true,1,"bdcarto:equipement:digue",false, "&copy;IGN - BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("Ligne_electrique","Ligne électrique",true,1,"bdcarto:equipement:ligne_electrique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Piste_aerodrome","Piste d'aérodrome",true,1,"bdcarto:equipement:piste_aerodrome",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Aerodrome","Aérodrome",true,1,"bdcarto:equipement:aerodrome",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Cimetiere","Cimetière",true,1,"bdcarto:equipement:cimetiere",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Enceinte_militaire","Enceinte militaire",true,0.8,"bdcarto:equipement:enceinte_militaire",false, source_ign_bdcarto);
    // Administratif
    //tabLayers[tabLayers.length] = new Array("Région","Région",true,1,"bdcarto:administratif:region",true, source_ign_bdcarto);
    //tabLayers[tabLayers.length] = new Array("Département","Département",true,1,"bdcarto:administratif:departement",true, source_ign_bdcarto);
    
    // Routier
    tabLayers[tabLayers.length] = new Array("Troncon_route","Tronçon route",true,1,"bdcarto:routier:troncon_route",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Liaison_maritime","Liaison maritime",true,1,"bdcarto:routier:liaison_maritime",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Equipement_routier","Equipement routier",true,1,"bdcarto:routier:equipement_routier",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Communication_restreinte","Communication restreinte",true,1,"bdcarto:routier:communication_restreinte",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Noeud_routier","Nœud routier",true,1,"bdcarto:routier:noeud_routier",false, source_ign_bdcarto);
    // Hydrograpie
    tabLayers[tabLayers.length] = new Array("Surface_hydrographique","Surface hydrographique",true,1,"bdcarto:hydrographie:surface_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Zone_hydrographique","Zone hydrographique",true,1,"bdcarto:hydrographie:zone_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Troncon_hydrographique","Tronçon hydrographique",true,1,"bdcarto:hydrographie:troncon_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Laisse","Laisse",true,1,"bdcarto:hydrographie:laisse",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Ponctuel_hydrographique","Ponctuel hydrographique",true,1,"bdcarto:hydrographie:ponctuel_hydrographique",false, source_ign_bdcarto);
    // Réseau ferré
    tabLayers[tabLayers.length] = new Array("Troncon_voie_ferree","Tronçon de voie ferrée",true,1,"bdcarto:reseau_ferre:troncon_de_voie_ferre",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Noeud_ferre","Nœud ferré",true,1,"bdcarto:reseau_ferre:noeud_ferre",false, source_ign_bdcarto);
    // Toponyme
    tabLayers[tabLayers.length] = new Array("zone_reglementee_touristique","Zone reglementée touristique",true,1,"bdcarto:toponyme:zone_reglemente",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Zone_habitat","Zone d'habitat",true,1,"bdcarto:toponyme:zone_habitat",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Massif_boise","Massif boisé",true,1,"bdcarto:toponyme:massif_boise",false, source_ign_bdcarto); 
    tabLayers[tabLayers.length] = new Array("Zone_activité","Zone d'activité",true,1,"bdcarto:toponyme:zone_activite",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Etablissement","Etablissement",true,1,"bdcarto:toponyme:etablissement",false, source_ign_bdcarto);
    // Habillage
    tabLayers[tabLayers.length] = new Array("Habillage","Habillage",true,1,"bdcarto:habillage:habillage",false, source_ign_bdcarto);
     
    // Administratif
    tabLayers[tabLayers.length] = new Array("Region","Région",true,1,"bdcarto:administratif:region",true, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Departement","Département",true,1,"bdcarto:administratif:departement",true, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Arrondissement","Arrondissement",true,1,"bdcarto:administratif:arrondissement",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Canton","Canton",true,1,"bdcarto:administratif:canton",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Commune","Commune",true,1,"bdcarto:administratif:commune",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Limite_administrative","Limite administrative",false,1,"bdcarto:administratif:limite_administrative",false, source_ign_bdcarto);
    
    
	var findIndex = function(key,arr) {
	    for(var i=0, j=arr.length; i<j; i++) {
	        if(arr[i][4] === key) {
	            return i;
	        }
	    }
	    return -1;
	};
	//var index = findIndex("bdcarto:equipement:cimetiere",tabLayers);
	//console.log(index);
	
	//var serverUrl = 'http://10.0.0.208';
	//var serverUrlGeosource = 'http://10.0.0.208/geosource/srv/fre/find';
	var serverUrl = 'http://plateformesig.iaat.org/';
	var serverUrlGeosource = 'http://plateformesig.iaat.org/geosource/srv/fre/find';

	if (tabLayers.length > 5) {
	    for (var i = 5; i < tabLayers.length; i++) {
			// On recupere les valeurs
	        l_name = tabLayers[i][0];
	        name = tabLayers[i][1];
	        afficheLegend = tabLayers[i][2];
	        opacity = tabLayers[i][3];
	        visibility = tabLayers[i][5];
	        source_couche = tabLayers[i][6];
	        	        
	        // On creer le layer
	        l_name = new OpenLayers.Layer.WMS(
	            name,
	            serverUrl+ '/cgi-bin/wms_bdcarto?',
	            //serverUrl+ '/cgi-bin/wms_bdcarto_equipement?',
	            {
	                layers: l_name,
	                srs: 'EPSG:4326',
	                format: 'image/jpeg',
	                transparent: true
	            },{
	                //singleTile: true,
			//singleTile: true, ratio: 1,
	                buffer: 0,
	                opacity: opacity,
	                displayInLayerSwitcher: afficheLegend,
	                visibility: visibility,
	                attribution: source_couche,
	                //useCanvas: OpenLayers.Layer.Grid.ONECANVASPERTILE,
	                isBaseLayer: false
	            }
	        );
	        // On l ajoute au tableau de layers
	        layers.push(l_name);
	    }
	    // On ajout le tableau de layers à la carte
	    map.addLayers(layers);
	}    

    // Utile pour dessiner une line ou un polygone
    var vector = new OpenLayers.Layer.Vector("vector", {
		displayInLayerSwitcher: false
		
	});
	map.addLayer(vector);


    // Limites des départements du Poitou-Charentes    
    //var l_departement_pc = new OpenLayers.Layer.Vector("Départements", {
        //projection: map.displayProjection,
        //strategies: [new OpenLayers.Strategy.Fixed()],
        //protocol: new OpenLayers.Protocol.HTTP({
            //url: "xml/l_departements_pc.kml",
            //format: new OpenLayers.Format.KML({
                //extractStyles: true,
                //extractAttributes: true
            //}),
            //visibility: true
        //})
    //});
    //layers.push(l_departement_pc);
    //
    //map.addLayers(layers);
    
    

