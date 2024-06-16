<?php

/**
 * @file
 * Default theme implementation to present all user profile data.
 *
 * This template is used when viewing a registered member's profile page,
 * e.g., example.com/user/123. 123 being the users ID.
 *
 * Use render($user_profile) to print all profile items, or print a subset
 * such as render($user_profile['user_picture']). Always call
 * render($user_profile) at the end in order to print all remaining items. If
 * the item is a category, it will contain all its profile items. By default,
 * $user_profile['summary'] is provided, which contains data on the user's
 * history. Other data can be included by modules. $user_profile['user_picture']
 * is available for showing the account picture.
 *
 * Available variables:
 *   - $user_profile: An array of profile items. Use render() to print them.
 *   - Field variables: for each field instance attached to the user a
 *     corresponding variable is defined; e.g., $account->field_example has a
 *     variable $field_example defined. When needing to access a field's raw
 *     values, developers/themers are strongly encouraged to use these
 *     variables. Otherwise they will have to explicitly specify the desired
 *     field language, e.g. $account->field_example['en'], thus overriding any
 *     language negotiation rule that was previously applied.
 *
 * @see user-profile-category.tpl.php
 *   Where the html is handled for the group.
 * @see user-profile-item.tpl.php
 *   Where the html is handled for each item in the group.
 * @see template_preprocess_user_profile()
 *
 * @ingroup themeable
 */
?>

<?php  
 global $user;
 global $userid;
 global $base_url;
 $account = menu_get_object('user'); 
 $userid = $account->uid;
//echo "<br/>";
// other stuff
 $mail = $account->mail;
/*print */$name = $account->name;
?>


<!--<div class="profile"<?php print $attributes; ?>>
  <?php // print render($user_profile); ?>
</div> -->



<?php

/*my code*/

$sql1 =db_query("SELECT * FROM `profile` WHERE `uid`='".$userid."' LIMIT 0, 30 ");
 foreach ($sql1 as $profiledetail) {
	  
$pid=  $profiledetail->pid;

  }
  $sqlpic =db_query("SELECT * FROM `field_data_field_profile_photos` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
 foreach ($sqlpic as $profilephotoid) {
	
	 $photoid=  $profilephotoid->field_profile_photos_fid;
	   
  }
  $sqlpic2 =db_query("SELECT * FROM `file_managed` WHERE `fid`='".$photoid."' and uid ='".$userid."' LIMIT 0, 30");
 
	$profile_user1 = user_load($userid);
	$user_profile1 = profile2_load_by_user($profile_user1,'main');
	$myimgurlmain_uri = $user_profile1->field_profile_photos['und'][0]['uri'];
	$myimgurlmain = file_create_url($myimgurlmain_uri);
  
 
  
		$sql2 =db_query("SELECT * FROM `field_data_field_date_of_birth` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
				
			// print 'Date Of Birth :';
				 foreach ($sql2 as $profiledetaildob) {
				// print $profiledetaildob->field_date_of_birth_value;
				 $mydob= $profiledetaildob->field_date_of_birth_value;
				 
			 }
			 
	 
		 $sqlemail =db_query("SELECT * FROM `field_data_field_e_mail` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
				
			// print 'email :';
				 foreach ($sqlemail as $profiledetailemail) {
				// print $profiledetailemail->field_e_mail_value;
				 $myemail= $profiledetailemail->field_e_mail_value;
				 
			 }

	 $sql3 =db_query("SELECT * FROM `field_data_field_full_name` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
		
	// print 'Name :';
		 foreach ($sql3 as $profiledetailname) {
		 $myname = $profiledetailname->field_full_name_value;
	 }

	 
	 $sql4 =db_query("SELECT * FROM `field_data_field_sex` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Sex :';
	 foreach ($sql4 as $profiledetailsex) {
		$mysex=  $profiledetailsex->field_sex_value;
	 }

	 
	  $sql5 =db_query("SELECT * FROM `field_data_field_profession` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Profession :';
	 foreach ($sql5 as $profiledetailprofession) {
		$myprofession= $profiledetailprofession->field_profession_value;
	 }

	 
	 $sql6 =db_query("SELECT * FROM `field_data_field_city` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'City :';
	 foreach ($sql6 as $profiledetailcity) {
		$mycity =  $profiledetailcity->field_city_value;
	 }

	  $sql7 =db_query("SELECT * FROM `field_data_field_country` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Country :';
	 foreach ($sql7 as $profiledetailcountry) {
		$mycountry =   $profiledetailcountry->field_country_value;
	 }

	  $sql8 =db_query("SELECT * FROM `field_data_field_company_website` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Website :';
	 foreach ($sql8 as $profiledetailwebsite) {
		$mywebsite=  $profiledetailwebsite->field_company_website_value;
	 }

	  $sql9 =db_query("SELECT * FROM `field_data_field_facebook` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Facebook :';
	 foreach ($sql9 as $profiledetailfacebook) {
		$myfacebook=   $profiledetailfacebook->field_facebook_value;
	 }

	  $sql11 =db_query("SELECT * FROM `field_data_field_twitter` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Twitter :';
	 foreach ($sql11 as $profiledetailtwitter) {
		 $mytwitter=  $profiledetailtwitter->field_twitter_value;
	 }

	  $sql12 =db_query("SELECT * FROM `field_data_field_instagram` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Instagram :';
	 foreach ($sql12 as $profiledetailinstagram) {
		 $myinstagram=  $profiledetailinstagram->field_instagram_value;
	 }

	 $sql13 =db_query("SELECT * FROM `field_data_field_youtube` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'YouTube :';
	 foreach ($sql13 as $profiledetailyoutube) {
		$myyoutube=   $profiledetailyoutube->field_youtube_value;
	 }

	 $sql14 =db_query("SELECT * FROM `field_data_field_google_plus` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	// print 'Google Plus :';
	 foreach ($sql14 as $profiledetailgoogleplus) {
		$mygoogleplus=   $profiledetailgoogleplus->field_google_plus_value;
	 }
	  $sql21 =db_query("SELECT * FROM `field_data_field_show_on_profile_dob` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql21 as $profiledetaildobshow) {
		// print $profiledetaildobshow->field_show_on_profile_dob_value;
		 $dobshow = $profiledetaildobshow->field_show_on_profile_dob_value;
	 }

	 
	 $sql22 =db_query("SELECT * FROM `field_data_field_show_on_profile_city` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql22 as $profiledetailcityshow) {
		 
		 $cityshow =  $profiledetailcityshow->field_show_on_profile_city_value;
	 }

	 $sql23 =db_query("SELECT * FROM `field_data_field_show_on_profile_country` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql23 as $profiledetailcountryshow) {
		 
		 $countryshow =  $profiledetailcountryshow->field_show_on_profile_country_value;
	 }

	  $sql24 =db_query("SELECT * FROM `field_data_field_show_on_profile_facebook` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql24 as $profiledetailfacebookshow) {
		 
		 $fbshow =  $profiledetailfacebookshow->field_show_on_profile_facebook_value;
	 }

	  $sql25 =db_query("SELECT * FROM `field_data_field_show_on_profile_googleplus` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql25 as $profiledetailgoogleplusshow) {
		 
		 $gplusshow =  $profiledetailgoogleplusshow->field_show_on_profile_googleplus_value;
	 }

	  $sql26 =db_query("SELECT * FROM `field_data_field_show_on_profile_instagram` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql26 as $profiledetailinstagramshow) {
		 
		 $instagramshow =  $profiledetailinstagramshow->field_show_on_profile_instagram_value;
	 }

	 
	 $sql27 =db_query("SELECT * FROM `field_data_field_show_on_profile_profession` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql27 as $profiledetailprofessionshow) {
		 
		 $professionshow =  $profiledetailprofessionshow->field_show_on_profile_profession_value;
	 }

	 $sql28 =db_query("SELECT * FROM `field_data_field_show_on_profile_twitter` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql28 as $profiledetailtwittershow) {
		 
		 $twittershow =  $profiledetailtwittershow->field_show_on_profile_twitter_value;
	 }

	 $sql29 =db_query("SELECT * FROM `field_data_field_show_on_profile_website` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql29 as $profiledetailwebsiteshow) {
		 
		 $websiteshow =  $profiledetailwebsiteshow->field_show_on_profile_website_value;
	 }

	 $sql30 =db_query("SELECT * FROM `field_data_field_show_on_profile_youtube` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql30 as $profiledetailyoutubeshow) {
		 
		 $youtubeshow =  $profiledetailyoutubeshow->field_show_on_profile_youtube_value;
	 }

	 
	 $sql31 =db_query("SELECT * FROM `field_data_field_show_on_profile_email` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");

	 //print 'Show On Profile dob :';
	 foreach ($sql31 as $profiledetailemailshow) {
		 
		 $emailshow =  $profiledetailemailshow->field_show_on_profile_email_value;
	 }
?>

<div class="userprofile-cls">
<div class="myprofiledetails">
<div class="user_details_pro2">
<?php if ($photoid!=''){?>
<img width="200" height="200" alt="" src="<?php print $myimgurlmain; ?>" typeof="foaf:Image">
<?php }
if ($photoid==''){?>
<img width="180" height="180" alt="" src="<?php print base_path(); ?>sites/default/files/default_images/usermale_1.png" typeof="foaf:Image">
<?php }?>
<h1><?php print $name;?></h1>

<?php global $language;
if ($language->language == 'pt-br'){
	print '<div class="sendmessagetouser"><a href="/pt-br/messages/new?uname='.$profile_user1->name.'">Envie uma mensagem para este usuário</a></div>';
	print '<span class="labelcl  share-buttons-label">Compartilhar Perfil: </span>';
}
elseif ($language->language == 'en'){
  print '<div class="sendmessagetouser"><a href="/en/messages/new?uname='.$profile_user1->name.'">Send a message to this user</a></div>';
  print '<span class="labelcl share-buttons-label">Share Profile:  </span>';
}
elseif ($language->language == 'es'){
	print '<div class="sendmessagetouser"><a href="/es/messages/new?uname='.$profile_user1->name.'">Enviar un mensaje a este usuario</a></div>';
	print '<span class="labelcl  share-buttons-label">Compartir Perfil: </span>';
}
?>

<!-- share icons -->
<?php
	$share_block = block_load('block', '127');
	$share_block1=_block_get_renderable_array( _block_render_blocks( array($share_block) ));
	print render($share_block1);
?>

<div class="profile_fields">
<?php if ($myname!=''){?>
<div class="user_profile_info"><span class="labelcl"><?php echo t('Name'); ?>: </span><span class="user_profile"><?php print $myname;?></span></div>
<?php }if ($mysex!=''){?>
<div class="user_profile_info"><span class="labelcl"><?php echo t('Sex'); ?>:  </span><span class="user_profile"><?php if ($mysex==0) print Male;  if ($mysex==1) print female;?></span></div>
<?php }?>
<?php

if ($emailshow==1){ print '<div class="user_profile_info"><span class="labelcl">'.t("E-mail").':</span><span class="user_profile">'.$myemail.'</span></div>'; }
if ($dobshow==1){ print '<div class="user_profile_info"><span class="labelcl">'.t("Date Of Birth").': </span><span class="user_profile">'.$mydob.'</span></div>';}
if ($professionshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Profession").': </span><span class="user_profile">'.$myprofession.'</span></div>';}
if ($cityshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("City").': </span><span class="user_profile">'.$mycity.'</span></div>';}
if ($countryshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Country").': </span><span class="user_profile">'.$mycountry.'</span></div>';}
if ($websiteshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Website").': </span><span class="user_profile">'.$mywebsite.'</span></div>';}
if ($fbshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Facebook").': </span><span class="user_profile">'.$myfacebook.'</span></div>';}
if ($twittershow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Twitter").': </span><span class="user_profile">'.$mytwitter.'</span></div>';}
if ($instagramshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Instagram").': </span><span class="user_profile">'.$myinstagram.'</span></div>';}
if ($youtubeshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("YouTube").': </span><span class="user_profile">'.$myyoutube.'</span></div>';}
if ($gplusshow==1){print '<div class="user_profile_info"><span class="labelcl">'.t("Google Plus").': </span><span class="user_profile">'.$mygoogleplus.'</span></div>';}

?>
</div>
</div>	
</div>
</div>



