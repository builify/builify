import React from 'react';
import PropTypes from 'prop-types';

export default class TTCheckerBoard extends React.Component {
  static propTypes = {
    rows: PropTypes.number,
    columns: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.node
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
    let { width, height } = canvas;

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
