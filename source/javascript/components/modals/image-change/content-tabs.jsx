import React from 'react';
import PropTypes from 'prop-types';
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
  builderConfiguration: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  editTarget: PropTypes.any.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
