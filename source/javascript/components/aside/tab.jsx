import React from 'react';
import _find from 'lodash/find';
import _words from 'lodash/words';
import _size from 'lodash/size';
import _isObject from 'lodash/isobject';
import _has from 'lodash/has';
import _map from 'lodash/map';
import proccessChildren from '../../children-render/process-children';
import renderProccessedChildren from '../../children-render/render-processed-children';
import BackButton from './back-button';
import Scrollbar from '../shared/scrollbar';
import classNames from '../../common/classnames';
import { connect } from 'react-redux';
import { closeTab } from '../../actions';

class Tab extends React.Component {
  static propTypes = {
    currentTab: React.PropTypes.string.isRequired,
    closeTab: React.PropTypes.func.isRequired
  };

  state = {
    currentTabID: null,
    currentTab: null
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.currentTab !== this.state.currentTabID;
  }

  componentWillMount () {
    this.initializeState(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.initializeState(nextProps);
  }

  initializeState (props) {
    const { currentTab: currentTabID, tabs } = props;
    const splitCurrentTab = _words(currentTabID, /[^.]+/g);
    const splitSize = _size(splitCurrentTab);
    let currentTab = null;

    if (splitSize === 1) {
      currentTab = _find(tabs, {
        'id': currentTabID
      });
    } else {
      currentTab = _find(tabs, {
        'id': splitCurrentTab[splitSize - 1]
      });
    }

    if (_isObject(currentTab)) {
      this.setState({
        currentTabID: currentTabID,
        currentTab: currentTab
      });
    } else {
      throw Error('Tab is not object.');
    }
  }

  closeTab () {
    return this.props.closeTab();
  }

  renderBackButton () {
    const { currentTab } = this.state;

    if (currentTab.id !== 'initial') {
      return (
        <div>
          <BackButton onClick={::this.closeTab} />
          { this.renderTitle(currentTab) }
        </div>
      );
    }

    return null;
  }

  renderTitle (currentTab) {
    if (_has(currentTab, 'title')) {
      if (_has(currentTab, 'subtitle')) {
        return (
          <h1 className={classNames('tab__title')}>
            <span>{ currentTab.title }</span>
            <span>{ currentTab.subtitle }</span>
          </h1>
        );
      } else {
        return <h1 className={classNames('tab__title')}>{currentTab.title}</h1>;
      }
    }

    return null;
  }

  renderContent () {
    const { currentTab } = this.state;
    const { content } = currentTab;

    if (content) {
      return _map(proccessChildren(content), (child) => {
        return renderProccessedChildren(child);
      });
    }

    return null;
  }

  render () {
    return (
      <div className={classNames('tab')}>
        <Scrollbar aside innerPadding>
          { this.renderBackButton() }
          { this.renderContent() }
        </Scrollbar>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builderConfiguration, builder } = state;
  const { tabs } = builderConfiguration;
  const { currentTab } = builder;

  return {
    tabs: tabs,
    currentTab: currentTab
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeTab: function () {
      dispatch(closeTab());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
