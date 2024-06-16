<?php

/**
 * @file
 * Theme file to display youtubechannel.
 */

if ($vars['content']) :
?>
<script language="javascript">
 
function scrollToTop() {
    window.scroll(0, 0);
}


</script>

<script>
$j = jQuery.noConflict();
$j(document).ready(function(){

	// hide #back-top first
	$j("#back-top").hide();
	
	// fade in #back-top
	$j(function () {
		$j(window).scroll(function () {
			if ($j(this).scrollTop() > 100) {
				$j('#back-top').fadeIn();
			} else {
				$j('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$j('#back-top a').click(function () {
			$j('body,html,div').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});
</script>

<script>
jQuery(document).ready(function($) {
  $("#youtubechannel-list li").click(function(){ 
      if ($("#youtubechannel-list li").hasClass('active')) {
        $("#youtubechannel-list li").removeClass('active'); 
      }
    $(this).addClass('active');
 });
});
</script> 
<style>
/*
Back to top button 
*/
#back-top {
	position: fixed;
	bottom: 30px;
	margin-left: -150px;
}
#back-top a {
	width: 108px;
	display: block;
	text-align: center;
	font: 11px/100% Arial, Helvetica, sans-serif;
	text-transform: uppercase;
	text-decoration: none;
	color: #bbb;
	/* background color transition */
	-webkit-transition: 1s;
	-moz-transition: 1s;
	transition: 1s;
}
#back-top a:hover {
	color: #000;
}
/* arrow icon (span tag) */
#back-top span {
	 background: url("../sites/all/modules/youtubechannel/up-arrow.png") no-repeat scroll center center #DDDDDD;
    border-radius: 15px 15px 15px 15px;
    display: block;
    height: 108px;
    margin-bottom: 7px;
    transition: all 1s ease 0s;
    width: 108px;
}
#back-top a:hover span {
	background-color: #777;
}
</style>




<div id="top">
  <div id="youtubechannel-player" style="width: <?php print $vars['width']; ?>px; height: <?php print $vars['height']; ?>px;">
  
    <iframe  id="youtubechannel-frame" title="Youtube Video Player" width="<?php print $vars['width'] ?>" height="<?php print $vars['height'] ?>" src="" frameborder="0" allowfullscreen autoplay="1"></iframe>
  </div>
  </div>

  <div id="youtubechannel-list" class="youtubechannel-list" style="width: <?php print $vars['width']; ?>px; height:<?php print $vars['height']; ?>px;">
    <ul>
    
      <?php foreach ($vars['content'] as $key => $value) : ?>
      <li ><a  class="btn11" href="#<?php print $key; ?>"  onclick="scrollToTop()"><?php print $value; ?></a> </li>
      <?php endforeach; ?>
    </ul>
  </div>
   <p id="back-top">
		<a href="#top"><span></span>Back to Top</a>
	</p>

<?php

else :
?>
  <h3><?php print t('Could not fetch videos from youtube channel.'); ?></h3>
<?php
endif;
?>
