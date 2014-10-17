function triggerEvent(elem, event){
  // fetches element data and reference to parent for bubbling
  var elemData = getData(elem), parent = elem.parentNode || elem.ownerDocument;

  // If the event name was passed as a string, creates an event out of it
  if(typeof event === "string"){
    event = {type:event, target:elem};
  }

  // Normalizes event properties
  event = fixEvent(event);

  // if the passed element has a dispatcher, executes the established handlers
  if(elemData.dispatcher){
    elemData.dispatcher.call(elem, event);
  }

  // Unless explicitly stopped recursively calls the funcition to bubble
  // the event up the DOM
  if(parent && !event.isPropogationStopped()){
    triggerEvent(parent, event);
  }
  else if(!parent && !event.isDefaultPrevented()){
    // checks if the target has default action for this event
    var targetData = getData(event.target);

    if(event.target[event.type]){
      target.disabled = true; // temporarily disables event dispatching on the target because we've already executed handler

      // Executes any default action
      event.target[event.type]();

      // reenable event dispatching
      target.disabled = false;
    }
  }
}
