import React from 'react';
import UploadImageTab from './tab-upload';
import UploadedImagesTab from './tab-uploaded-images';
import CurrentImageTab from './tab-current-image';
import LibraryTab from './tab-library';

export default class ContentTabs extends React.Component {
  static propTypes = {
    activeTab: React.PropTypes.number.isRequired
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

    switch (activeTab) {
      case 1:
        return (
          <LibraryTab
            onSelectImage={onSelectImage}
            builderConfiguration={builderConfiguration} />
          );

      case 2:
        return (
          <CurrentImageTab
            editTarget={editTarget} />
          );

      case 3:
        return (
          <UploadImageTab
            onUploadImage={onUploadImage} />
        );

      case 4:
        return (
          <UploadedImagesTab
            onSelectImage={onSelectImage}
            builder={builder} />
          );

      default:
        return null;
    }
  }
}
