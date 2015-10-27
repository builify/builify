import React, { Component, PropTypes } from 'react';
import { getString } from '../../Common/Localization';
import cx from 'classnames';

class Title extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const { title } = this.props;

    return (
      <h2>
        <span>{getString(title)}</span>
      </h2>
    )
  }
}

export default Title;
