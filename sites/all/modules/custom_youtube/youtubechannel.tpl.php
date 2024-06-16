<?php

/**
 * @file
 * Theme file to display youtubechannel.
 */

if ($vars['content']) :

/*************************** Customize Block to display random videos from you tube ***********************************/
$youtube = array();
$abc = array();
 foreach ($vars['content'] as $key => $value) {
 $youtube[] = $key;
} 
$abc = array_rand($youtube);
$value = $youtube[$abc];
//echo'<pre>'; print_r($value); echo'</pre>';
?>
 <iframe id="youtube_video" title="Youtube Video Player" width="<?php print $vars['width'] ?>" height="<?php print $vars['height'] ?>" src="http://www.youtube.com/embed/<?php echo $value ?>" frameborder="0" allowfullscreen></iframe>
  <div id="youtubechannel-player" style="width: <?php print $vars['width']; ?>px; height: <?php print $vars['height']; ?>px;">

<?php

else :
?>
  <h3><?php print t('Could not fetch videos from youtube channel.'); ?></h3>
<?php
endif;
?>
