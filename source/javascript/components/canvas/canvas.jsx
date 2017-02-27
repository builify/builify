import React from 'react';
import { connect } from 'react-redux';
import {
  has as _has,
  isEqual as _isEqual
} from 'lodash';
import classNames from '../../common/classnames';
import SuggestionBox from './suggestion-box';
import Frame from './frame';
import { CurrentLocations, PreviewModes } from '../../constants';

class Canvas extends React.Component {
  static propTypes = {
    previewMode: React.PropTypes.number.isRequired,
    currentLocation: React.PropTypes.number.isRequired,
    blocksCount: React.PropTypes.number.isRequired,
    template: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.currentLocation !== this.props.currentLocation ||
        nextProps.previewMode !== this.props.previewMode ||
        nextProps.blocksCount !== this.props.blocksCount ||
        !_isEqual(nextProps.template, this.props.template)) {
      return true;
    }

    return false;
  }

  render () {
    const { previewMode, currentLocation, blocksCount } = this.props;
    const suggestionActive = blocksCount === 0;

    const className = classNames('canvas', {
      hide: currentLocation === CurrentLocations.STARTSCREEN,
      desktop: previewMode === PreviewModes.DESKTOP,
      tablet: previewMode === PreviewModes.TABLET,
      phone: previewMode === PreviewModes.PHONE
    });

    // Hack to detect whether the manifest file of template
    // has been loader or not.
    const templateReady = _has(this.props.template, 'external');

    return (
      <div className={className}>
        { templateReady && <Frame /> }
        <SuggestionBox display={suggestionActive} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder, page, preview, template } = state;
  const { blocksCount } = page;
  const { currentLocation } = builder;
  const { previewMode } = preview;

  return {
    blocksCount,
    currentLocation,
    previewMode,
    template
  };
}

export default connect(mapStateToProps)(Canvas);
