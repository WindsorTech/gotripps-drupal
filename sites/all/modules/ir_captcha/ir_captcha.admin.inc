<?php

/**
 * @file
 * Admin page callback file for Image-Recognition CAPTCHA.
 */

/**
 * Form constructor for the Image-Recognition CAPTCHA settings form.
 *
 * @see system_settings_form()
 *
 * @ingroup forms
 */
function ir_captcha_settings_form() {
  $form['ir_captcha_challenge_prompt'] = array(
    '#type' => 'textfield',
    '#title' => t('Challenge prompt'),
    '#default_value' => _ir_captcha_get_challenge_prompt(),
    '#maxlength' => 180,
  );
  $form['ir_captcha_num_correct_images'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of correct images to display'),
    '#default_value' => _ir_captcha_get_num_correct_images(),
    '#element_validate' => array('element_validate_integer_positive'),
    '#maxlength' => 2,
  );
  $form['ir_captcha_num_incorrect_images'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of incorrect images to display'),
    '#default_value' => _ir_captcha_get_num_incorrect_images(),
    '#element_validate' => array('element_validate_integer_positive'),
    '#maxlength' => 2,
  );
  $form['ir_captcha_correct_image_filenames'] = array(
    '#type' => 'textarea',
    '#title' => t('Correct image filenames'),
    '#default_value' => _ir_captcha_get_correct_image_filenames_value(),
    '#description' => t('Enter one filename per line.'),
  );
  $form['ir_captcha_incorrect_image_filenames'] = array(
    '#type' => 'textarea',
    '#title' => t('Incorrect image filenames'),
    '#default_value' => _ir_captcha_get_incorrect_image_filenames_value(),
    '#description' => t('Enter one filename per line.'),
  );
  return system_settings_form($form);
}

/****************************************************************************/
/* Settings retrieval functions                                             */
/****************************************************************************/

/**
 * Gets challenge prompt.
 */
function _ir_captcha_get_challenge_prompt() {
  $default_prompt = t("<strong>Select all images with trees:</strong>");
  $prompt = variable_get("ir_captcha_challenge_prompt", $default_prompt);
  return filter_xss($prompt);
}

/**
 * Gets number of correct images.
 */
function _ir_captcha_get_num_correct_images() {
  return variable_get("ir_captcha_num_correct_images", 4);
}

/**
 * Gets number of incorrect images.
 */
function _ir_captcha_get_num_incorrect_images() {
  return variable_get("ir_captcha_num_incorrect_images", 6);
}

/**
 * Gets correct image filenames value.
 */
function _ir_captcha_get_correct_image_filenames_value() {
  $variable = "ir_captcha_correct_image_filenames";
  $default = _ir_captcha_get_default_correct_image_filenames_value();
  return variable_get($variable, $default);
}

/**
 * Gets incorrect image filenames value.
 */
function _ir_captcha_get_incorrect_image_filenames_value() {
  $variable = "ir_captcha_incorrect_image_filenames";
  $default = _ir_captcha_get_default_incorrect_image_filenames_value();
  return variable_get($variable, $default);
}

/**
 * Gets default correct image filenames value.
 *
 * This value indicates which of the example images included with the module
 * are correct images.
 */
function _ir_captcha_get_default_correct_image_filenames_value() {
  return <<<FILENAMES
17176164967_c0299b827e_q.jpg
18687073593_007bafa5f9_q.jpg
20641855316_3c58f905e5_q.jpg
20644736879_f769830307_q.jpg
21144342704_9289950f64_q.jpg
22424798626_6294a1a79b_q.jpg
3627117850_6a7b3dfcfc_q.jpg
8712833016_a7267e477e_q.jpg
FILENAMES;
}

/**
 * Gets default incorrect image filenames value.
 *
 * This value indicates which of the example images included with the module
 * are incorrect images.
 */
function _ir_captcha_get_default_incorrect_image_filenames_value() {
  return <<<FILENAMES
14271019373_cd90616e56_q.jpg
14658197878_40363d2258_q.jpg
16348320424_ae0b32eae8_q.jpg
17086230399_ffc9eb99ed_q.jpg
17400161314_1668e84d2f_q.jpg
17797785119_a3cb910969_q.jpg
18621319575_ce229967ec_q.jpg
22142341995_5506618cac_q.jpg
FILENAMES;
}

/****************************************************************************/
/* Convenience functions for interpreting settings                          */
/****************************************************************************/

/**
 * Gets correct image filenames.
 *
 * @return string[]
 *   Correct image filenames.
 */
function _ir_captcha_get_correct_image_filenames() {
  $value = _ir_captcha_get_correct_image_filenames_value();
  return _ir_captcha_get_image_filenames_from_image_filenames_value($value);
}

/**
 * Gets incorrect image filenames.
 *
 * @return string[]
 *   Incorrect image filenames.
 */
function _ir_captcha_get_incorrect_image_filenames() {
  $value = _ir_captcha_get_incorrect_image_filenames_value();
  return _ir_captcha_get_image_filenames_from_image_filenames_value($value);
}

/**
 * Gets image filenames from an image filenames value.
 *
 * Converts the image filenames setting value into an array of
 * filenames, and returns that array.
 *
 * @param string $image_filenames_value
 *   An image filenames setting value.
 *
 * @return string[]
 *   Image filenames.
 */
function _ir_captcha_get_image_filenames_from_image_filenames_value($image_filenames_value) {
  $untrimmed_image_filenames = explode("\n", $image_filenames_value);
  $image_filenames = array_map('rtrim', $untrimmed_image_filenames);
  return $image_filenames;
}
