import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';

export default class TabIcons extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    builderConfiguration: React.PropTypes.object.isRequired
  };

  state = {
    activeCategory: 0
  };

  defaultIconPacks = [];
  iconsToRender = [];

  componentWillMount () {
    const { builderConfiguration } = this.props;
    const { iconPacks } = builderConfiguration;
    const { activeCategory } = this.state;
    const activeIconPack = iconPacks[activeCategory];
    const { icons } = activeIconPack;
    let iconDocument = {};
    let iconDocuments = [];

    _.map(icons, (icon, idx) => {
      iconDocument = {
        idx: idx,
        icon: icon
      };

      iconDocuments.push(iconDocument);
    });


    this.defaultIconPacks = iconPacks;

    this.iconsToRender = iconDocuments;
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
            if (idx !== activeCategory) {
              this.setState({
                activeCategory: idx
              });
            }
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
      return _.map(this.iconsToRender, (icon) => {
        className = classNames(iconClass, icon.icon);
        key = Random.randomKey();

        return (
          <i
            key={key}
            data-iconname={icon.icon}
            className={className}
            title={icon.icon}
            onClick={() => {
              return onSelect({
                iconClass: iconClass,
                icon: icon.icon
              });
            }} />
        );
      });
    }

    return null;
  }

  render () {
    return (
      <div>
        <header className='ab-modal__tabs'>
          <h2>Choose Icon</h2>
        </header>
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
      </div>
    );
  }
}
