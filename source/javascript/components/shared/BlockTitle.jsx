import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class BlockTitle extends React.Component {
	render () {
    const { builder, data } = this.props;
    const { name } = data;
    const { filterContentBlocksTarget } = builder;
    let titleBlockname = classNames('blocktitle');

    if (filterContentBlocksTarget != 'all') {
      titleBlockname = classNames('blocktitle', 'hide');
    }

    return (
      <h2 className={titleBlockname}>
        <span>{name}</span>
      </h2>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(mapStateToProps)(BlockTitle);
