import React from 'react';
import classNames from 'classnames';

export default class BlockTitle extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { builder, data } = this.props;
    const { name } = data;
    const { filterContentBlocksTarget } = builder;
    let titleBlockname = classNames('blocktitle');

    if (filterContentBlocksTarget !== 'all') {
      titleBlockname = classNames('blocktitle', 'hide');
    }

    return (
      <h2 className={titleBlockname}>
        <span>{name}</span>
      </h2>
    );
  }
}
