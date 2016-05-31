import React from 'react';
import classNames from '../../common/classnames';
import SuggestionBox from './suggestion-box';
import Frame from './frame';
import { connect } from 'react-redux';
import { CurrentLocations, PreviewModes } from '../../constants';

class Canvas extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    builder: React.PropTypes.object.isRequired,
    preview: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props !== this.props ||
        this.props.page.footer !== nextProps.page.footer ||
        this.props.page.navigation !== nextProps.page.navigation ||
        this.props.builder !== nextProps.builder ||
        this.props.page !== nextProps.page ||
        this.props.preview !== nextProps.preview) {
      return true;
    }

    return false;
  }

  render () {
    const { page, builder, preview } = this.props;
    const { blocksCount } = page;
    const { currentLocation } = builder;
    const { previewMode } = preview;
    const suggestionActive = blocksCount === 0;

    const className = classNames('canvas', {
      'hide': currentLocation === CurrentLocations.STARTSCREEN,
      'desktop': previewMode === PreviewModes.DESKTOP,
      'tablet': previewMode === PreviewModes.TABLET,
      'phone': previewMode === PreviewModes.PHONE
    });

    return (
      <div className={className}>
        <Frame />
        <SuggestionBox display={suggestionActive} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    page: state.page,
    preview: state.preview
  };
}

export default connect(mapStateToProps)(Canvas);
