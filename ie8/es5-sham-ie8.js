
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.3/LICENSE
 */
/*eslint-disable*/
 var call = Function.prototype.call;
 var prototypeOfObject = Object.prototype;
 var owns = call.bind(prototypeOfObject.hasOwnProperty);

 // If JS engine supports accessors creating shortcuts.
 var defineGetter;
 var defineSetter;
 var lookupGetter;
 var lookupSetter;
 var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
 if (supportsAccessors) {
     /*eslint-disable no-underscore-dangle */
     defineGetter = call.bind(prototypeOfObject.__defineGetter__);
     defineSetter = call.bind(prototypeOfObject.__defineSetter__);
     lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
     lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
     /*eslint-enable no-underscore-dangle */
 }

 if (!Object.freeze) {
     Object.freeze = function freeze(object) {
         if (Object(object) !== object) {
             throw new TypeError('Object.freeze can only be called on Objects.');
         }
         // this is misleading and breaks feature-detection, but
         // allows "securable" code to "gracefully" degrade to working
         // but insecure code.
         return object;
     };
 }
 if (!Object.create) {

     // Contributed by Brandon Benvie, October, 2012
     var createEmpty;
     var supportsProto = !({ __proto__: null } instanceof Object);
                         // the following produces false positives
                         // in Opera Mini => not a reliable check
                         // Object.prototype.__proto__ === null
     /*global document */
     if (supportsProto || typeof document === 'undefined') {
         createEmpty = function () {
             return { __proto__: null };
         };
     } else {
         // In old IE __proto__ can't be used to manually set `null`, nor does
         // any other method exist to make an object that inherits from nothing,
         // aside from Object.prototype itself. Instead, create a new global
         // object and *steal* its Object.prototype and strip it bare. This is
         // used as the prototype to create nullary objects.
         createEmpty = function () {
             var iframe = document.createElement('iframe');
             var parent = document.body || document.documentElement;
             iframe.style.display = 'none';
             parent.appendChild(iframe);
             /*eslint-disable no-script-url */
             iframe.src = 'javascript:';
             /*eslint-enable no-script-url */
             var empty = iframe.contentWindow.Object.prototype;
             parent.removeChild(iframe);
             iframe = null;
             delete empty.constructor;
             delete empty.hasOwnProperty;
             delete empty.propertyIsEnumerable;
             delete empty.isPrototypeOf;
             delete empty.toLocaleString;
             delete empty.toString;
             delete empty.valueOf;
             /*eslint-disable no-proto */
             empty.__proto__ = null;
             /*eslint-enable no-proto */

             var Empty = function Empty() {};
             Empty.prototype = empty;
             // short-circuit future calls
             createEmpty = function () {
                 return new Empty();
             };
             return new Empty();
         };
     }

     Object.create = function create(prototype, properties) {

         var object;
         var Type = function Type() {}; // An empty constructor.

         if (prototype === null) {
             object = createEmpty();
         } else {
             if (typeof prototype !== 'object' && typeof prototype !== 'function') {
                 // In the native implementation `parent` can be `null`
                 // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                 // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                 // like they are in modern browsers. Using `Object.create` on DOM elements
                 // is...err...probably inappropriate, but the native version allows for it.
                 throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
             }
             Type.prototype = prototype;
             object = new Type();
             // IE has no built-in implementation of `Object.getPrototypeOf`
             // neither `__proto__`, but this manually setting `__proto__` will
             // guarantee that `Object.getPrototypeOf` will work as expected with
             // objects created using `Object.create`
             /*eslint-disable no-proto */
             object.__proto__ = prototype;
             /*eslint-enable no-proto */
         }

         if (properties !== void 0) {
             Object.defineProperties(object, properties);
         }

         return object;
     };
 }


 var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
     try {
         Object.defineProperty(object, 'sentinel', {});
         return 'sentinel' in object;
     } catch (exception) {
         return false;
     }
 };

 // check whether defineProperty works if it's given. Otherwise,
 // shim partially.
 if (Object.defineProperty) {
     var definePropertyWorksOnObject = doesDefinePropertyWork({});
     var definePropertyWorksOnDom = typeof document === 'undefined' ||
         doesDefinePropertyWork(document.createElement('div'));
     if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
         var definePropertyFallback = Object.defineProperty,
             definePropertiesFallback = Object.defineProperties;
     }
 }
 if (!Object.defineProperty || definePropertyFallback) {
     var definePropertyFallback = Object.defineProperty;
     var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
     var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
     var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';

     Object.defineProperty = function defineProperty(object, property, descriptor) {
         if ((typeof object !== 'object' && typeof object !== 'function') || object === null) {
             throw new TypeError(ERR_NON_OBJECT_TARGET + object);
         }
         if ((typeof descriptor !== 'object' && typeof descriptor !== 'function') || descriptor === null) {
             throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
         }
         // make a valiant attempt to use the real defineProperty
         // for I8's DOM elements.
         if (definePropertyFallback) {
             try {
                 return definePropertyFallback.call(Object, object, property, descriptor);
             } catch (exception) {
                 // try the shim if the real one doesn't work
             }
         }

         // If it's a data property.
         if ('value' in descriptor) {
             // fail silently if 'writable', 'enumerable', or 'configurable'
             // are requested but not supported
             /*
             // alternate approach:
             if ( // can't implement these features; allow false but not true
                 ('writable' in descriptor && !descriptor.writable) ||
                 ('enumerable' in descriptor && !descriptor.enumerable) ||
                 ('configurable' in descriptor && !descriptor.configurable)
             ))
                 throw new RangeError(
                     'This implementation of Object.defineProperty does not support configurable, enumerable, or writable.'
                 );
             */

             if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
                 // As accessors are supported only on engines implementing
                 // `__proto__` we can safely override `__proto__` while defining
                 // a property to make sure that we don't hit an inherited
                 // accessor.
                 /*eslint-disable no-proto */
                 var prototype = object.__proto__;
                 object.__proto__ = prototypeOfObject;
                 // Deleting a property anyway since getter / setter may be
                 // defined on object itself.
                 delete object[property];
                 object[property] = descriptor.value;
                 // Setting original `__proto__` back now.
                 object.__proto__ = prototype;
                 /*eslint-enable no-proto */
             } else {
                 object[property] = descriptor.value;
             }
         }
         return object;
     };
 }

 // ES5 15.2.3.7
 // http://es5.github.com/#x15.2.3.7
 if (!Object.defineProperties || definePropertiesFallback) {
     Object.defineProperties = function defineProperties(object, properties) {
         // make a valiant attempt to use the real defineProperties
         if (definePropertiesFallback) {
             try {
                 return definePropertiesFallback.call(Object, object, properties);
             } catch (exception) {
                 // try the shim if the real one doesn't work
             }
         }

         Object.keys(properties).forEach(function (property) {
             if (property !== '__proto__') {
                 Object.defineProperty(object, property, properties[property]);
             }
         });
         return object;
     };
 }
 var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
     try {
         object.sentinel = 0;
         return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
     } catch (exception) {
         return false;
     }
 };

 //check whether getOwnPropertyDescriptor works if it's given. Otherwise,
 //shim partially.
 if (Object.defineProperty) {
     var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
     var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' ||
     doesGetOwnPropertyDescriptorWork(document.createElement('div'));
     if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
         var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
     }
 }

 if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
     var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';

     /*eslint-disable no-proto */
     Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
         if ((typeof object !== 'object' && typeof object !== 'function') || object === null) {
             throw new TypeError(ERR_NON_OBJECT + object);
         }

         // make a valiant attempt to use the real getOwnPropertyDescriptor
         // for I8's DOM elements.
         if (getOwnPropertyDescriptorFallback) {
             try {
                 return getOwnPropertyDescriptorFallback.call(Object, object, property);
             } catch (exception) {
                 // try the shim if the real one doesn't work
             }
         }

         var descriptor;

         // If object does not owns property return undefined immediately.
         if (!owns(object, property)) {
             return descriptor;
         }

         // If object has a property then it's for sure both `enumerable` and
         // `configurable`.
         descriptor = { enumerable: true, configurable: true };

         // If JS engine supports accessor properties then property may be a
         // getter or setter.
         if (supportsAccessors) {
             // Unfortunately `__lookupGetter__` will return a getter even
             // if object has own non getter property along with a same named
             // inherited getter. To avoid misbehavior we temporary remove
             // `__proto__` so that `__lookupGetter__` will return getter only
             // if it's owned by an object.
             var prototype = object.__proto__;
             var notPrototypeOfObject = object !== prototypeOfObject;
             // avoid recursion problem, breaking in Opera Mini when
             // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
             // or any other Object.prototype accessor
             if (notPrototypeOfObject) {
                 object.__proto__ = prototypeOfObject;
             }

             var getter = lookupGetter(object, property);
             var setter = lookupSetter(object, property);

             if (notPrototypeOfObject) {
                 // Once we have getter and setter we can put values back.
                 object.__proto__ = prototype;
             }

             if (getter || setter) {
                 if (getter) {
                     descriptor.get = getter;
                 }
                 if (setter) {
                     descriptor.set = setter;
                 }
                 // If it was accessor property we're done and return here
                 // in order to avoid adding `value` to the descriptor.
                 return descriptor;
             }
         }

         // If we got this far we know that object has an own property that is
         // not an accessor so we set it as a value and return descriptor.
         descriptor.value = object[property];
         descriptor.writable = true;
         return descriptor;
     };
     /*eslint-enable no-proto */
 }

 // ES5 15.2.3.4
 // http://es5.github.com/#x15.2.3.4
 if (!Object.getOwnPropertyNames) {
     Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
         return Object.keys(object);
     };
 }

 if (!Object.getPrototypeOf) {
     // https://github.com/es-shims/es5-shim/issues#issue/2
     // http://ejohn.org/blog/objectgetprototypeof/
     // recommended by fschaefer on github
     //
     // sure, and webreflection says ^_^
     // ... this will nerever possibly return null
     // ... Opera Mini breaks here with infinite loops
     Object.getPrototypeOf = function getPrototypeOf(object) {
         /*eslint-disable no-proto */
         var proto = object.__proto__;
         /*eslint-enable no-proto */
         if (proto || proto === null) {
             return proto;
         } else if (object.constructor) {
             return object.constructor.prototype;
         } else {
             return prototypeOfObject;
         }
     };
}