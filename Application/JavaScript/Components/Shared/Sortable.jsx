import React, { Component } from 'react';
import ReactDOM, { unmountComponentAtNode, render, findDOMNode } from 'react-dom';
import Sortable from 'sortablejs';

class ReactSortable extends Component {
  componentDidMount () {
    var options = Object.assign({}, this.props.sortable);

    this.sortable = Sortable.create(findDOMNode(this), options);
    this.renderList();
  }

  componentDidUpdate () {
    this.renderList();
  }

  componentWillUnmount () {
    for (var _iterator = findDOMNode(this).childNodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      var child = _step.value;
      unmountComponentAtNode(child);
    }

    this.sortable.destroy();
  }

  static defaultProps = {
    component: 'div',
    childElement: 'div'
  }

  render () {
    var otherProps = Object.assign({}, this.props);

    var consumedProps = ["sortable", "component", "childElement", "children"];
    for (var i = 0; i < consumedProps.length; i++) {
      delete otherProps[consumedProps[i]];
    }

    return React.createElement(this.props.component, otherProps);
  }

  renderList () {
    var _this = this;
    var domChildMap = {};
    for (var i = 0; i < findDOMNode(this).childNodes.length; i++) {
      var child = findDOMNode(this).childNodes[i];
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
        findDOMNode(_this).appendChild(domChild);
      }
      render(reactChild, domChild);
    });

    for (var key in domChildMap) {
      unmountComponentAtNode(domChildMap[key]);
      findDOMNode(this).removeChild(domChildMap[key]);
    }
  }
}

export default ReactSortable;
