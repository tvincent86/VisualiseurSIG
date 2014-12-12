[{
    text: "Oragnisation 1",
    leaf: false,                    
    expanded: true,
    children: [{
        text: 'Limite administrative (6) <img id="bd_carto_administratif" name="descriptif" src="./icons/img_info.png" />',
        leaf: false,                    
        expanded: false,
        //checked: false,
        //handler : function() {
            //alert('toto');
        //},
        children: [{
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto + '<br/> Visible au 1/1000',
            checked: false,
            children: []
        }, {
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
        }, {
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
        }, {
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
        }, {
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:canton",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
        }, {
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:commune",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
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
        text: "Donnée régionale (19)",
        leaf: false,                    
        expanded: false,
        children: [{
            text: "Bd Carto (IGN) (19)",
            leaf: false,                    
            expanded: false,
            children: [{
                text: 'Administratif (6) <img id="bd_carto_administratif" name="administratif" src="./icons/img_info.png" />',
                leaf: false,                    
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:limite_administrative",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:canton",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:administratif:commune",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }]
            }, {
                text: 'Equipement  (7) <img id="bd_carto_equipement" name="equipement" src="./icons/img_info.png" /> ',
                leaf: false,
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:construction_elevee",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:construction_elevee",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    //text: tabLayers[findIndex("bdcarto:equipement:digue",tabLayers)][1] + '<img id="l_'+findIndex("bdcarto:equipement:digue",tabLayers)+'" src="./icons/nap_blank.png" />',
                    text: tabLayers[findIndex("bdcarto:equipement:digue",tabLayers)][1] + '<img id="l_'+findIndex("bdcarto:equipement:digue",tabLayers)+'" src="./icons/nap_blank.png" />',
                    layer: map.layers[findIndex("bdcarto:equipement:digue",tabLayers)],
                    
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:ligne_electrique",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:ligne_electrique",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:piste_aerodrome",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:piste_aerodrome",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:aerodrome",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:aerodrome",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:cimetiere",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:cimetiere",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }]
            }, {
                text: 'Routier (5) <img id="bd_carto_reseau_routier" name="reseau_routier" src="./icons/img_info.png" />',
                leaf: false,
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:routier:troncon_route",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:routier:troncon_route",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:routier:liaison_maritime",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:routier:liaison_maritime",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:routier:equipement_routier",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:routier:equipement_routier",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:routier:communication_restreinte",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:routier:communication_restreinte",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:routier:noeud_routier",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:routier:noeud_routier",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }]
            }, {
                text: 'Hydrographie (5) <img id="bd_carto_hydrographie" name="hydrographie" src="./icons/img_info.png" />',
                leaf: false,
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:hydrographie:surface_hydrographique",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:hydrographie:surface_hydrographique",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:hydrographie:zone_hydrographique",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:hydrographie:zone_hydrographique",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:hydrographie:troncon_hydrographique",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:hydrographie:troncon_hydrographique",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:hydrographie:laisse",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:hydrographie:laisse",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:hydrographie:ponctuel_hydrographique",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:hydrographie:ponctuel_hydrographique",tabLayers)],
                    leaf: true,
                    qtip: source_ign_bdcarto,
                    checked: false,
                    children: []
                }]
            }, {
                text: 'Réseau ferré (2) <img id="bd_carto_reseau_ferre" name="reseau_ferre" src="./icons/img_info.png" />',
                leaf: false,
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:reseau_ferre:troncon_de_voie_ferre",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:reseau_ferre:troncon_de_voie_ferre",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:reseau_ferre:noeud_ferre",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:reseau_ferre:noeud_ferre",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }]
                        }, {
                text: 'Toponyme (5) <img id="bd_carto_toponyme" name="descriptif" src="./icons/img_info.png" />',
                leaf: false,
                expanded: false,
                children: [{
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:toponyme:zone_reglemente",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:toponyme:zone_reglemente",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {    
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:toponyme:zone_habitat",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:toponyme:zone_habitat",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {    
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:toponyme:massif_boise",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:toponyme:massif_boise",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {    
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:toponyme:zone_activite",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:toponyme:zone_activite",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {    
                    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:toponyme:etablissement",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:toponyme:etablissement",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }]
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
    
