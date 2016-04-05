import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import proccessChildren from '../../Common/ProccessChildren';
import renderProccessedChildren from '../../Common/RenderProccessedChildren';
import BackButton from '../Shared/BackButton';
import Scrollbar from '../Shared/Scrollbar';

class Tab extends React.Component {
  closeTab () {
    return this.props.onCloseTab();
  }

  renderBackButton (builder) {
    const { tabs } = this.props;
    const { currentTab: currentTabID } = builder;
    const splitCurrentTab = _.words(currentTabID, /[^.]+/g);
    const splitSize = _.size(splitCurrentTab);
    let currentTab = null;

    if (splitSize === 1) {
      currentTab = _.find(tabs, {
        'id': currentTabID
      });
    } else {
      currentTab = _.find(tabs, {
        'id': splitCurrentTab[splitSize - 1]
      });
    }

    if (_.isObject(currentTab)) {
      if (currentTab.id !== 'initial') {
        return (
          <div>
            <BackButton onClick={::this.closeTab} />
            <h1 className='ab-sidetab__title'>{currentTab.title}</h1>
          </div>
        );
      }
    }

    return null;
  }

  renderContent (builder) {
    const { tabs } = this.props;
    const { currentTab: currentTabID } = builder;
    const splitCurrentTab = _.words(currentTabID, /[^.]+/g);
    const splitSize = _.size(splitCurrentTab);
    let currentTab = null;

    if (splitSize === 1) {
      currentTab = _.find(tabs, {
        'id': currentTabID
      });
    } else {
      currentTab = _.find(tabs, {
        'id': splitCurrentTab[splitSize - 1]
      });
    }

    if (_.isObject(currentTab)) {
      const { content } = currentTab;

      if (content) {
        var childrenToRender = proccessChildren(content);

        return _.map(childrenToRender, (child) => {
          return renderProccessedChildren(child);
        });
      }
    }

    return null;
  }

  render () {
    const { builder } = this.props;

    return (
      <div className='ab-tab'>
        <Scrollbar aside innerPadding>
          { this.renderBackButton(builder) }
          { this.renderContent(builder) }
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
