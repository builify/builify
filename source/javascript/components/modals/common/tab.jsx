import React from 'react';
import _map from 'lodash/map';
import _has from 'lodash/has';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import Icon from '../../shared/icon';

export default class ModalTab extends React.Component {
  static propTypes = {
    nav: React.PropTypes.array,
    title: React.PropTypes.string,
    info: React.PropTypes.string,
    activeTab: React.PropTypes.number,
    uploadedImagesLength: React.PropTypes.number,
    onTabClick: React.PropTypes.func,
    children: React.PropTypes.node
  };

  static defaultProps = {
    uploadedImagesLength: 0,
    activeTab: 0,
    onTabClick: function () {}
  };

  renderNav () {
    const { activeTab, onTabClick, nav, uploadedImagesLength } = this.props;

    if (!nav) {
      return null;
    }

    return (
      <nav>
        { _map(nav, tab => {
          const { id } = tab;
          const className = classNames('modal__tablabel', {
            'active': id === activeTab
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
            <div key={Random.randomKey('tab')} className={className} onClick={() => { onTabClick(id); }}>
              <span>{ label }</span>
            </div>
          );
        }) }
      </nav>
    );
  }

  renderCloseIcon () {
    return (
      <div className={classNames('modal__close')} title='Close tab'>
        <Icon icon='remove' size={26} />
      </div>
    );
  }

  render () {
    const { title, info, children } = this.props;

    return (
      <div>
        <header className={classNames('modal__tabs')}>
          { title && <h2>{ title }</h2> }
          { info && <h3>{ info }</h3> }
          { this.renderNav() }
          { this.renderCloseIcon() }
        </header>
        { children }
      </div>
    );
  }
}
