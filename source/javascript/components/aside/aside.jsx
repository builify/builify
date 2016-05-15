import React from 'react';
import classNames from '../../common/classnames';
import Tab from './tab';
import { connect } from 'react-redux';
import { closeTab } from '../../actions';

class Aside extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  renderTab () {
    const { builderConfiguration, closeTab } = this.props;
    const { tabs } = builderConfiguration;

    return <Tab onCloseTab={closeTab} tabs={tabs} />;
  }

  render () {
    return (
      <aside className={classNames('aside')}>
        <div className={classNames('aside__wrapper')}>
          <div className={classNames('aside__item')}>
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
