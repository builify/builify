import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Time from '../../Common/Time';
import _ from 'lodash';
import cx from 'classnames';
import Events from '../../Common/Events';
import Button from './Button';
import Input from './Input';
import ImageItem from './ImageItem';
import DialogWrapper from './DialogWrapper';

class DialogImageEdit extends Component {
  static propTypes = {
    closeEvent: PropTypes.func
  }

  static defaultProps = {
    closeEvent: () => {}
  }

  state = {
    imageSize: {
      w: 0,
      h: 0
    },
    imageUrl: 'http://www.engraversnetwork.com/files/placeholder.jpg',
    imageAlt: '',
    isBackgroundImage: false
  }

  componentWillMount () {
    const { editTarget } = this.props;
    const inputSrc = this.refs['image-src'];

    if (editTarget !== undefined && editTarget !== null) {
      if (editTarget.classList.contains('background-image-holder')) {
        const backgroundImage = new Image();
        const targetStyle = window.getComputedStyle(editTarget, null);
        const backgroundStyleValue = targetStyle.getPropertyValue('background-image');

        if (backgroundStyleValue) {
          const targetUrl = backgroundStyleValue.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

          //backgroundImage.src = targetUrl;

          this.setState({
            imageSize: {
              w: backgroundImage.naturalWidth || backgroundImage.width,
              h: backgroundImage.naturalHeight || backgroundImage.height
            },
            imageUrl: targetUrl,
            isBackgroundImage: true
          });
        }
      } else if (editTarget.tagName === 'IMG') {
        const targetUrl = editTarget.getAttribute('src');

        this.setState({
          imageSize: {
            w: editTarget.naturalWidth,
            h: editTarget.naturalHeight
          },
          imageUrl: targetUrl
        });
      }
    }
  }

  imageSourceInputEvent () {
    const value = this.refs['image-src'].getValue();
    const image = new Image();

    image.onload = (e) => {
      this.setState({
        imageSize: {
          w: image.naturalWidth || image.width,
          h: image.naturalHeight || image.height
        },
        imageUrl: value
      });

    };

    image.src = value;
  }

  closeEvent () {
    const { closeEvent } = this.props;

    return closeEvent();
  }

  renderButtons (actions) {
    return _.map(actions, (action, idx) => {
      let className = 'ab-dialog__button';

      if (action.className) className += ` ${action.className}`;

      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      )
    });
  }

  renderActions () {
    const { editTarget, closeEvent } = this.props;
    const actions = [
      { label: 'Cancel', onClick: ::this.closeEvent },
      { label: 'Save', onClick: (e) => {
        const imgSource = this.refs['image-src'].getValue();

        if (editTarget.classList.contains('background-image-holder')) {
          editTarget.style.backgroundImage = `url(${imgSource})`;
        } else if (editTarget.tagName === 'IMG') {
          const altVal = this.refs['image-alt'].getValue();

          editTarget.setAttribute('src', imgSource);
          editTarget.setAttribute('alt', altVal);
        }

        this.closeEvent();
      }}
    ];

    return this.renderButtons(actions);
  }

  render () {
    const { editTarget, active } = this.props;
    const { isBackgroundImage, imageAlt, imageSize, imageUrl } = this.state;
    const { w: imageWidth, h: imageHeight } = imageSize;
    const className = cx('ab-dialog', 'backgroundImage', active ? 'active' : null);
    const imageSizeText = `${imageWidth}x${imageHeight} pixels`;

    return (
      <DialogWrapper
        className={className}>
        <section role='body' className='ab-dialog__body'>
          <h6 className='ab-dialog__title'>Change image</h6>
          <div className='ab-dialog__wrap'>
            <div className='input'>
              <span className='input__title'>Edit image source:</span>
              <Input
                onBlur={::this.imageSourceInputEvent}
                ref='image-src'
                type='text'
                label='Image Source'
                value={imageUrl}
                floating={false} />
              { (() => {
                if (!isBackgroundImage) {
                  return (
                    <div>
                      <span className='input__title'>Edit image alt:</span>
                      <Input
                        ref='image-alt'
                        type='text'
                        label='Image "alt" value'
                        floating={false} />
                    </div>
                  )
                }
              }()) }
            </div>
            <div className='img'>
              <div className='img__wrap'>
                <ImageItem
                  alt='Edit Image'
                  src={imageUrl} />
                <span className='img__info'>{imageSizeText}</span>
              </div>
            </div>
          </div>
        </section>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    )
  }
}

export default DialogImageEdit;
