/*
 * Copyright (c) 2008-2014 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */
 
/*
 * File name : app.js
 * Version 0.2
 * Date (mm/dd/yyyy) : 12/01/2014
 * Author : Tony VINCENT
 */

/**** Declaration des variables globales ****/
var map, popup, filterPanelItem2, mapPanel; 

Ext.BLANK_IMAGE_URL = "http://extjs.cachefly.net/ext-3.4.0/resources/images/default/s.gif";

Ext.QuickTips.init();

Ext.require([
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'GeoExt.Action',
    'GeoExt.tree.Panel',
    'Ext.tree.plugin.TreeViewDragDrop',
    'GeoExt.panel.Map',
                        //'GeoExt.tree.LayerContainer',
                        //'GeoExt.tree.LayerFolderNode',
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.data.LayerTreeModel',
    //'GeoExt.tree.LayerNodeUI',
    //'GeoExt.tree.TreeNodeUIEventMixin',
    'GeoExt.tree.View',
    'GeoExt.tree.Column',
    'GeoExt.container.WmsLegend',
    'GeoExt.container.UrlLegend',
    'GeoExt.container.VectorLegend',
    'GeoExt.panel.Legend'
]);

var mapPanel, tree;

Ext.application({
    name: 'plateformeSIG',
    launch: function() {
        
        OpenLayers.ImgPath = 'http://js.mapbox.com/theme/dark/'; 
        
        //
        var items = [];
        var toolbarItems = [],
        toolbarItems_bottom = [],
        action, actions = {};    
        
        
        
var serverUrl = 'http://10.0.0.208';
var serverUrlGeosource = 'http://10.0.0.208/geosource/srv/fre/find';


// Déclaration de l'étendu
var extent = new OpenLayers.Bounds(-1.61913,44.96020,1.25998,47.34050);

// Déclaration des projections utilisées 
var epsg4326 = new OpenLayers.Projection("EPSG:4326");
var epsg3857 = new OpenLayers.Projection("EPSG:3857");
var epsg2154 = new OpenLayers.Projection("EPSG:2154");

// On transforme l'étendu dans la nouvelle projection
extent.transform(epsg4326,epsg3857);

//var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg900913);
var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg3857);

//
var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 22);

// Déclaration des options de la carte
var mapOptions = {
    maxExtent: extent,
    restrictedExtent: extent,
    maxResolution: "auto",
    projection: epsg3857,
    units: "m",
    //displayProjection: epsg4326,
    displayProjection: epsg2154,
    numZoomLevels: 12,
    minZoomLevel: 6,
    maxZoomLevel: 18,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Attribution(),
        new OpenLayers.Control.MousePosition(),
        new OpenLayers.Control.TouchNavigation(
        //{
            //dragPanOptions: {
                //enableKinetic: true
            //}
        //}
        ),
        //new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.ScaleLine({bottomOutUnits: ''})
    ],
    allOverlays: false
    //allOverlays: true // utile pour custom groups et node text
};

map = new OpenLayers.Map(mapOptions);


       // Fond vierge (blanc)
        var l_fond_vierge = new OpenLayers.Layer(
            'Fond blanc',
            {
                isBaseLayer: true,
                zoomOffset: 8,
                resolutions: resolutions,
                visibility: false,
                color: 'blue',
                transitionEffect: 'none'
            }
        );
        map.addLayer(l_fond_vierge);
        
        // Couche Google Maps
        var l_gmap = new OpenLayers.Layer.Google(
            'Google - Plan', // the default
            {
                isBaseLayer:true,
                numZoomLevels: 20,
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
                numZoomLevels: 20,
                visibility: false,
                attribution: 'Données cartographiques ©2014 Google'
            }
        );
        map.addLayer(l_ghyb);   
        
        // Couche OSM
        var l_osm = new OpenLayers.Layer.OSM('OSM', null, {
            isBaseLayer:true,
            displayInLayerSwitcher:true,
            zoomOffset: 6,
            resolutions: resolutions
        });
        map.addLayer(l_osm);
        

        
    // Limites administratives
    
    // Limites des régions de France
    var l_regions_autres = new OpenLayers.Layer.Vector("Régions", {
        //displayInLayerSwitcher:false,
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "xml/l_regions_limitrophes_pc.kml",
            format: new OpenLayers.Format.KML({
                extractStyles: true,
                extractAttributes: true
            }),
            visibility: true
        }),
        attribution: " - &copy;IGN-Paris 2010 ROUTE 500"
    });
    
    // Ajout des couches à la carte
    //map.addLayer(l_regions_autres);
    
    var tabLayers = new Array();
    //if(typeof tabLayers =='undefined') {var tabLayers = new Array();} 
    var layers = [];

    //
    tabLayers[tabLayers.length] = new Array("l_fond_iaat","Fond blanc");
    tabLayers[tabLayers.length] = new Array("l_osm","OpenStreetMap");
    tabLayers[tabLayers.length] = new Array("l_gmap","Google Maps -- Plan");
    tabLayers[tabLayers.length] = new Array("l_gphy","Google Maps -- Photo");
    //tabLayers[tabLayers.length] = new Array("l_regions_autres","Régions");
    //
    /*
     * Parametres :
     *  - 1 : Libellé de la couche
     *  - 2 : Nom du layer dans le mapfile
     *  - 3 : BaseLayer (oui/non)
     *  - 4 : Opacité de la couche
     *  - 5 : Classification de la couche
     *  - 6 : Affiché au chargement (oui/non))
     * 
     */
    //tabLayers["bdcarto:equipement:construction_elevee"] = new Array("construction_elevee","Construction élevée",true,1);
    //tabLayers["bdcarto:equipement:digue"] = new Array("digue","Digue",true,1);
    //tabLayers["bdcarto:equipement:ligne_electrique"] = new Array("ligne_electrique","Ligne électrique",true,1);
    //tabLayers["bdcarto:equipement:enceinte_militaire"] = new Array("enceinte_militaire","Enceinte militaire",true,0.8);
    //tabLayers["bdcarto:equipement:cimetiere"] = new Array("cimetiere","Cimetiere",true,1);
    // Equipement
    tabLayers[tabLayers.length] = new Array("construction élevée","Construction élevée",true,1,"bdcarto:equipement:construction_elevee",false);
    tabLayers[tabLayers.length] = new Array("digue","Digue",true,1,"bdcarto:equipement:digue",false);
    tabLayers[tabLayers.length] = new Array("Ligne électrique","Ligne électrique",true,1,"bdcarto:equipement:ligne_electrique",false);
    tabLayers[tabLayers.length] = new Array("Piste d'aérodrome","Piste d'aérodrome",true,1,"bdcarto:equipement:piste_aerodrome",false);
    tabLayers[tabLayers.length] = new Array("Aérodrome","Aérodrome",true,1,"bdcarto:equipement:aerodrome",false);
    tabLayers[tabLayers.length] = new Array("Cimetière","Cimetière",true,1,"bdcarto:equipement:cimetiere",false);
    tabLayers[tabLayers.length] = new Array("Enceinte militaire","Enceinte militaire",true,0.8,"bdcarto:equipement:enceinte_militaire",false);
    // Administratif
    tabLayers[tabLayers.length] = new Array("Région","Région",true,1,"bdcarto:administratif:region",true);
    tabLayers[tabLayers.length] = new Array("Département","Département",true,1,"bdcarto:administratif:departement",true);
    tabLayers[tabLayers.length] = new Array("arrondissement","Arrondissement",true,1,"bdcarto:administratif:arrondissement",false);
    tabLayers[tabLayers.length] = new Array("canton","Canton",true,1,"bdcarto:administratif:canton",false);
    tabLayers[tabLayers.length] = new Array("commune","Commune",true,1,"bdcarto:administratif:commune",false);
    tabLayers[tabLayers.length] = new Array("Limite administrative","Limite administrative",true,1,"bdcarto:administratif:limite_administrative",false);
    // Routier
    tabLayers[tabLayers.length] = new Array("Tronçon route","Tronçon route",true,1,"bdcarto:routier:troncon_route",false);
    tabLayers[tabLayers.length] = new Array("Liaison maritime","Liaison maritime",true,1,"bdcarto:routier:liaison_maritime",false);
    tabLayers[tabLayers.length] = new Array("Equipement routier","Equipement routier",true,1,"bdcarto:routier:equipement_routier",false);
    tabLayers[tabLayers.length] = new Array("Communication restreinte","Communication restreinte",true,1,"bdcarto:routier:communication_restreinte",false);
    tabLayers[tabLayers.length] = new Array("Nœud routier","Nœud routier",true,1,"bdcarto:routier:noeud_routier",false);
    // Hydrograpie
    tabLayers[tabLayers.length] = new Array("ponctuel_hydrographique","Ponctuel hydrographique",true,1,"bdcarto:hydrographie:ponctuel_hydrographique",false);
    //tabLayers[tabLayers.length] = new Array("digue","Digue",true,1,"bdcarto:hydrographie:",false);
    
    //tabLayers[tabLayers.length] = new Array("aerodrome","Aérodrome",true,0.8);
    //tabLayers[tabLayers.length] = new Array("piste_aerodrome","Piste aérodrome",true,1);
    //tabLayers[tabLayers.length] = new Array("limite_administrative","Limite administrative",true,1);
    //tabLayers[tabLayers.length] = new Array("region","Région",true,1);

    
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

    for (var i = 4; i < tabLayers.length; i++) {
        l_name = tabLayers[i][0];
        name = tabLayers[i][1];
        afficheLegend = tabLayers[i][2];
        opacity = tabLayers[i][3];
        visibility = tabLayers[i][5];
//console.log('toto : --'+l_name);
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


//infoControl =  new OpenLayers.Control.WMSGetFeatureInfo({
                     //url: serverUrl+ '/cgi-bin/wms_bdcarto?',
                     //maxFeatures: 1,
                     //title: 'Identify features by clicking',
                     //queryVisible: true,
                     //infoFormat: 'text/plain',
                     //layers: [map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)]],
                     //eventListeners: {
                         //getfeatureinfo: function(event) {
                             //console.log(event);
                             //map.addPopup(new OpenLayers.Popup.FramedCloud(
                                     //"chicken",
                                     //map.getLonLatFromPixel(event.xy),
                                     //null,
                                     //event.text,
                                     //null,
                                     //true
                              //)); //map.addPopup
//
//
                         //} // getfeatureinfo
                     //} // eventListeners
//
   //});

    //});
   map.addControl(infoControl);
   infoControl.activate();        
        

        
    // Fonction pour créer le Popup
    function plusInfos(origine, data) {
        //console.log('-------------');
        //console.log(origine);
        //console.log(data);
        //console.log('-------------');
        //var link = serverUrlGeosource + '?uuid=IGNF_BDCARTOr_3-1_HABILLAGE.xml'
        //var link = serverUrlGeosource + data.dom.name;

        
        var win;
        //if (!win) {
        if (origine != "geosource") {
            //var link = data.dom.name;
            var link = data;
            
            //win = Ext.create('widget.window', {
            win = Ext.create('Ext.window.Window', {
                title: 'Descriptif',
                header: {
                    titlePosition: 2,
                    titleAlign: 'center'
                },
                maximizable: false,
            //unpinnable: false,
            //anchored: false,
            resizable: false,
                //closable: true,
                //zIndexManager: 80000,
                style: 'padding:5px;',
                bodyStyle: 'position: absolute; z-index: 999999;',
                //position:'absolute ',
                                            //zIndexManager: 2,
                //closeAction: 'hide',
                //maximizable: true,
                //animateTarget: button,
                width: 720,
                //minWidth: 550,
                height: 670,
                //tools: [{type: 'pin'}],
                layout: {
                    type: 'border',
                    padding: 5
                },
                items: [{
                    //region: 'west',
                    //title: 'Navigation',
                    //width: 200,
                    //split: true,
                    //collapsible: true,
                    //floatable: false
                //}, {
                    region: 'center',
                    xtype: 'tabpanel',
                    items: [{
                        // LTR even when example is RTL so that the code can be read
                        //rtl: false,
                        title: 'Description',
                        html: '<iframe width="690" height="570" src="./metadata/'+link+'.pdf"></iframe>'
                    }, {
                        title: 'Inspire',
                        html: '<iframe width="695" height="645" src="'+serverUrlGeosource+'?uuid=IGNF_BDCARTOr_3-1_HABILLAGE.xml"></iframe>'
                    //}, {
                        //title: 'Closable Tab',
                        //html: 'Hello world 3',
                        //closable: true
                    }]
                }]
            });
        //}
        //button.dom.disabled = true;
        if (win.isVisible()) {
            win.hide(this, function() {
                //button.dom.disabled = false;
            });
        } else {
            win.show(this, function() {
                //button.dom.disabled = false;
            });
        }
        
        }else{
            //var link = serverUrlGeosource + data.dom.name;
            var link = serverUrlGeosource + data;
            window.open(link, "_blank")
        }        
    }        
  
    // Barre d'outils : Menu fonds carte
    var menuBaseLayer = Ext.create('Ext.menu.Menu', {
        //floating: false,  // usually you want this set to True (default)
        width: 250,
        items: [{
            text:'<img src="./icons/img_l_gmap.png" alt=""/> Google Plan',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_gmap);
            },
            group:'rp-group',
            scope:this
            //,
            //iconCls:'preview-bottom'
        },{
            text:'<img src="./icons/img_l_ghyb.png" alt=""/> Google Satellite',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_ghyb);
            },
            group:'rp-group',
            scope:this
            //,
            //iconCls:'preview-bottom'
        },{
            text:'<img src="./icons/img_l_osm.png" alt=""/> OpenStreetMap',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_osm);
            },
            group:'rp-group',
            scope:this
            //,
            //iconCls:'preview-bottom'
        },{
            text:'<img src="./icons/img_l_blank.png" alt=""/> Fond blanc',
            checked:true,
            handler: function() {
                map.setBaseLayer(l_fond_vierge);
            },
            group:'rp-group'
        }]
    });

        
        // Barre d'outils : Etendu maximum 
         action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            iconCls: "zoomfull",
            //text: "max extent",
            tooltip: "zoom to max extent"
        });
        actions["max_extent"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
       
        toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: 'Fonds de carte',
            menu: menuBaseLayer
        }))); 
        //toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
           //text:'Fonds de carte',
           //tooltip:'Fonds de carte',
           //menu: {
               //items : [
                   //treePanel_baselayer
                   //]
               //}
           //})));

    // Ajout de la barre de séparation
    toolbarItems.push('-');
    
    // Barre d'outils : Afficher infos WMS    
    toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
        iconCls: "service-wms",
        tooltip :'Information WMS',
        text: 'WMS',
        handler: function() {
            var txt_help = 'Utilisation des services WMS';
            txt_help += '<hr>';
            txt_help += 'Comment accéder aux données via les services WMS?';
            txt_help += '<br>';
            txt_help += '<br>';
            txt_help += 'Adresse du serveur WMS<br>';
            txt_help += 'http://10.0.0.208/cgi-bin/wms_bdcarto_equipement?';
            
            
            //popup_help = new GeoExt.Popup({
            win_wms = Ext.create('Ext.window.Window', {
                title: 'Information WMS',
                header: {
                    titlePosition: 2,
                    titleAlign: 'center'
                },
                maximizable: false,
                resizable: false,
                style: 'padding:5px;',
                bodyStyle: 'position: absolute; z-index: 999999;',
                width: 720,
                height: 670,
                layout: {
                    type: 'border',
                    padding: 5
                },
                items: [{
                    region: 'center',
                    //xtype: 'tabpanel',
                    items: [{
                        // LTR even when example is RTL so that the code can be read
                        rtl: true,
                        //title: 'Description',
                        html: txt_help
                        //html: '<iframe width="690" height="570" src="./metadata/bd_carto_equipement.pdf"></iframe>'
                    }]
                }]
            });
    
             //On affiche/cache la fenetre
            if (win_wms.isVisible()) {
                win_wms.hide(this, function() {
                    //button.dom.disabled = false;
                });
            } else {
                win_wms.show(this, function() {
                    //button.dom.disabled = false;
                });
            }
        }
    })));     
           
    // On position les éléments de la barre à droite
    toolbarItems.push('->');
    
    // Ajout de la barre de séparation
    toolbarItems.push('-');
    
    // Afficher le bouton impression
    toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
    //action = new Ext.Action({
        iconCls: "print",
        tooltip :'Imprimer la carte',
        handler: function(){
            window.print();
            return false;
        }
    })));
    //actions["print"] = action;
    //toolbarItems.push(action);

    

    
 
        // create a map panel with some layers that we will show in our layer tree
        // below.
        mapPanel = Ext.create('GeoExt.panel.Map', {
           region: 'center',
           id: 'map',
           border: true,
           stateful: true,
           stateId: 'mappanel',
           map: map,
           dockedItems: [{
                   xtype: 'toolbar',
                   id: 'toolbar-top',
                   height: 36,
                   dock: 'top',
                   items: toolbarItems
            }]
       });
       
        // give the record of the 1st layer a legendURL, which will cause
        // UrlLegend instead of WMSLegend to be used
        //var layerRec0 = mapPanel.layers.getAt(0);
        //layerRec0.set("legendURL", "http://ows.terrestris.de/osm/service?FORMAT=image%2Fgif&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&LAYER=OSM-WMS");
        
        legendPanel = Ext.create('GeoExt.panel.Legend', {
            defaults: {
                //labelCls: 'mylabel',
                style: 'padding:5px'
            },
            //bodyStyle: 'padding:5px',
            border: true,
            //split: true,
            //collapsible: true,
            //width: 250,
            //autoScroll: true,
            //bodyStyle: 'padding: 5px;',
            //collapsible: true,
            //collapsed : true,
            //collapseMode: "mini",
            //split: false,
            //width: 200,
            title: "Légende"
            //,
            //region: 'east'
        });




        var treeStore = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            //sorters: [{
                //property: 'leaf',
                //direction: 'ASC'
            //}, {
                //property: 'text',
                //direction: 'ASC'
            //}],
            root: {
                expanded: true,
                children: [{
                    //plugins: ['gx_baselayercontainer'],
                    //expanded: true,
                    //text: 'Fonds de carte'
                //}, {
                    //plugins: ['gx_overlaylayercontainer'],
                    //expanded: true,
                    //text: 'Couches de données'
                //}, {
                    text: "Bd Carto (IGN)",
                    leaf: false,                    
                    expanded: false,
                    children: [{
                        //text: 'Administratif  //<a href="javascript:void(0)" onclick="this.plusInfos1()" class="plus-infos-link">(Plus d\'infos)</a><a href="javascript:plusInfos(\"toto\",\"tata\")"><img src="./icons/img_info.png" /></a>  <img id="bdcarto_administratif" name="?uuid=IGNF_BDCARTOr_3-1_HABILLAGE.xml" src="./icons/img_geosource.png" />',
                        //text: 'Administratif  (2) <img id="bd_carto_administratif_desc" name="descriptif" src="./icons/img_info.png" />  <img id="bdcarto_administratif" name="?uuid=IGNF_BDCARTOr_3-1_ADMINISTRATIF.xml" src="./icons/img_geosource.png" />',
                        //text: 'Administratif  (2) <img id="bd_carto_administratif" name="descriptif" src="./icons/img_info.png" />  <img id="?uuid=IGNF_BDCARTOr_3-1_ADMINISTRATIF.xml" name="geosource" src="./icons/img_geosource.png" />',
                        text: 'Administratif  (2) <img id="bd_carto_administratif" name="descriptif" src="./icons/img_info.png" />  <img id="?uuid=IGNF_BDCARTOr_3-1_ADMINISTRATIF.xml" name="geosource" src="./icons/img_geosource.png" />',
                        leaf: false,
                        //scope:this,
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:canton",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:commune",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }]
                    }, {
                        //text: 'Equipement <img id="bdcarto_equipement" name="?uuid=IGNF_BDCARTOr_3-1_ADMINISTRATIF.xml" src="./icons/img_geosource.png" /> <a class="test" id="test" href="#" onClick="Ext.getCmp(\'launch\').openWindow(this.id);">TEST</a>',
                        //text: 'Equipement (6) <img id="bdcarto_equipement" name="?uuid=IGNF_BDCARTOr_3-1_ADMINISTRATIF.xml" src="./icons/img_geosource.png" />',
                        text: 'Equipement  (2) <img id="bd_carto_equipement" name="descriptif" src="./icons/img_info.png" /> ',
                        //text: 'Equipement ',
                        //scope:this,
                        //nodeParam: 'node_equipement',
                        leaf: false,
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:construction_elevee",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:construction_elevee",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:digue",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:digue",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:ligne_electrique",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:ligne_electrique",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:piste_aerodrome",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:piste_aerodrome",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:aerodrome",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:aerodrome",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:cimetiere",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:cimetiere",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }]
                    }, {
                        text: 'Routier (5) <img id="bd_carto_reseau_routier" name="descriptif" src="./icons/img_info.png" />  <img id="?uuid=IGNF_BDCARTOr_3-1_ROUTIER.xml" name="geosource" src="./icons/img_geosource.png" />',
                        leaf: false,
                        //scope:this,
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:routier:troncon_route",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:routier:troncon_route",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:routier:liaison_maritime",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:routier:liaison_maritime",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:routier:equipement_routier",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:routier:equipement_routier",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:routier:communication_restreinte",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:routier:communication_restreinte",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:routier:noeud_routier",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:routier:noeud_routier",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }]
                    }, {
                        text: 'Hydrographie (1) <img id="bd_carto_hydrographie" name="descriptif" src="./icons/img_info.png" />  <img id="?uuid=IGNF_BDCARTOr_3-1_ROUTIER.xml" name="geosource" src="./icons/img_geosource.png" />',
                        leaf: false,
                        //scope:this,
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:hydrographie:ponctuel_hydrographique",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:hydrographie:ponctuel_hydrographique",tabLayers)],
                            leaf: true,
                            checked: false,
                            children: []
                        }]
                    }]
                }, {
                    text: "Oragnisation 1",
                    leaf: false,                    
                    expanded: false,
                    children: [{
                        text: "Limite administrative",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:commune",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:canton",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
                            leaf: true,
                            checked: false
                        }]
                    }, {
                        text: "Limite de \"projet\"",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Communauté de communes",
                            leaf: false,                    
                            expanded: false,
                            children: []
                        }, {
                            text: "Communauté d'agglomération",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Pays",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Autres territoires",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Zone d'emploi",
                            leaf: false,                    
                            expanded: false,
                            children: []
                        }, {
                            text: "Unité urbaine",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Aire urbaine",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Donnée locale",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Bd Topo (IGN)",
                            leaf: false,                    
                            expanded: false,
                            children: []
                        }, {
                            text: "Bd Ortho (IGN)",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Bd Parcellaire (IGN)",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Bd Adresse (IGN)",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Donnée régionale",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Bd Carto (IGN)",
                            leaf: false,                    
                            expanded: false,
                            children: [{
                                text: "Administratif",
                                leaf: false,                    
                                expanded: true,
                                children: []
                            }, {
                                text: "Equipement",
                                leaf: false,                    
                                expanded: true,
                                children: []
                            }]
                        }, {
                            text: "Bd Carthage (IGN)",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Corine Land Cover",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Bd Alti",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Donnée nationale",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Route 500",
                            leaf: false,                    
                            expanded: true,
                            children: [{
                                text: "Administratif",
                                leaf: false,                    
                                expanded: true,
                                children: []
                            }, {
                                text: "Equipement",
                                leaf: false,                    
                                expanded: true,
                                children: []
                            }]
                        }, {
                            text: "Scan 1000",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Donnée compétences régionales",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Lycée",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Re-sources",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }]
                 }, {
                    text: "Oragnisation 2",
                    leaf: false,                    
                    expanded: false,
                    children: [{
                        text: "Limite administrative",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:commune",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:canton",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
                            leaf: true,
                            checked: false
                        }, {
                            plugins: ['gx_layer'],
                            text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
                            layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
                            leaf: true,
                            checked: false
                        }]
                    }, {
                        text: "Route 500 (IGN)",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Administratif",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Equipement",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "BD Carto (IGN)",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "BD Carthage (IGN)",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "BD Topo (IGN)",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "BD Adresse (IGN)",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "Corine Land Cover",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "Open Street Map",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }, {
                        text: "Zonage (COG INSEE)",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "EPCI",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Pays",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "TIC",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Haut débit",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "GSM",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Environement",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Re-Source",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "1000 Mares",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "Education",
                        leaf: false,                    
                        expanded: false,
                        children: [{
                            text: "Lycée",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "Offre de formations",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }, {
                            text: "...",
                            leaf: false,                    
                            expanded: true,
                            children: []
                        }]
                    }, {
                        text: "...",
                        leaf: false,                    
                        expanded: true,
                        children: []
                    }]
                }]
            }
        });

var clickListenerNode = function (node,event){
    // The node argument represents the node that
    // was clicked on within your TreePanel  
    var id = event.id;
    var name = event.name; 
    // On test d'où vient le click
    if (name == 'descriptif' || name == 'geosource') {
        // Appel la fonction qui ouvre le popup
        plusInfos(event.name, event.id);
    }
};

        // create the tree with the configuration from above
        treePanel = Ext.create('GeoExt.tree.Panel', {
            border: true,
            id: 'treePanel',
            //region: "west",
            title: "Couches de données",
            listeners: {
                click: {
                    element: 'el', 
                    fn:clickListenerNode
                }
            },
            //width: 250,
            //split: true,
            //collapsible: true,
            autoScroll: true,
            store: treeStore,
            rootVisible: false,
            lines: true
        });


        //var fieldset_territoire_admin = {
            //xtype: 'fieldset',
            //title: 'Territoires administratifs',
            //collapsible: true,
            //collapsed: false,
            //style: {
                //padding: '5px 0 0 5px'
            //},
            //width: 305,
            //autoHeigth: true,
            //items: [
                //fieldset_arrondissement,
                //fieldset_canton,
                //fieldset_commune
            //]
        //};
            
       //var formPanel = Ext.create('GeoExt.form.Panel', {
           //title: 'Zonages',
           //id: 'west',
           //region: 'west',
           //collapsible: true,
           //animCollapse: true,
           //split: true,
            //width: 325,
            //minWidth: 175,
            //maxWidth: 400,
           //autoScroll: true,
           //bodyStyle: 'padding: 10px 10px 0;',
           //items: [
               //fieldset_territoire_admin
           //]
       //});
       
       var accordion = new Ext.Panel({
           border: true,
            region:'west',
            //margins:'0 0 5 2',
            //margin:'0 0 0 0',
            //style: 'border-color: #1c3d70;',
            //bodyStyle:'border-color: #99BBE8;',
            bodyStyle: ' background: none repeat scroll 0% 0% #157FCC; padding: 3 0 0 0; ',
            //bodyStyle: 'padding: 3 0 0 0;',
            width: 300,
            layout:'accordion',
            items: [treePanel, legendPanel]
        });
                
        // Application final
        mainPanel = Ext.create('Ext.panel.Panel', {
        //Ext.create('Ext.panel.Panel', {
            layout: 'border',
            width: 930,
            height: 700,
            hideBorders: true,
            items: [
                mapPanel,
                accordion,
                //treePanel,
                //legendPanel,
                {
                    region: 'south',
                    id: 'footer',
                    //html: 'Pied de page -- South -- 2014',
                    //height: 20
                    height: 20,
                    contentEl: 'footer'
                }
            ]
        });
        
        
        
        // On envoi l'application, dans l'element body
        mainPanel.render("map");
        
        //item.el.parent().insertHtml('beforeEnd',
                                    //' <a href="javascript:void(0)" class="plus-infos-link">(Plus d\'infos)</a>', true);
                                    //link.on('click', function () {
                                        //plusInfos("passeport");
                                    //});
        //treePanel.on('click', function(tree, node, e){
            //console.log('clik node');
          //var t = e.getTarget();
          //if (t.className = 'somecls'){
            // do something
          //}
        //});
        
        
        //Ext.each(treePanel.el.query('a'), function(a){
            // use some way of identifying your link. It could be that ALL your links have the 'http:' in the URL.
            //if(a.href.indexOf('http:') > -1){
                //var img = Ext.get(a.parentNode).query('img.x-tree-node-icon');
        
                // check that there is an "img" found before working with it.
                //if(img.length){
                    //Ext.get(img[0]).on('click',function(){
                        //window.open(a.href, a.target)
                    //});
                //}
                //
            //}
        //})
        
        //Ext.get('myDiv').on('click', function() {plusInfos("geosource", this);}); 
      //Ext.get('bdcarto_administratif').on('click', function() {plusInfos("geosource", this);}); 
      //Ext.get('bdcarto_administratif_desc').on('click', function() {plusInfos("descriptif", this);});
      //Ext.get('bdcarto_equipement_desc').on('click', function() {plusInfos("descriptif", this);});  
      //Ext.get('bdcarto_equipement').on('click', function() {plusInfos("geosource", this);});  
      
        
        
    }

});

