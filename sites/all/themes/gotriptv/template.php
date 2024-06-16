<?php function gotriptv_preprocess_html(&$variables) {
	$_meta = array(
		'#tag' => 'meta',
		'#attributes' => array(
		  'name' => 'google-signin-clientid',
		  'content' => '179151545148-r6on7knot025mf07v3lngq3ikheutsje.apps.googleusercontent.com',
		),
		'#attributes' => array(
		  'name' => 'google-signin-scope',
		  'content' => 'https://www.googleapis.com/auth/userinfo.profile',
		),
		'#attributes' => array(
		  'name' => 'google-signin-requestvisibleactions',
		  'content' => 'http://gotripps.com/user',
		),
		'#attributes' => array(
		  'name' => 'google-signin-cookiepolicy',
		  'content' => 'single_host_origin',
		),
		'#attributes' => array(
		  'name' => 'google-signin-callback',
		  'content' => 'signinCallback',
		),
	);
	drupal_add_html_head($_meta, 'my_meta');
	
	drupal_add_css('.travel-widget-title .content > h3, .region-header .block .content, .page_language_tile > h2, .page_language_tile > h2{color: #'.theme_get_setting('user_defined_colr').' !important;}
    ', array('type' => 'inline'));
    
	/*drupal_add_css('#block-locale-language--2 h2, #block-block-125 .content > h3, .region-header .block .content , #block-block-80 .content>span ,.header-menu ul#superfish-1 li a, .page_language_tile > h2 , .site-footer .copyright > a ,.site-footer ul li a
    {color: #'.theme_get_setting('user_defined_colr').' !important;}
    ', array('type' => 'inline'));*/
    drupal_add_css('.block-superfish li a, .site-footer ul.menu li a, .copyright a {color: #'.theme_get_setting("menu_nav_color").' !important;}', array('type' => 'inline'));
     drupal_add_css('.supheader .block-locale h2, #block-block-65 .content, #block-block-80 .content {color: #'.theme_get_setting("header_top_color").' !important;}', array('type' => 'inline'));
	drupal_add_css('.header-menu ul#superfish-1 > li:hover a,.header-menu ul#superfish-1 > li.current-menu-parent > a, .header-menu ul#superfish-1 > li.hover > a, .header-menu ul#superfish-1 > li:hover > a ,.site-footer ul li:hover a {color: #'. theme_get_setting('user_defined_hover_color'). '!important;}', array('type' => 'inline'));
	drupal_add_css('ul#superfish-1 > li#menu-2005-1 > a,ul#superfish-1 > li#menu-2002-1 > a,ul#superfish-1 > li#menu-3754-1 > a,ul#superfish-1 > li#menu-787-1 > a,ul#superfish-1 > li#menu-2001-1 > a,ul#superfish-1 > li#menu-3785-1 > a,ul#superfish-1 > li#menu-2006-1 > a,ul#superfish-1 > li#menu-2003-1 > a,ul#superfish-1 > li#menu-3784-1 > a {color: #'.theme_get_setting('user_defined_hover_color').'!important;}', array('type' =>'inline'));
	$bg_fid = theme_get_setting("site_bg");
	$bg_obj = file_load($bg_fid);
	$bg_url = file_create_url($bg_obj->uri);
	drupal_add_css('body{background:url('.$bg_url.');}; ', array('type' => 'inline'));
}
function gotriptv_preprocess_page(&$variables){
	$current_path= current_path();
	if($current_path=='node/add/blog'){
		drupal_add_js("jQuery( window ).load(function(){
		setTimeout(function(){
		window.scrollTo(0, 0);
		},1000);
		});",array('type'=>'inline'));
	}
	drupal_add_js("https://apis.google.com/js/client:platform.js" , array('type'=>'external'));
	drupal_add_js("https://apis.google.com/js/client:platform.js?onload=render" , array('type'=>'external'));

	if($variables['node']->field_show_image['und'][0]['value'] == 2)
	{
	 drupal_add_css(".node-type-article .field-name-field-image{width: 100% !important; float: left; padding: 12px 30px 0 15px; position: relative;}",array('type'=>'inline'));
	 drupal_add_css("body.node-type-article .field-name-field-image img { width: 100% !important; float: left;}", array('type'=>'inline'));
	}
	if($variables['node']->field_show_image['und'][0]['value'] == 0){
	drupal_add_css("body.node-type-article .field-name-field-image img {width: 320px !important; height: 240px;}", array('type' => 'inline'));
	}
	if($variables['node']->field_show_image['und'][0]['value'] == 1){
	  drupal_add_css("body.node-type-article .field-name-field-image img {display:none ;}",array('type'=> 'inline'));
	}
	if (!empty($variables['page']['sidebar_second']) || !empty($variables['page']['sidebar_second_top'])){
	drupal_add_css('.content-wrap { width: 67% !important;}', array('type'=>'inline'));
	}
	global $user;
	global $base_url; 
	if((current_path() == 'travel-tour-article-page-view-es') || (current_path() == 'travel-tour-article-page-view-en') || (current_path() == 'travel-tour-article-page-view-pt-br')){
	  $variables['theme_hook_suggestions'][]='page__travelideas'; 
	}
	elseif(($variables['node']->nid == 217) || ($variables['node']->nid == 218) || ($variables['node']->nid == 208)){
	  $variables['theme_hook_suggestions'][]='page__myblog'; 

	}
	elseif(($variables['node']->nid == 231) || ($variables['node']->nid == 232) || ($variables['node']->nid == 223)){
	  $variables['theme_hook_suggestions'][]='page__invitefriend';
	}
	if(isset($variables['node']) and ($variables['node']->type == 'article')){
	$variables['theme_hook_suggestions'][]='page__article'; 
	}

	if(isset($variables['node']) and ($variables['node']->type == 'blog')){
		$variables['theme_hook_suggestions'][]='page__blog'; 
		if(array_key_exists(3, $user->roles)){
		drupal_add_css('#block-block-127 { border-bottom: 1px solid #d9d9d9 !important; margin-left: 5px !important; margin-top: -25px !important; padding: 3px 0 10px !important; }', array('type'=>'inline'));
		}
	}
	if (!array_key_exists('3',$user->roles)) {

	  if(isset($variables['node']) and ($user->uid != $variables['node']->uid))
	  {
		 drupal_add_css('.tabs.primary > li:nth-child(2), .tabs.primary > li:nth-child(4), .tabs.primary > li:nth-child(3), .tabs.primary > li:nth-child(1) {display: none !important;}', array('type' => 'inline'));
		 //echo $user->uid.' --- '.$variables['node']->nid;
	  }
	}
	$search_box = drupal_render(drupal_get_form('search_form'));
	$variables['search_box'] = $search_box;
	$img = $base_url.base_path().path_to_theme()."/logo.png"; 
	$variablenew = 'homepage';
	$new_var = arg(1);
	if(!drupal_is_front_page()){
	  if(isset($variables['node']->field_image['und'][0]['uri'])){ 
		$img = file_create_url($variables['node']->field_image['und'][0]['uri']);
		$variablenew = $variables['node']->nid;
		//echo'<br/>'.$paot = image_style_url('media_gallery_large',$variables['node']->field_image['und'][0]['uri']);
	  }
	  elseif(isset($variables['node']->field_gallery_image['und'][0]['uri'])){ 
		$img = file_create_url($variables['node']->field_gallery_image['und'][0]['uri']);
		$variablenew = $variables['node']->nid;
		//echo'<br/>'.$paot = image_style_url('media_gallery_large',$variables['node']->field_image['und'][0]['uri']);
	  }
	  elseif(arg(0) == 'user' && isset($new_var) && is_numeric($new_var)) {
	   	$profile_user = user_load(arg(1));
	   	$user_profile = profile2_load_by_user($profile_user,'main');
	   	$useruri = $user_profile->field_profile_photos['und'][0]['uri'];
	   	$userimg = file_create_url($useruri);
	   	$img = $userimg;
	   	$variablenew = $profile_user->uid;
	  }
	} 
	$element = array( 
	'#tag' => 'meta', 
	'#attributes' => array( 
	"property" => "og:image",
	"content" => $img, ), );
	drupal_add_html_head($element,'facebook_share_image'.$variablenew); 
	
}
/*code to unset error messages*/
function gotriptv_process_page(&$variables) {
	// Hook into color.module.
  /*if (module_exists('color')) { 
    _color_page_alter($variables);
  }*/
  if (path_is_admin(current_path())) {
    unset($variables['messages']);
  }
}
/**
 * Override or insert variables into the page template for HTML output.
 */
function gotriptv_process_html(&$variables) {
  // Hook into color.module.
  /*if (module_exists('color')) {
    _color_html_alter($variables);
  }*/
}
/* code for ip*/
/**  
  * Set a selected country in the user session
  *
  * @param int $country_id
  *   the country entity id
  */
function _multi_country_set_selected_country($country_id = NULL) {
   // if no argument passed return the current selected_country_id value
   if (!$country_id) {
     $selected_country_id = isset($_SESSION['selected_country_id']) ? $_SESSION['selected_country_id'] : NULL;
     return $selected_country_id;
   }
   // avoid set country if set country_id is the same we have in session
   if (isset($_SESSION['selected_country_id']) && $_SESSION['selected_country_id'] == $country_id) {
     return;
   }
 
   // store the OG nid in session
   $_SESSION['selected_country_id'] = $country_id; 
 }
 

?>
