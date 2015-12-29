import React from 'react';
import _ from 'lodash';
import Button from '../../Shared/Button';

export default class BottomNavigation extends React.Component {
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

  saveClick () {
    const { closeDialog } = this.props;

    return closeDialog;
  }

  renderActions () {
    const { closeDialog } = this.props;
    const actions = [
      { label: 'Cancel', onClick: closeDialog },
      { label: 'Save', onClick: ::this.saveClick }
    ];

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
