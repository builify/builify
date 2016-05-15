import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';

export default class Title extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    className: React.PropTypes.string
  };

  render () {
    const { title, description } = this.props;
    const titleClassName = classNames('title', this.props.className);
    const descClassName = classNames('title__desc');

    console.log(localization(title));

    if (title) {
      return (
        <div className={titleClassName}>
          <h2>
            <span>{localization(title)}</span>
          </h2>
          { description && <p className={descClassName}>{description}</p> }
        </div>
      );
    }

    return null;
  }
}
