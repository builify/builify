(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Actions\\ActionCreators.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getABuilderConfiguration = getABuilderConfiguration;
exports.receiveConfiguration = receiveConfiguration;
exports.proccessLocalization = proccessLocalization;

var _ConstantsActionTypes = require('../Constants/ActionTypes');

var ActionTypes = babelHelpers.interopRequireWildcard(_ConstantsActionTypes);

var _CommonABuilder = require('../Common/ABuilder');

var _CommonABuilder2 = babelHelpers.interopRequireDefault(_CommonABuilder);

function getABuilderConfiguration() {
  return function (dispatch, getState) {
    dispatch({
      type: ActionTypes.GET_BUILDER_CONFIGURATION
    });

    _CommonABuilder2['default'].getConfigration(function (data) {
      dispatch(receiveConfiguration(data));
      dispatch(proccessLocalization(data));
    });
  };
}

;

function receiveConfiguration(data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
}

;

function proccessLocalization(data) {
  return {
    type: ActionTypes.PROCCESS_LOCALIZATION,
    data: data
  };
}

;

},{"../Common/ABuilder":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\ABuilder.js","../Constants/ActionTypes":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Constants\\ActionTypes.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\ABuilder.json":[function(require,module,exports){
module.exports={
  "localization": "en",

  "templates": [
    {
      "title": "SimplPage",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, sit tempore officia quia quod, eius repudiandae modi, atque enim ad magnam saepe suscipit nihil necessitatibus cupiditate aspernatur perspiciatis eum accusamus?", 
      "image": "simplpage.jpg"
    }
  ],

  "primarynavigation": [
    {
      "id": "pages",
      "icon": "pe-7s-copy-file",
      "target": "pagestab"
    }
  ],

  "navigationtabs": {
    "pagestab": {
      "title": "Pages",
      "blocks": [
      ]
    }
  }
}
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\ABuilder.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ABuilderConfiguration = require('./ABuilder.json'),
    ABuilder = {};

ABuilder.getConfigration = function (callback) {
	callback(ABuilderConfiguration);
};

exports['default'] = ABuilder;
module.exports = exports['default'];

},{"./ABuilder.json":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\ABuilder.json"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\Localization.json":[function(require,module,exports){
module.exports={
  "en": {
    "primarynavigation": {
      "pages": "Pages"
    }
  }
}
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\Localization.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setLanguage = setLanguage;
exports.getString = getString;

var _UtilitiesDataManipulation = require('../Utilities/DataManipulation');

var languageData = require('./Localization.json');
var languageSetting = 'en';

function setLanguage(language) {
  languageSetting = language;
}

;

function getString(query) {
  if (!query) {
    return;
  } else {
    query = languageSetting.toString() + '.' + query;
  }

  var result = (0, _UtilitiesDataManipulation.getProperty)(languageData, query);

  if (typeof result !== 'undefined') {
    return result;
  } else {
    throw Error('Localization - "' + query + '" query not found!');
  }
}

;

},{"../Utilities/DataManipulation":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Utilities\\DataManipulation.js","./Localization.json":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\Localization.json"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Aside.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reduxReact = require('redux/react');

var _Logo = require('./Logo');

var _Logo2 = babelHelpers.interopRequireDefault(_Logo);

var Aside = (function () {
  function Aside() {
    babelHelpers.classCallCheck(this, _Aside);
  }

  babelHelpers.createClass(Aside, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'aside',
        { className: 'ab-aside' },
        _react2['default'].createElement(_Logo2['default'], null)
      );
    }
  }]);
  var _Aside = Aside;
  Aside = (0, _reduxReact.connect)(function () {
    return {};
  })(Aside) || Aside;
  return Aside;
})();

exports['default'] = Aside;
;
module.exports = exports['default'];

},{"./Logo":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Logo.js","react":"react","redux/react":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\react.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Base.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reduxReact = require('redux/react');

var _Aside = require('./Aside');

var _Aside2 = babelHelpers.interopRequireDefault(_Aside);

var _Main = require('./Main');

var _Main2 = babelHelpers.interopRequireDefault(_Main);

var Base = (function () {
  function Base() {
    babelHelpers.classCallCheck(this, _Base);
  }

  babelHelpers.createClass(Base, [{
    key: 'render',
    value: function render() {
      var data = this.props.data;

      return _react2['default'].createElement(
        'div',
        { className: 'react-wrap' },
        _react2['default'].createElement(_Aside2['default'], null),
        _react2['default'].createElement(_Main2['default'], null)
      );
    }
  }]);
  var _Base = Base;
  Base = (0, _reduxReact.connect)(function (state) {
    return {
      data: state.builderConfiguration
    };
  })(Base) || Base;
  return Base;
})();

exports['default'] = Base;
module.exports = exports['default'];

},{"./Aside":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Aside.js","./Main":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Main.js","react":"react","redux/react":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\react.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Logo.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var Logo = (function (_Component) {
  babelHelpers.inherits(Logo, _Component);
  babelHelpers.createClass(Logo, null, [{
    key: 'propTypes',
    value: {
      height: _react.PropTypes.number,
      width: _react.PropTypes.number,
      text: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      height: 50,
      width: 150,
      text: 'ABuilder'
    },
    enumerable: true
  }]);

  function Logo(props) {
    babelHelpers.classCallCheck(this, Logo);

    babelHelpers.get(Object.getPrototypeOf(Logo.prototype), 'constructor', this).call(this, props);
  }

  babelHelpers.createClass(Logo, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ab-logo', style: { 'height': this.props.height + 'px', 'width': this.props.width + 'px' } },
        _react2['default'].createElement(
          'div',
          { className: 'ab-logo__icon' },
          _react2['default'].createElement('div', { className: 'ab-logo__left' }),
          _react2['default'].createElement('div', { className: 'ab-logo__right' })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ab-logo__text' },
          this.props.text
        )
      );
    }
  }]);
  return Logo;
})(_react.Component);

exports['default'] = Logo;
;
module.exports = exports['default'];

},{"react":"react"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Main.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reduxReact = require('redux/react');

var Main = (function () {
  function Main() {
    babelHelpers.classCallCheck(this, _Main);
  }

  babelHelpers.createClass(Main, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('main', { className: 'ab-main' });
    }
  }]);
  var _Main = Main;
  Main = (0, _reduxReact.connect)(function () {
    return {};
  })(Main) || Main;
  return Main;
})();

exports['default'] = Main;
;
module.exports = exports['default'];

},{"react":"react","redux/react":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\react.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Constants\\ActionTypes.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactLibKeyMirror = require('react/lib/keyMirror');

var _reactLibKeyMirror2 = babelHelpers.interopRequireDefault(_reactLibKeyMirror);

exports['default'] = (0, _reactLibKeyMirror2['default'])({
  GET_BUILDER_CONFIGURATION: Symbol('GET_BUILDER_CONFIGURATION'),
  RECEIVE_BUILDER_CONFIGURATION: Symbol('RECEIVE_BUILDER_CONFIGURATION'),

  PROCCESS_LOCALIZATION: Symbol('PROCCESS_LOCALIZATION')
});
module.exports = exports['default'];

},{"react/lib/keyMirror":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\react\\lib\\keyMirror.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Containers\\Application.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _redux = require('redux');

var _reduxReact = require('redux/react');

var _StoresIndex = require('../Stores/Index');

var stores = babelHelpers.interopRequireWildcard(_StoresIndex);

var _ActionsActionCreators = require('../Actions/ActionCreators');

var ActionCreators = babelHelpers.interopRequireWildcard(_ActionsActionCreators);

var _ComponentsBase = require('../Components/Base');

var _ComponentsBase2 = babelHelpers.interopRequireDefault(_ComponentsBase);

var redux = (0, _redux.createRedux)(stores);
redux.dispatch(ActionCreators.getABuilderConfiguration());

var Application = (function (_React$Component) {
  babelHelpers.inherits(Application, _React$Component);

  function Application() {
    babelHelpers.classCallCheck(this, Application);
    babelHelpers.get(Object.getPrototypeOf(Application.prototype), 'constructor', this).apply(this, arguments);
  }

  babelHelpers.createClass(Application, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reduxReact.Provider,
        { redux: redux },
        function () {
          return _react2['default'].createElement(_ComponentsBase2['default'], null);
        }
      );
    }
  }]);
  return Application;
})(_react2['default'].Component);

exports['default'] = Application;
module.exports = exports['default'];

},{"../Actions/ActionCreators":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Actions\\ActionCreators.js","../Components/Base":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Components\\Base.js","../Stores/Index":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Stores\\Index.js","react":"react","redux":"redux","redux/react":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\react.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Main.js":[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _ContainersApplication = require('./Containers/Application');

var _ContainersApplication2 = babelHelpers.interopRequireDefault(_ContainersApplication);

_react2['default'].render(_react2['default'].createElement(_ContainersApplication2['default'], null), document.getElementById('react-js'));

},{"./Containers/Application":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Containers\\Application.js","react":"react"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Stores\\ABuilderStore.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = handle;

var _ConstantsActionTypes = require('../Constants/ActionTypes');

var _CommonLocalization = require('../Common/Localization');

function handle(state, action) {
  if (state === undefined) state = {};

  switch (action.type) {
    case _ConstantsActionTypes.RECEIVE_BUILDER_CONFIGURATION:
      return action.data;

    case _ConstantsActionTypes.PROCCESS_LOCALIZATION:
      var localizationSetting = action.data.localization || 'en';
      (0, _CommonLocalization.setLanguage)(localizationSetting);

      return state;

    default:
      return state;
  }
}

;
module.exports = exports['default'];

},{"../Common/Localization":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Common\\Localization.js","../Constants/ActionTypes":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Constants\\ActionTypes.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Stores\\Index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ABuilderStore = require('./ABuilderStore');

var _ABuilderStore2 = babelHelpers.interopRequireDefault(_ABuilderStore);

exports.builderConfiguration = _ABuilderStore2['default'];

},{"./ABuilderStore":"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Stores\\ABuilderStore.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Utilities\\DataManipulation.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getProperty = getProperty;

function getProperty(obj, prop) {
  var parts = prop.split('.'),
      last = parts.pop(),
      l = parts.length,
      i = 1,
      current = parts[0];

  while ((obj = obj[current]) && i < l) {
    current = parts[i];
    i++;
  }

  if (obj) {
    return obj[last];
  }
}

;

},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\react\\lib\\invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\react\\lib\\keyMirror.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

'use strict';

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))

},{"./invariant":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\react\\lib\\invariant.js","_process":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createAll.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = createAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createProvider = require('./createProvider');

var _createProvider2 = _interopRequireDefault(_createProvider);

var _createProvideDecorator = require('./createProvideDecorator');

var _createProvideDecorator2 = _interopRequireDefault(_createProvideDecorator);

var _createConnector = require('./createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

var _createConnectDecorator = require('./createConnectDecorator');

var _createConnectDecorator2 = _interopRequireDefault(_createConnectDecorator);

function createAll(React) {
  // Wrapper components
  var Provider = (0, _createProvider2['default'])(React);
  var Connector = (0, _createConnector2['default'])(React);

  // Higher-order components (decorators)
  var provide = (0, _createProvideDecorator2['default'])(React, Provider);
  var connect = (0, _createConnectDecorator2['default'])(React, Connector);

  return { Provider: Provider, Connector: Connector, provide: provide, connect: connect };
}

module.exports = exports['default'];
},{"./createConnectDecorator":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createConnectDecorator.js","./createConnector":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createConnector.js","./createProvideDecorator":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createProvideDecorator.js","./createProvider":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createProvider.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createConnectDecorator.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createConnectDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

var _utilsShallowEqualScalar = require('../utils/shallowEqualScalar');

var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

function createConnectDecorator(React, Connector) {
  var Component = React.Component;

  return function connect(select) {
    return function (DecoratedComponent) {
      return (function (_Component) {
        function ConnectorDecorator() {
          _classCallCheck(this, ConnectorDecorator);

          if (_Component != null) {
            _Component.apply(this, arguments);
          }
        }

        _inherits(ConnectorDecorator, _Component);

        ConnectorDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
          return !(0, _utilsShallowEqualScalar2['default'])(this.props, nextProps);
        };

        ConnectorDecorator.prototype.render = function render() {
          var _this = this;

          return React.createElement(
            Connector,
            { select: function (state) {
                return select(state, _this.props);
              } },
            function (stuff) {
              return React.createElement(DecoratedComponent, _extends({}, stuff, _this.props));
            }
          );
        };

        _createClass(ConnectorDecorator, null, [{
          key: 'displayName',
          value: 'Connector(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
          enumerable: true
        }, {
          key: 'DecoratedComponent',
          value: DecoratedComponent,
          enumerable: true
        }]);

        return ConnectorDecorator;
      })(Component);
    };
  };
}

module.exports = exports['default'];
},{"../utils/getDisplayName":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\getDisplayName.js","../utils/shallowEqualScalar":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\shallowEqualScalar.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createConnector.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createConnector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsIdentity = require('../utils/identity');

var _utilsIdentity2 = _interopRequireDefault(_utilsIdentity);

var _utilsShallowEqual = require('../utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsIsPlainObject = require('../utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function createConnector(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  return (function (_Component) {
    function Connector(props, context) {
      _classCallCheck(this, Connector);

      _Component.call(this, props, context);

      this.unsubscribe = context.redux.subscribe(this.handleChange.bind(this));
      this.state = this.selectState(props, context);
    }

    _inherits(Connector, _Component);

    Connector.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      return !this.isSliceEqual(this.state.slice, nextState.slice) || !(0, _utilsShallowEqual2['default'])(this.props, nextProps);
    };

    Connector.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
      var isRefEqual = slice === nextSlice;
      if (isRefEqual) {
        return true;
      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
        return isRefEqual;
      }
      return (0, _utilsShallowEqual2['default'])(slice, nextSlice);
    };

    Connector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (nextProps.select !== this.props.select) {
        // Force the state slice recalculation
        this.handleChange(nextProps);
      }
    };

    Connector.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribe();
    };

    Connector.prototype.handleChange = function handleChange() {
      var props = arguments[0] === undefined ? this.props : arguments[0];

      var nextState = this.selectState(props, this.context);
      this.setState(nextState);
    };

    Connector.prototype.selectState = function selectState(props, context) {
      var state = context.redux.getState();
      var slice = props.select(state);

      (0, _invariant2['default'])((0, _utilsIsPlainObject2['default'])(slice), 'The return value of `select` prop must be an object. Instead received %s.', slice);

      return { slice: slice };
    };

    Connector.prototype.render = function render() {
      var children = this.props.children;
      var slice = this.state.slice;
      var dispatch = this.context.redux.dispatch;

      return children(_extends({ dispatch: dispatch }, slice));
    };

    _createClass(Connector, null, [{
      key: 'contextTypes',
      value: {
        redux: PropTypes.object.isRequired
      },
      enumerable: true
    }, {
      key: 'propTypes',
      value: {
        children: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        select: _utilsIdentity2['default']
      },
      enumerable: true
    }]);

    return Connector;
  })(Component);
}

module.exports = exports['default'];
},{"../utils/identity":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\identity.js","../utils/isPlainObject":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\isPlainObject.js","../utils/shallowEqual":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\shallowEqual.js","invariant":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\node_modules\\invariant\\browser.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createProvideDecorator.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createProvideDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

function createProvideDecorator(React, Provider) {
  var Component = React.Component;

  return function provide(redux) {
    return function (DecoratedComponent) {
      return (function (_Component) {
        function ProviderDecorator() {
          _classCallCheck(this, ProviderDecorator);

          if (_Component != null) {
            _Component.apply(this, arguments);
          }
        }

        _inherits(ProviderDecorator, _Component);

        ProviderDecorator.prototype.render = function render() {
          var _this = this;

          return React.createElement(
            Provider,
            { redux: redux },
            function () {
              return React.createElement(DecoratedComponent, _this.props);
            }
          );
        };

        _createClass(ProviderDecorator, null, [{
          key: 'displayName',
          value: 'Provider(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
          enumerable: true
        }, {
          key: 'DecoratedComponent',
          value: DecoratedComponent,
          enumerable: true
        }]);

        return ProviderDecorator;
      })(Component);
    };
  };
}

module.exports = exports['default'];
},{"../utils/getDisplayName":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\getDisplayName.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createProvider.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports["default"] = createProvider;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function createProvider(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var reduxShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  });

  return (function (_Component) {
    function Provider(props, context) {
      _classCallCheck(this, Provider);

      _Component.call(this, props, context);
      this.state = { redux: props.redux };
    }

    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      return { redux: this.state.redux };
    };

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var redux = this.state.redux;
      var nextRedux = nextProps.redux;

      if (redux !== nextRedux) {
        var nextDispatcher = nextRedux.getDispatcher();
        redux.replaceDispatcher(nextDispatcher);
      }
    };

    Provider.prototype.render = function render() {
      var children = this.props.children;

      return children();
    };

    _createClass(Provider, null, [{
      key: "propTypes",
      value: {
        redux: reduxShape.isRequired,
        children: PropTypes.func.isRequired
      },
      enumerable: true
    }, {
      key: "childContextTypes",
      value: {
        redux: reduxShape.isRequired
      },
      enumerable: true
    }]);

    return Provider;
  })(Component);
}

module.exports = exports["default"];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\react.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsCreateAll = require('./components/createAll');

var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

var _createAll = (0, _componentsCreateAll2['default'])(_react2['default']);

var Provider = _createAll.Provider;
var Connector = _createAll.Connector;
var provide = _createAll.provide;
var connect = _createAll.connect;
exports.Provider = Provider;
exports.Connector = Connector;
exports.provide = provide;
exports.connect = connect;
},{"./components/createAll":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\components\\createAll.js","react":"react"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\getDisplayName.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = getDisplayName;

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

module.exports = exports['default'];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\identity.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = identity;

function identity(value) {
  return value;
}

module.exports = exports["default"];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\isPlainObject.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = isPlainObject;

function isPlainObject(obj) {
  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
}

module.exports = exports['default'];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\shallowEqual.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = shallowEqual;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = exports["default"];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\utils\\shallowEqualScalar.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = shallowEqualScalar;

function shallowEqualScalar(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i])) {
      return false;
    }

    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB || typeof valA === 'object' || typeof valB === 'object') {
      return false;
    }
  }

  return true;
}

module.exports = exports['default'];
},{}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\node_modules\\invariant\\browser.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\react.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _libReact = require('./lib/react');

_defaults(exports, _interopRequireWildcard(_libReact));
},{"./lib/react":"C:\\Users\\Genert\\Desktop\\aBuilder\\node_modules\\redux\\lib\\react.js"}]},{},["C:\\Users\\Genert\\Desktop\\aBuilder\\Application\\JavaScript\\Main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9HZW5lcnQvRGVza3RvcC9hQnVpbGRlci9BcHBsaWNhdGlvbi9KYXZhU2NyaXB0L0FjdGlvbnMvQWN0aW9uQ3JlYXRvcnMuanMiLCJBcHBsaWNhdGlvbi9KYXZhU2NyaXB0L0NvbW1vbi9BQnVpbGRlci5qc29uIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9Db21tb24vQUJ1aWxkZXIuanMiLCJBcHBsaWNhdGlvbi9KYXZhU2NyaXB0L0NvbW1vbi9Mb2NhbGl6YXRpb24uanNvbiIsIkM6L1VzZXJzL0dlbmVydC9EZXNrdG9wL2FCdWlsZGVyL0FwcGxpY2F0aW9uL0phdmFTY3JpcHQvQ29tbW9uL0xvY2FsaXphdGlvbi5qcyIsIkM6L1VzZXJzL0dlbmVydC9EZXNrdG9wL2FCdWlsZGVyL0FwcGxpY2F0aW9uL0phdmFTY3JpcHQvQ29tcG9uZW50cy9Bc2lkZS5qcyIsIkM6L1VzZXJzL0dlbmVydC9EZXNrdG9wL2FCdWlsZGVyL0FwcGxpY2F0aW9uL0phdmFTY3JpcHQvQ29tcG9uZW50cy9CYXNlLmpzIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9Db21wb25lbnRzL0xvZ28uanMiLCJDOi9Vc2Vycy9HZW5lcnQvRGVza3RvcC9hQnVpbGRlci9BcHBsaWNhdGlvbi9KYXZhU2NyaXB0L0NvbXBvbmVudHMvTWFpbi5qcyIsIkM6L1VzZXJzL0dlbmVydC9EZXNrdG9wL2FCdWlsZGVyL0FwcGxpY2F0aW9uL0phdmFTY3JpcHQvQ29uc3RhbnRzL0FjdGlvblR5cGVzLmpzIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9Db250YWluZXJzL0FwcGxpY2F0aW9uLmpzIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9NYWluLmpzIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9TdG9yZXMvQUJ1aWxkZXJTdG9yZS5qcyIsIkM6L1VzZXJzL0dlbmVydC9EZXNrdG9wL2FCdWlsZGVyL0FwcGxpY2F0aW9uL0phdmFTY3JpcHQvU3RvcmVzL0luZGV4LmpzIiwiQzovVXNlcnMvR2VuZXJ0L0Rlc2t0b3AvYUJ1aWxkZXIvQXBwbGljYXRpb24vSmF2YVNjcmlwdC9VdGlsaXRpZXMvRGF0YU1hbmlwdWxhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIva2V5TWlycm9yLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21wb25lbnRzL2NyZWF0ZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvY29tcG9uZW50cy9jcmVhdGVDb25uZWN0RGVjb3JhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21wb25lbnRzL2NyZWF0ZUNvbm5lY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvY29tcG9uZW50cy9jcmVhdGVQcm92aWRlRGVjb3JhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21wb25lbnRzL2NyZWF0ZVByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9yZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvdXRpbHMvZ2V0RGlzcGxheU5hbWUuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3V0aWxzL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi91dGlscy9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi91dGlscy9zaGFsbG93RXF1YWwuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3V0aWxzL3NoYWxsb3dFcXVhbFNjYWxhci5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvcmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0dnQix3QkFBd0IsR0FBeEIsd0JBQXdCO1FBYXhCLG9CQUFvQixHQUFwQixvQkFBb0I7UUFPcEIsb0JBQW9CLEdBQXBCLG9CQUFvQjs7b0NBdkJQLDBCQUEwQjs7SUFBM0MsV0FBVzs7OEJBQ0Ysb0JBQW9COzs7O0FBRWxDLFNBQVMsd0JBQXdCLEdBQUk7QUFDMUMsU0FBTyxVQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUs7QUFDN0IsWUFBUSxDQUFDO0FBQ1AsVUFBSSxFQUFFLFdBQVcsQ0FBQyx5QkFBeUI7S0FDNUMsQ0FBQyxDQUFDOztBQUVILGdDQUFTLGVBQWUsQ0FBQyxVQUFDLElBQUksRUFBSztBQUNqQyxjQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNyQyxjQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0QyxDQUFDLENBQUM7R0FDSixDQUFDO0NBQ0g7O0FBQUEsQ0FBQzs7QUFFSyxTQUFTLG9CQUFvQixDQUFFLElBQUksRUFBRTtBQUMxQyxTQUFPO0FBQ0wsUUFBSSxFQUFFLFdBQVcsQ0FBQyw2QkFBNkI7QUFDL0MsUUFBSSxFQUFFLElBQUk7R0FDWCxDQUFDO0NBQ0g7O0FBQUEsQ0FBQzs7QUFFSyxTQUFTLG9CQUFvQixDQUFFLElBQUksRUFBRTtBQUMxQyxTQUFPO0FBQ0wsUUFBSSxFQUFFLFdBQVcsQ0FBQyxxQkFBcUI7QUFDdkMsUUFBSSxFQUFFLElBQUk7R0FDWCxDQUFDO0NBQ0g7O0FBQUEsQ0FBQzs7O0FDNUJGO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBBY3Rpb25UeXBlcyBmcm9tICcuLi9Db25zdGFudHMvQWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgQUJ1aWxkZXIgZnJvbSAnLi4vQ29tbW9uL0FCdWlsZGVyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBQnVpbGRlckNvbmZpZ3VyYXRpb24gKCkge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IEFjdGlvblR5cGVzLkdFVF9CVUlMREVSX0NPTkZJR1VSQVRJT05cclxuICAgIH0pO1xyXG5cclxuICAgIEFCdWlsZGVyLmdldENvbmZpZ3JhdGlvbigoZGF0YSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaChyZWNlaXZlQ29uZmlndXJhdGlvbihkYXRhKSk7XHJcbiAgICAgIGRpc3BhdGNoKHByb2NjZXNzTG9jYWxpemF0aW9uKGRhdGEpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUNvbmZpZ3VyYXRpb24gKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVDRUlWRV9CVUlMREVSX0NPTkZJR1VSQVRJT04sXHJcbiAgICBkYXRhOiBkYXRhXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jY2Vzc0xvY2FsaXphdGlvbiAoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5QUk9DQ0VTU19MT0NBTElaQVRJT04sXHJcbiAgICBkYXRhOiBkYXRhXHJcbiAgfTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJsb2NhbGl6YXRpb25cIjogXCJlblwiLFxyXG5cclxuICBcInRlbXBsYXRlc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwidGl0bGVcIjogXCJTaW1wbFBhZ2VcIixcclxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBSZXJ1bSwgc2l0IHRlbXBvcmUgb2ZmaWNpYSBxdWlhIHF1b2QsIGVpdXMgcmVwdWRpYW5kYWUgbW9kaSwgYXRxdWUgZW5pbSBhZCBtYWduYW0gc2FlcGUgc3VzY2lwaXQgbmloaWwgbmVjZXNzaXRhdGlidXMgY3VwaWRpdGF0ZSBhc3Blcm5hdHVyIHBlcnNwaWNpYXRpcyBldW0gYWNjdXNhbXVzP1wiLCBcclxuICAgICAgXCJpbWFnZVwiOiBcInNpbXBscGFnZS5qcGdcIlxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwicHJpbWFyeW5hdmlnYXRpb25cIjogW1xyXG4gICAge1xyXG4gICAgICBcImlkXCI6IFwicGFnZXNcIixcclxuICAgICAgXCJpY29uXCI6IFwicGUtN3MtY29weS1maWxlXCIsXHJcbiAgICAgIFwidGFyZ2V0XCI6IFwicGFnZXN0YWJcIlxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwibmF2aWdhdGlvbnRhYnNcIjoge1xyXG4gICAgXCJwYWdlc3RhYlwiOiB7XHJcbiAgICAgIFwidGl0bGVcIjogXCJQYWdlc1wiLFxyXG4gICAgICBcImJsb2Nrc1wiOiBbXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcbn0iLCJjb25zdCBcclxuXHRBQnVpbGRlckNvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuL0FCdWlsZGVyLmpzb24nKSxcclxuXHRBQnVpbGRlciA9IHt9O1xyXG5cclxuQUJ1aWxkZXIuZ2V0Q29uZmlncmF0aW9uID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblx0Y2FsbGJhY2soQUJ1aWxkZXJDb25maWd1cmF0aW9uKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFCdWlsZGVyOyIsIm1vZHVsZS5leHBvcnRzPXtcclxuICBcImVuXCI6IHtcclxuICAgIFwicHJpbWFyeW5hdmlnYXRpb25cIjoge1xyXG4gICAgICBcInBhZ2VzXCI6IFwiUGFnZXNcIlxyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IGdldFByb3BlcnR5IH0gZnJvbSAnLi4vVXRpbGl0aWVzL0RhdGFNYW5pcHVsYXRpb24nO1xyXG5cclxudmFyIGxhbmd1YWdlRGF0YSA9IHJlcXVpcmUoJy4vTG9jYWxpemF0aW9uLmpzb24nKTtcclxudmFyIGxhbmd1YWdlU2V0dGluZyA9ICdlbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TGFuZ3VhZ2UgKGxhbmd1YWdlKSB7XHJcbiAgbGFuZ3VhZ2VTZXR0aW5nID0gbGFuZ3VhZ2U7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nIChxdWVyeSkge1xyXG4gIGlmICghcXVlcnkpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgcXVlcnkgPSBsYW5ndWFnZVNldHRpbmcudG9TdHJpbmcoKSArICcuJyArIHF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlc3VsdCA9IGdldFByb3BlcnR5KGxhbmd1YWdlRGF0YSwgcXVlcnkpO1xyXG5cclxuICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IEVycm9yKCdMb2NhbGl6YXRpb24gLSBcIicgKyBxdWVyeSArICdcIiBxdWVyeSBub3QgZm91bmQhJyk7XHJcbiAgfVxyXG59OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWR1eC9yZWFjdCc7XHJcbmltcG9ydCBMb2dvIGZyb20gJy4vTG9nbyc7XHJcblxyXG5AY29ubmVjdCgoKSA9PiAoe30pKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc2lkZSB7XHJcbiAgcmVuZGVyICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxhc2lkZSBjbGFzc05hbWU9J2FiLWFzaWRlJz5cclxuICAgICAgICA8TG9nbyAvPlxyXG4gICAgICA8L2FzaWRlPlxyXG4gICAgKTtcclxuICB9XHJcbn07IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlZHV4L3JlYWN0JztcclxuaW1wb3J0IEFzaWRlIGZyb20gJy4vQXNpZGUnO1xyXG5pbXBvcnQgTWFpbiBmcm9tICcuL01haW4nO1xyXG5cclxuQGNvbm5lY3Qoc3RhdGUgPT4gKHtcclxuICAgIGRhdGE6IHN0YXRlLmJ1aWxkZXJDb25maWd1cmF0aW9uXHJcbn0pKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JlYWN0LXdyYXAnPlxyXG4gICAgICAgIDxBc2lkZSAvPlxyXG4gICAgICAgIDxNYWluIC8+XHJcbiAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nbyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgIGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZ1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBoZWlnaHQ6IDUwLFxyXG4gICAgd2lkdGg6IDE1MCxcclxuICAgIHRleHQ6ICdBQnVpbGRlcidcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYWItbG9nbycgc3R5bGU9e3tcImhlaWdodFwiOiB0aGlzLnByb3BzLmhlaWdodCArIFwicHhcIiwgXCJ3aWR0aFwiOiB0aGlzLnByb3BzLndpZHRoICsgXCJweFwifX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FiLWxvZ29fX2ljb24nPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FiLWxvZ29fX2xlZnQnPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FiLWxvZ29fX3JpZ2h0Jz48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWItbG9nb19fdGV4dCc+e3RoaXMucHJvcHMudGV4dH08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH07XHJcbn07IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlZHV4L3JlYWN0JztcclxuXHJcbkBjb25uZWN0KCgpID0+ICh7fSkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bWFpbiBjbGFzc05hbWU9J2FiLW1haW4nPlxyXG5cclxuICAgICAgPC9tYWluPlxyXG4gICAgKVxyXG4gIH1cclxufTsiLCJpbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQga2V5TWlycm9yKHtcclxuICBHRVRfQlVJTERFUl9DT05GSUdVUkFUSU9OOiBTeW1ib2woJ0dFVF9CVUlMREVSX0NPTkZJR1VSQVRJT04nKSxcclxuICBSRUNFSVZFX0JVSUxERVJfQ09ORklHVVJBVElPTjogU3ltYm9sKCdSRUNFSVZFX0JVSUxERVJfQ09ORklHVVJBVElPTicpLFxyXG5cclxuICBQUk9DQ0VTU19MT0NBTElaQVRJT046IFN5bWJvbCgnUFJPQ0NFU1NfTE9DQUxJWkFUSU9OJylcclxufSk7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlUmVkdXggfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVkdXgvcmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBzdG9yZXMgZnJvbSAnLi4vU3RvcmVzL0luZGV4JztcclxuaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi4vQWN0aW9ucy9BY3Rpb25DcmVhdG9ycyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4uL0NvbXBvbmVudHMvQmFzZSc7XHJcblxyXG5jb25zdCByZWR1eCA9IGNyZWF0ZVJlZHV4KHN0b3Jlcyk7XHJcbnJlZHV4LmRpc3BhdGNoKEFjdGlvbkNyZWF0b3JzLmdldEFCdWlsZGVyQ29uZmlndXJhdGlvbigpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UHJvdmlkZXIgcmVkdXg9e3JlZHV4fT5cclxuICAgICAgICB7KCkgPT4gPEJhc2UgLz59XHJcbiAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL0NvbnRhaW5lcnMvQXBwbGljYXRpb24nXHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcblx0PEFwcGxpY2F0aW9uIC8+LFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVhY3QtanNcIilcclxuKTsiLCJpbXBvcnQge1xyXG4gIFJFQ0VJVkVfQlVJTERFUl9DT05GSUdVUkFUSU9OLFxyXG4gIFBST0NDRVNTX0xPQ0FMSVpBVElPTlxyXG59IGZyb20gJy4uL0NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XHJcbmltcG9ydCB7IHNldExhbmd1YWdlIH0gZnJvbSAnLi4vQ29tbW9uL0xvY2FsaXphdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGUgKHN0YXRlID0ge30sIGFjdGlvbikge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgUkVDRUlWRV9CVUlMREVSX0NPTkZJR1VSQVRJT046XHJcbiAgICAgIHJldHVybiBhY3Rpb24uZGF0YTtcclxuXHJcbiAgICBjYXNlIFBST0NDRVNTX0xPQ0FMSVpBVElPTjpcclxuICAgICAgY29uc3QgbG9jYWxpemF0aW9uU2V0dGluZyA9IGFjdGlvbi5kYXRhLmxvY2FsaXphdGlvbiB8fCAnZW4nO1xyXG4gICAgICBzZXRMYW5ndWFnZShsb2NhbGl6YXRpb25TZXR0aW5nKTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59OyIsImV4cG9ydCBidWlsZGVyQ29uZmlndXJhdGlvbiBmcm9tICcuL0FCdWlsZGVyU3RvcmUnOyIsImV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eSAob2JqLCBwcm9wKSB7XHJcbiAgdmFyIHBhcnRzID0gcHJvcC5zcGxpdCgnLicpLFxyXG4gIGxhc3QgPSBwYXJ0cy5wb3AoKSxcclxuICBsID0gcGFydHMubGVuZ3RoLFxyXG4gIGkgPSAxLFxyXG4gIGN1cnJlbnQgPSBwYXJ0c1swXTtcclxuXHJcbiAgd2hpbGUoKG9iaiA9IG9ialtjdXJyZW50XSkgJiYgaSA8IGwpIHtcclxuICAgIGN1cnJlbnQgPSBwYXJ0c1tpXTtcclxuICAgIGkrKztcclxuICB9XHJcblxyXG4gIGlmKG9iaikge1xyXG4gICAgcmV0dXJuIG9ialtsYXN0XTtcclxuICB9XHJcbn07IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICBvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSxcbiAgICAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LidcbiAgKSA6IGludmFyaWFudChvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlQWxsO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfY3JlYXRlUHJvdmlkZXIgPSByZXF1aXJlKCcuL2NyZWF0ZVByb3ZpZGVyJyk7XG5cbnZhciBfY3JlYXRlUHJvdmlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlUHJvdmlkZXIpO1xuXG52YXIgX2NyZWF0ZVByb3ZpZGVEZWNvcmF0b3IgPSByZXF1aXJlKCcuL2NyZWF0ZVByb3ZpZGVEZWNvcmF0b3InKTtcblxudmFyIF9jcmVhdGVQcm92aWRlRGVjb3JhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVByb3ZpZGVEZWNvcmF0b3IpO1xuXG52YXIgX2NyZWF0ZUNvbm5lY3RvciA9IHJlcXVpcmUoJy4vY3JlYXRlQ29ubmVjdG9yJyk7XG5cbnZhciBfY3JlYXRlQ29ubmVjdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNvbm5lY3Rvcik7XG5cbnZhciBfY3JlYXRlQ29ubmVjdERlY29yYXRvciA9IHJlcXVpcmUoJy4vY3JlYXRlQ29ubmVjdERlY29yYXRvcicpO1xuXG52YXIgX2NyZWF0ZUNvbm5lY3REZWNvcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ29ubmVjdERlY29yYXRvcik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUFsbChSZWFjdCkge1xuICAvLyBXcmFwcGVyIGNvbXBvbmVudHNcbiAgdmFyIFByb3ZpZGVyID0gKDAsIF9jcmVhdGVQcm92aWRlcjJbJ2RlZmF1bHQnXSkoUmVhY3QpO1xuICB2YXIgQ29ubmVjdG9yID0gKDAsIF9jcmVhdGVDb25uZWN0b3IyWydkZWZhdWx0J10pKFJlYWN0KTtcblxuICAvLyBIaWdoZXItb3JkZXIgY29tcG9uZW50cyAoZGVjb3JhdG9ycylcbiAgdmFyIHByb3ZpZGUgPSAoMCwgX2NyZWF0ZVByb3ZpZGVEZWNvcmF0b3IyWydkZWZhdWx0J10pKFJlYWN0LCBQcm92aWRlcik7XG4gIHZhciBjb25uZWN0ID0gKDAsIF9jcmVhdGVDb25uZWN0RGVjb3JhdG9yMlsnZGVmYXVsdCddKShSZWFjdCwgQ29ubmVjdG9yKTtcblxuICByZXR1cm4geyBQcm92aWRlcjogUHJvdmlkZXIsIENvbm5lY3RvcjogQ29ubmVjdG9yLCBwcm92aWRlOiBwcm92aWRlLCBjb25uZWN0OiBjb25uZWN0IH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlQ29ubmVjdERlY29yYXRvcjtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3V0aWxzR2V0RGlzcGxheU5hbWUgPSByZXF1aXJlKCcuLi91dGlscy9nZXREaXNwbGF5TmFtZScpO1xuXG52YXIgX3V0aWxzR2V0RGlzcGxheU5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNHZXREaXNwbGF5TmFtZSk7XG5cbnZhciBfdXRpbHNTaGFsbG93RXF1YWxTY2FsYXIgPSByZXF1aXJlKCcuLi91dGlscy9zaGFsbG93RXF1YWxTY2FsYXInKTtcblxudmFyIF91dGlsc1NoYWxsb3dFcXVhbFNjYWxhcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc1NoYWxsb3dFcXVhbFNjYWxhcik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbm5lY3REZWNvcmF0b3IoUmVhY3QsIENvbm5lY3Rvcikge1xuICB2YXIgQ29tcG9uZW50ID0gUmVhY3QuQ29tcG9uZW50O1xuXG4gIHJldHVybiBmdW5jdGlvbiBjb25uZWN0KHNlbGVjdCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoRGVjb3JhdGVkQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbm5lY3RvckRlY29yYXRvcigpIHtcbiAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdG9yRGVjb3JhdG9yKTtcblxuICAgICAgICAgIGlmIChfQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIF9Db21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfaW5oZXJpdHMoQ29ubmVjdG9yRGVjb3JhdG9yLCBfQ29tcG9uZW50KTtcblxuICAgICAgICBDb25uZWN0b3JEZWNvcmF0b3IucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgICByZXR1cm4gISgwLCBfdXRpbHNTaGFsbG93RXF1YWxTY2FsYXIyWydkZWZhdWx0J10pKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ29ubmVjdG9yRGVjb3JhdG9yLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgQ29ubmVjdG9yLFxuICAgICAgICAgICAgeyBzZWxlY3Q6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Qoc3RhdGUsIF90aGlzLnByb3BzKTtcbiAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHN0dWZmKSB7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KERlY29yYXRlZENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHN0dWZmLCBfdGhpcy5wcm9wcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKENvbm5lY3RvckRlY29yYXRvciwgbnVsbCwgW3tcbiAgICAgICAgICBrZXk6ICdkaXNwbGF5TmFtZScsXG4gICAgICAgICAgdmFsdWU6ICdDb25uZWN0b3IoJyArICgwLCBfdXRpbHNHZXREaXNwbGF5TmFtZTJbJ2RlZmF1bHQnXSkoRGVjb3JhdGVkQ29tcG9uZW50KSArICcpJyxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBrZXk6ICdEZWNvcmF0ZWRDb21wb25lbnQnLFxuICAgICAgICAgIHZhbHVlOiBEZWNvcmF0ZWRDb21wb25lbnQsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIENvbm5lY3RvckRlY29yYXRvcjtcbiAgICAgIH0pKENvbXBvbmVudCk7XG4gICAgfTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVDb25uZWN0b3I7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF91dGlsc0lkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvaWRlbnRpdHknKTtcblxudmFyIF91dGlsc0lkZW50aXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzSWRlbnRpdHkpO1xuXG52YXIgX3V0aWxzU2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnLi4vdXRpbHMvc2hhbGxvd0VxdWFsJyk7XG5cbnZhciBfdXRpbHNTaGFsbG93RXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNTaGFsbG93RXF1YWwpO1xuXG52YXIgX3V0aWxzSXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF91dGlsc0lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHNJc1BsYWluT2JqZWN0KTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxuZnVuY3Rpb24gY3JlYXRlQ29ubmVjdG9yKFJlYWN0KSB7XG4gIHZhciBDb21wb25lbnQgPSBSZWFjdC5Db21wb25lbnQ7XG4gIHZhciBQcm9wVHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbiAgcmV0dXJuIChmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGZ1bmN0aW9uIENvbm5lY3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3Rvcik7XG5cbiAgICAgIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCk7XG5cbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBjb250ZXh0LnJlZHV4LnN1YnNjcmliZSh0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnNlbGVjdFN0YXRlKHByb3BzLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBfaW5oZXJpdHMoQ29ubmVjdG9yLCBfQ29tcG9uZW50KTtcblxuICAgIENvbm5lY3Rvci5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaXNTbGljZUVxdWFsKHRoaXMuc3RhdGUuc2xpY2UsIG5leHRTdGF0ZS5zbGljZSkgfHwgISgwLCBfdXRpbHNTaGFsbG93RXF1YWwyWydkZWZhdWx0J10pKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XG4gICAgfTtcblxuICAgIENvbm5lY3Rvci5wcm90b3R5cGUuaXNTbGljZUVxdWFsID0gZnVuY3Rpb24gaXNTbGljZUVxdWFsKHNsaWNlLCBuZXh0U2xpY2UpIHtcbiAgICAgIHZhciBpc1JlZkVxdWFsID0gc2xpY2UgPT09IG5leHRTbGljZTtcbiAgICAgIGlmIChpc1JlZkVxdWFsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2xpY2UgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXh0U2xpY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc1JlZkVxdWFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgwLCBfdXRpbHNTaGFsbG93RXF1YWwyWydkZWZhdWx0J10pKHNsaWNlLCBuZXh0U2xpY2UpO1xuICAgIH07XG5cbiAgICBDb25uZWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKG5leHRQcm9wcy5zZWxlY3QgIT09IHRoaXMucHJvcHMuc2VsZWN0KSB7XG4gICAgICAgIC8vIEZvcmNlIHRoZSBzdGF0ZSBzbGljZSByZWNhbGN1bGF0aW9uXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKG5leHRQcm9wcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuXG4gICAgQ29ubmVjdG9yLnByb3RvdHlwZS5oYW5kbGVDaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICB2YXIgcHJvcHMgPSBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLnNlbGVjdFN0YXRlKHByb3BzLCB0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICAgIH07XG5cbiAgICBDb25uZWN0b3IucHJvdG90eXBlLnNlbGVjdFN0YXRlID0gZnVuY3Rpb24gc2VsZWN0U3RhdGUocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGNvbnRleHQucmVkdXguZ2V0U3RhdGUoKTtcbiAgICAgIHZhciBzbGljZSA9IHByb3BzLnNlbGVjdChzdGF0ZSk7XG5cbiAgICAgICgwLCBfaW52YXJpYW50MlsnZGVmYXVsdCddKSgoMCwgX3V0aWxzSXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoc2xpY2UpLCAnVGhlIHJldHVybiB2YWx1ZSBvZiBgc2VsZWN0YCBwcm9wIG11c3QgYmUgYW4gb2JqZWN0LiBJbnN0ZWFkIHJlY2VpdmVkICVzLicsIHNsaWNlKTtcblxuICAgICAgcmV0dXJuIHsgc2xpY2U6IHNsaWNlIH07XG4gICAgfTtcblxuICAgIENvbm5lY3Rvci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBzbGljZSA9IHRoaXMuc3RhdGUuc2xpY2U7XG4gICAgICB2YXIgZGlzcGF0Y2ggPSB0aGlzLmNvbnRleHQucmVkdXguZGlzcGF0Y2g7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbihfZXh0ZW5kcyh7IGRpc3BhdGNoOiBkaXNwYXRjaCB9LCBzbGljZSkpO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29ubmVjdG9yLCBudWxsLCBbe1xuICAgICAga2V5OiAnY29udGV4dFR5cGVzJyxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIHJlZHV4OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSwge1xuICAgICAga2V5OiAncHJvcFR5cGVzJyxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBzZWxlY3Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSwge1xuICAgICAga2V5OiAnZGVmYXVsdFByb3BzJyxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIHNlbGVjdDogX3V0aWxzSWRlbnRpdHkyWydkZWZhdWx0J11cbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIENvbm5lY3RvcjtcbiAgfSkoQ29tcG9uZW50KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVQcm92aWRlRGVjb3JhdG9yO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfdXRpbHNHZXREaXNwbGF5TmFtZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldERpc3BsYXlOYW1lJyk7XG5cbnZhciBfdXRpbHNHZXREaXNwbGF5TmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsc0dldERpc3BsYXlOYW1lKTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZURlY29yYXRvcihSZWFjdCwgUHJvdmlkZXIpIHtcbiAgdmFyIENvbXBvbmVudCA9IFJlYWN0LkNvbXBvbmVudDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHJvdmlkZShyZWR1eCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoRGVjb3JhdGVkQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIFByb3ZpZGVyRGVjb3JhdG9yKCkge1xuICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm92aWRlckRlY29yYXRvcik7XG5cbiAgICAgICAgICBpZiAoX0NvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2luaGVyaXRzKFByb3ZpZGVyRGVjb3JhdG9yLCBfQ29tcG9uZW50KTtcblxuICAgICAgICBQcm92aWRlckRlY29yYXRvci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFByb3ZpZGVyLFxuICAgICAgICAgICAgeyByZWR1eDogcmVkdXggfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGVjb3JhdGVkQ29tcG9uZW50LCBfdGhpcy5wcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfY3JlYXRlQ2xhc3MoUHJvdmlkZXJEZWNvcmF0b3IsIG51bGwsIFt7XG4gICAgICAgICAga2V5OiAnZGlzcGxheU5hbWUnLFxuICAgICAgICAgIHZhbHVlOiAnUHJvdmlkZXIoJyArICgwLCBfdXRpbHNHZXREaXNwbGF5TmFtZTJbJ2RlZmF1bHQnXSkoRGVjb3JhdGVkQ29tcG9uZW50KSArICcpJyxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBrZXk6ICdEZWNvcmF0ZWRDb21wb25lbnQnLFxuICAgICAgICAgIHZhbHVlOiBEZWNvcmF0ZWRDb21wb25lbnQsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyRGVjb3JhdG9yO1xuICAgICAgfSkoQ29tcG9uZW50KTtcbiAgICB9O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNyZWF0ZVByb3ZpZGVyO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlcihSZWFjdCkge1xuICB2YXIgQ29tcG9uZW50ID0gUmVhY3QuQ29tcG9uZW50O1xuICB2YXIgUHJvcFR5cGVzID0gUmVhY3QuUHJvcFR5cGVzO1xuXG4gIHZhciByZWR1eFNoYXBlID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0U3RhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSk7XG5cbiAgcmV0dXJuIChmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJvdmlkZXIpO1xuXG4gICAgICBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHsgcmVkdXg6IHByb3BzLnJlZHV4IH07XG4gICAgfVxuXG4gICAgX2luaGVyaXRzKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICByZXR1cm4geyByZWR1eDogdGhpcy5zdGF0ZS5yZWR1eCB9O1xuICAgIH07XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICB2YXIgcmVkdXggPSB0aGlzLnN0YXRlLnJlZHV4O1xuICAgICAgdmFyIG5leHRSZWR1eCA9IG5leHRQcm9wcy5yZWR1eDtcblxuICAgICAgaWYgKHJlZHV4ICE9PSBuZXh0UmVkdXgpIHtcbiAgICAgICAgdmFyIG5leHREaXNwYXRjaGVyID0gbmV4dFJlZHV4LmdldERpc3BhdGNoZXIoKTtcbiAgICAgICAgcmVkdXgucmVwbGFjZURpc3BhdGNoZXIobmV4dERpc3BhdGNoZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKCk7XG4gICAgfTtcblxuICAgIF9jcmVhdGVDbGFzcyhQcm92aWRlciwgbnVsbCwgW3tcbiAgICAgIGtleTogXCJwcm9wVHlwZXNcIixcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIHJlZHV4OiByZWR1eFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJjaGlsZENvbnRleHRUeXBlc1wiLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgcmVkdXg6IHJlZHV4U2hhcGUuaXNSZXF1aXJlZFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0pKENvbXBvbmVudCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jb21wb25lbnRzQ3JlYXRlQWxsID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2NyZWF0ZUFsbCcpO1xuXG52YXIgX2NvbXBvbmVudHNDcmVhdGVBbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9uZW50c0NyZWF0ZUFsbCk7XG5cbnZhciBfY3JlYXRlQWxsID0gKDAsIF9jb21wb25lbnRzQ3JlYXRlQWxsMlsnZGVmYXVsdCddKShfcmVhY3QyWydkZWZhdWx0J10pO1xuXG52YXIgUHJvdmlkZXIgPSBfY3JlYXRlQWxsLlByb3ZpZGVyO1xudmFyIENvbm5lY3RvciA9IF9jcmVhdGVBbGwuQ29ubmVjdG9yO1xudmFyIHByb3ZpZGUgPSBfY3JlYXRlQWxsLnByb3ZpZGU7XG52YXIgY29ubmVjdCA9IF9jcmVhdGVBbGwuY29ubmVjdDtcbmV4cG9ydHMuUHJvdmlkZXIgPSBQcm92aWRlcjtcbmV4cG9ydHMuQ29ubmVjdG9yID0gQ29ubmVjdG9yO1xuZXhwb3J0cy5wcm92aWRlID0gcHJvdmlkZTtcbmV4cG9ydHMuY29ubmVjdCA9IGNvbm5lY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gZ2V0RGlzcGxheU5hbWU7XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKENvbXBvbmVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gaWRlbnRpdHk7XG5cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBpc1BsYWluT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqID8gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGUgOiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHNoYWxsb3dFcXVhbDtcblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKG9iakEgPT09IG9iakIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwob2JqQiwga2V5c0FbaV0pIHx8IG9iakFba2V5c0FbaV1dICE9PSBvYmpCW2tleXNBW2ldXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHNoYWxsb3dFcXVhbFNjYWxhcjtcblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsU2NhbGFyKG9iakEsIG9iakIpIHtcbiAgaWYgKG9iakEgPT09IG9iakIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqQSAhPT0gJ29iamVjdCcgfHwgb2JqQSA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqQiAhPT0gJ29iamVjdCcgfHwgb2JqQiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwob2JqQiwga2V5c0FbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHZhbEEgPSBvYmpBW2tleXNBW2ldXTtcbiAgICB2YXIgdmFsQiA9IG9iakJba2V5c0FbaV1dO1xuXG4gICAgaWYgKHZhbEEgIT09IHZhbEIgfHwgdHlwZW9mIHZhbEEgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWxCID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZhdWx0cyhvYmosIGRlZmF1bHRzKSB7IHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGVmYXVsdHMpOyBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHsgdmFyIGtleSA9IGtleXNbaV07IHZhciB2YWx1ZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmYXVsdHMsIGtleSk7IGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25maWd1cmFibGUgJiYgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKTsgfSB9IHJldHVybiBvYmo7IH1cblxudmFyIF9saWJSZWFjdCA9IHJlcXVpcmUoJy4vbGliL3JlYWN0Jyk7XG5cbl9kZWZhdWx0cyhleHBvcnRzLCBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfbGliUmVhY3QpKTsiXX0=
