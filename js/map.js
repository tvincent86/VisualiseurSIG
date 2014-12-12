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
//var resolutions = [4096,2048,1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5 ];
//var scales = [50000000, 30000000, 10000000, 5000000, 1000000, 500000, 100000, 50000, 10000];
var scales = [10000000, 5000000, 2000000, 1500000, 1000000, 750000, 500000, 375000, 250000, 100000, 50000,
              25000, 10000, 5000, 2500, 1000, 500, 100];

// Déclaration des options de la carte
var mapOptions = {
    //maxExtent: extent,
    //restrictedExtent: extent,
    maxResolution: "auto",
    projection: epsg3857,
    scales: scales,
    units: "m",
    //displayProjection: epsg2154,
    //displayProjection: epsg4326,
    //displayProjection: epsg3857,
    numZoomLevels: 12,
    minZoomLevel: 6,
    maxZoomLevel: 18,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Attribution(),
        new OpenLayers.Control.ArgParser(),
        //new OpenLayers.Control.Scale(),
        //new OpenLayers.Control.MousePosition({
            //div: document.getElementById("coordinates") 
            //div: OpenLayers.Util.getElement('attribution1')
            //div: Ext.fly('attribution1').dom,
            //prefix: "Coordonnées (m):",
            //displayProjection: epsg4326
        //}),
        new OpenLayers.Control.MousePosition({
            div: document.getElementById("coordinates") ,
            //prefix: "Lon - Lat : ",
            //suffix: "---",
            numdigits: 5,
            //emptyString: 'La souris n\'est pas sur la carte',
            formatOutput: function(lonLat) {
               var markup = 'X : '+lonLat.lat.toFixed(parseInt(this.numdigits));
               markup += ', ';
               markup += 'Y : '+lonLat.lon.toFixed(parseInt(this.numdigits));
               return markup
            }
            //,
            //displayProjection: epsg4326
            //displayProjection: map.displayProjection
        }),
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
        //var l_osm = new OpenLayers.Layer.OSM('OSM', null, {
            //isBaseLayer:true,
            //visibility: false,
            //zoomOffset: 6,
            //resolutions: resolutions,
            //transitionEffect: 'resize',
            //useCanvas: OpenLayers.Layer.Grid.ONECANVASPERLAYER,
            //buffer: 16, // Permet de charger les tuiles péripherique à l'affichage
            //displayInLayerSwitcher:true
        //});
        //map.addLayer(l_osm);


        
        // Couche Google Maps
        //var l_gmap = new OpenLayers.Layer.Google(
            //'Google - Plan', // the default
            //{
                //isBaseLayer:true,
                //numZoomLevels: 18,
                //visibility: false,
                //attribution: 'Données cartographiques ©2014 Google'
            //}
        //);
        //map.addLayer(l_gmap);
        
        //var l_ghyb = new OpenLayers.Layer.Google(
            //'Google - Photo aérienne', // the default
            //{
                //type: google.maps.MapTypeId.HYBRID,
                //isBaseLayer:true,
                //numZoomLevels: 16,
                //visibility: false,
                //attribution: 'Données cartographiques ©2014 Google'
            //}
        //);
        //map.addLayer(l_ghyb);   
        

        
            // Limites administratives
    
    // Limites des régions de France
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
    //map.addLayer(l_regions_autres);

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
     */
    // Fonds de carte
    tabLayers[tabLayers.length] = new Array("l_fond_iaat","Fond blanc");
    tabLayers[tabLayers.length] = new Array("l_osm","OpenStreetMap");
    tabLayers[tabLayers.length] = new Array("l_gmap","Google Maps -- Plan");
    tabLayers[tabLayers.length] = new Array("l_gphy","Google Maps -- Photo");
    //tabLayers[tabLayers.length] = new Array("l_regions_autres","Régions");
    //

    // Equipement
    tabLayers[tabLayers.length] = new Array("construction élevée","Construction élevée",true,1,"bdcarto:equipement:construction_elevee",false, "&copy;IGN -BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("digue","Digue",true,1,"bdcarto:equipement:digue",false, "&copy;IGN -BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("Ligne électrique","Ligne électrique",true,1,"bdcarto:equipement:ligne_electrique",false, "&copy;IGN -BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("Piste d'aérodrome","Piste d'aérodrome",true,1,"bdcarto:equipement:piste_aerodrome",false, "&copy;IGN -BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("Aérodrome","Aérodrome",true,1,"bdcarto:equipement:aerodrome",false, "&copy;IGN -BD Carto 2013");
    tabLayers[tabLayers.length] = new Array("Cimetière","Cimetière",true,1,"bdcarto:equipement:cimetiere",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Enceinte militaire","Enceinte militaire",true,0.8,"bdcarto:equipement:enceinte_militaire",false, source_ign_bdcarto);
    // Administratif
    //tabLayers[tabLayers.length] = new Array("Région","Région",true,1,"bdcarto:administratif:region",true, source_ign_bdcarto);
    //tabLayers[tabLayers.length] = new Array("Département","Département",true,1,"bdcarto:administratif:departement",true, source_ign_bdcarto);
    
    // Routier
    tabLayers[tabLayers.length] = new Array("Tronçon route","Tronçon route",true,1,"bdcarto:routier:troncon_route",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Liaison maritime","Liaison maritime",true,1,"bdcarto:routier:liaison_maritime",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Equipement routier","Equipement routier",true,1,"bdcarto:routier:equipement_routier",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Communication restreinte","Communication restreinte",true,1,"bdcarto:routier:communication_restreinte",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Nœud routier","Nœud routier",true,1,"bdcarto:routier:noeud_routier",false, source_ign_bdcarto);
    // Hydrograpie
    tabLayers[tabLayers.length] = new Array("Surface hydrographique","Surface hydrographique",true,1,"bdcarto:hydrographie:surface_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Zone hydrographique","Zone hydrographique",true,1,"bdcarto:hydrographie:zone_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Tronçon hydrographique","Tronçon hydrographique",true,1,"bdcarto:hydrographie:troncon_hydrographique",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("laisse","Laisse",true,1,"bdcarto:hydrographie:laisse",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("ponctuel_hydrographique","Ponctuel hydrographique",true,1,"bdcarto:hydrographie:ponctuel_hydrographique",false, source_ign_bdcarto);
    // Réseau ferré
    tabLayers[tabLayers.length] = new Array("Tronçon de voie ferrée","Tronçon de voie ferrée",true,1,"bdcarto:reseau_ferre:troncon_de_voie_ferre",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Nœud ferré","Nœud ferré",true,1,"bdcarto:reseau_ferre:noeud_ferre",false, source_ign_bdcarto);
   // Toponyme
    tabLayers[tabLayers.length] = new Array("zone reglementée touristique","Zone reglementée touristique",true,1,"bdcarto:toponyme:zone_reglemente",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Zone d'habitat","Zone d'habitat",true,1,"bdcarto:toponyme:zone_habitat",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Massif boisé","Massif boisé",true,1,"bdcarto:toponyme:massif_boise",false, source_ign_bdcarto); 
    tabLayers[tabLayers.length] = new Array("Zone d'activité","Zone d'activité",true,1,"bdcarto:toponyme:zone_activite",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Etablissement","Etablissement",true,1,"bdcarto:toponyme:etablissement",false, source_ign_bdcarto);
     
    // Administratif
    tabLayers[tabLayers.length] = new Array("Région","Région",true,1,"bdcarto:administratif:region",true, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Département","Département",true,1,"bdcarto:administratif:departement",true, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("arrondissement","Arrondissement",true,1,"bdcarto:administratif:arrondissement",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("canton","Canton",true,1,"bdcarto:administratif:canton",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("commune","Commune",true,1,"bdcarto:administratif:commune",false, source_ign_bdcarto);
    tabLayers[tabLayers.length] = new Array("Limite administrative","Limite administrative",true,1,"bdcarto:administratif:limite_administrative",false, source_ign_bdcarto);
    
    
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

    for (var i = 4; i < tabLayers.length; i++) {
        l_name = tabLayers[i][0];
        name = tabLayers[i][1];
        afficheLegend = tabLayers[i][2];
        opacity = tabLayers[i][3];
        visibility = tabLayers[i][5];
        source_couche = tabLayers[i][6];
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
                singleTile: true,
                buffer: 0,
                opacity: opacity,
                singleTile: true,
                displayInLayerSwitcher: afficheLegend,
                visibility: visibility,
                attribution: source_couche,
                useCanvas: OpenLayers.Layer.Grid.ONECANVASPERTILE,
                isBaseLayer: false
            }
        );
        layers.push(l_name);
    }
    map.addLayers(layers);


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

