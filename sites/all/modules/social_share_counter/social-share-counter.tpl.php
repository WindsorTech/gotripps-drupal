<?php

/**
 * @file
 * Default theme implementation to present share button.
 */
?>

<div class="count">
	<div class="counts">{total}</div>
	<span class="sharetext"><?php print $data['count_text'];?></span>
</div>
<div class="share-button-wrapper">
<a class="facebook" href="#">
	<span class="fa-facebook-square">
		<span	class="expanded-text"><?php print $data['button_text']['facebook'];?></span>
		<span	class="alt-text-facebook">Share</span>
	</span>
</a>
<a class="twitter" href="#">
	<span class="fa-twitter">
		<span class="expanded-text-twitter"><?php print $data['button_text']['twitter'];?></span>
		<span	class="alt-text-tweet">Tweet</span>
	</span>
</a>
<div class="secondary">
	<a class="googleplus" href="#">
		<span class="fa-google-plus "></span>
	</a>
	<a class="linkedin" href="#">
		<span class="fa-linkedin-square "></span>
	</a>
	<a class="stumbleupon" href="#">
		<span class="fa-stumbleupon "></span>
	</a>
	<a class="pinterest" href="#">
		<span class="fa-pinterest "></span>
	</a>
	<a class="switch2" href="#"></a>
</div>
<a class="switch" href="#"></a>
</div>