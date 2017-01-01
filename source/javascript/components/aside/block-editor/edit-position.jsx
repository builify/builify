import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Input from '../../shared/input';
import Icon from '../../shared/icon';
import { normalizeAngle, getAngleFromMatrix, getStyleValue, setStyleValue } from './helpers';

export default class PositionEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    rotation: 0
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setRotationDefaultValue();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setRotationDefaultValue();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setRotationDefaultValue () {
    const transformValue = getStyleValue(this._target, 'transform');

    if (transformValue === 'none' || transformValue.indexOf('matrix') === -1) {
      return;
    }

    const angle = getAngleFromMatrix(transformValue);

    if (angle) {
      this.setState({
        ...this.setState,
        rotation: angle
      });
    }
  }

  setRotationValue (value) {
    setStyleValue(this._target, 'transform', `rotate(${value}deg)`);

    this.setState({
      ...this.state,
      rotation: value
    });
  }

  normalizeRotation () {
    const currentRotation = parseInt(this.state.rotation);
    let rotation = 0;

    if (currentRotation === 360) {
      rotation = 0;
    } else if (currentRotation > 360) {
      rotation = normalizeAngle(currentRotation);
    } else if (currentRotation < 0) {
      rotation = -(normalizeAngle(Math.abs(currentRotation)));
    } else {
      return false;
    }

    this.setState({
      ...this.state,
      rotation: rotation
    });
  }
  
  render () {
    const title = localization('rotation');

    return (
      <div title={title} className={classNames('be-block__inputs')}>
        <div className={classNames('be-block__input')}>
          <Icon
            className={classNames('be-block__input__icon')}
            icon='rotate-right'
            size='18' />
          <Input
            className={classNames('be-block__input__type')}
            value={this.state.rotation}
            onChange={::this.setRotationValue}
            onBlur={::this.normalizeRotation} />
        </div>
      </div>
    );
  }
}
