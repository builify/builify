import { connect } from 'react-redux';
import React from 'react';
import find from 'lodash/find';
import words from 'lodash/words';
import size from 'lodash/size';
import isObject from 'lodash/isobject';
import has from 'lodash/has';
import map from 'lodash/map';
import proccessChildren from '../../children-render/process-children';
import renderProccessedChildren from '../../children-render/render-processed-children';
import BackButton from '../shared/backbutton';
import Scrollbar from '../shared/scrollbar';
import classNames from '../../common/classnames';

class Tab extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    tabs: React.PropTypes.array.isRequired,
    onCloseTab: React.PropTypes.func.isRequired
  };

  state = {
    currentTabID: null,
    currentTab: null
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.builder.currentTab === this.state.currentTabID ? false : true;
  }

  componentWillMount () {
    this.initializeState(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.initializeState(nextProps);
  }

  initializeState (props) {
    const { builder, tabs } = props;
    const { currentTab: currentTabID } = builder;
    const splitCurrentTab = words(currentTabID, /[^.]+/g);
    const splitSize = size(splitCurrentTab);
    let currentTab = null;

    if (splitSize === 1) {
      currentTab = find(tabs, {
        'id': currentTabID
      });
    } else {
      currentTab = find(tabs, {
        'id': splitCurrentTab[splitSize - 1]
      });
    }

    if (isObject(currentTab)) {
      this.setState({
        currentTabID: currentTabID,
        currentTab: currentTab
      });
    } else {
      throw Error('Tab is not object.');
    }
  }

  closeTab () {
    return this.props.onCloseTab();
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
    if (has(currentTab, 'title')) {
      if (has(currentTab, 'subtitle')) {
        return (
          <h1 className={classNames('sidetab__title')}>
            <span>{currentTab.title}</span>
            <span>{currentTab.subtitle}</span>
          </h1>
        );
      } else {
        return <h1 className={classNames('sidetab__title')}>{currentTab.title}</h1>;
      }
    }

    return null;
  }

  renderContent () {
    const { currentTab } = this.state;
    const { content } = currentTab;

    if (content) {
      return map(proccessChildren(content), (child) => {
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
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(Tab);
