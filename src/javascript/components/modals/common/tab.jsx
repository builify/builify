import React from 'react';
import PropTypes from 'prop-types';
import {
  map as _map,
  has as _has
} from 'lodash';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import Icon from '../../shared/icon';

export default class ModalTab extends React.Component {
  static propTypes = {
    nav: PropTypes.array,
    title: PropTypes.string,
    info: PropTypes.string,
    activeTab: PropTypes.number,
    uploadedImagesLength: PropTypes.number,
    onTabClick: PropTypes.func,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    uploadedImagesLength: 0,
    activeTab: 0,
    onTabClick: () => {},
    onClose: () => {}
  };

  renderNavigation () {
    const { nav, uploadedImagesLength } = this.props;

    if (!nav) {
      return null;
    }

    return (
      <nav>
        { _map(nav, tab => {
          const { id } = tab;
          const className = classNames('modal__tablabel', {
            active: id === this.props.activeTab
          });
          let { label } = tab;

          if (_has(tab, 'imagesUploaded')) {
            if (uploadedImagesLength === 0) {
              return;
            } else {
              label = `${label} (${uploadedImagesLength})`;
            }
          }

          return (
            <div key={Random.randomKey('tab')} className={className} onClick={this.props.onTabClick.bind(this, id)}>
              <span>{ label }</span>
            </div>
          );
        }) }
      </nav>
    );
  }

  renderCloseIcon () {
    return (
      <div onClick={this.props.onClose} className={classNames('modal__close')} title='Close tab'>
        <Icon icon="remove" size={26} />
      </div>
    );
  }

  render () {
    const { title, info } = this.props;

    return (
      <div>
        <header className={classNames('modal__tabs')}>
          { title && <h2>{ title }</h2> }
          { info && <h3>{ info }</h3> }
          { this.renderNavigation() }
          { this.renderCloseIcon() }
        </header>
        { this.props.children }
      </div>
    );
  }
}
