import React from 'react';
import classNames from 'classnames';
import { getString } from '../../Common/Localization';

export default class Title extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    className: React.PropTypes.string
  };

  render () {
    const { title, className, description } = this.props;
    const titleClassName = classNames('ab-title', className ? className: null);
    const descClassName = classNames('ab-title__desc');

    if (title) {
      return (
        <div className={titleClassName}>
          <h2>
            <span>{getString(title)}</span>
          </h2>
          { description ? <p className={descClassName}>{description}</p> : null }
        </div>
      );
    }

    return null;
  }
}
