import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';

export default class ModalTab extends React.Component {
  static propTypes = {
    nav: React.PropTypes.array,
    title: React.PropTypes.string,
    info: React.PropTypes.string,
    activeTab: React.PropTypes.number,
    uploadedImagesLength: React.PropTypes.number,
    onTabClick: React.PropTypes.func
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
        { _.map(nav, tab => {
          const { label, id } = tab;
          const className = classNames('ab-modal__tablabel', id === activeTab ? 'active' : null);

          if (_.has(tab, 'imagesUploaded') && uploadedImagesLength === 0) {
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
        <header className='ab-modal__tabs'>
          { title ? <h2>{title}</h2> : null }
          { info ? <h3>{info}</h3> : null }
          { this.renderNav() }
        </header>
        { children }
      </div>
    );
  }
}
