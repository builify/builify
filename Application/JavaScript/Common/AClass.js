

/*function AClass (element) {
  console.log(this);
  this._classListSupported = true;
  this._element = element;
}

AClass.prototype = {
  _isValidElement () {
    return true;
  },

  _isString (string) {
    return Object.prototype.toString.call(string).slice(8, -1) === 'String';
  },

  has (cx) {
    if (this._isValidElement && this._isString(cx)) {
      if (this._classListSupported) {
        return this.element.classList.contains(cx);
      }
    }
  },

  add (classNames) {
    if (this._isValidElement) {
      if (this._isString(classNames)) {
        classNames = classNames.split(' ');

        if (this._classListSupported) {
          for (var i = 0; i < classNames.length; i++) {
            this._element.classList.add(classNames[i]);
          }
        }
      }
    }
  },

  remove (classNames) {
    if (this._isValidElement) {
      if (this._isString(classNames)) {
        classNames = classNames.split(' ');

        if (this._classListSupported) {
          for (var i = 0; i < classNames.length; i++) {
            this._element.classList.remove(classNames[i]);
          }
        }
      }
    }
  },
}

export default AClass;*/
