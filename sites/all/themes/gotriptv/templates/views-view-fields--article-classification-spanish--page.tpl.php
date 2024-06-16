<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<?php foreach ($fields as $id => $field): ?>
  <?php //echo '<pre>'; print_r($id); echo '</pre>';?>
    <?php if (!empty($field->separator)): ?>
    <?php //print $field->separator; ?>
  <?php endif; ?>
  <?php print $field->wrapper_prefix; ?>
    <?php //print $field->label_html; ?>
    <?php// print $field->content; ?>

    <!--jitendra jha-->
     <?php 

      global $base_url;
           global $language;
           $image_uri=$row->field_field_image[0]['rendered']['#item']['uri'];
           $image = theme('image_style',array(
                  'style_name' => 'travel-image-style',
                  'path' => $image_uri,
                  'alt'=>'travel'
                )
              );
      ?>

    <?php if ($id == 'field_image') { ?>
    <div class="column threecol">
      <div class="tour-thumb-container">
        <div class="tour-thumb">
          <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$row->nid); ?>">
            <?php echo $image; ?>
          </a>

          <div class="tour-caption">
            <h5 class="tour-title">
              <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$row->nid); ?>">
                <?php echo $row->node_title; ?>
              </a>
            </h5>
            <div class="tour-meta">
              <div class="tour-destination">
                <a href="<?php echo $base_url.'/'.$language->language.'/'.drupal_get_path_alias('node/'.$row->nid); ?>" rel="tag"><?php print t('Read More'); ?></a>
              </div>
              <div class="tour-duration"></div>
            </div>
          </div>      
        </div>
        <div class="block-background"></div>
      </div>
    </div> 

<!--closed jitendra-->
    <?php }/*foreach($field->handler->view->result as $res){
echo $res->node_title;
}*/
//echo 'Title:'.$row->node_title;
//echo '<br> image uri: <img src="'. file_create_url($row->field_field_image[0]['rendered']['#item']['uri']).'"/>';

?>
  



  <?php print $field->wrapper_suffix; ?>
<?php endforeach; ?>
<?php //echo '<pre>'; print_r($row);echo '</pre>'; exit; ?>