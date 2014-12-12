<?php
if (!defined('RACINE_ROOT')){
    die("D&eacute;sol&eacute;, vous ne pouvez pas acc&eacute;der directement &agrave; ce fichier");
}
echo '<div id="footer">';
echo '  <div class="version">'.$var_version.'</div>';
echo '  <div class="iaat_xiti">';
echo '  </div>';
echo '  <div class="iaat_w3c">';
echo '      <p>';
echo '          <a href="http://validator.w3.org/check?uri=referer"><img src="'.RACINE_ROOT.'/img/valid-xhtml10.png" alt="Valid XHTML 1.0 Transitional" /></a>';
echo '      </p>';
echo '  </div>';

echo '  <div class="copyright-txt">'.$var_copyright_footer_txt.' - </div>';
echo '  <div class="copyright">'.$var_copyright_footer.'</div>';
echo '</div>';

