<?php

//echo "<pre>";
//print_r($form);
//echo "</pre>"
?>
<div class="clear">&nbsp;</div>

<div class="outer-mainly">
<?php 
 drupal_add_css(drupal_get_path('module','custom_content_forms').'/blog_style.css');
global $language;
if ($language->language == 'pt-br'){
	?>
<div class="my-post-lisits">
<div class="clear">&nbsp;</div><ul><li class="post-article"><a href="<?php print base_path()?>pt-br/node/add/blog">Escrever artigo.</a></li>
<li class="post-photo-gallery"><a href="<?php print base_path()?>pt-br/node/add/media-gallery">criar álbum de fotos</a></li>
<li class="post-video"><a href="<?php print base_path()?>pt-br/node/add/videos">Postar Vídeo</a></li><li class="post-trip-plan"><a href="<?php print base_path()?>pt-br/node/add/viagem">Planejar minha viagem.</a></li><li class="edit-my-content"><a href="<?php print base_path()?>pt-br/tracker">Gerenciar Conteúdo</a></li><li class="edit-myprofile"><a href="<?php print base_path();?>pt-br/user/<?php
global $user;
print $user->uid;
?>/edit/main">Informações do Meu Perfil</a></li><li class="edit-account-info"><a href="<?php print base_path();?>pt-br/user/<?php
global $user;
print $user->uid;
?>/edit">
Configurações da Conta</a></li>
<li class="invite-friend"><a href="<?php print base_path()?>pt-br/invite-my-friends">
Convidar Meus Amigos</a></li>
</ul>
</div>
<?php }
elseif ($language->language == 'en'){?>
	<div class="my-post-lisits">
<div class="clear">&nbsp;</div><ul><li class="post-article"><a href="<?php print base_path()?>en/node/add/blog">Write Article</a></li>
<li class="post-photo-gallery"><a href="<?php print base_path()?>en/node/add/media-gallery">create photo album</a></li>
<li class="post-video"><a href="<?php print base_path()?>en/node/add/videos">Post Vídeo</a></li><li class="post-trip-plan"><a href="<?php print base_path()?>en/node/add/viagem">Plan My Trip<br>
</a></li><li class="edit-my-content"><a href="<?php print base_path()?>en/tracker">Manage Content<br>
</a></li><li class="edit-myprofile"><a href="<?php print base_path()?>en/user/<?php
global $user;
print $user->uid;
?>/edit/main">My Profile Info</a></li><li class="edit-account-info"><a href="<?php print base_path()?>en/user/<?php
global $user;
print $user->uid;
?>/edit">Account Settings</a></li>
<li class="invite-friend"><a href="<?php print base_path()?>en/invite-my-friends">Invite My Friends</a></li>
</ul>
</div>
<?php
}
elseif ($language->language == 'es'){ ?>
<div class="my-post-lisits">
<div class="clear">&nbsp;</div><ul><li class="post-article"><a href="<?php print base_path()?>es/node/add/blog">Escribir artículo</a></li>
<li class="post-photo-gallery"><a href="<?php print base_path()?>es/node/add/media-gallery">crear álbumes de fotos</a></li>
<li class="post-video"><a href="<?php print base_path()?>es/node/add/videos">Subir Video<br>
</a></li><li class="post-trip-plan"><a href="<?php print base_path()?>es/node/add/viagem">Planear Mi Viaje
</a></li><li class="edit-my-content"><a href="<?php print base_path()?>es/tracker">Administrar Contenido<br>
</a></li><li class="edit-myprofile"><a href="<?php print base_path()?>es/user/<?php
global $user;
print $user->uid;
?>/edit/main">Información de mi perfil </a></li><li class="edit-account-info"><a href="<?php print base_path()?>es/user/<?php
global $user;
print $user->uid;
?>/edit">Configuración de cuenta</a></li>
<li class="invite-friend"><a href="<?php print base_path()?>es/invite-my-friends">Invitar a mis amigos</a></li>
</ul>
</div>

<?php }?>


<div class="my-form-content">
<?php // print kpr($form); 
global $language;
if ($language->language == 'pt-br'){

 print "<h1>Planejar minha viagem.</h1>";
}
elseif ($language->language == 'en'){

 print "<h1>Plan My Trip</h1>";
}
elseif ($language->language == 'es'){

 print "<h1>Planear Mi Viaje </h1>";
}
?>
  <?php print drupal_render($form['title']); ?>
   <?php print drupal_render($form['title_field']); ?>
  <?php print drupal_render($form['field_imaeil']); ?> 
  <?php print drupal_render($form['field_tel']); ?> 
  <?php print drupal_render($form['field_adultos']); ?> 
  <?php print drupal_render($form['field_criancas']); ?> 
  <?php print drupal_render($form['field_destinos']); ?> 
  <?php print drupal_render($form['field_interesse']); ?> 
   <?php print drupal_render($form['field_mes']); ?> 
    
      <?php print drupal_render($form['field_ano_da_viagem_']); ?>
      <?php print drupal_render($form['field_data']); ?> 
    
     <?php print drupal_render($form['field_acomodacao']); ?> 
      <?php print drupal_render($form['field_detalhes']); ?> 
      <?php print drupal_render($form['field_conheceu']); ?> 
  <?php print drupal_render($form['field_address_location_']); ?> 
  <?php print drupal_render($form['field_region']); ?>   
 <?php  unset($form['language']); ?>
  <?php print drupal_render($form['body']); ?>
   <?php print drupal_render_children($form); ?>
  
  <div><?php // print drupal_render($form['additional_settings']); ?></div>
<div><?php print drupal_render($form['actions']); ?></div>


 <?php  $form['revision_information']['#access'] = FALSE;
$form['author']['#access'] = FALSE;
$form['path']['#access'] = FALSE;
$form['options']['#access'] = FALSE;
?>

  <?php unset($form['additional_settings']); ?>
  <div><?php // print drupal_render($form['additional_settings']); ?></div>
<div><?php print drupal_render($form['actions']); ?></div>
<?php if($buttons): ?> <div class="node-buttons"> <?php print render($buttons); ?> </div> <?php endif; ?> 

<?php /*?><div class="node-add-wrapper clear-block"> <div class="node-column-sidebar"> <?php if($sidebar): ?> <?php print render($sidebar); ?> <?php endif; ?> </div> <div class="node-column-main"> <?php if($form): ?> <?php print drupal_render_children($form); ?> <?php endif; ?>   <?php if($buttons): ?> <div class="node-buttons"> <?php // print render($buttons); ?> </div> <?php endif; ?> </div> <div class="clear"></div> </div><?php */?>
</div>
<div class="clear">&nbsp;</div>
</div>
