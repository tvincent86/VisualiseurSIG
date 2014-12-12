/*
 * Copyright (c) 2008-2014 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */
 
/*
 * File name : app.js
 * Version 0.3
 * Date (mm/dd/yyyy) : 12/04/2014
 * Author : Tony VINCENT
 */

/**** Declaration des variables globales ****/
var mapPanel, tree;
//, tabLayers, serverUrl
var map, popup, filterPanelItem2; 
var permalink;

Ext.BLANK_IMAGE_URL = "http://extjs.cachefly.net/ext-3.4.0/resources/images/default/s.gif";

Ext.QuickTips.init();

Ext.require([
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'Ext.form.ComboBox',
    'GeoExt.Action',
    'GeoExt.tree.Panel',
    'Ext.tree.plugin.TreeViewDragDrop',
    'GeoExt.panel.Map',
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.data.LayerTreeModel',
    'GeoExt.tree.View',
    'GeoExt.tree.Column',
    'GeoExt.container.WmsLegend',
    'GeoExt.container.UrlLegend',
    'GeoExt.container.VectorLegend',
    'GeoExt.panel.Legend',
    'GeoExt.state.PermalinkProvider',
    'GeoExt.data.ScaleStore'
]);

Ext.application({
    name: 'plateformeSIG',
    launch: function() {
        
        OpenLayers.ImgPath = 'http://js.mapbox.com/theme/dark/'; 
        
        //
        var items = [];
        var toolbarItems = [],
        toolbarItems_bottom = [],
        action, actions = {};    


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
   //map.addControl(infoControl);
   //infoControl.activate();        
        
    //
    permalinkProvider = Ext.create('GeoExt.state.PermalinkProvider', {
        encodeType: false
    });
    Ext.state.Manager.setProvider(permalinkProvider);
        
        
    // Fonction pour créer le Popup
    function plusInfos(origine, data) {
        //console.log('-------------');
        //console.log(origine);
        //console.log(data);
        //console.log('-------------');
        //var link = serverUrlGeosource + '?uuid=IGNF_BDCARTOr_3-1_HABILLAGE.xml'
        //var link = serverUrlGeosource + data.dom.name;

        
        var win;
        var link = data;
        var link1 = data.split("_");
            link1 = link1[2].toUpperCase();
//console.log(link1);

        
        win = Ext.create('Ext.window.Window', {
            title: 'Descriptif de la donnée',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            maximizable: false,
            resizable: false,
            //unpinnable: false,
            //anchored: false,
            //modal: true,
            draggable: false,
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
                xtype: 'tabpanel',
                items: [{
                    title: 'Description',
                    html: '<iframe width="690" height="570" src="./metadata/'+link+'.pdf"></iframe>'
                }, {
                    title: 'Inspire',
                    html: '<iframe width="695" height="645" src="'+serverUrlGeosource+'?uuid=IGNF_BDCARTOr_3-1_'+link1+'.xml"></iframe>'
                }]
            }]
        });

        
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
              
    } // End plusInfos  
  
    // Barre d'outils : Menu fonds carte
    var menuBaseLayer = Ext.create('Ext.menu.Menu', {
        width: 250,
        items: [{
            text:'<img src="./icons/img_l_gmap.png" alt=""/> Google Plan',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_gmap);
            },
            group:'rp-group',
            scope:this
        },{
            text:'<img src="./icons/img_l_ghyb.png" alt=""/> Google Satellite',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_ghyb);
            },
            group:'rp-group',
            scope:this
        },{
            text:'<img src="./icons/img_l_osm.png" alt=""/> OpenStreetMap',
            xtype: 'menucheckitem',
            handler: function() {
                map.setBaseLayer(l_osm);
            },
            group:'rp-group',
            scope:this
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
    toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
     //action = Ext.create('GeoExt.Action', {
        //control: new OpenLayers.Control.ZoomToMaxExtent(),
        handler: function () {
            //map.zoomTo(8);
            map.setCenter(center,2);
        },
        map: map,
        iconCls: "zoomfull",
        tooltip: "Retour à la carte initiale"
    })));
    //actions["max_extent"] = action;
    //toolbarItems.push(Ext.create('Ext.button.Button', action));
    
    toolbarItems.push("-");
   
    toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
        text: 'Fonds de carte',
        tooltip: 'Fonds de carte',
        menu: menuBaseLayer
    }))); 

    // Ajout de la barre de séparation
    toolbarItems.push('-');
    
    // Barre d'outils : Afficher infos WMS    
    toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
        iconCls: 'service-wms',
        tooltip :'Information WMS',
        text: 'WMS',
        handler: function() {
            var txt_wms = 'Utilisation des services WMS';
            txt_wms += '<hr>';
            txt_wms += 'Comment accéder aux données via les services WMS?';
            txt_wms += '<br>';
            txt_wms += '<br>';
            txt_wms += 'Adresse du serveur WMS<br>';
            txt_wms += 'http://10.0.0.208/cgi-bin/wms_bdcarto_equipement?';
            
            
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
                        html: txt_wms
                        //contentEl: 'infosWMS'
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
        iconCls: "print",
        tooltip :'Imprimer la carte',
        handler: function(){
            window.print();
            return false;
        }
    })));
    
    // Selection du niveau d'echelle
    var scaleStore = Ext.create("GeoExt.data.ScaleStore", {map: map});
    
    var zoomSelector = Ext.create("Ext.form.ComboBox", {
        store: scaleStore,
        id: 'zoomSelector',
        //bodyStyle: 'marging: -20px;',
        fieldLabel: "Echelle ",
        emptyText: "Niveau zoom",
        listConfig: {
            getInnerTpl: function() {
                //console.log({scale:round(0)});
                return "1: {scale:round(0)}";
            }
        },
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        queryMode: 'local' // keep the combo box from forcing a lot of unneeded data refreshes
    });

    zoomSelector.on('select', 
        function(combo, record, index) {
            //console.log(record[0].get("level"));
            map.zoomTo(record[0].get("level"));
        },
        this
    );
    


        map.events.register('zoomend', this, function() {
            // On appel la fonction 
            //zoomChangeImg();
            
            //
            var scale = scaleStore.queryBy(function(record){
                return this.map.getZoom() == record.data.level;
            });

            if (scale.length > 0) {
                scale = scale.items[0];
                zoomSelector.setValue("1 : " + parseInt(scale.data.scale));
            } else {
                if (!zoomSelector.rendered) return;
                zoomSelector.clearValue();
            }
        });

        // create a map panel with some layers that we will show in our layer tree
        // below.
        mapPanel = Ext.create('GeoExt.panel.Map', {
           region: 'center',
           id: 'map',
           border: true,
           stateful: true,
           stateId: 'mappanel',
           map: map,
           prettyStateKeys: true, // for pretty permalinks
           dockedItems: [{
               xtype: 'toolbar',
               id: 'toolbar-top',
               height: 36,
               dock: 'top',
               items: toolbarItems
            //}, {
               //xtype: 'toolbar',
               //id: 'toolbar-bottom',
               //height: 36,
               //dock: 'bottom',
               //items: toolbarItems
            }]
            //,
            //bbar: [
            //{ 
                //xtype: 'textfiled',
                //id: 'attribution1'
                //text: mousePositionItem.getText()
                //text: "<div id='attribution1'></div>"
            //}
            //]
            bbar: {
                id: 'toolbar-bottom',
                bodyStyle:'background-color: #ececec;',
                items : [
                    zoomSelector,
                    {
                        text: 'permalien',
                        id: 'permalien',
                        iconCls: 'permalink',
                        tooltip :'Permalien'
                        ,
                        handler: function() {
                            win_permalink = Ext.create('Ext.window.Window', {
                                title: 'Permalien',
                                header: {
                                    titlePosition: 2,
                                    titleAlign: 'center'
                                },
                                maximizable: false,
                                resizable: false,
                                style: 'padding:1px;',
                                autoscroll: true,
                                bodyStyle: 'position: absolute; z-index: 999999;',
                                width: 600,
                                height: 320,
                                layout: {
                                    type: 'border',
                                    padding: 0
                                },
                                items: [{
                                    region: 'center',
                                    items: [{
                                        rtl: true,
                                        html: "<a href=" + permalink + ">" + permalink + "</a>"
                                    }]
                                }]
                            });
                    
                            if (win_permalink.isVisible()) {
                                win_permalink.hide(this, function() {
                                });
                            } else {
                                win_permalink.show(this, function() {
                                });
                            }
                        }
                    }
                ]
            }
       }); 
       
       // update link when state chnages
        var onStatechange = function(provider) {
            permalink = provider.getLink();
            //Ext.get("permalink").update("<a href=" + permalink + ">" + permalink + "</a>");
            //alert(l);
            return permalink;
        };
        permalinkProvider.on({
            statechange: onStatechange
        });
        //permalinkProvider.on({
            //statechanged: function(provider, name, value) {
                //alert(provider.getLink());
            //}
        //});


       
        // give the record of the 1st layer a legendURL, which will cause
        // UrlLegend instead of WMSLegend to be used
        //var layerRec0 = mapPanel.layers.getAt(0);
        //layerRec0.set("legendURL", "http://ows.terrestris.de/osm/service?FORMAT=image%2Fgif&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&LAYER=OSM-WMS");
        
        legendPanel = Ext.create('GeoExt.panel.Legend', {
            defaults: {
                style: 'padding:5px'
            },
            autoScroll: true,
            border: true,
            title: "Légende"
        });

        // Fonction qui permet de changer une image au changement du niveau de zoom
        var zoomChangeImg = function (){
            //
            //console.log(map.getZoom());
            
            // On récupére le niveau de zoom
            var niveau_zoom = map.getZoom();
            // On récupére l'élément image
            var img_bdcarto_digue = Ext.get('l_'+findIndex("bdcarto:equipement:digue",tabLayers));
        
            //console.log(img_bdcarto_digue);
            
            //
            if (img_bdcarto_digue) {
                
                var nodes_digue = img_bdcarto_digue.dom;
                var src_img_digue = nodes_digue.attributes[0];
                console.log(src_img_digue);
                
                //if (niveau_zoom > 3 && src_img_digue.value == "./icons/nap.png") {
                if (niveau_zoom > 3) {
                    //console.log('//////');
                    nodes_digue.attributes[0].value = "./icons/nap_blank.png";
                }else{
                    //console.log('/---------------------/');
                    //if (niveau_zoom < 3) {
                        nodes_digue.attributes[0].value = "./icons/nap.png";
                    //}
                }
            }
        }

        //
        var clickListenerNode = function (node,event){
            // Appel de la fonction qui change les images
            zoomChangeImg();
            
            // The node argument represents the node that
            // was clicked on within your TreePanel  
            var id = event.id;
            var name = event.name; 

            // Appel la fonction qui ouvre le popup
            plusInfos(event.name, event.id);

        };

        // create the tree with the configuration from above
        var treeStore = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            proxy: new Ext.data.HttpProxy({
                url: './js/treeStore.js',
                reader: {
                    type: 'json',
                    root: 'children',
                    idProperty: 'Id'
                }
            }),
            folderSort: true
        });
    
        treePanel = Ext.create('GeoExt.tree.Panel', {
            border: true,
            id: 'treePanel',
            title: "Couches de données",
            listeners: {
                click: {
                    element: 'el', 
                    fn:clickListenerNode
                }
            },
            autoScroll: true,
            store: treeStore,
            rootVisible: false,
            lines: true
        });

        //
        var accordion = new Ext.Panel({
           border: true,
            region:'west',
            bodyStyle: ' background: none repeat scroll 0% 0% #157FCC; padding: 3 0 0 0; ',
            width: 330,
            layout:'accordion',
            items: [treePanel, legendPanel]
        });
             
             
//var txt_footer = '<div>';
var txt_footer = '  <div class="version">Version 0.30</div>';
txt_footer += '  <div class="xiti">';
txt_footer += '  </div>';
txt_footer += '  <div class="w3c">';
//txt_footer += '      <p>';
txt_footer += '          <a href="http://validator.w3.org/check?uri=referer"><img src="./img/valid-xhtml10.png" alt="Valid XHTML 1.0 Transitional" /></a>';
//txt_footer += '      </p>';
txt_footer += '  </div>';
txt_footer += '  <div class="copyright-txt"><a href="http://www.iaat.org">Région Poitou-Charentes 2014</a> - </div>';
txt_footer += '  <div class="copyright"><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.fr"><img alt="Licence Creative Commons" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" /></a></div>';
//txt_footer += '</div>';

        // Application final
        //mainPanel = Ext.create('Ext.panel.Panel', {
            //layout: 'border',
            //width: 930,
            //height: 700,
            //hideBorders: true,
            //items: [
                //mapPanel,
                //accordion,
                //{
                    //region: 'south',
                    //id: 'footer',
                    //height: 20,
                    //contentEl: 'footer'
                //}
            //]
        //});
        Ext.create('Ext.container.Viewport', {
            //layout: 'fit',
            //items: [
                //mappanel
            //]
            layout: 'border',
            //width: 930,
            //height: 700,
            //hideBorders: true,
            items: [{
                region: 'north',
                id: 'headter',
                height: 50,
                //style: 'border-color: #1c3d70;',
                bodyStyle:'background-color: #157FCC;',
                html: 'Visualiseur cartographique'
                //contentEl: 'footer'
            },
            mapPanel,
            accordion,
            //treePanel,
            //legendPanel,
            {
                region: 'south',
                id: 'footer',
                height: 30,
                bodyStyle:'background-color: #157FCC;',
                html: txt_footer
                //contentEl: 'footer'
            }]
        });
        
        
        // On envoi l'application, dans l'element body
        //mainPanel.render("map");
        
        //
        map.setCenter(center,2);
        

        
    }

});

