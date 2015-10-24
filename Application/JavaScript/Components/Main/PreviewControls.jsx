import React, { Component } from 'react';
import { closePreview } from '../../Actions/ActionCreators';
import BackButton from '../Shared/BackButton.jsx';
import SvgIcon from '../Shared/SvgIcon.jsx';

class PreviewControls extends Component {
  closePreviewWindow () {
    return closePreview();
  }

  render () {
    return (
      <div className='ab-preview__controls'>
        <BackButton
          wrapperClassName={'ab-preview__close'}
          clickFunction={this.closePreviewWindow} />
        <div className='ab-preview__responsive'>
          <ul>
            <li>
              <SvgIcon name='monitor' />
            </li>
            <li>
              <SvgIcon name='phone' />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default PreviewControls;
