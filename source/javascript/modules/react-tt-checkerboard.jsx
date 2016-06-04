import React from 'react';

export default class TTCheckerBoard extends React.Component {
  static propTypes = {
    rows: React.PropTypes.number,
    columns: React.PropTypes.number,
    color: React.PropTypes.string,
    className: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    children: React.PropTypes.node
  };

  static defaultProps = {
    rows: 8,
    columns: 8,
    color: '#eee',
    width: 100,
    height: 100
  };

  componentDidMount () {
    const { rows, columns, color } = this.props;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    var { width, height } = canvas;

    const nRow = rows;
    const nCol = columns;

    width /= nCol;
    height /= nRow;

    for (let i = 0; i < nRow; i++) {
      for (let j = 0, col = nCol / 2; j < col; j++) {
        ctx.rect(2 * j * width + (i % 2 ? 0 : width), i * height, width, height);
      }
    }

    ctx.fillStyle = color;
    ctx.fill();
  }

  render () {
    const { width, height, className } = this.props;
    const style = {
      position: 'absolute'
    };

    return (
      <div>
        <canvas
          className={className}
          ref='canvas'
          width={width}
          height={height}
          style={style} />
        { this.props.children }
      </div>
    );
  }
}
