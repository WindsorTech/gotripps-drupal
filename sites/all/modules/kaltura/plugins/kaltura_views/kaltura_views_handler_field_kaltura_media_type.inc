<?php

/**
 * Declaration of new field handler that extends the basic field handler of views module
 * We want to theme the duration field ourselvs.
 */
class kaltura_views_handler_field_kaltura_media_type extends views_handler_field_numeric {
  function render($values) {
    $kaltura_settings = new KalturaSettings();
    return  $kaltura_settings->{media_types_map}[$values->node_kaltura_kaltura_media_type];
  }
}


