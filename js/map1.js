/*
 * File name : map.js
 * Version 0.1
 * Date (mm/dd/yyyy) : 12/01/2014
 * Author : Tony VINCENT
 */

/**** Initialisation des variables ****/


// Déclaration de l'étendu
var extent = new OpenLayers.Bounds(-11, 39, 12, 53);

// Déclaration des projections utilisées 
var epsg4326 = new OpenLayers.Projection("EPSG:4326");
var epsg3857 = new OpenLayers.Projection("EPSG:3857");
var epsg2154 = new OpenLayers.Projection("EPSG:2154");

// On transforme l'étendu dans la nouvelle projection
extent.transform(epsg4326,epsg3857);

var center = new OpenLayers.LonLat(-0.12640,46.18390).transform(epsg4326,epsg3857);

//
var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 20);

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
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.ScaleLine({bottomOutUnits: ''})
    ],
    allOverlays: false
};
//
map = new OpenLayers.Map(mapOptions);
               

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
      
        // Couche OSM
        var l_osm = new OpenLayers.Layer.OSM('OSM', null, {
            isBaseLayer:true,
            visibility: false,
            zoomOffset: 6,
            resolutions: resolutions,
            transitionEffect: 'resize',
            buffer: 16, // Permet de charger les tuiles péripherique à l'affichage
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
        
	//
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
     
    // Administratif
    tabLayers[tabLayers.length] = new Array("Region","Région",true,1,"bdcarto:administratif:region",true, source_ign_bdcarto);
        
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
	
	var serverUrl = 'http://10.0.0.208';
	var serverUrlGeosource = 'http://10.0.0.208/geosource/srv/fre/find';

	//if (tabLayers.length > 4) {
	    for (var i = 4; i < tabLayers.length; i++) {
			// On recupere les valeurs
	        l_name = tabLayers[i][0];
	        name = tabLayers[i][1];
	        afficheLegend = tabLayers[i][2];
	        opacity = tabLayers[i][3];
	        visibility = tabLayers[i][5];
	        source_couche = tabLayers[i][6];
	        
	        //console.log("l_name : "+l_name+" name : "+name+" afficheLegend : "+afficheLegend+" opacity : "+opacity+" visibility : "+visibility+" source_couche : "+source_couche);
	        
	        // On creer le layer
	        l_name = new OpenLayers.Layer.WMS(
	            name,
	            serverUrl+ '/cgi-bin/wms_bdcarto?',
	            //serverUrl+ '/cgi-bin/wms_bdcarto_equipement?',
	            {
	                layers: l_name,
	                //layers: "Region",  
	                srs: 'EPSG:4326',
	                format: 'image/jpeg',
	                transparent: true
	            },{
	                //singleTile: true,
	                buffer: 0,
	                opacity: opacity,
	                //singleTile: true,
	                displayInLayerSwitcher: afficheLegend,
	                visibility: visibility,
	                //visibility: true,
	                attribution: source_couche,
	                //useCanvas: OpenLayers.Layer.Grid.ONECANVASPERTILE,
	                isBaseLayer: false
	            }
	        );
	        //map.addLayer(l_name);
	        // On l ajoute au tableau de layers
	        layers.push(l_name);
	    }
	    //console.log(layers);
	    map.addLayers(layers);
	//}    
	//toto = new OpenLayers.Layer.WMS(
	            //"toto",
	            //serverUrl+ '/cgi-bin/wms_bdcarto?',
	            //{
	                //layers: "Region", 
	                //srs: 'EPSG:4326',
	                //format: 'image/jpeg',
	                //transparent: true
	            //},{
	                //displayInLayerSwitcher: true,
	                //visibility: true,
	                //isBaseLayer: false
	            //}
	        //);
	        //map.addLayer(toto);

    // Utile pour dessiner une line ou un polygone
    var vector = new OpenLayers.Layer.Vector("vector", {
		displayInLayerSwitcher: false
		
	});
	map.addLayer(vector);


