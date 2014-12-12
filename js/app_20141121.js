/*
 * Copyright (c) 2008-2014 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */

Ext.require([
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'GeoExt.tree.Panel',
    'Ext.tree.plugin.TreeViewDragDrop',
    'GeoExt.panel.Map',
                        //'GeoExt.tree.LayerContainer',
                        'GeoExt.tree.LayerFolderNode',
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
        
        
                
        var serverUrl = 'http://10.0.0.208';
        
        // Déclaration de l'étendu
        var extent = new OpenLayers.Bounds(-1.52913,44.76020,1.18998,47.34050);
        
        // Déclaration des projections utilisées 
        var epsg4326 = new OpenLayers.Projection("EPSG:4326");
        var epsg900913 = new OpenLayers.Projection("EPSG:900913");
        var epsg3857 = new OpenLayers.Projection("EPSG:3857");
        
        // On transforme l'étendu dans la nouvelle projection
        extent.transform(epsg4326,epsg3857);

        //var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg900913);
        var center = new OpenLayers.LonLat(0,45).transform(epsg4326,epsg3857);
        
        //
        var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(8, 22);
        
        // Déclaration des options de la carte
        var mapOptions = {
            maxExtent: extent,
            restrictedExtent: extent,
            maxResolution: "auto",
            projection: epsg3857,
            //projection: epsg900913,
            units: "m",
            displayProjection: epsg4326,
            numZoomLevels: 10,
            minZoomLevel: 8,
            maxZoomLevel: 18,
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar(),
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.MousePosition(),
                new OpenLayers.Control.LayerSwitcher(),
                new OpenLayers.Control.ScaleLine({bottomOutUnits: ''})
            ],
            allOverlays: false
            //allOverlays: true // utile pour custom groups et node text
        };

        map = new OpenLayers.Map(mapOptions);
        
        // Fond vierge (blanc)
        //var l_fond_vierge = new OpenLayers.Layer(
            //'Fond vierge',
            //{
                //isBaseLayer: true,
                //zoomOffset: 8,
                //resolutions: resolutions
                //resolutions: [
                    //611.496226171875,
                    //305.7481130859375,
                    //152.87405654296876,
                    //76.4370282714844,
                    //38.2185141357422,
                    //19.1092570678711,
                    //9.55462853393555,
                    //4.77731426696777,
                    //2.38865713348389,
                    //1.19432856674194
                //],
                //visibility: false,
                //color: 'blue',
                //transitionEffect: 'none'
            //}
        //);
        //map.addLayer(l_fond_vierge);
        
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
        //var l_osm = new OpenLayers.Layer.OSM('OSM', null, {
            //isBaseLayer:true,
            //displayInLayerSwitcher:true,
            //zoomOffset: 8,
            //resolutions: resolutions
        //});
        var l_osm = new OpenLayers.Layer.OSM(
            'OSM',
            '',
            null,
            {
                isBaseLayer:true,
                displayInLayerSwitcher:true,
                zoomOffset:8,
                resolutions: [
                    611.496226171875,
                    305.7481130859375,
                    152.87405654296876,
                    76.4370282714844,
                    38.2185141357422,
                    19.1092570678711,
                    9.55462853393555,
                    4.77731426696777,
                    2.38865713348389,
                    1.19432856674194
                ]
            }
        );
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
    map.addLayer(l_regions_autres);
    
    var tabLayers = new Array();
    //if(typeof tabLayers =='undefined') {var tabLayers = new Array();} 
    var layers = [];
    
    
    //tabLayers[0] = new Array("l_fond_iaat","Fond carte IAAT");
    //tabLayers[1] = new Array("l_osm","OpenStreetMap");
    //tabLayers[2] = new Array("l_googlemaps","GoogleMaps");
    //tabLayers[3] = new Array("l_ign","Fond carte IGN");

    tabLayers[tabLayers.length] = new Array("construction_elevee","Construction élevée",true,1);
    tabLayers[tabLayers.length] = new Array("digue","Digue",true,1);
    tabLayers[tabLayers.length] = new Array("ligne_electrique","Ligne électrique",true,1);
    tabLayers[tabLayers.length] = new Array("enceinte_militaire","Enceinte militaire",true,0.8);
    tabLayers[tabLayers.length] = new Array("cimetiere","Cimetiere",true,1);
    tabLayers[tabLayers.length] = new Array("aerodrome","Aérodrome",true,0.8);
    tabLayers[tabLayers.length] = new Array("piste_aerodrome","Piste aérodrome",true,1);
    tabLayers[tabLayers.length] = new Array("limite_administrative","Limite administrative",true,1);
    tabLayers[tabLayers.length] = new Array("region","Région",true,1);
    //tabLayers[8] = new Array("z_zone_emploi_pc","Zonage zone emploi",true,0.8);
    //tabLayers[9] = new Array("n_zone_emploi_pc","Nom zone emploi",false,1);
    //tabLayers[10] = new Array("n_canton_pc","Nom canton",false,1);
    //tabLayers[11] = new Array("z_pays_pc","Zonage pays",false);
    //tabLayers[12] = new Array("n_pays_pc","Nom pays",false,1);
    //tabLayers[13] = new Array("z_com_agglo_pc","Zonage communauté d'agglo",true,0.8);
    //tabLayers[14] = new Array("n_com_agglo_pc","Nom communauté d'agglo",false,1);
    //tabLayers[15] = new Array("l_commune_pc","Limite commune",true,1);
    //tabLayers[16] = new Array("n_commune_pc","Nom commune",false,1);
    //tabLayers[17] = new Array("l_canton_pc","Limite canton",true,1);
    //tabLayers[18] = new Array("l_com_com_pc","Limite communauté commune",true,1);
    //tabLayers[19] = new Array("l_arrondissement_pc","Limite arrondissement",true,1);
    //tabLayers[20] = new Array("l_zone_emploi_pc","Limite zone emploi",true,1);
    //tabLayers[21] = new Array("l_pays_pc","Limite pays",true,1);
    //tabLayers[22] = new Array("l_com_agglo_pc","Limite communauté d'agglo",true,1);
    //tabLayers[23] = new Array("reseau_ferre_elec","Réseau ferré électrifé",true,1);
    //tabLayers[24] = new Array("reseau_ferre_non_elec","Réseau ferré non électrifié",true,1);
    //tabLayers[25] = new Array("gare_tgv_pc","Gare TGV",true,1);
    //tabLayers[26] = new Array("reseau_routier_princ","Réseau routier principal",true,1);
    //tabLayers[27] = new Array("reseau_routier_second","Réseau routier secondaire",true,1);
    //tabLayers[28] = new Array("ville_principale_pc","Ville principale",true,1);
    //tabLayers[29] = new Array("l_pays_pc_filter","Zonage séléctionné",true,1);
    
//console.log(tabLayers);

    for (var i = 0; i < tabLayers.length; i++) {
        l_name = tabLayers[i][0];
        name = tabLayers[i][1];
        afficheLegend = tabLayers[i][2];
        opacity = tabLayers[i][3];
//console.log('toto : --'+l_name);
        var l_name = new OpenLayers.Layer.WMS(
            name,
            serverUrl+ '/cgi-bin/wms_bdcarto_equipement?',
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
                visibility: false,
                isBaseLayer: false
            }
        );
        layers.push(l_name);
    }
    map.addLayers(layers);

    // Limites des départements du Poitou-Charentes    
    var l_departement_pc = new OpenLayers.Layer.Vector("Départements", {
        //displayInLayerSwitcher:false,
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "xml/l_departements_pc.kml",
            format: new OpenLayers.Format.KML({
                extractStyles: true,
                extractAttributes: true
            }),
            visibility: true
        })
    });
    layers.push(l_departement_pc);
    
    map.addLayers(layers);
    
    //var bdcarto_l_enceinte_militaire = new OpenLayers.Layer.WMS(
        //"Enceinte militaire",
        //serverUrl+ "/cgi-bin/wms_bdcarto_equipement?",
        //{
            //layers: [
                //'enceinte_militaire'
            //],
            //srs: 'EPSG:4326',
            //transparent: true,
            //format: "image/jpeg"
        //}, {
            //isBaseLayer: false,
            //buffer: 0,
            //visibility: false
        //}
    //);
    //map.addLayer(bdcarto_l_enceinte_militaire);    
//
    //var bdcarto_l_cimetiere = new OpenLayers.Layer.WMS(
        //"Enceinte militaire",
        //serverUrl+ "/cgi-bin/wms_bdcarto_equipement?",
        //{
            //layers: [
                //'cimetiere'
            //],
            //srs: 'EPSG:4326',
            //transparent: true,
            //format: "image/jpeg"
        //}, {
            //isBaseLayer: false,
            //buffer: 0,
            //visibility: false
        //}
    //);
    //map.addLayer(bdcarto_l_cimetiere); 

    
    // create a group layer (with several layers in the "layers" param)
    // to show how the LayerParamLoader works
    var myLayerRecord = new OpenLayers.Layer.WMS(
        "myLayerRecord",
        //"http://cartographie.iaat.org/cgi-bin/wms_terrinfos?",
        serverUrl+ "/cgi-bin/wms_bdcarto_equipement?",
        {
            //layers: [
                //"topp:tasmania_state_boundaries",
                //"topp:tasmania_water_bodies",
                //"topp:tasmania_cities",
                //"topp:tasmania_roads"
            //],
            layers: [
                'construction_elevee,digue'
            ],
            srs: 'EPSG:4326',
            //srs: 'EPSG:900913',
            transparent: true,
            format: "image/gif"
        }, {
            isBaseLayer: false,
            buffer: 0,
            // exclude this layer from layer container nodes
            //displayInLayerSwitcher: true,
            visibility: false
        }
    );
    map.addLayer(myLayerRecord);
    
    //var layerList = new OpenLayers.Layer.Group(
        //layers: [
            //new OpenLayers.Layer.WMS(
                //"mer",
                //"http://10.0.0.208/cgi-bin/wms_crpc?",
                //{
                    //layers: [
                        //'mer'
                    //],
                    //srs: 'EPSG:4326',
                    //transparent: false,
                    //format: "image/gif"
                //}, {
                    //isBaseLayer: false,
                    //buffer: 0,
                //}
            //),
            //new OpenLayers.Layer.WMS(
                //"mer",
                //"http://10.0.0.208/cgi-bin/wms_crpc?",
                //{
                    //layers: [
                        //'z_region_pc'
                    //],
                    //srs: 'EPSG:4326',
                    //transparent: false,
                    //format: "image/gif"
                //}, {
                    //isBaseLayer: false,
                    //buffer: 0,
                //}
            //),
            //new OpenLayers.Layer.WMS(
                //"mer",
                //"http://10.0.0.208/cgi-bin/wms_crpc?",
                //{
                    //layers: [
                        //'z_regions_autres'
                    //],
                    //srs: 'EPSG:4326',
                    //transparent: false,
                    //format: "image/gif"
                //}, {
                    //isBaseLayer: false,
                    //buffer: 0,
                //}
            //)
        //]
    //);
    //var layerList = new GeoExt.tree.LayerContainer({
        //text: 'Tasmania Layers',
        //layerStore: myLayerRecord,
        //leaf: false,
        //expanded: true,
        //loader: {
            //filter: function(record) {
                //return record.get("layer").name.indexOf("Tasmania") !== -1
            //},
            //baseAttrs: {
                //checkedGroup: "tasmania"
            //}
        //}
    //});
    //map.addLayer(layerList);
                
        // create a map panel with some layers that we will show in our layer tree
        // below.
        mapPanel = Ext.create('GeoExt.panel.Map', {
           region: 'center',
           id: 'carte',
           stateful: true,
           stateId: 'mappanel',
           map: map
       });
       
        // give the record of the 1st layer a legendURL, which will cause
        // UrlLegend instead of WMSLegend to be used
        //var layerRec0 = mapPanel.layers.getAt(0);
        //layerRec0.set("legendURL", "http://ows.terrestris.de/osm/service?FORMAT=image%2Fgif&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&LAYER=OSM-WMS");
        
        legendPanel = Ext.create('GeoExt.panel.Legend', {
            defaults: {
                labelCls: 'mylabel',
                style: 'padding:5px'
            },
            //bodyStyle: 'padding:5px',
            width: 250,
            autoScroll: true,
            bodyStyle: {"padding": "5px"},
            collapsible: true,
            collapsed : true,
            //collapseMode: "mini",
            split: false,
            //width: 200,
            title: "Légende",
            region: 'east'
        });


        var treeStore = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [
                    {
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Fonds de carte"
                    }, {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true
                    }
                ]
            }
        });
        // CREATE A TREESTORE FOR ALL LAYERS
        var arcticStore = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [
                    //{
                        //plugins: [{
                            //ptype: 'gx_layercontainer',
                            //loader: {store: mapPanel.map.layers} // LAYERS FROM ABOVE arcticMapPanel
                        //}],
                        //expanded: true,
                        //text: 'Layers'
                    //}
                    {
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Fonds de carte"
                    }, {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true
                    }, {
                        text: "Root",
                        group: true,            
                        children: [{
                                    text: "Buildings",
                                    leaf: false,
                                    expanded: true,
                                    children: [{
                                        text: "Buildings Layer 1",
                                        layer: "myLayerRecord",
                                        leaf: true,
                                        checked: false,
                                        children: [],
                                        nodeType: "gx_layer"
                                    }],
                                },{
                                    "text": "Cars",
                                    "layer": "myLayerRecord",
                                    "leaf": true,
                                    "checked": false,
                                    "children": [],
                                    "nodeType": "gx_layer"
                                }
                            ],
                        expanded: true
                    },
                    {
                        ptype: "gx_overlaylayercontainer",
                        "text": "Cars",
                        loader: {
                            createNode: function(attr) {
                                console.log(attr);
                                // add a WMS legend to each node created
                                attr.component = {
                                    "text": "Cars",
                                    "layer": "myLayerRecord",
                                    "leaf": true,
                                    "checked": false,
                                    "children": [],
                                    "nodeType": "gx_layer"
                                    //xtype: "gx_wmslegend",
                                    //text: "toto",
                                    //layerRecord: mapPanel.layers.getByLayer(
                                                      //attr.layer),
                                    //showTitle: false,
                                    // custom class for css positioning
                                    // see tree-legend.html
                                    //cls: "legend"
                                };
                                return GeoExt.tree.LayerLoader.prototype.createNode.call
                                          (this, attr);
                            }
                        }
                    },
                    {
                        text: "Niveau 1",
                        group: true,
                        leaf: false,
                        expanded: true,
                        children: [{
                            text: "Layer 1-1",
                            layer: "myLayerRecord",
                            leaf: true,
                            checked: false,
                            children: [],
                            nodeType: "gx_layer"
                        },{
                            text: "Layer 1-2",
                            layer: "myLayerRecord",
                            leaf: true,
                            checked: false,
                            children: [],
                            nodeType: "gx_layer"
                        }]
                    },{
                        text: "Niveau 2",
                        group: true,
                        leaf: false,
                        expanded: true,
                        children: [{
                            text: "Layer 2-1",
                            layer: "Départements",
                            leaf: true,
                            checked: false,
                            children: [],
                            nodeType: "gx_layer"
                        },{
                            text: "Layer 2-1",
                            layer: l_departement_pc,
                            leaf: true,
                            checked: false,
                            children: [],
                            nodeType: "gx_layer"
                        }]
                    //}
                            //],
                        //expanded: true
                    }
                ]
            }
        });
        var arcticStore1 = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [{
                    plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Fonds de carte"
                    }, {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true
                        
                     //nodeType: "gx_baselayercontainer",
                    //text: 'BaseLayersDir'
                //}, {
                    //plugins: ['gx_overlaylayercontainer'],
                    //expanded: true,
                    //text: 'Dir 1'
                    //,
                    //loader: {
                        //filter: function(rec){
                            //console.log(rec);
                            //var div = rec.get('division');
                            //return div.split('.')[0] == 1;
                        //}
                    //}
                }, {
                    text: "Bdcarto",
                    //plugins: ['gx_layerfolder'],
                    leaf: false,                    
                    //nodeType: "async",
                    //checked: false,
                    //onCheckChange: function(){
                        //console.log('toto');
                           //var layer_id = combo.inputValue;
                           //map.layers[layer_id].setVisibility(value);
                   //},
                    expanded: true,
                    children: [{
                       //plugins: ['gx_layer'],
                        text: 'Equipement',
                        //layer:myLayerRecord,
                        //text: tabLayers[0][1],
                        //layer: mapPanel.map.getLayersByName(tabLayers[0][0]),
                        leaf: false,
                        //checked: false,
                        //onCheckChange: function(combo, value){
                           //alert('toto');
                       //}, 
                        children: [{
                            plugins: ['gx_layer'],
                            text: 'myLayerRecord',
                            layer:myLayerRecord,
                            leaf: true,
                            checked: false,
                            children: []
                        }]
                    }, {
                        plugins: ['gx_layer'],
                        text: tabLayers[1][1],
                        layer: map.getLayersByName(tabLayers[1][0]),
                        leaf: true,
                        checked: false,
                        children: []
                    }, {
                        plugins: ['gx_layer'],
                        text: tabLayers[2][1],
                        layer: map.getLayersByName(tabLayers[2][0]),
                        leaf: true,
                        checked: false
                        //,
                        //children: []
                    }, {
                        plugins: ['gx_layer'],
                        text: tabLayers[3][1],
                        layer: map.getLayersByName(tabLayers[3][1]),
                        leaf: true,
                        checked: false,
                        children: []
                    }]
                //},{
                    //"text": "Cars",
                    //"layer": "myLayerRecord",
                    //"leaf": true,
                    //"checked": false,
                    //"children": [],
                    //"nodeType": "gx_layer"
                //},{
                    //nodeType: "async",
                    //text: "Niveau A",
                    //leaf: true,
                    //checked: false,
                    //children: [{
                        //nodeType: "gx_layer",
                        //layer: "Départements"
                    //}, {
                        //nodeType: "gx_layer",
                        //leaf: true,
                        //layer: "Départements",
                        //checked: false,
                        //text: "Régions"
                    //}]
                //}, {
                    //nodeType: "async",
                    //text: "Niveau B",
                    //children: [{
                        //nodeType: "gx_layer",
                        //leaf: true,
                        //checked: false,
                        //layer: "Départements",
                        //text: "Départements"
                    //}, {
                        //nodeType: "gx_layer",
                        //leaf: true,
                        //checked: false,
                        //layer: "Régions",
                        //text: "Régions"
                    //}]
                }]
            }
        });
        
        var layer;

        // CREATE A TREEPANEL FOR arcticStore
        var arcticTree = Ext.create('GeoExt.tree.Panel', {
            //border: true,
            region: 'west',
            title: 'Map Layer Selection',
            width: 250,
            collapsible: true,
            autoScroll: true,
            store: arcticStore1,
            //store: treeStore,
            //rootVisible: true,
            rootVisible: false,
            lines: true,
        });
        
        //arcticTree.getRootNode().appendChild({
            //expanded: true,
            //layer: myLayerRecord,
            //leaf: false,
            //expanded: true,
            //loader: {
                //param: "LAYERS"
            //}
        //});
            
                //arcticTree.getRootNode().appendChild({
                    //text: "Test",
                    //group: true,
                    //children: [
                            //{
                                //text: "Group 1",                        
                                //leaf: false,
                                //nodeType: "gx_layer",
                                //checked: false,
                                //children: [
                                //{
                                    //text: "Points",
                                    //layer: l_departement_pc,
                                    //name: "Lehavim:Electricity_Points",
                                    //leaf: true,
                                    //checked: false,                                
                                    //nodeType: "gx_layer"
                                //}]
                            //},{
                                //text: "Layer 2",
                                //layer: "Départements",
                                //name: "Lehavim:Electricity_Points",
                                //leaf: true,
                                //checked: false,
                                //children: [],
                                //nodeType: "gx_layer"
                            //}
                        //],
                    //expanded: true
                //});

        // create the tree with the configuration from above
        treePanel = Ext.create('GeoExt.tree.Panel', {
            border: true,
            region: "west",
            title: "Layers",
            width: 250,
            split: true,
            collapsible: true,
            autoScroll: true,
            store: treeStore,
            rootVisible: false,
            lines: false
        });


        var fieldset_territoire_admin = {
            xtype: 'fieldset',
            title: 'Territoires administratifs',
            collapsible: true,
            collapsed: false,
            style: {
                padding: '5px 0 0 5px'
            },
            width: 305,
            autoHeigth: true,
            items: [
                //fieldset_arrondissement,
                //fieldset_canton,
                //fieldset_commune
            ]
        };
            
       var formPanel = Ext.create('GeoExt.form.Panel', {
           title: 'Zonages',
           id: 'west',
           region: 'west',
           collapsible: true,
           animCollapse: true,
           split: true,
            width: 325,
            minWidth: 175,
            maxWidth: 400,
           autoScroll: true,
           bodyStyle: 'padding: 10px 10px 0;',
           items: [
               fieldset_territoire_admin
           ]
       });
                
    
        
        // Application final
        mainPanel = Ext.create('Ext.panel.Panel', {
        //Ext.create('Ext.panel.Panel', {
            layout: 'border',
            width: 850,
            height: 700,
            hideBorders: true,
            items: [
                mapPanel,
                //formPanel,
                //treePanel,
                arcticTree,
                legendPanel
                ,
                //{
                    //contentEl: "desc",
                    //region: "east",
                    //bodyStyle: {"padding": "5px"},
                    //collapsible: true,
                    //collapseMode: "mini",
                    //split: true,
                    //width: 200,
                    //title: "Description"
                //}
                {
                    //xtype: 'footerbar',
                    region: 'south',
                    //margins: '5 5 5 5',
                    html: 'Pied de page -- South -- 2014',
                    height: 20
                    //,
                    //maxSize: 0,
                    //collapsed: true,
                    //hideCollapseTool: true
                }
            ]
        });
        
        // On envoi l'application, dans l'element body
        mainPanel.render("map");
    }
});
