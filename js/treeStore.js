[{
    text: 'Limite territoriale (5) <img id="bd_carto_administratif" name="descriptif" src="./icons/img_info.png" />',
    leaf: false,                    
    expanded: false,
    children: [{
	plugins: ['gx_layer'],
	text: tabLayers[findIndex('bdcarto:administratif:commune',tabLayers)][1],
	layer: map.layers[findIndex('bdcarto:administratif:commune',tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	//text: tabLayers[findIndex('bdcarto:administratif:commune',tabLayers)][1],
	text: 'Centre bourg',
	//layer: map.layers[findIndex('bdcarto:administratif:commune',tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: tabLayers[findIndex('bdcarto:administratif:canton',tabLayers)][1],
	layer: map.layers[findIndex('bdcarto:administratif:canton',tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
	layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
	layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
	layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'EPCI',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: '"Pays"',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'Aire urbaine',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'Unité urbaine',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'Zone d\'emploi',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }]
}, {
    text: "Donnée métier",
    leaf: false,                    
    expanded: false,
    children: [{
	plugins: ['gx_layer'],
	text: 'Bassin d\'alimentation de captage',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'Mare',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: 'Lycée',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }, {
	plugins: ['gx_layer'],
	text: '...',
	leaf: true,
	qtip: source_ign_bdcarto,
	checked: false
    }]
}, {
    text: "Référentiel  (30)",
    leaf: false,                    
    expanded: false,
    children: [{
	text: 'Référentiel local',
	leaf: false,                    
	expanded: true,
	children: [{
	    text: 'BD Topo Charente',
	    leaf: false,                    
	    expanded: false,
	    children: [{
		text: 'Réseau routier',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Route',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Voie ferrée',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Gare',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Energie',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Ligne électrique',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Hydrographie',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Cours d\'eau',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Bâti',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Bâtiment',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Végétation orographie',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Zone de végétation',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Ligne orographique',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Administratif',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Commune',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Zone d\'activité',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Industrielle et commerciale',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Toponyme',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'lieu-dit habité',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }]
	}, {
	    text: "BD Topo Charente-Maritime",
	    leaf: false,                    
	    expanded: false,
	    children: [
	    ]
	}, {
	    text: "BD Topo Deux-Sèvres",
	    leaf: false,                    
	    expanded: false,
	    children: []
	}, {
	    text: "BD Topo Vienne",
	    leaf: false,                    
	    expanded: false,
	    children: []
	}, {
	    text: "BD Adresse",
	    leaf: false,                    
	    expanded: false,
	    children: [{
		plugins: ['gx_layer'],
		text: 'Point adresse 16',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: 'Point adresse 17',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: 'Point adresse 79',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: 'Point adresse 86',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }]
	}, {
	    text: "BD Parcellaire 16",
	    leaf: false,                    
	    expanded: false,
	    children: [{
		plugins: ['gx_layer'],
		text: 'Parcelle',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: '...',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }]
	}, {
	    text: "BD Parcellaire 17",
	    leaf: false,                    
	    expanded: false,
	    children: [{
		plugins: ['gx_layer'],
		text: 'Parcelle',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: '...',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }]
	}, {
	    text: "BD Parcellaire 79",
	    leaf: false,                    
	    expanded: false,
	    children: [{
		plugins: ['gx_layer'],
		text: 'Parcelle',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: '...',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }]
	}, {
	    text: "BD Parcellaire 86",
	    leaf: false,                    
	    expanded: false,
	    children: [{
		plugins: ['gx_layer'],
		text: 'Parcelle',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }, {
		plugins: ['gx_layer'],
		text: '...',
		leaf: true,
		qtip: source_ign_bdcarto,
		checked: false
	    }]
	}]
    }, {
	text: "Référentiel régional (30)",
	leaf: false,                    
	expanded: false,
	children: [{
	    text: 'BD Carto région Poitou-Charentes (30)',
	    leaf: false,                    
	    expanded: false,
	    children: [{
		text: 'Administratif (5) <img id="bd_carto_administratif" name="administratif" src="./icons/img_info.png" />',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex('bdcarto:administratif:commune',tabLayers)][1],
		    layer: map.layers[findIndex('bdcarto:administratif:commune',tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    //text: tabLayers[findIndex('bdcarto:administratif:commune',tabLayers)][1],
		    text: 'Centre bourg',
		    //layer: map.layers[findIndex('bdcarto:administratif:commune',tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex('bdcarto:administratif:canton',tabLayers)][1],
		    layer: map.layers[findIndex('bdcarto:administratif:canton',tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
		    layer: map.layers[findIndex("bdcarto:administratif:arrondissement",tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
		    layer: map.layers[findIndex("bdcarto:administratif:departement",tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
		    layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'EPCI',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '"Pays"',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Aire urbaine',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Unité urbaine',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Zone d\'emploi',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		//}, {
		    //plugins: ['gx_layer'],
		    //text: '...',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
		}]
	    }, {
		text: 'Equipement (7) <img id="bd_carto_equipement" name="equipement" src="./icons/img_info.png" />',
		leaf: false,                    
		expanded: false,
		children: [{
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
		    text: tabLayers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)][1],
		    layer: map.layers[findIndex("bdcarto:equipement:enceinte_militaire",tabLayers)],
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
		
		//}, {
		    //plugins: ['gx_layer'],
		    //text: 'Aérodrome',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
		//}, {
		    //plugins: ['gx_layer'],
		    //text: '...',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
		}]
	    }, {
		text: 'Réseau ferré (2) <img id="bd_carto_reseau_ferre" name="reseau_ferre" src="./icons/img_info.png" />',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:reseau_ferre:noeud_ferre",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:reseau_ferre:noeud_ferre",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
		}, {
		    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:reseau_ferre:troncon_de_voie_ferre",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:reseau_ferre:troncon_de_voie_ferre",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
                }, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Habillage (1) <img id="bd_carto_habillage" name="descriptif" src="./icons/img_info.png" />',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
                    text: tabLayers[findIndex("bdcarto:habillage:habillage",tabLayers)][1],
                    layer: map.layers[findIndex("bdcarto:habillage:habillage",tabLayers)],
                    leaf: true,
                    checked: false,
                    children: []
		}]
	    }, {
		text: 'Hydrgraphie  (5) <img id="bd_carto_hydrographie" name="hydrographie" src="./icons/img_info.png" />',
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
		//}, {
		    //plugins: ['gx_layer'],
		    //text: '...',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
		}]
	    }, {
		text: 'Réseau routier  (5) <img id="bd_carto_reseau_routier" name="reseau_routier" src="./icons/img_info.png" /> ',
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
		//}, {
		    //plugins: ['gx_layer'],
		    //text: 'Tronçon route',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
		//}, {
		    //plugins: ['gx_layer'],
		    //text: '...',
		    //leaf: true,
		    //qtip: source_ign_bdcarto,
		    //checked: false
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
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }]
	}, {
	    text: 'BD Carthage',
	    leaf: false,                    
	    expanded: false,
	    children: [{
		text: 'Zone hydrographique',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }]
	}, {
	    text: 'Corine Land Cover',
	    leaf: false,                    
	    expanded: false,
	    children: [{
		text: 'Clc 2006',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }]    
	}]
    }, {
	text: "Référentiel national",
	leaf: false,                    
	expanded: false,
	children: [{
	    text: 'Route 500 France métropolitaine',
	    leaf: false,                    
	    expanded: false,
	    children: [{
		text: 'Administratif',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:commune",tabLayers)][1],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Centre bourg',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:canton",tabLayers)][1],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:arrondissement",tabLayers)][1],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:departement",tabLayers)][1],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'EPCI',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '"Pays"',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Aire urbaine',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Unité urbaine',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: 'Zone d\'emploi',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Habillage',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Hydrographie',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Réseau routier',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Route',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }, {
		text: 'Réseau ferré',
		leaf: false,                    
		expanded: false,
		children: [{
		    plugins: ['gx_layer'],
		    text: 'Voie ferrée',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}, {
		    plugins: ['gx_layer'],
		    text: '...',
		    leaf: true,
		    qtip: source_ign_bdcarto,
		    checked: false
		}]
	    }]
	}] 
    }]
}]
    
