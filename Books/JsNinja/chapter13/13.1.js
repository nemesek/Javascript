(function(){
		// checks for the DOM Model
	if(document.addEventListener){
		// creates a bind function using DOM Model
		this.addEvent = function(elem, type, fn){
			elem.addEventListener(type,fn,false);
			return fn;
		};

		this.removeEvent = function(elem, type, fn){
			elem.removeEventListener(type, fn, false);
		};
	} else if(document.attachEvent){
		// IE Model
		this.addEvent = function(elem, type, fn){
			var bound = function(){
				return fn.apply(elem, arguments);	// creates a bind function using IE Model
			};
			elem.attachEvent("on" + type, bound);
			return bound;
		};

		this.removeEvent = function(elem, type, fn){	// creates an unbind function using IE Model
			elem.detachEvent("on" + type, fn);
		};
	}
})();


