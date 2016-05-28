import React from 'react';
import Icon from '../icon';
import classNames from '../../../common/classnames';

export default class CurrentPageItem extends React.Component {
  static propTypes = {
    onRemove: React.PropTypes.func,
    data: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    onRemoveClick: function () {}
  };

  renderHandle () {
    return (
      <div className='handle' title='Remove Element'>
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
        <Icon onClick={onRemove} style={removeIconStyle} className='remove' size={24} icon='clear' />
      </li>
    );
  }
}
