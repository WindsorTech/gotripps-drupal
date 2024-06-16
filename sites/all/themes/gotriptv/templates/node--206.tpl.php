
<?php

global $user;
 /*print*/ $uid = $user->uid;
$profile_main = profile2_load_by_user($uid, 'main');
$sql1 =db_query("SELECT * FROM `profile` WHERE `uid`='".$uid."' LIMIT 0, 30 ");
 foreach ($sql1 as $profiledetail) {
	// echo '<div class="profile-id">';
	//print ' my profile id is :';
	// print ($profiledetail->pid);
	/*print*/ $pid=  $profiledetail->pid;
	  // echo '</div>';
  }


 $sqlpic =db_query("SELECT * FROM `field_data_field_profile_photos` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
 foreach ($sqlpic as $profilephotoid) {
	
	/*print*/ $photoid=  $profilephotoid->field_profile_photos_fid;
	   
  }
  $sqlpic2 =db_query("SELECT * FROM `file_managed` WHERE `fid`='".$photoid."' and uid ='".$uid."' LIMIT 0, 30");
 foreach ($sqlpic2 as $profilephotoid2) {
	 
	/*print*/  $photoid2=  $profilephotoid2->fid;
	/*print*/  $photoiduri=  $profilephotoid2->uri;
	   $myimgurl=explode("//",$photoiduri);
$myimgurlmain=$myimgurl[1]; 
/*print*/  $myimgurlmain=file_create_url($photoiduri);
	   
	   
  }
  
 
  
$sql2 =db_query("SELECT * FROM `field_data_field_date_of_birth` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-dob">';
	// print 'Date Of Birth :';
	 foreach ($sql2 as $profiledetaildob) {
		// print $profiledetaildob->field_date_of_birth_value;
		 $mydob= $profiledetaildob->field_date_of_birth_value;
		 
	 }
	 echo '</div>';
	  $sqlemail =db_query("SELECT * FROM `field_data_field_e_mail` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
				echo '<div class="profile-email">';
			// print 'email :';
				 foreach ($sqlemail as $profiledetailemail) {
				// print $profiledetailemail->field_e_mail_value;
				 $myemail= $profiledetailemail->field_e_mail_value;
				 
			 }
			 echo '</div>';
	 
	
	 $sql3 =db_query("SELECT * FROM `field_data_field_full_name` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-fname">';
	// print 'Name :';
	 foreach ($sql3 as $profiledetailname) {
		/*print*/ $myname = $profiledetailname->field_full_name_value;
	 }
	 echo '</div>';
	 
	 $sql4 =db_query("SELECT * FROM `field_data_field_sex` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-sex">';
	// print 'Sex :';
	 foreach ($sql4 as $profiledetailsex) {
		$mysex= /*print*/ $profiledetailsex->field_sex_value;
	 }
	 echo '</div>';
	 
	  $sql5 =db_query("SELECT * FROM `field_data_field_profession` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-profession">';
	// print 'Profession :';
	 foreach ($sql5 as $profiledetailprofession) {
		$myprofession= /*print*/ $profiledetailprofession->field_profession_value;
	 }
	 echo '</div>';
	 
	 $sql6 =db_query("SELECT * FROM `field_data_field_city` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-city">';
	// print 'City :';
	 foreach ($sql6 as $profiledetailcity) {
		$mycity = /* print*/ $profiledetailcity->field_city_value;
	 }
	 echo '</div>';
	  $sql7 =db_query("SELECT * FROM `field_data_field_country` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-country">';
	// print 'Country :';
	 foreach ($sql7 as $profiledetailcountry) {
		$mycountry =  /*print*/ $profiledetailcountry->field_country_value;
	 }
	 echo '</div>';
	  $sql8 =db_query("SELECT * FROM `field_data_field_company_website` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-country">';
	// print 'Website :';
	 foreach ($sql8 as $profiledetailwebsite) {
		$mywebsite= /*print*/ $profiledetailwebsite->field_company_website_value;
	 }
	 echo '</div>';
	  $sql9 =db_query("SELECT * FROM `field_data_field_facebook` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-facebook">';
	// print 'Facebook :';
	 foreach ($sql9 as $profiledetailfacebook) {
		$myfacebook=  /*print*/ $profiledetailfacebook->field_facebook_value;
	 }
	 echo '</div>';
	  $sql11 =db_query("SELECT * FROM `field_data_field_twitter` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-twitter">';
	// print 'Twitter :';
	 foreach ($sql11 as $profiledetailtwitter) {
		 $mytwitter= /*print*/ $profiledetailtwitter->field_twitter_value;
	 }
	 echo '</div>';
	  $sql12 =db_query("SELECT * FROM `field_data_field_instagram` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-instagram">';
	// print 'Instagram :';
	 foreach ($sql12 as $profiledetailinstagram) {
		 $myinstagram= /*print*/ $profiledetailinstagram->field_instagram_value;
	 }
	 echo '</div>';
	 $sql13 =db_query("SELECT * FROM `field_data_field_youtube` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-youtube">';
	// print 'YouTube :';
	 foreach ($sql13 as $profiledetailyoutube) {
		$myyoutube=  /*print*/ $profiledetailyoutube->field_youtube_value;
	 }
	 echo '</div>';
	 $sql14 =db_query("SELECT * FROM `field_data_field_google_plus` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-youtube">';
	// print 'Google Plus :';
	 foreach ($sql14 as $profiledetailgoogleplus) {
		$mygoogleplus=  /*print*/ $profiledetailgoogleplus->field_google_plus_value;
	 }
	 echo '</div>';
	 
	
	 
	 
	 
	 
	 
	 
	 
	  $sql21 =db_query("SELECT * FROM `field_data_field_show_on_profile_dob` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-dob-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql21 as $profiledetaildobshow) {
		// print $profiledetaildobshow->field_show_on_profile_dob_value;
		 $dobshow = $profiledetaildobshow->field_show_on_profile_dob_value;
	 }
	 echo '</div>';
	 
	 $sql22 =db_query("SELECT * FROM `field_data_field_show_on_profile_city` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-city-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql22 as $profiledetailcityshow) {
		 
		 $cityshow = /*print*/ $profiledetailcityshow->field_show_on_profile_city_value;
	 }
	 echo '</div>';
	 $sql23 =db_query("SELECT * FROM `field_data_field_show_on_profile_country` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-country-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql23 as $profiledetailcountryshow) {
		 
		 $countryshow = /*print*/ $profiledetailcountryshow->field_show_on_profile_country_value;
	 }
	 echo '</div>';
	  $sql24 =db_query("SELECT * FROM `field_data_field_show_on_profile_facebook` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-facebook-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql24 as $profiledetailfacebookshow) {
		 
		 $fbshow = /*print*/ $profiledetailfacebookshow->field_show_on_profile_facebook_value;
	 }
	 echo '</div>';
	  $sql25 =db_query("SELECT * FROM `field_data_field_show_on_profile_googleplus` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-googleplus-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql25 as $profiledetailgoogleplusshow) {
		 
		 $gplusshow = /*print*/ $profiledetailgoogleplusshow->field_show_on_profile_googleplus_value;
	 }
	 echo '</div>';
	  $sql26 =db_query("SELECT * FROM `field_data_field_show_on_profile_instagram` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-instagram-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql26 as $profiledetailinstagramshow) {
		 
		 $instagramshow = /*print*/ $profiledetailinstagramshow->field_show_on_profile_instagram_value;
	 }
	 echo '</div>';
	 
	 $sql27 =db_query("SELECT * FROM `field_data_field_show_on_profile_profession` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-profession-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql27 as $profiledetailprofessionshow) {
		 
		 $professionshow = /*print*/ $profiledetailprofessionshow->field_show_on_profile_profession_value;
	 }
	 echo '</div>';
	 $sql28 =db_query("SELECT * FROM `field_data_field_show_on_profile_twitter` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-twitter-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql28 as $profiledetailtwittershow) {
		 
		 $twittershow = /*print*/ $profiledetailtwittershow->field_show_on_profile_twitter_value;
	 }
	 echo '</div>';
	 $sql29 =db_query("SELECT * FROM `field_data_field_show_on_profile_website` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-website-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql29 as $profiledetailwebsiteshow) {
		 
		 $websiteshow = /*print*/ $profiledetailwebsiteshow->field_show_on_profile_website_value;
	 }
	 echo '</div>';
	 $sql30 =db_query("SELECT * FROM `field_data_field_show_on_profile_youtube` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-youtube-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql30 as $profiledetailyoutubeshow) {
		 
		 $youtubeshow = /*print*/ $profiledetailyoutubeshow->field_show_on_profile_youtube_value;
	 }
	 echo '</div>';
	 $sql31 =db_query("SELECT * FROM `field_data_field_show_on_profile_email` WHERE `entity_id`='".$pid ."' LIMIT 0, 30 ");
echo '<div class="profile-email-show">';
	 //print 'Show On Profile dob :';
	 foreach ($sql31 as $profiledetailemailshow) {
		 
		 $emailshow = /*print*/ $profiledetailemailshow->field_show_on_profile_email_value;
	 }
	 echo '</div>';
	 
  

?>
<div id="userprofile1" class="userprofile-cls">
<div class="myprofiledetails">
<?php if ($photoid!=''){?>
<img width="180" height="180" alt="" src="<?php echo $myimgurlmain ?>" typeof="foaf:Image">
<?php }
if ($photoid==''){?>
<img width="180" height="180" alt="" src="<?php print base_path();?>sites/default/files/styles/square_thumbnail/public/default_images/usermale_1.png?itok=V6muIyHb" typeof="foaf:Image">
<?php }?>
<div class="user_details_pro">
   <?php
   $share_block = block_load('block', '92');
   $share_block2=_block_get_renderable_array( _block_render_blocks( array($share_block) ));
   print render($share_block2);
   ?>
<?php if ($myname!=''){?>
<span class="labelcl">Name: </span><span><?php print $myname;?></span> <br/><br/>
<?php }if ($mysex!=''){?>
<span class="labelcl">Sex:  </span><span><?php if ($mysex==0) print Male;  if ($mysex==1) print female;?></span><br/><br/> 
<?php }?>

<?php 
if ($emailshow==1){ print '<span class="labelcl">E-mail: </span>'.'<span>'.$myemail.'</span>'."<br/><br/>";}
if ($dobshow==1){ print '<span class="labelcl">Date Of Birth: </span>'.'<span>'.$mydob.'</span>'."<br/><br/>";}
if ($professionshow==1){print '<span class="labelcl">Profession: </span>'.'<span>'.$myprofession.'</span>'."<br/><br/>";}
if ($cityshow==1){print '<span class="labelcl">City: </span>'.'<span>'.$mycity.'</span>'."<br/><br/>";}
if ($countryshow==1){print '<span class="labelcl">Country: </span>'.'<span>'.$mycountry.'</span>'."<br/><br/>";}
if ($websiteshow==1){print '<span class="labelcl">Website: </span>'.'<span>'.$mywebsite.'</span>'."<br/><br/>";}
if ($fbshow==1){print '<span class="labelcl">Facebook: </span>'.'<span>'.$myfacebook.'</span>'."<br/><br/>";}
if ($twittershow==1){print '<span class="labelcl">Twitter: </span>'.'<span>'.$mytwitter.'<span>'."<br/><br/>";}
if ($instagramshow==1){print '<span class="labelcl">Instagram: </span>'.'<span>'.$myinstagram.'</span>'."<br/><br/>";}
if ($youtubeshow==1){print '<span class="labelcl">YouTube: </span>'.'<span>'.$myyoutube.'</span>'."<br/><br/>";}
if ($gplusshow==1){print '<span class="labelcl">Google Plus: </span>'.'<span>'.$mygoogleplus.'</span>'."<br/><br/>";}
echo "<br/>";
?>
</div>
</div>
</div>
<?php

/**
 * @file
 * Bartik's theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */
?>

<?php 
global $user_profile;


?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="meta submitted">
      <?php print $user_picture; ?>
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

  <?php
    // Remove the "Add new comment" link on the teaser page or if the comment
    // form is being displayed on the same page.
    if ($teaser || !empty($content['comments']['comment_form'])) {
      unset($content['links']['comment']['#links']['comment-add']);
    }
    // Only display the wrapper div if there are links.
    $links = render($content['links']);
    if ($links):
  ?>
    <div class="link-wrapper">
      <?php print $links; ?>
    </div>
  <?php endif; ?>

  <?php print render($content['comments']); ?>

</div>
<?php print  render($user_profile); ?>
