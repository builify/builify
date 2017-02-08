import React from 'react';
import classNames from '../../../common/classnames';
import Button from '../../shared/button';
import { TEMPLATE_FILE_EXTENSION } from '../../../constants';
import {
  map as _map,
  omit as _omit,
  has as _has,
  isElement as _isElement,
  isFunction as _isFunction
} from 'lodash';

export default class BottomNavigation extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array.isRequired
  };

  _onLoadFunction = null;

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    if (_isElement(this.refs.fileInput)) {
      this.refs.fileInput.addEventListener('change', () => {
        const file = this.refs.fileInput.files[0];
        var reader = new FileReader();

        reader.onload = () => {
          if (_isFunction(this._onLoadFunction)) {
            return this._onLoadFunction(reader.result);
          }
        };

        reader.readAsText(file);
      }, false);
    }
  }

  renderButtons (actions) {
    return _map(actions, (action, idx) => {
      const className = classNames('modal__button', action.className)

      if (_has(action, 'onFileLoad') && _isFunction(action.onFileLoad)) {
        const accept = `.${TEMPLATE_FILE_EXTENSION}`;
        this._onLoadFunction = action.onFileLoad;

        return (
          <div key={idx} className={classNames('modal__button', 'tt-filebutton')}>
            <input
              className='tt-filebutton__input'
              id='fileInput'
              type='file'
              ref='fileInput'
              accept={accept} />
            <label className='tt-filebutton__label' htmlFor='fileInput'>{ action.label }</label>
          </div>
        );
      } else {
        return (
          <Button
            key={idx}
            className={className}
            {...action} />
        );
      }
    });
  }

  renderActions () {
    const { actions } = this.props;
    return this.renderButtons(actions);
  }

  render () {
    const props = _omit(this.props, ['actions']);

    return (
      <nav role='navigation' className={classNames('modal__navigation')} {...props}>
        { this.renderActions() }
      </nav>
    );
  }
}
