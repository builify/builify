import React, { Component, PropTypes } from 'react';
import { getString } from '../../Common/Localization';
import cx from 'classnames';

class Title extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    const { title, className } = this.props;
    const titleClassName = cx(className);

    return (
      <div className='relav'>
        <h2 className={titleClassName}>
          <span>{getString(title)}</span>
        </h2>
      </div>
    )
  }
}

export default Title;
