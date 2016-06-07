import React from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';
import Image from '../../shared/image';
import Button from '../../shared/button';
import { connect } from 'react-redux';
import { deleteAllAssets } from '../../../actions';

class UploadedImagesTab extends React.Component {
  static propTypes = {
    assets: React.PropTypes.array.isRequired,
    selectImage: React.PropTypes.func.isRequired,
    deleteAllAssets: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  renderImages (assets) {
    if (assets.length === 0) {
      return <p>This seems place seems empty...</p>;
    }

    return _map(assets, (asset) => {
      const { fileData } = asset;

      return (
        <Image
          backgroundImage
          onClick={() => {
            return this.props.selectImage(asset);
          }}
          key={Random.randomKey('upimg')}
          className={classNames('ab-modal__tabimage')}
          src={fileData} />
      );
    });
  }

  deleteAssets () {
    this.props.deleteAllAssets();
    return this.props.onClose();
  }

  render () {
    const { assets } = this.props;
    const imagesUploaded = assets.length;
    const uploadedInformation = `You have ${imagesUploaded} images uploaded`;

    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Uploaded</h2>
          <p>{ uploadedInformation }</p>
          <Button label='Delete All Images' onClick={::this.deleteAssets}/>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            <div className='ab-modal__tabimages'>
              { this.renderImages(assets) }
            </div>
          </Scrollbar>
        </main>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    assets: state.assets
  };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteAllAssets: () => {
      dispatch(deleteAllAssets());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedImagesTab);
