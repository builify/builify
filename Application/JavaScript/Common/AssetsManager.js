import _ from 'lodash';

class AssetsManager {
  _assets = [];

  addAsset (asset) {
    this._assets.push(asset);
  }

  get getAssets () {
    return this._assets;
  }
}

const CAssetsManager = new AssetsManager();

export default CAssetsManager;
