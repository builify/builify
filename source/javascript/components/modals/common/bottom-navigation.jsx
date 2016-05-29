import React from 'react';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import Button from '../../shared/button';

export default class BottomNavigation extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  renderButtons (actions) {
    return _map(actions, (action, idx) => {
      const className = classNames('modal__button', action.className);
      return <Button key={idx} {...action} className={className} />;
    });
  }

  renderActions () {
    const { actions } = this.props;
    return this.renderButtons(actions);
  }

  render () {
    return (
      <nav role='navigation' className={classNames('modal__navigation')}>
        { this.renderActions() }
      </nav>
    );
  }
}
