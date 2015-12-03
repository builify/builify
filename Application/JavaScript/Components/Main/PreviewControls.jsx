import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setPreviewMode, closePreview } from '../../Actions';
import BackButton from '../Shared/BackButton';
import Icon from '../Shared/Icon';
import ControlItem from './PreviewControlItem';

class PreviewControls extends Component {
  static propTypes = {
    display: PropTypes.bool.isRequired
  }

  closePreviewWindow () {
    return closePreview();
  }

  render () {
    const { display } = this.props;

    if (display) {
      return (
        <div className='ab-preview__controls'>
          <BackButton
            wrapperClassName={'ab-preview__close'}
            clickFunction={this.closePreviewWindow} />
          <div className='ab-preview__responsive'>
            <ul>
              <ControlItem
                type='desktop' />
              <ControlItem
                type='tablet' />
              <ControlItem
                type='phone' />
            </ul>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default PreviewControls;
