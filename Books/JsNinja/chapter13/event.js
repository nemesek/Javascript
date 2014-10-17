(function(){
  var nextGuid = 1;

  this.addEvent = function(elem, type, fn){
    var data = getData(elem);

    // creates handler storage
    if(!data.handlers) data.handlers = {};

    // creates array by type
    if(!data.handlers[type]){
      data.handlers[type] = [];
    }


    // Marks instrumented functions
    if(!fn.guid) fn.guid = nextGuid++;

    // Adds handler to list
    data.handlers[type].push(fn);

    // creates uber-handler(dispatcher)
    if(!data.dispatcher){
      data.disabled = false;
      data.dispatcher = function(event){
        if(data.disabled) return;
        event = fixEvent(event);

        // calls registered handlers
        var handlers = data.handlers[event.type];
        if(handlers){
          for(var n = 0; n < handlers.length; n++){
            handlers[n].call(elem, event);
          }
        }
      };
    }

    if(data.handlers[type].length == 1){
      if(document.addEventListener){
        elem.addEventListener(type, data.dispatcher, false);
      }
      else if(document.attachEvent){
        elem.attachEvent("on" + type, data.dispatcher);
      }
    }
  };
})();

function tidyUp(elem, type){
  function isEmpty(object){ // Detects empty objects
    for(var prop in object){
      return false;
    }

    return true;
  }

  var data = getData(elem);

  // Checks for type handlers
  if(data.handlers[type].length === 0){
    delete data.handlers[type];

    if(document.removeEventListener){
      elem.removeEventListener(type, data.dispatcher, false);
    }
    else if (document.detachEvent){
      elem.detachEvent("on" + type, data.dispatcher);
    }
  }

  // Checks for any handlers
  if(isEmpty(data.handlers)){
    delete data.handlers;
    delete data.dispatcher;
  }

  // Checks if data is needed at all
  if(isEmpty(data)){
    removeData(elem);
  }
}

this.removeEvent = function(elem, type, fn){
  // fetches teh associated element data
  var data = getData(elem);

  // short-circuits if there's nothing to do
  if(!data.handlers) return;

  // sets up a utility function
  var removeType = function(t){
    data.handlers[t] = [];
    tidyUp(elem,t);
  };

  // Removes all bound handlers
  if(!type){
    for(var t in data.handlers) removeType(t);
    return;
  }

  // Finds all handlers for a type
  var handlers = data.handlers[type];
  if(!handlers) return;

  // removes all handlers for a type
  if(!fn){
    removeType(type);
    return;
  }

  // removes one bound handler
  if(fn.guid){
    for(var n = 0; n < handlers.length; n++){
      if(handlers[n].guid === fn.guid){
        handlers.splice(n--,1);
      }
    }
  }
  tidyUp(elem,type);
};
