import React from 'react';
import _has from 'lodash/has';
import classNames from '../../common/classnames';
import SuggestionBox from './suggestion-box';
import Frame from './frame';
import { connect } from 'react-redux';
import { CurrentLocations, PreviewModes } from '../../constants';

class Canvas extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    builder: React.PropTypes.object.isRequired,
    preview: React.PropTypes.object.isRequired,
    template: React.PropTypes.object.isRequired
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

  return {
    builder,
    page,
    preview,
    template
  };
}

export default connect(mapStateToProps)(Canvas);
