import React from 'react';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _isElement from 'lodash/iselement';
import _isFunction from 'lodash/isfunction';
import classNames from '../../../common/classnames';
import Button from '../../shared/button';

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
        this._onLoadFunction = action.onFileLoad;

        return (
          <div
            key={idx}
            className={classNames('modal__button', 'tt-filebutton')}>
            <input
              className='tt-filebutton__input'
              id='fileInput'
              type='file'
              ref='fileInput'
              accept='.fbuilify' />
            <label className='tt-filebutton__label' htmlFor='fileInput'>Import a Page</label>
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
