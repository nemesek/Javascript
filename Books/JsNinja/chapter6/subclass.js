
(function(){
	var initializing = false, 
	superPattern = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/; // This regex dtermines if functions can be serialized

	Object.subClass = function(properties){	// Adds a subClass() method to Object
		var _super = this.prototype;

		// instantiates the superclass
		initializing = true;
		var proto = new this();
		initializing = false;

		for(var name in properties){
			proto[name] = typeof properties[name] == "function" && typeof _super[name] == "function"
				&& superPattern.test(properties[name]) ? 
				(function(name, fn){	// defines an overriding function
					return function(){
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					}
				})(name, properties[name]) : properties[name];
		}

		function Class(){	// Creates a dummy class constructor
			// All constructor is actually done in the init method
			if(!initializing && this.init){
				this.init.apply(this,arguments);
			}
		}

		// Populates the class prototype
		Class.prototype = proto;

		// Overrids the constructor reference
		Class.constructor = Class;

		// Makes the class extendable
		Class.subClass = arguments.callee;	
		return Class;
	};
})();
