export default class {
  defaultProps = {
    'gridColor': [196, 196, 196],
    'gridHeight': 16,
    'gridOffset': 0,
    'gridOpacity': 100,
    'gridSpace': 1,
    'gridTarget': document.body
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
    const svgURL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${gridSpace}' height='${gridHeight}'><rect style='fill:${gridColor};' width='1' height='0.25px' x='0' y='0'/></svg>")`;

    this.overlay = document.createElement('div');
    this.overlay.id = 'ttbaseline';
    this.overlay.style.backgroundImage = svgURL;
    this.overlay.style.position = 'absolute';
    this.overlay.style.top = `${gridOffset}px`;
    this.overlay.style.left = '0px';
    this.overlay.style.zIndex = 9998;
    this.overlay.style.pointerEvents = 'none';
    this.overlay.style.opacity = gridOpacity / 100;

    gridTarget.appendChild(this.overlay);

    this.resize();
  }

  getSizeParameter(name) {
    name = name && name[0].toUpperCase() + name.slice(1);

    return Math.max(
      document.documentElement[`client${name}`],
      document.body[`scroll${name}`],
      document.documentElement[`scroll${name}`],
      document.body[`offset${name}`],
      document.documentElement[`offset${name}`]
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
      this.overlay.remove();
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
    this.overlay.style.display = 'block';
    return this;
  }

  off () {
    this.overlay.style.display = 'none';
    return this;
  }
}
