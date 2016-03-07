import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';
import Scrollbar from '../../Shared/Scrollbar';

export default class TabIcons extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    builderConfiguration: React.PropTypes.object.isRequired
  };

  state = {
    activeCategory: 0
  };

  defaultIconPacks = [];

  componentWillMount () {
    const { builderConfiguration } = this.props;
    const { iconPacks } = builderConfiguration;

    this.defaultIconPacks = iconPacks;
  }

  renderCategories () {
    const { activeCategory } = this.state;

    return _.map(this.defaultIconPacks, (item, idx) => {
      const { iconFullname } = item;
      const className = classNames('ab-modal__tabitem', {
        'active': !!(idx === activeCategory)
      });

      return (
        <div
          key={Random.randomKey('tabitem')}
          className={className}
          onClick={() => {
            this.setState({
              activeCategory: idx
            });
          }}>
          <span>{iconFullname}</span>
        </div>
      );
    });
  }

  renderFonts () {
    const { onSelect } = this.props;
    const { activeCategory } = this.state;
    const iconPack = this.defaultIconPacks[activeCategory];
    const { iconClass, icons } = iconPack;
    let className = null;
    let key = null;

    if (icons) {
      return _.map(icons, (icon) => {
        className = classNames(iconClass, icon);
        key = Random.randomKey();

        return (
          <i
            key={key}
            data-iconname={icon}
            className={className}
            title={icon}
            onClick={() => {
              return onSelect({
                iconClass: iconClass,
                icon: icon
              });
            }} />
        );
      });
    }

    return null;
  }

  render () {
    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Fonts</h2>
          <nav className='ab-modal__tabmenu'>
            { this.renderCategories() }
          </nav>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            <div className='ab-modal__icons'>
              { this.renderFonts() }
            </div>
          </Scrollbar>
        </main>
      </div>
    );
  }
}
