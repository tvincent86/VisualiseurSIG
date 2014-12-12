/**
 * The LayerFolder plugin. This is used to create a node that holds
multiple layers, keeping checkboxes syncd
 * {plugins: ['gx_layerfolder'], ...}
 *
 */
 Ext.define('GeoExt.tree.LayerFolderNode', {
     extend: 'Ext.AbstractPlugin',
     alias: 'plugin.gx_layerfolder', 
     requires: [
        'GeoExt.Version'
    ],

init: function(target) {
 var me = this,
 checked = true,
 layer;
 target.eachChild(function(node) {
     layer = node.get('layer');
     if(!layer.getVisibility()) checked = false;
     layer.events.on({
     'visibilitychanged' : me.onChildLayerVisibilityChanged,
     scope: me
     });
     });
     target.set('checked', checked);
    
     target.on('afteredit', function(node, modifiedFields) {
     if(~Ext.Array.indexOf(modifiedFields, 'checked')) {
     me.onCheckChange();
     }
     });
    
     me.target = target;
 }, 

/**
 * @private
 * Updates the visibility of the child layers
 * node.
 */
 onCheckChange: function() {
     console.log('titi');
     var node = this.target,
     checked = this.target.get('checked'); 
    
    if(!node._visibilityChanging) return;
    
     node._visibilityChanging = true;
     node.eachChild(function(node) {
     node.get('layer').setVisibility(checked);
     });
     delete node._visibilityChanging;
 },

 /**
 * @private
 * Updates the visibility this node, when children visibility changes
 *
 */
 onChildLayerVisibilityChanged: function() {
     var node = this.target;
    
     if(!node._visibilityChanging) return;
    
     var checked = true;
     node.eachChild(function(childNode) {
     if(!childNode.get('layer').getVisibility()) checked = false;
     });
     node._visibilityChanging = true;
     node.set('checked', checked);
     delete node._visibilityChanging;
 } 

});
