const isRemoveSupported = !!('remove' in document.createElement('p'));

export default class {
  defaultProps = {
    'gridColor': [196, 196, 196],
    'gridHeight': 16,
    'gridOffset': 0,
    'gridOpacity': 100,
    'gridSpace': 1,
    'gridTarget': document
  };

  overlay = null;

  constructor(props) {
    this.userProps = Object.assign({}, this.defaultProps, props);
    this.createGridOverlay();
  }

  createGridOverlay() {
    if (this.overlay) {
      return;
    }

    const {
      gridSpace,
      gridHeight,
      gridColor,
      gridOffset,
      gridTarget,
      gridOpacity
    } = this.userProps;
    const svgURL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${gridSpace}' height='${gridHeight}'><rect style='fill:${gridColor};' width='1' height='0.25px' x='0' y='0'/></svg>")`; //eslint-disable-line max-len

    this.overlay = gridTarget.createElement('div');
    this.overlay.id = 'ttbaseline';
    this.overlay.style.backgroundImage = svgURL;
    this.overlay.style.position = 'absolute';
    this.overlay.style.top = `${gridOffset}px`;
    this.overlay.style.left = '0px';
    this.overlay.style.zIndex = 9998;
    this.overlay.style.pointerEvents = 'none';
    this.overlay.style.opacity = gridOpacity / 100;

    this.overlay.setAttribute('data-tt-baseline', true);

    gridTarget.body.appendChild(this.overlay);

    this.resize();
  }

  getSizeParameter(name) {
    const { gridTarget } = this.userProps;

    name = name && name[0].toUpperCase() + name.slice(1);

    return Math.max(
      gridTarget.documentElement[`client${name}`],
      gridTarget.body[`scroll${name}`],
      gridTarget.documentElement[`scroll${name}`],
      gridTarget.body[`offset${name}`],
      gridTarget.documentElement[`offset${name}`]
    );
  }

  resize () {
    if (!this.overlay) {
      return;
    }

    const documentSize = {
      height: this.getSizeParameter('height'),
      width: this.getSizeParameter('width')
    };

    this.overlay.style.width = `${documentSize.width}px`;
    this.overlay.style.height = `${documentSize.height}px`;
  }

  destoryGridOverlay () {
    if (this.overlay) {
      if (isRemoveSupported) {
        this.overlay.remove();
      } else if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }

      this.overlay = null;
    }
  }

  setHeight (height) {
    this.destoryGridOverlay();
    this.userProps.gridHeight = parseInt(height);
    this.createGridOverlay();

    return this;
  }

  on () {
    this.resize();
    this.setOverlayDisplayValue('block');
    return this;
  }

  off () {
    this.setOverlayDisplayValue('none');
    return this;
  }

  setOverlayDisplayValue (value = 'none') {
    this.overlay.style.display = value;
  }
}
