import { connect } from 'react-redux';
import { closeTab } from '../../Actions';
import React from 'react';
import classNames from 'classnames';
import Tab from './Tab';

class Aside extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  renderTab () {
    const { builderConfiguration, closeTab } = this.props;
    const { tabs } = builderConfiguration;

    return (
      <Tab
        onCloseTab={closeTab}
        tabs={tabs} />
    );
  }

  render () {
    const className = classNames('ab-aside');

    return (
      <aside className={className} >
        <div className='ab-aside__wrapper'>
          <div className='ab-aside__item'>
            { this.renderTab() }
          </div>
        </div>
      </aside>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeTab: () => {
      dispatch(closeTab());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
