import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty as _isEmpty,
  isElement as _isElement
} from 'lodash';
import CheckerBoard from '../../../modules/react-tt-checkerboard';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import Image from '../../shared/image';
import { TRACK_MODAL_CURENT_IMAGE_INPUT_ID, BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME } from '../../../constants';
import { defaultImageUrl } from './config';

export default class CurrentImageTab extends React.Component {
  static propTypes = {
    editTarget: PropTypes.any.isRequired
  };

  state = {
    imageUrl: defaultImageUrl,
    imageSize: {
      width: 0,
      height: 0
    }
  };

  componentWillMount () {
    const { editTarget } = this.props;

    if (_isElement(editTarget)) {
      const tagName = editTarget.tagName.toLowerCase();

      // If edit target is IMG element, simply grab its source.
      if (tagName === 'img') {
        const targetUrl = editTarget.getAttribute('src');

        this.setState({
          ...this.state,
          imageUrl: targetUrl,
          imageSize: {
            width: editTarget.width,
            height: editTarget.height
          }
        });
      } else {
        const backgroundImage = editTarget.style.backgroundImage;

        if (_isEmpty(backgroundImage)) {
          // Check if contains .background-image-holder
          const imageHolder = editTarget.querySelector(BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME);

          if (_isElement(imageHolder)) {
            const url = imageHolder.style.backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/);

            if (url && url[1]) {
              this.setState({
                ...this.state,
                imageUrl: url[1]
              });
            }
          }
        } else {
          const url = backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/);

          if (url && url[1]) {
            this.setState({
              ...this.state,
              imageUrl: url[1]
            });
          }
        }
      }
    }
  }

  shouldComponentUpdate () {
    return true;
  }

  handleInputChange (value) {
    this.setState({
      ...this.state,
      imageUrl: value
    });
  }

  render () {
    const { imageUrl, imageSize } = this.state;

    return (
      <div className={classNames('modal__tab')}>
        <aside className={classNames('modal__tabside', 'sec')}>
          <h2>Edit Image Source</h2>
          <Input
            id={TRACK_MODAL_CURENT_IMAGE_INPUT_ID}
            onChange={::this.handleInputChange}
            ref='image-src'
            type='text'
            label='Image Source'
            value={imageUrl}
            floating={false} />
        </aside>
        <main className={classNames('modal__tabcontent', 'sec')}>
          <CheckerBoard width={585} height={350} rows={42} columns={52}>
            <Image
              chalk
              className={classNames('modal__imgholder')}
              src={imageUrl}
              sizeInfo={imageSize} />
          </CheckerBoard>
        </main>
      </div>
    );
  }
}
