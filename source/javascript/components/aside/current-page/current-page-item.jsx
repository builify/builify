import React from 'react';
import Icon from '../../shared/icon';
import localization from '../../../common/localization';
import classNames from '../../../common/classnames';
import { emptyFunction } from '../../../common/misc';

export default class CurrentPageItem extends React.Component {
  static propTypes = {
    onRemove: React.PropTypes.func,
    data: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    onRemoveClick: emptyFunction
  };

  renderHandle () {
    const title = localization('remove element');
    
    return (
      <div className='handle' title={title}>
        <Icon size={18} icon='reorder' />
      </div>
    );
  }

  render () {
    const { data, onRemove } = this.props;
    const { id, type, blockName } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const sortable = type === 'navigation' || type === 'footer' ? false : true;
    const itemClassName = classNames('currentPage__item', {
      'notsortable': !sortable
    });

    return (
      <li data-blockid={id} className={itemClassName}>
        { sortable && this.renderHandle() }
        <div className={classNames('currentPage__item-title')}>
          <span>{ blockName }</span>
        </div>
        <Icon
          onClick={onRemove}
          style={removeIconStyle}
          className='remove'
          size={24}
          icon='clear' />
      </li>
    );
  }
}
