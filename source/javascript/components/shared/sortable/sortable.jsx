import React from 'react';
import ReactDOM from 'react-dom';
import _assign from 'lodash/assign';
import Sortable from 'sortablejs';

class ReactSortable extends React.Component {
  static propTypes = {
    sortable: React.PropTypes.object,
    component: React.PropTypes.any,
    children: React.PropTypes.any
  };

  componentDidMount () {
    var options = _assign({}, this.props.sortable);

    this.sortable = Sortable.create(ReactDOM.findDOMNode(this), options);
    this.renderList();
  }

  componentDidUpdate () {
    this.renderList();
  }

  componentWillUnmount () {
    for (var _iterator = ReactDOM.findDOMNode(this).childNodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      ReactDOM.unmountComponentAtNode(_step.value);
    }

    this.sortable.destroy();
  }

  static defaultProps = {
    component: 'div',
    childElement: 'div'
  };

  render () {
    var otherProps = _assign({}, this.props);

    var consumedProps = ["sortable", "component", "childElement", "children"];
    for (var i = 0; i < consumedProps.length; i++) {
      delete otherProps[consumedProps[i]];
    }

    return React.createElement(this.props.component, otherProps);
  }

  renderList () {
    var _this = this;
    var domChildMap = {};
    for (var i = 0; i < ReactDOM.findDOMNode(this).childNodes.length; i++) {
      var child = ReactDOM.findDOMNode(this).childNodes[i];
      domChildMap[child.dataset.id] = child;
    }

    React.Children.forEach(this.props.children, function (reactChild) {
      var domChild = domChildMap[reactChild.key];
      delete domChildMap[reactChild.key];

      if (!domChild) {
        domChild = document.createElement(_this.props.childElement);
        if (_this.props.sortable.draggable) {
          domChild.className = _this.props.sortable.draggable.slice(1);
        }
        domChild.dataset.id = reactChild.key;
        ReactDOM.findDOMNode(_this).appendChild(domChild);
      }

      ReactDOM.render(reactChild, domChild);
    });

    for (var key in domChildMap) {
      ReactDOM.unmountComponentAtNode(domChildMap[key]);
      ReactDOM.findDOMNode(this).removeChild(domChildMap[key]);
    }
  }
}

export default ReactSortable;
