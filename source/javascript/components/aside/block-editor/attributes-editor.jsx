import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'lodash';
import localization from '../../../common/localization';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';

export default class ItemMarginEditor extends React.Component {
  static propTypes = {
    target: PropTypes.any.isRequired
  };

  state = {
    className: '',
    id: '',
    title: '',
    href: '',

    displayClassName: true,
    displayID: true,
    displayTitle: true,
    displayHref: true
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setAttributesDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setAttributesDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setAttributesDefaultValues () {
    const className = this._target.className;
    const id = this._target.id;
    const title = this._target.title;
    const href = this._target.href;

    this.setState({
      className,
      id,
      title,
      href,

      displayClassName: _isEmpty(className) || true,
      displayID: _isEmpty(id) || true,
      displayTitle: _isEmpty(title) || true,
      displayHref: _isEmpty(href) || true
    });
  }

  handleChange (name, value) {
    this._target[name] = value;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  renderClassName () {
    if (!this.state.displayClassName) {
      return null;
    }

    return (
      <div className={classNames(['be-block__attr__item', 'be-block__attr__item--first'])}>
        <h3 className={classNames('be-block__attr__title')}>{ localization('classname') }</h3>
        <Input
          className={classNames('be-block__attr__input')}
          value={this.state.className}
          onChange={this.handleChange.bind(this, 'className')} />
      </div>
    );
  }

  renderID () {
    if (!this.state.displayID) {
      return null;
    }

    return (
      <div className={classNames('be-block__attr__item')}>
        <h3 className={classNames('be-block__attr__title')}>{ localization('id') }</h3>
        <Input
          className={classNames('be-block__attr__input')}
          value={this.state.id}
          onChange={this.handleChange.bind(this, 'id')} />
      </div>
    );
  }

  renderTitle () {
    if (!this.state.displayTitle) {
      return null;
    }

    return (
      <div className={classNames('be-block__attr__item')}>
        <h3 className={classNames('be-block__attr__title')}>{ localization('title') }</h3>
        <Input
          className={classNames('be-block__attr__input')}
          value={this.state.title}
          onChange={this.handleChange.bind(this, 'title')} />
      </div>
    );
  }

  renderHref () {
    if (!this.state.displayHref) {
      return null;
    }

    return (
      <div className={classNames('be-block__attr__item')}>
        <h3 className={classNames('be-block__attr__title')}>{ localization('href') }</h3>
        <Input
          className={classNames('be-block__attr__input')}
          value={this.state.href}
          onChange={this.handleChange.bind(this, 'href')} />
      </div>
    );
  }

  render () {
    if (!this.state.displayID &&
        !this.state.displayClassName &&
        !this.state.displayTitle &&
        !this.state.displayHref) {
      return null;
    }

    return (
      <div className={classNames('be-block')}>
        <div className={classNames('be-block__attr')}>
          { this.renderClassName() }
          { this.renderID() }
          { this.renderTitle() }
          { this.renderHref() }
        </div>
      </div>
    );
  }
}
