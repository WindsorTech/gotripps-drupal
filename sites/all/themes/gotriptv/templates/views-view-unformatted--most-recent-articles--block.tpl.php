<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php $i = 0; ?>
<?php foreach ($rows as $id => $row): ?>
  <?php //if (($i%2) == 0) { ?>
	  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
	    <?php print $row; ?>
	  </div>  	
  <?php //} 
  //$i++; ?>
<?php endforeach; ?>
