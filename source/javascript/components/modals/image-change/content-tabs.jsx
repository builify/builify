import React from 'react';
import UploadImageTab from './tab-upload';
import UploadedImagesTab from './tab-uploaded-images';
import CurrentImageTab from './tab-current-image';
import LibraryTab from './tab-library';

export default function ContentTabs ({
  builderConfiguration,
  activeTab,
  editTarget,
  onSelectImage,
  onUploadImage,
  onClose
}) {
  if (activeTab === 1) {
    return <LibraryTab onSelectImage={onSelectImage} builderConfiguration={builderConfiguration} />;
  } else if (activeTab === 2) {
    return <CurrentImageTab editTarget={editTarget} />;
  } else if (activeTab === 3) {
    return <UploadImageTab onUploadImage={onUploadImage} />;
  } else if (activeTab === 4) {
    return <UploadedImagesTab selectImage={onSelectImage} onClose={onClose} />;
  }

  return null;
}

ContentTabs.propTypes = {
  builderConfiguration: React.PropTypes.object.isRequired,
  activeTab: React.PropTypes.number.isRequired,
  editTarget: React.PropTypes.any.isRequired,
  onSelectImage: React.PropTypes.func.isRequired,
  onUploadImage: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
};
