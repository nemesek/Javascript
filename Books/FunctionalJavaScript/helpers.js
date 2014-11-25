function existy(x){return x != null};
function truthy(x){return (x !== false) && existy(x)};
function fail(thing){
  throw new Error(thing);
}

function warn(thing){
  console.log(['WARNING:', thing].join(' '));
}

function note(thing){
  console.log(['NOTE:', thing].join(' '));
}

function doWhen(cond, action){
  if(truthy(cond))
    return action();
  else
    return undefined;
}
function checker(){
  var validators = _.toArray(arguments);

  return function(obj){
    return _.reduce(validators, function(errs, check){
      if(check(obj))
        return errs;
      else
        return _.chain(errs).push(check.message).value();
    },[]);
  };
}
// better to have a specific api for creating api's rather than setting a
// message property
function validator(message, fun){
  var f = function(){
    return fun.apply(fun, arguments);
  };

  f['message'] = message;
  return f;
}
// this function takes a method and returns a function
// that will invoke that method on any object given
function invoker(NAME, METHOD){

  return function(target /* args...*/){
    if(!existy(target)) fail("Must provide a target");

    var targetMethod = target[NAME];

    var args = _.rest(arguments);

    return doWhen((existy(targetMethod) && METHOD === targetMethod),
      function(){
        return targetMethod.apply(target, args);
      });
  };
}

// this function is a 'combinator'
function always(VALUE){
  return function(){
    return VALUE;
  };
}

function cat(){
  var head = _.first(arguments);

  if(existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

function construct(head, tail){
  return cat([head], _.toArray(tail));
}

function isa(type, action){
  return function(obj){
    if(type === obj.type){
      return action(obj);
    }
  };
}

// this can be handled better via partial application
// now applicative
function mapcat(fun, coll){
  return cat.apply(null, _.map(coll, fun));
}

function complement(PRED){
  return function(){
    return !PRED.apply(null, _.toArray(arguments));
  };
}

// example of a function that partially applies its first arg
// observe that the function returned from partial1 captures the arg1
// from the original call and puts it at the front of the arg list
// of the executing call
function partial1(fun, arg1){
  return function(){
    var args = construct(arg1, arguments);
    return fun.apply(fun, args);
  };
}
