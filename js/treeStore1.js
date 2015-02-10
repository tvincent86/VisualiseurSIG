[{
    text: "Organisation 1",
    leaf: false,                    
    expanded: true,
    children: [{
        text: 'Limite administrative (6) <img id="bd_carto_administratif" name="descriptif" src="./icons/img_info.png" />',
        leaf: false,                    
        expanded: false,
        children: [{
            plugins: ['gx_layer'],
            text: tabLayers[findIndex("bdcarto:administratif:region",tabLayers)][1],
            layer: map.layers[findIndex("bdcarto:administratif:region",tabLayers)],
            leaf: true,
            qtip: source_ign_bdcarto,
            checked: false,
            children: []
        }]
    }]
}]
    
