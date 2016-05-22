import React from 'react';
import _map from 'lodash/map';
import _has from 'lodash/has';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';

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
          const { label, id } = tab;
          const className = classNames('modal__tablabel', {
            'active': id === activeTab
          });

          if (_has(tab, 'imagesUploaded') && uploadedImagesLength === 0) {
            return;
          }

          return (
            <div
              key={Random.randomKey('tab')}
              className={className}
              onClick={() => {
                return onTabClick(id);
              }}>
              <span>{label}</span>
            </div>
          );
        }) }
      </nav>
    );
  }

  render () {
    const { title, info, children } = this.props;

    return (
      <div>
        <header className={classNames('modal__tabs')}>
          { title && <h2>{title}</h2> }
          { info && <h3>{info}</h3> }
          { this.renderNav() }
        </header>
        { children }
      </div>
    );
  }
}
