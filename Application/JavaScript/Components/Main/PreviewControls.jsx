import React, { Component, PropTypes } from 'react';
import { closePreview } from '../../Actions/ActionCreators';
import BackButton from '../Shared/BackButton.jsx';
import SvgIcon from '../Shared/SvgIcon.jsx';

class PreviewControls extends Component {
  static propTypes = {
    display: PropTypes.bool.isRequired
  }

  closePreviewWindow () {
    return closePreview();
  }

  render () {
    const { display } = this.props;
    const iconSize = 24;

    if (display) {
      return (
        <div className='ab-preview__controls'>
          <BackButton
            wrapperClassName={'ab-preview__close'}
            clickFunction={this.closePreviewWindow} />
          <div className='ab-preview__responsive'>
            <ul>
              <li>
                <SvgIcon
                  icon='desktop'
                  size={iconSize} />
              </li>
              <li>
                <SvgIcon
                  icon='tablet'
                  size={iconSize} />
              </li>
              <li>
                <SvgIcon
                  icon='phone'
                  size={iconSize} />
              </li>
              <li>
                <SvgIcon
                  icon='screen-rotation'
                  size={iconSize} />
              </li>
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
