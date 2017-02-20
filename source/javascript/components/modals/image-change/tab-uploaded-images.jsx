import React from 'react';
import { connect } from 'react-redux';
import { map as _map } from 'lodash';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';
import Image from '../../shared/image';
import Button from '../../shared/button';
import { deleteAllAssets as deleteAllAssetsAction } from '../../../actions';


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

  deleteAssets () {
    this.props.deleteAllAssets();
    return this.props.onClose();
  }

  renderImages () {
    const { assets } = this.props;

    if (assets.length === 0) {
      return <p>{ localization('upload some images') }</p>;
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
          className={classNames('modal__tabimage')}
          src={fileData} />
      );
    });
  }

  render () {
    const { assets } = this.props;
    const imagesUploaded = assets.length;
    const uploadedInformation = `You have ${imagesUploaded} images uploaded`;

    return (
      <div className={classNames('modal__tab')}>
        <aside className={classNames('modal__tabside')}>
          <h2>Uploaded</h2>
          <p>{ uploadedInformation }</p>
          <Button label={localization('delete all images')} onClick={::this.deleteAssets}/>
        </aside>
        <main className={classNames('modal__tabcontent')}>
          <Scrollbar height={380}>
            <div className={classNames('modal__tabimages')}>
              { this.renderImages() }
            </div>
          </Scrollbar>
        </main>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { assets } = state;

  return {
    assets
  };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteAllAssets: () => {
      dispatch(deleteAllAssetsAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedImagesTab);
