<?php
header('Access-Control-Allow-Origin: *');
// On défini la racine du site
define('RACINE_ROOT', '.');
if (!defined('RACINE_ROOT')){
die("D&eacute;sol&eacute;, vous ne pouvez pas acc&eacute;der directement à ce fichier");
}
// Inclusion des variables communes à toutes les pages 
include(RACINE_ROOT.'/include/var_ini.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title><?php echo $var_titre; ?></title>
    <meta name="author" content="<?php echo $var_author; ?>" />
    <meta name="email" content="<?php echo $var_author_mail ?>" />

<!--
    <script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false"></script>
-->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>

    <!-- ExtJS -->
    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/include-ext.js"></script>
<!--
    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/options-toolbar.js"></script>
-->
    
    <!-- Shared -->
<!--
    <link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/example.css" />
-->
<!--
    <link rel="stylesheet" type="text/css" href="./css/example.css" />
-->
    <!-- Basic example styling -->
    <link rel="stylesheet" type="text/css" href="./css/example.css" />
    

    <!-- Load specific css based on selected theme -->
<!--
    <script src="./js/theme.js"></script>
-->

    <!-- You should definitely consider using a custom single-file version of OpenLayers -->
    <script src="./lib/openlayers/OpenLayers.js"></script>


    <script type="text/javascript" src="./js/loader.js"></script>
<!--
    <script type="text/javascript" src="./js/treeStore.js"></script>
-->
    <script type="text/javascript" src="./js/map.js"></script>

    

    <link rel="Shortcut Icon" href="./img/liferay.ico" />
</head>
<body>
          
    <div style="display:none;">
    <?php
    // Div contenant le footer
    include(RACINE_ROOT.'/include/footer.php');
    ?>
    </div>
<!--
    <div id="map"></div>
-->
        <script type="text/javascript" src="./js/app.js"></script>
    <!-- Application styling -->
    <link rel="stylesheet" type="text/css" media="all" href="./css/main.css" />
    <link rel="stylesheet" type="text/css" media="print" href="./css/print.css" />
</body>
</html>
