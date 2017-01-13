<?php
 $languages = array('en', 'es');
 $header = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
 foreach($header as $lang) {
    if(in_array($lang, $languages)) {
    header("Location: $lang.php"); // i.e. en.php or es.php
        break;
    }
 }
?>
