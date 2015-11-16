import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import Button from './Button';
import DialogWrapper from './DialogWrapper';

class DialogRestart extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  }

  renderButtons (actions) {
    return _.map(actions, (action, idx) => {
      let className = 'ab-dialog__button';

      if (action.className) className += ` ${action.className}`;

      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      )
    });
  }

  renderActions () {
    const actions = [
      { label: 'No' },
      { label: 'Yes' }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const { active } = this.props;
    const className = cx('ab-dialog', 'medium', active ? 'active' : null);

    return (
      <DialogWrapper
        className={className}>
        <section role='body' className='ab-dialog__body'>
          <h6 className='ab-dialog__title'>Restart</h6>
          <p>Do you want to go back to start screen and save current page?</p>
        </section>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    )
  }
}

export default DialogRestart;
