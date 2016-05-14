import React from 'react';
import { closePreview } from '../../actions';
import classNames from '../../common/classnames';
import BackButton from '../shared/BackButton';
import ControlItem from './preview-control-item';

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
        <div className={classNames('preview__controls')}>
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
