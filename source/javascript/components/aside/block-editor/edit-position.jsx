import React from 'react';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import Icon from '../../shared/icon';
import { normalizeAngle, getStyle } from './helpers';

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

  setRotationDefaultValue () {
    var st = window.getComputedStyle(this._target, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "FAIL";

    if (tr === 'none' || tr.indexOf('matrix') === -1) {
      return;
    }

    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a*a + b*b);

    // arc sin, convert from radians to degrees, round
    var sin = b/scale;
    // next line works for 30deg but not 130deg (returns 50);
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    if (angle) {
      this.setState({
        ...this.setState,
        rotation: angle
      });
    }
  }

  setRotationValue (value) {
    this._target.style.transform = `rotate(${value}deg)`;

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
      rotation = normalizeAngle(Math.abs(currentRotation));
    } else {
      return false;
    }

    this.setState({
      ...this.state,
      rotation: rotation
    });
  }
  
  render () {
    return (
      <div title='Rotation' className={classNames('be-block__inputs')}>
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
