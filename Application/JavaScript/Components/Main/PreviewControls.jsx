import React from 'react';
import { closePreview } from '../../Actions';
import BackButton from '../Shared/BackButton';
import ControlItem from './PreviewControlItem';

export default class PreviewControls extends React.Component {
  static propTypes = {
    display: React.PropTypes.bool.isRequired
  };

  closePreviewWindow () {
    return closePreview();
  }

  render () {
    const { display } = this.props;

    if (display) {
      return (
        <div className='ab-preview__controls'>
          <BackButton
            wrapperClassName='ab-preview__close'
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
      );
    }

    return null;
  }
}
