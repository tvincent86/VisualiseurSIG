/*
 * Copyright (c) 2008-2014 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */

/**
 * @requires GeoExt/Version.js
 */

/**
 * The model for scale values.
 *
 * @class GeoExt.data.ScaleModel
 */
Ext.define('GeoExt.data.ScaleModelCRPC', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'GeoExt.Version'
    ],
    alias: 'model.gx_scalecrpc',
    fields: [
        {name: "level"},
        {name: "resolution"},
        {name: "scale"},
        {name: "scaleNum"},
        {name: "scaleName"}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
