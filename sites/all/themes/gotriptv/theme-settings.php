<?php
function gotriptv_form_system_theme_settings_alter(&$form, &$form_state) {
  	$form['#submit'][] = 'gotriptv_settings_form_submit';
	// Get all themes.
	$themes = list_themes();
	// Get the current theme
	$active_theme = $GLOBALS['theme_key'];
	$form_state['build_info']['files'][] = str_replace("/$active_theme.info", '', $themes[$active_theme]->filename) . '/theme-settings.php';
    $form['copyright_text'] = array(
      '#type'          => 'textfield',
      '#title'         => t('Copyright Text'),
      '#default_value' => theme_get_setting('copyright_text'),
      '#description'   => t("The Copyright Text at the footer of the theme."),
    );
    $form['site_bg'] = array(
	    '#title' => t('Site Background'),
	    '#description' => t('A small background image for certain site sections.'),
	    '#type' => 'managed_file',
	    '#upload_location' => 'public://site-bg/',
	    '#upload_validators' => array(
	    	'file_validate_extensions' => array('gif png jpg jpeg'), 	
	    ),
	    '#default_value' => theme_get_setting('site_bg'),
  	);
  	$form['menu_nav_color'] = array(
      '#type' => 'jquery_colorpicker',
      '#title' => t('Menu Navigation Link Color'),
      '#default_value' => theme_get_setting('menu_nav_color'),
     );
	$form['header_top_color'] = array(
      '#type' => 'jquery_colorpicker',
      '#title' => t('Header Top Color'),
      '#default_value' => theme_get_setting('header_top_color'),
     );
     $form['user_defined_colr'] = array(
      '#type' => 'jquery_colorpicker',
      '#title' => t('Text Color'),
      '#default_value' => theme_get_setting('user_defined_colr'),
     );


    $form['user_defined_hover_color'] = array(
      '#type' => 'jquery_colorpicker',
      '#title' => t('Hover Color'),
      '#default_value' => theme_get_setting('user_defined_hover_color'),
     );
    
}
function gotriptv_settings_form_submit(&$form, $form_state) {
	$image_fid = $form_state['values']['site_bg'];
	$image = file_load($image_fid);
	if (is_object($image)) {
	    // Check to make sure that the file is set to be permanent.
		if ($image->status == 0) {
			// Update the status.
			$image->status = FILE_STATUS_PERMANENT;
			// Save the update.
			file_save($image);
			// Add a reference to prevent warnings.
			file_usage_add($image, 'gotriptv', 'theme', 1);
	    }
	}
}

?>
