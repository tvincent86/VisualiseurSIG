<?php
//header('Access-Control-Allow-Origin: *');
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

	<!--Clé API GoogleMaps/--/http://cartographie.iaat.org-->
<!--
    <script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false"></script>
-->
    <script src="https://maps.googleapis.com/maps/api/js?v=3"></script>
<!--
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
-->

    <!-- ExtJS -->
	<script type="text/javascript" src="./lib/extjs/examples/shared/include-ext.js"></script>
    <!-- Basic example styling -->
    <link rel="stylesheet" type="text/css" href="./lib/extjs/examples/shared/example.css" />
    

    <!-- Load specific css based on selected theme -->
<!--
    <script src="./js/theme.js"></script>
    <script type="text/javascript" src="./lib/extjs/examples/shared/options-toolbar.js"></script>
-->

    <!-- You should definitely consider using a custom single-file version of OpenLayers -->
    <script src="./lib/openlayers/OpenLayers.js"></script>

    <script type="text/javascript" src="./js/loader.js"></script>
    <script type="text/javascript" src="./js/map.js"></script>
    <script type="text/javascript" src="./js/treeStore.js"></script>


    <link rel="Shortcut Icon" href="./img/liferay.ico" />
</head>
<body>
<!--
	<div id="mainHeader">
		<div>
			<img src="./img/logo_crpc.png" alt="Bandeau du visualiseur cartographique"/>
		</div>
		<div>
			<h2>Poitou-Charentes à la carte</h2><h3>Visualiseur cartographique</h3>
		</div>
	</div>
-->
    <div style="display:none;">	
	<div id="ficheInfoWms">
	    <h1>Utilisation des flux WMS</h1>
            <hr>
	    <span>
	    Le service IGAS propose un accès à certaines données de référence via des flux WMS :
	    </span>
	    <br><br>
	    
            <h2>Intérêt du WMS</h2>
	    <span>
	    Le principal intérêt du WMS est de pouvoir afficher sur votre poste de travail une ou plusieurs couches de références publiées dans le catalogue de données et d’y superposer vos propres données. Les données que vous consultez en WMS correspondent toujours à la dernière version de mise à jour disponible. 
	    <br><br>Vos projets et documents contenant des couches WMS stockées en local, rechargeront automatiquement les données de référence les plus récentes.
	    </span>
	    <br>
	    <br>
	    
	    <h2>Limitation du WMS</h2>
	    <br>
	    <span>
	    Les couches WMS sont des images, leur représentation est fixe. Elles ne sont pas interrogeables avec votre logiciel de SIG. De plus, faire une requête WMS sur une emprise importante peut prendre un temps conséquent.
	    </span>
	    <br>
	    <br>	    
	    <!--
	    <h2>Limitation du WFS</h2>
	    <br>
	    <span>
	    Les couches WFS sont des couches vectorielles transmises à votre SIG sous format GML, donc les consulter sur une emprise importante (par exemple toutes les routes sur un département entier) peut prendre un temps conséquent. Si possible essayez de limiter les volumes demandés en utilisant des filtres.
	    </span>
	    -->
	    
	    <h2>Accéder aux données via WMS</h2>
	    <br>
	    <span>
	    L’accès aux données en WMS nécessite de disposer d’un client WMS (logiciel libre ou d’éditeur) : GvSIG, QGis, JUMP, ArcGIS, Mapinfo,...
<!--
	    Nous avons rédigé un document détaillant la démarche pour accéder aux services WMS depuis quelques un des éditeurs de logiciels principaux :
	    </span>span>
	    <br>
	    <br>
		QGis
		ArcGIS
-->
	    <br><br>
            Liste des flux WMS :
	    <br><br>
	    <table>
		<thead>
		    <tr class="even">
			<th width="40%">Serveurs WMS</th>
			<th width="50%">Description</th>
			<th width="10%">Accès</th>
		    </tr>
		</thead>
		<tbody>
		    <tr class="even">
			<td>http://plateformesig.iaat.org/cgi-bin/wms_bdcarto?</td>
			<td>Ce service wms permet de "visualiser" la BDCARTO de l'IGN sur la région Poitou-Charentes.</td>
			<td>Interne</td>
		    </tr>
		    <tr class="even odd">
			<td>http://plateformesig.iaat.org/cgi-bin/wms_bdcarto?</td>
			<td>Ce service wms permet de "visualiser" l'ensemble des données métiers déposé sur la plateforme.
    
	Ex : lycées, mare, bassin d'alimentation de captage, ...</td>
			<td>Interne</td>
		    </tr>
		</tbody>
	    </table>
            <br>
	    




	</div>
    </div>
	
	<div id="mainFooter">
		<div class="version"><?php echo $var_version; ?></div>
		<div class="xiti"></div> 
		<div class="w3c">
		    <a href="http://validator.w3.org/check?uri=referer"><img src="./img/valid-xhtml10.png" alt="Valid XHTML 1.0 Transitional" /></a>
		</div>
		<div class="copyright-txt"><?php echo $var_copyright_footer_txt; ?> - </div>
		<div class="copyright"><?php echo $var_copyright_footer; ?></div>
	</div>

	<!-- Application -->
	<script type="text/javascript" src="./js/app.js"></script>

    <!-- Application styling -->
<!--
    <link rel="stylesheet" type="text/css" media="screen,print" href="./css/mainAll.css" />
-->
    <link rel="stylesheet" type="text/css" media="screen" href="./css/main.css" />
    <link rel="stylesheet" type="text/css" media="print" href="./css/print.css" />

</body>
</html>
