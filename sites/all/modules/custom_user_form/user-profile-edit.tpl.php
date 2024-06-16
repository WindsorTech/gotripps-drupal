<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
</script>
<script type="text/javascript">
jQuery(document).ready(function(){
  jQuery("#edit-profile-main-field-date-of-birth-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-dob-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-city-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-city-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-profession-und-0-value").click(function(){
    jQuery("edit-profile-main-field-show-on-profile-profession-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-country-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-country-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-company-website-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-website-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-facebook-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-facebook-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-twitter-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-twitter-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-instagram-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-instagram-und-1").attr('checked', true);
  });
   jQuery("#edit-profile-main-field-youtube-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-youtube-und-1").attr('checked', true);
  });
  jQuery("#edit-profile-main-field-google-plus-und-0-value").click(function(){
    jQuery("#edit-profile-main-field-show-on-profile-googleplus-und-1").attr('checked', true);
  });
});
</script>



<?php

//echo "<pre>";
//print_r($form);
//echo "</pre>"
?>

<?php // print render($form['form_id']); dsm($form);
 //print kpr($form) ?>
<div class="user-edit-main-profile">
<?php

global $language;
if ($language->language == 'pt-br'){

 print "<h1>Informações do meu Perfil</h1>";
}
elseif ($language->language == 'en'){

 print "<h1>My Profile Info</h1>";
}
elseif ($language->language == 'es'){

 print "<h1>Información de Mi Perfil</h1>";
}
?>
</div>
<div class="user-edit-profile">
<?php

global $language;
if ($language->language == 'pt-br'){

 print "<h1>Configurações da Conta</h1>";
}
elseif ($language->language == 'en'){

 print "<h1>Account Settings</h1>";
}
elseif ($language->language == 'es'){

 print "<h1>Configuración de la cuenta</h1>";
}
?>
</div>

<?php

print render($form['form_id']);
print render($form['form_build_id']);
print render($form['form_token']);
  unset($form['language']);
  

/*print render($form['field_birthday_user']);
print render($form['field_real_name_user']);*/
print render($form['account']);
print drupal_render_children($form);
 print drupal_render($form['actions']); 

?>
