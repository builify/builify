import React from 'react';
import _map from 'lodash/map';
import classNames from '../../common/classnames';
import random from '../../common/random';
import PreviewControlsItem from './preview-controls-item';
import { connect } from 'react-redux';
import { CurrentLocations, PreviewModes } from '../../constants';
import { setPreviewMode } from '../../actions';

class PreviewControls extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    preview: React.PropTypes.object.isRequired,
    setPreviewMode: React.PropTypes.func.isRequired
  };

  renderItems (items) {
    const { builder, setPreviewMode, preview } = this.props;
    const { currentLocation } = builder;
    const { previewMode } = preview;
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
  return {
    builder: state.builder,
    preview: state.preview
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
