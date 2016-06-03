import React from 'react';
import ContentTabs from './content-tabs';
import ModalTab from '../common/tab';
import { defaultTabId, tabList } from './config';

export default class TabNavigation extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    builderConfiguration: React.PropTypes.object.isRequired,
    assets: React.PropTypes.array.isRequired,
    editTarget: React.PropTypes.any.isRequired,
    onUploadImage: React.PropTypes.func.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  };

  state = {
    activeTab: defaultTabId
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.activeTab !== this.state.activeTab) {
      return true;
    }

    return false;
  }

  render () {
    const { onSelectImage, builder, assets, builderConfiguration, editTarget, onUploadImage } = this.props;
    const { activeTab } = this.state;

    return (
      <ModalTab
        title='Select an Image'
        uploadedImagesLength={assets.length}
        nav={tabList}
        activeTab={activeTab}
        onTabClick={(id) => {
          this.setState({
            activeTab: id
          });
        }}>
        <ContentTabs
          onSelectImage={onSelectImage}
          editTarget={editTarget}
          onUploadImage={onUploadImage}
          builder={builder}
          assets={assets}
          builderConfiguration={builderConfiguration}
          activeTab={activeTab} />
      </ModalTab>
    );
  }
}
