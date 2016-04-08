'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.classList = factory();
  }
}(this, function () {

  function ClassList(elem) {
    if (!elem || elem.nodeType !== 1) {
      throw new Error('A DOM Element reference is required');
    }
    this.elem = elem;
    return this;
  }

  function trim(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/(^\s+|\s+$)/g, '');
  }

  ClassList.prototype = {
    constructor: ClassList,
    /**
     * Add specified class values. If these classes already exist in
     * attribute of the element, then they are ignored.
     *
     * @parame {[String]} ...
     * @return {[Context]}
     * @example add( String [, String] )
     */
    add: function() {
      for(var i=0, len=arguments.length; i<len; i++) {
        var className = trim(arguments[i] + '');
        if (!this.contains(className)) {
          this.elem.className += (this.elem.className === '' ? '' : ' ') + className;
        }
      }
      return this;
    },
    /**
     * Remove specified class values.
     *
     * @parame {[String]} ...
     * @return {[Context]}
     * @example remove( String [, String] )
     */
    remove: function() {
      var newClass = ' ' + this.elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
      for (var i=0, len=arguments.length; i<len; i++) {
        var className = trim(arguments[i] + '');
        if (this.contains(className)) {
          while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
          }
          this.elem.className = trim(newClass);
        }
      }
      return this;
    },
    /**
     * When only one argument is present: Toggle class value;
     * i.e., if class exists then remove it, if not, then add it.
     *
     * When a second argument is present: If the second argument is true,
     * add specified class value, and if it is false, remove it.
     *
     * @param  {[String]} str
     * @param  {[Boolean]} force
     * @return {[Context]}
     */
    toggle: function(str, force) {
      str += '';
      if (force === true) return this.add(str);
      if (force === false) return this.remove(str);

      return this[this.contains(str) ? 'remove' : 'add'](str);
    },
    /**
     * Checks if specified class value exists in class attribute of the element.
     *
     * @param  {[String]} specified class value
     * @return {[Boolean]}
     */
    contains: function(str) {
      return new RegExp(' ' + trim(str) + ' ').test(' ' + this.elem.className + ' ');
    }
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return function(elem) {
    return new ClassList(elem);
  };
}));
