import React from 'react';
import UploadImageTab from './tab-upload';
import UploadedImagesTab from './tab-uploaded-images';
import CurrentImageTab from './tab-current-image';
import LibraryTab from './tab-library';

export default class ContentTabs extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    builderConfiguration: React.PropTypes.object.isRequired,
    activeTab: React.PropTypes.number.isRequired,
    editTarget: React.PropTypes.node.isRequired,
    onSelectImage: React.PropTypes.func.isRequired,
    onUploadImage: React.PropTypes.func.isRequired
  };

  render () {
    const {
      onSelectImage,
      editTarget,
      activeTab,
      builder,
      builderConfiguration,
      onUploadImage
    } = this.props;

    if (activeTab === 1) {
      return <LibraryTab onSelectImage={onSelectImage} builderConfiguration={builderConfiguration} />;
    } else if (activeTab === 2) {
      return <CurrentImageTab editTarget={editTarget} />;
    } else if (activeTab === 3) {
      return <UploadImageTab onUploadImage={onUploadImage} />;
    } else if (activeTab === 4) {
      return <UploadedImagesTab onSelectImage={onSelectImage} builder={builder} />;
    }

    return null;
  }
}
