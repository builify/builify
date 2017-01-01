import React from 'react';
import classNames from '../../../common/classnames';

export default class BlockTitle extends React.Component {
  static propTypes = {
    filterContentBlocksTarget: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title, filterContentBlocksTarget } = this.props;
    const className = classNames(null, 'blocktitle', {
      'hide': filterContentBlocksTarget !== 'all'
    });

    return (
      <h2 className={className}>
        <span>{ title }</span>
      </h2>
    );
  }
}
