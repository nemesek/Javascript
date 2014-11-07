function Event(name){
  this.name = name;
  this.callbacks = [];
}
Event.prototype.registerCallback = function(callback){
  this.callbacks.push(callback);
}

function Reactor(){
  this.events = {};
  this.dispatchedEvents = [];

}

Reactor.prototype.registerEvent = function(eventName){
  // we will need to check for unique eventNames
  var event = new Event(eventName);
  this.events[eventName] = event;
};

Reactor.prototype.dispatchEvent = function(eventName, eventArgs){
    this.events[eventName].callbacks.forEach(function(callback){
      if(callback)callback(eventArgs);
  });

  this.dispatchedEvents.push(eventName);
};

Reactor.prototype.addEventListener = function(eventName, callback){

  for(var i = 0; i < this.dispatchedEvents.length; i++){
    if(this.dispatchedEvents[i] === eventName){
      console.log('event already dispatched');
      if(callback) callback();
    }
  }

  this.events[eventName].registerCallback(callback);
  var count = this.events[eventName].callbacks.length - 1;
  return count;

};

Reactor.prototype.removeEventListener = function(eventName, id){
  this.events[eventName].callbacks[id] = undefined;
};

Reactor.prototype.resetEvent = function(eventName){
  for(var i = 0; i < this.dispatchedEvents.length; i++){
    if(this.dispatchedEvents[i] === eventName){
      console.log('resetting event');
    }
  }
};
