class AssetsManager {
  _downloadQueue = [];
  _cache = [];
  _errorCount = 0;
  _succesCount = 0;

  vertifyAsset (asset) {
    return true;
  }

  addAsset (asset) {
    if (this.vertifyAsset(asset)) {
      this._downloadQueue.push(asset);
    }

    return this;
  }

  get getAssets () {
    return this._downloadQueue;
  }
}

const CAssetsManager = new AssetsManager();

export default CAssetsManager;
