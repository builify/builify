import React from 'react';
import _kebabCase from 'lodash/kebabcase';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import Icon from '../../shared/icon';
import { getStyleValue, setStyleValue } from './helpers';

export default class BorderRadiusEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };
  
  state = {
    showAll: false,

    radius: 4,

    topLeftRadius: 0,
    topRightRadius: 0,
    bottomRightRadius: 0,
    bottomLeftRadius: 0
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setRadiusDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setRadiusDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setRadiusDefaultValues () {
    // https://drafts.csswg.org/css-backgrounds-3/#border-radius
    const radiuses = {
      topLeft: getStyleValue(this._target, 'border-top-left-radius'),
      topRight: getStyleValue(this._target, 'border-top-right-radius'),
      bottomRight: getStyleValue(this._target, 'border-bottom-right-radius'),
      bottomLeft: getStyleValue(this._target, 'border-bottom-left-radius')
    };

    if (radiuses.topLeft === radiuses.topRight &&
        radiuses.bottomRight === radiuses.bottomLeft &&
        radiuses.topLeft === radiuses.bottomRight) {
      const value = radiuses.topLeft;
      this.setState({
        ...this.state,

        showAll: false,
        radius: value,

        topLeftRadius: value,
        topRightRadius: value,
        bottomRightRadius: value,
        bottomLeftRadius: value
      });
    } else {
      this.setState({
        ...this.state,

        showAll: true,
        radius: `${radiuses.topLeftRadius} ${radiuses.topRightRadius} ${radiuses.bottomRightRadius} ${radiuses.bottomLeftRadius}`,

        topLeftRadius: radiuses.topLeftRadius,
        topRightRadius: radiuses.topRightRadius,
        bottomRightRadius: radiuses.bottomRightRadius,
        bottomLeftRadius: radiuses.bottomLeftRadius
      });
    }
  }

  setRadiusValueOfElement (type, value) {
    switch (type) {
      case 'radius':
        setStyleValue(this._target, 'border-radius', value);
        break;

      case 'topLeftRadius':
      case 'topRightRadius':
      case 'bottomLeftRadius':
      case 'bottomRightRadius':
        setStyleValue(this._target, _kebabCase(type), value);

        this.setState({
          ...this.state,
          [type]: value
        });
        break;

      default:
        break;
    }
  }

  changeRadius (type, value) {
    switch (type) {
      case 'radius':
        setStyleValue(this._target, 'border-radius', value);

        this.setState({
          ...this.state,
          [type]: value,

          topLeftRadius: value,
          topRightRadius: value,
          bottomLeftRadius: value,
          bottomRightRadius: value
        });

        break;

      case 'topLeftRadius':
      case 'topRightRadius':
      case 'bottomLeftRadius':
      case 'bottomRightRadius':
        setStyleValue(this._target, _kebabCase(type), value);

        this.setState({
          ...this.state,
          [type]: value
        });

        break;

      default:
        break;
    }
  }

  changeRadiusShow (type) {
    this.setState({
      ...this.state,
      showAll: type === 'all' ? true : false
    });
  }

  renderCornerRadius () {
    return (
      <div title='Corner Radius' className={classNames('be-block__radius__item')}>
        <Input
          className={classNames('be-block__radius__input')}
          value={this.state.radius}
          onChange={this.changeRadius.bind(this, 'radius')} />
      </div>
    );
  }

  renderAllRadiuses () {
    return (
      <div>
        <div
          title='Top Left Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.topLeftRadius}
            onChange={this.changeRadius.bind(this, 'topLeftRadius')} />
        </div>
        <div
          title='Top Right Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.topRightRadius}
            onChange={this.changeRadius.bind(this, 'topRightRadius')} />
        </div>
        <div
          title='Bottom Right Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.bottomRightRadius}
            onChange={this.changeRadius.bind(this, 'bottomRightRadius')} />
        </div>
        <div
          title='Bottom Left Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.bottomLeftRadius}
            onChange={this.changeRadius.bind(this, 'bottomLeftRadius')} />
        </div>
      </div>
    );
  }

  renderInputs () {
    if (!this.state.showAll) {
      return this.renderCornerRadius();
    } else {
      return this.renderAllRadiuses();
    }
  }

  render () {
    const singleRadiusClassName = classNames({
      'be-block__radius__icon': true,
      'be-block__radius__icon--active': !this.state.showAll
    });
    const allRadiusClassName = classNames({
      'be-block__radius__icon': true,
      'be-block__radius__icon--active': this.state.showAll
    });

    return (
      <div className={classNames('be-block__radius')}>
        <div title='Same radius for all corners' className={classNames(['be-block__radius__item' ,'be-block__radius__item--first'])}>
          <div
            onClick={this.changeRadiusShow.bind(this, 'single')}
            title='Same radius for all corners'
            className={singleRadiusClassName}>
            <Icon icon='crop-din' />
          </div>
          <div
            onClick={this.changeRadiusShow.bind(this, 'all')}
            title='Different radius for each corner'
            className={allRadiusClassName}>
            <Icon icon='crop-free' />
          </div>
        </div>
        { this.renderInputs() }
      </div>
    );
  }
}
