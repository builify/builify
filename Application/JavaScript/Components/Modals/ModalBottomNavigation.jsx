import React from 'react';
import _ from 'lodash';
import Button from '../Shared/Button';

export default class BottomNavigation extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array.isRequired
  };

  renderButtons (actions) {
    return _.map(actions, (action, idx) => {
      let className = 'ab-modal__button';

      if (action.className) {
        className += ` ${action.className}`;
      }

      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      );
    });
  }

  renderActions () {
    const { actions } = this.props;

    return this.renderButtons(actions);
  }

  render () {
    return (
      <nav role='navigation' className='ab-modal__navigation'>
        { this.renderActions() }
      </nav>
    );
  }
}
