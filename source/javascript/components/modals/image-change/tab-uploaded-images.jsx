import React from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';
import Image from '../../shared/image';

export default class UploadedImagesTab extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { builder, onSelectImage } = this.props;
    const { uploadedImages } = builder;
    const imagesUploaded = uploadedImages.length;
    const uploadedInformation = `You have ${imagesUploaded} images uploaded`;

    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Uploaded</h2>
          <p>{ uploadedInformation }</p>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            <div className='ab-modal__tabimages'>
              { _map(uploadedImages, item => {
                const className = classNames('ab-modal__tabimage');
                const { fileData } = item;

                return (
                  <Image
                    onClick={() => {
                      return onSelectImage({
                        src: fileData
                      });
                    }}
                    key={Random.randomKey('upimg')}
                    className={className}
                    backgroundImage
                    src={fileData} />
                );
              }) }
            </div>
          </Scrollbar>
        </main>
      </div>
    );
  }
}
