<?php

/**
 * @file
 * Administrative functions to configure Social Share Counter.
 */

/**
 * Callback for admin/config/social_share_counter/configuration'.
 */
function social_share_counter_settings_form() {
  global $base_url;
  drupal_add_css(drupal_get_path('module', 'social_share_counter') . '/css/ssc-admin.css');
  $setting = social_share_counter_settings();
  if (!file_exists($setting['sharrre'])) {
    drupal_set_message(t('@sharrre not found. You must install <a href="https://github.com/Julienh/Sharrre/" target="_blank">jquery.sharrre.min.js</a> as per the installation instructions in the README file for this module to work', array('@sharrre' => $setting['sharrre'])), 'error');
  }
  $form = array();
  $form['general_setting'] = array(
    '#type'  => 'fieldset',
    '#title' => t('General Setting'),
    '#collapsible'  => TRUE,
    '#collapsed'    => FALSE,
  );
  $form['general_setting']['ssc_status'] = array(
    '#type' => 'radios',
    '#title' => t('Display Butons'),
    '#options' => array(1 => 'Enable', 2 => 'Disable'),
    '#default_value' => variable_get('ssc_status', 1),
  );
  $form['general_setting']['ssc_text_below_count'] = array(
    '#type' => 'textfield',
    '#title' => t('Text below Count'),
    '#default_value' => variable_get('ssc_text_below_count', 'Share'),
    '#size' => 26,
  );
  $form['general_setting']['ssc_min_to_show'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum Count to Show (Default is Zero)'),
    '#default_value' => variable_get('ssc_min_to_show', 0),
    '#size' => 26,
  );
  $form['general_setting']['ssc_ga_tracking'] = array(
    '#type' => 'radios',
    '#title' => t('Enable Google Analytics Tracking'),
    '#description' => t('Read More:<a href="https://support.google.com/analytics/answer/1683971?hl=en">Social Interaction Analytics</a>'),
    '#options' => array(1 => 'Enable', 0 => 'Disable'),
    '#default_value' => variable_get('ssc_ga_tracking', 1),
  );
  $form['ssc_buttons'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Button Options'),
    '#collapsible'  => TRUE,
    '#collapsed'    => FALSE,
  );
  $form['ssc_buttons']['ssc_facebook_button_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Facebook'),
    '#default_value' => variable_get('ssc_facebook_button_text', 'Share on Facebook'),
    '#size' => 26,
  );
  $form['ssc_buttons']['ssc_facebook_twitter_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Twitter'),
    '#default_value' => variable_get('ssc_facebook_twitter_text', 'Share on Twitter'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Social Media'),
    '#collapsible'  => TRUE,
    '#collapsed'    => FALSE,
    '#description' => t('Enter your social media links here. This section is used throughout the site to display social media links to visitors.'),
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_facebook'] = array(
    '#type' => 'textfield',
    '#title' => t('Your Facebook Profile URL:'),
    '#default_value' => variable_get('ssc_follow_widget_profile_facebook', 'Facebook'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_twitter'] = array(
    '#type' => 'textfield',
    '#title' => t('Your Twitter Profile URL:'),
    '#default_value' => variable_get('ssc_follow_widget_profile_twitter', 'Twitter'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_google_plus'] = array(
    '#type' => 'textfield',
    '#title' => t('Your Google+ Profile URL:'),
    '#default_value' => variable_get('ssc_follow_widget_profile_google_plus', 'Google+'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_linkedin'] = array(
    '#type' => 'textfield',
    '#title' => t('Your LinkedIn+ Profile URL:'),
    '#default_value' => variable_get('ssc_social_media_profile_linkedin', 'LinkedIn'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_pinterest'] = array(
    '#type' => 'textfield',
    '#title' => t('Your Pinterest Profile URL:'),
    '#default_value' => variable_get('ssc_social_media_profile_pinterest', 'Pinterest'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_social_media_profile_stumbleupon'] = array(
    '#type' => 'textfield',
    '#title' => t('Your StumbleUpon Profile URL:'),
    '#default_value' => variable_get('ssc_social_media_profile_stumbleupon', 'StumbleUpon'),
    '#size' => 26,
  );
  $form['ssc_social_media_profile']['ssc_profile_rss'] = array(
    '#type' => 'textfield',
    '#title' => t('Your RSS Feed URL:'),
    '#default_value' => variable_get('ssc_profile_rss', 'RSS'),
    '#size' => 26,
  );
  $form['ssc_placement'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Placement'),
    '#collapsible'  => TRUE,
    '#collapsed'    => FALSE,
  );
  // Add checkboxes for each view mode of each bundle.
  $entity_info = entity_get_info('node');
  $modes = array();
  foreach ($entity_info['view modes'] as $mode => $mode_info) {
    $modes[$mode] = $mode_info['label'];
  }
  // Get a list of content types and view modes.
  $view_modes_selected = $setting['view_modes'];
  foreach ($entity_info['bundles'] as $bundle => $bundle_info) {
    $form['ssc_placement']['content']['ssc_' . $bundle . '_options'] = array(
      '#title' => t('%label View Modes', array('%label' => $bundle_info['label'])),
      '#description' => t('Select which view modes the Social Share Counter buttons should appear on for %label nodes.', array('%label' => $bundle_info['label'])),
      '#type' => 'checkboxes',
      '#options' => $modes,
      '#default_value' => $view_modes_selected[$bundle],
    );
  }
  $options = drupal_map_assoc(array(-100, -50, -25, -10, 0, 10, 25, 50, 100));
  $form['ssc_placement']['ssc_display_weight'] = array(
    '#type' => 'select',
    '#title' => t('Content weight'),
    '#required' => FALSE,
    '#options' => $options,
    '#default_value' => variable_get('ssc_display_weight', -10),
    '#description'   => t('Optional weight value determines the location on the page where it will appeared in the <strong>content</strong> section.'),
    '#states'        => array(
      // Show only if placement in "content" selected.
      'visible' => array(
        ':input[name="ssc_display_in_nodecont"]' => array('checked' => TRUE),
      ),
    ),
  );
  return system_settings_form($form);
}

/**
 * Default settings for Socail Share Counter.
 */
function social_share_counter_settings() {
  $lib = 'sharrre';
  $sharrre = libraries_get_path($lib) . '/jquery.sharrre.min.js';
  $settings['sharrre'] = $sharrre;

  $default_nodetypes = array("article" => "article", "page" => "page");
  $view_modes = array();
  foreach (array_keys(node_type_get_types()) as $type) {
    $view_modes[$type] = variable_get('ssc_' . $type . '_options', $default_nodetypes);
  }
  $settings['view_modes'] = $view_modes;
  return $settings;
}
