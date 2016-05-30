import React from 'react';
import _map from 'lodash/map';
import _values from 'lodash/values';
import Random from '../../../common/random';
import classNames from '../../../common/classnames';
import Sortable from '../sortable';
import CurrentPageItem from './current-page-item';

export default class CurrentPageSections extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onSortBlocks: React.PropTypes.func.isRequired
  };

  renderCurrentPageItems (items) {
    return _map(items, (item) => {
      return (
          <CurrentPageItem
            onRemove={() => {
              return this.props.onRemove(item);
            }}
            data={item}
            key={Random.randomKey('current-page-item')} />
      );
    });
  }

  renderPageDivider (notSortableItems) {
    return notSortableItems.length > 0 ? <div className={classNames('currentPage__divider')} /> : null;
  }

  render () {
    const { page } = this.props;
    const { navigation, main, footer } = page;
    const sortableOptions = {
      draggable: '.draggable',
      filter: '.ignore',
      handle: '.handle',
      onSort: (evt) => {
        return this.props.onSortBlocks(evt);
      }
    };
    let items = [];
    let notSortableItems = [];

    _map(main, (mainItem) => {
      items.push(mainItem);
    });

    if (_values(navigation).length !== 0) {
      notSortableItems.unshift(navigation);
    }

    if (_values(footer).length !== 0) {
      notSortableItems.push(footer);
    }

    if (_values(navigation).length === 0 && _values(footer).length === 0 && main.length === 0) {
      return <span className='tip'>Your current page is empty :(</span>;
    } else {
      return (
        <div>
          <ul>
            { this.renderCurrentPageItems(notSortableItems) }
          </ul>
          { this.renderPageDivider(notSortableItems) }
          <Sortable
            sortable={sortableOptions}
            component='ul'
            childElement='div'
            className={classNames('currentPage')}>
            { this.renderCurrentPageItems(items) }
          </Sortable>
          { this.renderPageDivider(items) }
        </div>
      );
    }
  }
}
