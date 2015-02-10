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
    'GeoExt.data.ScaleStoreCRPC'
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
    //permalinkProvider = Ext.create('GeoExt.state.PermalinkProvider', {
        //encodeType: false
    //});
    //Ext.state.Manager.setProvider(permalinkProvider);
        
    // Fonction pour créer le Popup
    function plusInfos(origine, data) {
        
        var win;
        var link = data;
        var link1 = data.split("_");
            link1 = link1[2].toUpperCase();
        
        win = Ext.create('Ext.window.Window',{
			title: 'Descriptif de la donnée',
            //baseCls: 'x-panel',
            //cls: 'winPopup',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            modal: true,
            //plain:true,
            //maskOnDisable : true,
            constrain: true,
            maximizable: false,
            resizable: false,
            draggable: false,
            //style: 'padding:5px;',
            //bodyStyle: 'position: absolute; z-index: 999999;',
            width: 720,
            height: 670,
            layout: {
                type: 'border'
                //,
                //padding: 0
            },
            items: [{
                region: 'center',
                xtype: 'tabpanel',
                items: [{
                    title: 'Description',
                    html: '<iframe width="711" height="595" src="./metadata/'+link+'.pdf"></iframe>'
                }, {
                    title: 'Inspire',
                    html: '<iframe width="711" height="595" src="'+serverUrlGeosource+'?uuid=IGNF_BDCARTOr_3-1_'+link1+'.xml"></iframe>'
                }]
            }]
        });

        
        //button.dom.disabled = true;
        if (win.isVisible()) {
            win.hide(this, function() {
                button.dom.disabled = false;
            });
        } else {
            win.show(this, function() {
                button.dom.disabled = false;
            });
        }
              
    } // End plusInfos  
  
    // Barre d'outils : Menu fonds carte
    var menuBaseLayer = Ext.create('Ext.menu.Menu', {
        width: 250,
        items: [{
	    text:'<img src="./icons/img_l_osm.png" alt=""/> OpenStreetMap',
            xtype: 'menucheckitem',
	    checked:true,
            handler: function() {
                map.setBaseLayer(l_osm);
            },
            group:'rp-group',
            scope:this
        },{
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
            text:'<img src="./icons/img_l_blank.png" alt=""/> Fond blanc',
	    xtype: 'menucheckitem',
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
        tooltip: "Recentrer la carte"
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
        iconCls: 'serviceWms',
        tooltip :'Information WMS',
        text: 'WMS',
        handler: function() {            
			//
            win_wms = Ext.create('Ext.window.Window', {
                title: 'Information WMS',
                baseCls: 'x-panel',
                cls: 'winPopup',
                header: {
                    titlePosition: 2,
                    titleAlign: 'center'
                },
                modal: true,
                maximizable: false,
                resizable: false,
                draggable: false,
                width: 720,
                height: 770,
		autoScroll: true,
                layout: {
                    type: 'border',
                    padding: 4
                },
                items: [{
                    region: 'center',
                    items: [{
                        // LTR even when example is RTL so that the code can be read
                        rtl: true,
                        tag: 'div',
                        id: 'informationWms',
                        //cls: 'win-popup',
                        contentEl: 'ficheInfoWms'
                    }]
                }]
            });
    
             //On affiche/cache la fenetre
            if (win_wms.isVisible()) {
                win_wms.hide(this, function() {
                    button.dom.disabled = false;
                });
            } else {
                win_wms.show(this, function() {
                    button.dom.disabled = false;
                });
            }
        }
    })));     
    
    // Ajout de la barre de séparation
    //toolbarItems.push('-');
    
    //action = Ext.create('GeoExt.Action', {
		//text: "draw poly",
		//control: new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Polygon),
		//map: map,
		// button options
		//toggleGroup: "draw",
		//allowDepress: false,
		//tooltip: "draw polygon",
		// check item options
		//group: "draw"
	//});
	//actions["draw_poly"] = action;
	//toolbarItems.push(Ext.create('Ext.button.Button', action));
	
	//action = Ext.create('GeoExt.Action', {
		//text: "draw line",
		//control: new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Path),
		//map: map,
		// button options
		//toggleGroup: "draw",
		//allowDepress: false,
		//tooltip: "draw line",
		// check item options
		//group: "draw"
	//});
	//actions["draw_line"] = action;
	//toolbarItems.push(Ext.create('Ext.button.Button', action));
	//toolbarItems.push("-");
	
	// SelectFeature control, a "toggle" control
	//action = Ext.create('GeoExt.Action', {
		//text: "select",
		//control: new OpenLayers.Control.SelectFeature(vector, {
			//type: OpenLayers.Control.TYPE_TOGGLE,
			//hover: true
		//}),
		//map: map,
		// button options
		//enableToggle: true,
		//tooltip: "select feature",
		// check item options
		//group: "draw"
	//});
	//actions["select"] = action;
	//toolbarItems.push(Ext.create('Ext.button.Button', action));
	//toolbarItems.push("-");
    
    // Reuse the GeoExt.Action objects created above
	// as menu items
	//toolbarItems.push({
		//text: "Outils",
		//menu: Ext.create('Ext.menu.Menu', {
			//items: [
				// Draw poly
				//Ext.create('Ext.menu.CheckItem', actions["draw_poly"]),
				// Draw line
				//Ext.create('Ext.menu.CheckItem', actions["draw_line"]),
				// Select control
				//Ext.create('Ext.menu.CheckItem', actions["select"])
			//]
		//})
	//});
           
    // On position les éléments de la barre à droite
    toolbarItems.push('->');
    
    //toolbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
		//id: 'permalien',
		//iconCls: 'permalink',
		//tooltip :'Permalien'
		//,
		//handler: function() {           
			//document.location.href = permalink;
			//var message ='Cliquez sur le lien avec le bouton droit de la souris et choisissez, <b>"copier l\'adresse du lien"</b>.' +
						//'<br/><br/><br/>' +
						//'<a href=' + permalink + '>Lien permanent</a>';
		//}
    //})));
        
    // Ajout de la barre de séparation
    //toolbarItems.push('-');
    
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
    var scaleStore = Ext.create("GeoExt.data.ScaleStoreCRPC", {map: map});
    
    var zoomSelector = Ext.create("Ext.form.ComboBox", {
        store: scaleStore,
        cls: 'toolbarBottomColor toolbarBottomSpacing',
        fieldLabel: "Echelle ",
        width: 230,
        labelWidth: 55,
	    queryMode: 'local',
	    value: 'régionale',
        tpl: Ext.create('Ext.XTemplate',
	        '<tpl for=".">',
	            '<div data-qtip="≈ 1:{scaleNum} " class="x-boundlist-item">{scaleName}</div>',
	        '</tpl>'
	    ),
        editable: false,
        triggerAction: 'all', 
        queryMode: 'local'
    });

    zoomSelector.on('select', 
        function(combo, record, index) {
            map.zoomTo(record[0].get("level"));
        },
        this
    );
    
		//
        map.events.register('zoomend', this, function() {
            // On appel la fonction 
            //zoomChangeImg();
            
            //
            var scale = scaleStore.queryBy(function(record){
                return this.map.getZoom() == record.data.level;
            });

            if (scale.length > 0) {
                scale = scale.items[0];
                //zoomSelector.setValue("1 : " + parseInt(scale.data.scale));
                zoomSelector.setValue(scale.data.scaleName);
            } else {
                if (!zoomSelector.rendered) return;
                zoomSelector.clearValue();
            }
        });      
        
        // Donnees pour la liste des projections 
        var storeCombo = Ext.create('Ext.data.Store', {
		    fields : ['srsCode', 'projName', 'projTitle'],
	        data : [
				{"srsCode": "EPSG:4326", "projName": "epsg4326", "projTitle": "WGS 84"},
				{"srsCode": "EPSG:3857", "projName": "epsg3857", "projTitle": "EPSG 3857"},
				{"srsCode": "EPSG:2154", "projName": "epsg2154", "projTitle": "RGF93/Lambert 93"}
	        ]
		});
        
        displayProjectionCombo = new Ext.form.ComboBox({
			name: 'displayProjectionCombo',
		    cls: 'toolbarBottomColor toolbarBottomSpacing',
		    //fieldLabel: 'Coordonnées en ',
		    fieldLabel: 'Projection en ',
		    labelWidth: 105,
		    width: 270,
		    editable: false,
		    forceSelection: true,
		    valueField: 'projName',
		    displayField: 'projTitle',
		    value: 'epsg4326',
		    store: storeCombo,
			// Template for the dropdown menu.
		    // Note the use of "x-boundlist-item" class,
		    // this is required to make the items selectable.
			tpl: Ext.create('Ext.XTemplate',
		        '<tpl for=".">',
		            '<div data-qtip="{projTitle} - {srsCode}" class="x-boundlist-item">{projTitle}</div>',
		        '</tpl>'
		    ),
		    // template for the content inside text field
		    displayTpl: Ext.create('Ext.XTemplate',
		        '<tpl for=".">',
		            '{projTitle}',
		        '</tpl>'
		    ),
		    listeners: {
		        'select': function(comp, record, index) {
		            map.displayProjection = new OpenLayers.Projection(record[0].data.srsCode);
		            
		            for (var i = 0; i < map.controls.length; i++) {
						var control = map.controls[i];
						if (control.displayProjection) {
							control.displayProjection = map.displayProjection;
						}
					}		           
		        }
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
			   id: 'toolbar-top',
               xtype: 'toolbar',
               //height: 36,
               dock: 'top',
               items: toolbarItems
            }, {
               id: 'toolbar-bottom',
               //bodyStyle:'background-color: #DFEAF2;',
               dock: 'bottom',
               //height: 35,
               items: [
	               zoomSelector,
	               displayProjectionCombo
               ]
            }]
       }); 
       
       // update link when state chnages
        //var onStatechange = function(provider) {
            //permalink = provider.getLink();
            //return permalink;
        //};
        //permalinkProvider.on({
            //statechange: onStatechange
        //});



       
        // give the record of the 1st layer a legendURL, which will cause
        // UrlLegend instead of WMSLegend to be used
        //var layerRec0 = mapPanel.layers.getAt(0);
        //layerRec0.set("legendURL", "http://ows.terrestris.de/osm/service?FORMAT=image%2Fgif&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&LAYER=OSM-WMS");
        
        legendPanel = Ext.create('GeoExt.panel.Legend', {
			id: 'legendPanel',
            //defaults: {
                //style: 'padding:5px'
            //},
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
                //console.log(src_img_digue);
                
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

            // Test si le click provient de l'image description
			if(event.id !== ""){
	            // The node argument represents the node that
	            // was clicked on within your TreePanel  
	            var id = event.id;
	            var name = event.name; 

	            // Appel la fonction qui ouvre le popup
	            plusInfos(name, id);
			}
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
			id: 'treePanel',
            border: true,
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
	    id: 'accordion',
	    //title: 'Données',
            border: false,
            region: 'west',
	    //hideBorders: true,
	    //collapsible: true,
	    //collapseMode: 'mini',
	    //hideCollapseTool: false,
	    //HideCollapseTool:'true',
	    split: true,
	    useSplitTips: true,
	    splitTip            : 'Cliquer et glisser pour redimensionner le panneau.',
	    //collapsibleSplitTip:  'Cliquer et glisser pour redimensionner le panneau.',
	    //splitterResize: false,
	    minWidth: 330,
	    maxWidth: 550,
            //cls: 'accordion',
            //bodyStyle: ' background: none repeat scroll 0% 0% #5592A8; ',
            width: 330,
            layout:'accordion',
            items: [treePanel, legendPanel]
        });
             
             


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
        mainPanel = Ext.create('Ext.container.Viewport', {
            layout: 'border',
            //width: 930,
            //height: 700,
            //hideBorders: true,
            //renderTo: map,
            items: [
            //{
                //region: 'north',
                //id: 'header'
            //},
            mapPanel,
            accordion,
            //treePanel,
            //legendPanel,
            {
                region: 'south',
                id: 'footer'
                //,
                //height: 30,
                //bodyStyle:'background-color: #157FCC;'
            }]
        });
        
        
        // On envoi l'application, dans l'element body
        //mainPanel.render("map1");
        
        //
        map.setCenter(center,2);
        
	    // Permet de charge les composents HTML dans l'application
	    
	    // Header
	    //var contentElHeader = Ext.create('Ext.Component', {
	        //contentEl: 'mainHeader',
	        //renderTo: Ext.getBody()
	    //});
	    //mainPanel.getComponent('header').add(contentElHeader);
	    // Footer
	    var contentElFooter = Ext.create('Ext.Component', {
	        contentEl: 'mainFooter',
	        renderTo: Ext.getBody()
	    });
	    mainPanel.getComponent('footer').add(contentElFooter);
		

	    var row = Ext.select('#toolbar-bottom-innerCt').first();
	    row.createChild('<table class="x-field TabMousePosition toolbarBottomColor x-table-plain x-form-item x-form-type-text x-field-default x-autocontainer-form-item"><tr><td><div id="MousePosition">&nbsp;</div><td></tr></table>');
		
	    //Add the MousePosition control to show coordinates
	    map.addControl(new OpenLayers.Control.MousePosition({
			div: document.getElementById("MousePosition") ,
			prefix: "XY : ", 
            numdigits: 5,
            formatOutput: function(lonLat) {
               var markup = 'X = '+lonLat.lat.toFixed(parseInt(this.numdigits));
               markup += ', ';
               markup += 'Y = '+lonLat.lon.toFixed(parseInt(this.numdigits));
               return markup
            }
		}));
		    
    
    }

});
