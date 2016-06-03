import React from 'react';
import classNames from '../../common/classnames';
import Tab from './tab';
import { connect } from 'react-redux';
import { closeTab } from '../../actions';

class Aside extends React.Component {
  static propTypes = {
    tabs: React.PropTypes.array.isRequired,
    closeTab: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <aside className={classNames('aside')}>
        <div className={classNames('aside__wrapper')}>
          <div className={classNames('aside__item')}>
            <Tab onCloseTab={this.props.closeTab} tabs={this.props.tabs} />
          </div>
        </div>
      </aside>
    );
  }
}

function mapStateToProps (state) {
  const { builderConfiguration } = state;
  const { tabs } = builderConfiguration;

  return {
    tabs: tabs
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
