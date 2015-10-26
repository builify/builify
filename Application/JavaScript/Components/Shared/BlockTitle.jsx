import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

class BlockTitle extends Component {
	render () {
    const { builder, data } = this.props;
    const { name } = data;
    const { filterContentBlocksTarget } = builder;
    let titleBlockname = cx('blocktitle');

    if (filterContentBlocksTarget != 'all') {
      titleBlockname = cx('blocktitle', 'hide');
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

export default connect(
  mapStateToProps
)(BlockTitle);