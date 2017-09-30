import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'lodash';
import { connect } from 'react-redux';
import classNames from '../../common/classnames';
import random from '../../common/random';
import PreviewControlsItem from './preview-controls-item';
import { CurrentLocations, PreviewModes } from '../../constants';
import { setPreviewMode } from '../../actions';

class PreviewControls extends React.Component {
  static propTypes = {
    currentLocation: PropTypes.number.isRequired,
    previewMode: PropTypes.number.isRequired,
    setPreviewMode: PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.currentLocation !== nextProps.currentLocation ||
        this.props.previewMode !== nextProps.previewMode) {
      return true;
    }

    return false;
  }

  renderItems (items) {
    const { currentLocation, setPreviewMode, previewMode } = this.props;
    const hide = !!(currentLocation === CurrentLocations.STARTSCREEN && true);

    return _map(items, (item, idx) => {
      const { name } = item;
      return (
        <PreviewControlsItem
          key={random.randomKey('pci')}
          name={name}
          onClick={setPreviewMode}
          active={idx === previewMode}
          hidden={idx !== 0 && hide} />
      );
    });
  }

  render () {
    const items = [
      { name: 'settings-applications' },
      { name: 'tablet' },
      { name: 'phone' }
    ];

    return (
      <div className={classNames('preview-controls')}>
        <ul>
          { this.renderItems(items) }
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder, preview } = state;
  const { currentLocation } = builder;
  const { previewMode } = preview;

  return {
    currentLocation,
    previewMode
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setPreviewMode: (mode) => {
      let previewType = PreviewModes.INITIAL;

      if (mode === 'desktop') {
        previewType = PreviewModes.DESKTOP;
      } else if (mode === 'tablet') {
        previewType = PreviewModes.TABLET;
      } else if (mode === 'phone') {
        previewType = PreviewModes.PHONE;
      }

      dispatch(setPreviewMode(previewType));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewControls);
