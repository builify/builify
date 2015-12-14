import React from 'react';
import Input from '../../Shared/Input';
import Image from '../../Shared/Image';
import { defaultImageUrl } from './Config';

export default class CurrentImageTab extends React.Component {
  static propTypes = {
    editTarget: React.PropTypes.any.isRequired
  };

  state = {
    imageUrl: defaultImageUrl,
    isBackgroundImage: false
  }

  componentWillMount () {
    const { editTarget } = this.props;
    const inputSrc = this.refs['image-src'];

    if (typeof editTarget !== undefined && editTarget !== null) {
      if (editTarget.classList.contains('background-image-holder')) {
        const targetStyle = window.getComputedStyle(editTarget, null);
        const backgroundStyleValue = targetStyle.getPropertyValue('background-image');

        if (backgroundStyleValue) {
          const targetUrl = backgroundStyleValue
            .replace(/^url\(["']?/, '')
            .replace(/["']?\)$/, '');

          this.setState({
            imageUrl: targetUrl,
            isBackgroundImage: true
          });
        }
      } else if (editTarget.tagName === 'IMG') {
        const targetUrl = editTarget.getAttribute('src');

        this.setState({
          imageUrl: targetUrl
        });
      }
    }
  }

  imageSourceInputEvent () {
    const value = this.getImgSrcValue();

    this.setState({
      imageUrl: value
    });
  }

  getImgSrcValue () {
    return this.refs['image-src'].getValue();
  }

  render () {
    const { imageUrl } = this.state;

    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside sec'>
          <h2>Edit Image Source</h2>
          <Input
            onBlur={::this.imageSourceInputEvent}
            ref='image-src'
            type='text'
            label='Image Source'
            value={imageUrl}
            floating={false} />
        </aside>
        <main className='ab-modal__tabcontent sec'>
          <Image
            chalk
            className='ab-modal__imgholder'
            src={imageUrl} />
        </main>
      </div>
    );
  }
}
