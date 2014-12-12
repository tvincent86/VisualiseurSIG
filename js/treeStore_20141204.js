var treeStore = Ext.create('Ext.data.TreeStore', {
    model: 'GeoExt.data.LayerTreeModel',
    root: {
        expanded: true,
        children: [{
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
