const TPStylesheet = (function () {
  let privateProps = new WeakMap();

  var camel = /([a-z])([A-Z])/g;
  var hyphens = '$1-$2';
function parseStyles (styles) {
  if (typeof styles === 'string') {
    return styles;
  }
  if (Object.prototype.toString.call(styles) !== '[object Object]') {
    return '';
  }
  return Object.keys(styles).map(function (key) {
    var prop = key.replace(camel, hyphens).toLowerCase();
    return prop + ':' + styles[key];
  }).join(';');
}


  class TPStylesheet {
    constructor () {
      privateProps.set(this, {
        stylesheet: this._initializeStyleElement()
      });
      
      this.add([
        ['h2', // Also accepts a second argument as an array of arrays instead
          ['color', 'red'],
          ['background-color', 'green', true] // 'true' for !important rules
        ],
        ['.myClass',
          ['background-color', 'yellow']
        ]
      ]);

      console.log(privateProps.get(this).stylesheet);
    }

    _isObject (obj) {
      return !!(obj !== null && typeof obj === 'object');
    }

    _isArray (arr) {
      return !(Array.isArray(arr));
    }

    _initializeStyleElement () {
      let style = document.createElement('style');

      style.type = 'text/css';
      style.appendChild(document.createTextNode(''));

      document.head.appendChild(style);

      return style.sheet;
    }

    _insertRule (selector, styles) {
      const sheet = privateProps.get(this).stylesheet;
      const len = sheet.cssRules.length;

      if (sheet.insertRule) {
        sheet.insertRule(`${selector} { ${styles} }`, len);
      }
    }

    _insertArrayRules (rules) {
      for (var i = 0, rl = rules.length; i < rl; i++) {
        var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';

        if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
          rule = rule[1];
          j = 0;
        }

        for (var pl = rule.length; j < pl; j++) {
          var prop = rule[j];
          propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
        }

        this._insertRule(selector, propStr);
      }
    }

    add () {
      const args = arguments;
      const argsLen = args.length;

      if (argsLen === 1) {
        const firstArg = args[0];

        if (this._isArray(firstArg)) {
          this._insertArrayRules(firstArg);
        }
      } else if (argsLen === 2) {
        const firstArg = args[0];
        const secondArg = args[1];

        if (firstArg && this._isObject(secondArg)) {
          const css = parseStyles(secondArg);
          this._insertRule(firstArg, css);
        }
      }
    }
  }

  function add (selector, styles) {
    var css = parseStyles(styles);
    var sheet = getStylesheet();
    var len = sheet[rules].length;
    if (sheet.insertRule) {
      sheet.insertRule(selector + '{' + css + '}', len);
    } else if (sheet.addRule) {
      sheet.addRule(selector, css, len);
    }
  }

  return TPStylesheet;
})();

export default TPStylesheet;


/*
for (var i = 0, rl = rules.length; i < rl; i++) {
    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }

    // Insert CSS Rule
    styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
  }
addStylesheetRules([
  ['h2', // Also accepts a second argument as an array of arrays instead
    ['color', 'red'],
    ['background-color', 'green', true] // 'true' for !important rules
  ],
  ['.myClass',
    ['background-color', 'yellow']
  ]
])
export default class TPStylesheet {
  constructor () {
    this.initializeStylesheetElement();
  }

  initializeStylesheetElement () {

  }
}
let Person = (function () {
  let privateProps = new WeakMap();

  class Person {
    constructor(name) {
      this.name = name; // this is public
      privateProps.set(this, {age: 20}); // this is private
    }
    greet() {
      // Here we can access both name and age
      console.log(`name: ${this.name}, age: ${privateProps.get(this).age}`);
    }
  }

  return Person;
})();
/*
const style = new TPStylesheet(<option target element to append>); // Creates <style> Place holder for styles

style.add('a:hover{color:#eee}');
style.property('#header', "color": "#000");

ss("#header").property("color", "#000"); will change the header text colour to red. And, ss("a:hover{color:#eee}"); will create a

style.addCSS({
  body: {
    color: #333
    width: '55px'
  }
}
});

or

style.set("body { color: #333; width: 55px }");

style.remove('body, html')

or

style.removeCSS(['body', 'html'])

style.removeAllCSS();

*

function TPStylesheet () {
  this._initializeStyleElement();
}

TPStylesheet.prototype._initializeStyleElement = function () {

};

TPStylesheet.prototype.addCSS = function () {

};

TPStylesheet.prototype.removeCSS = function () {

}

TPStylesheet.prototype.removeAllCSS = function () {

}*/
