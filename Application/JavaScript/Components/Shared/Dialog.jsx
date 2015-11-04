import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Events from '../../Common/Events';
import Button from './Button';
import Input from './Input';
import ImageItem from './ImageItem';
import Scrollbar from './Scrollbar';

class DialogImagesViewer extends Component {
  render () {
    const className = 'ab-imgviewer active';

    return (
      <div className={className}>
        <Scrollbar height={350} width={600}>
          <div className='ab-imgviewer__inner'>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
          </div>
        </Scrollbar>
      </div>
    )
  }
}

class DialogWrapper extends Component {
  render () {
    const { children, className } = this.props;

    return (
      <div className={className}>
        <div role='overlay' className='ab-dialog__overlay' />
        <div role='content' className='ab-dialog__content'>
          { children }
        </div>
      </div>
    )
  }
}

class Dialog extends Component {
  static propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    actions: [],
    active: false,
    type: 'classic'
  }

  state = {
    active: this.props.active
  };

  renderActions () {
    const { actions } = this.props;

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

  openBackgroundImageImages (e) {
    Events.pauseEvent(e);
  }

  renderImageChangeActions () {
    const actions = [
      { label: 'Browse Images', onClick: ::this.openBackgroundImageImages },
      { label: 'Cancel' },
      { label: 'Save' }
    ];

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

  render () {
    const { type, title, children, actions } = this.props;
    let className = 'ab-dialog';

    if (this.state.active) className += ' active';
    if (this.props.className) className += ` ${this.props.className}`;

    if (type === 'classic') {
      className += ' classic';

      return (
        <DialogWrapper
          className={className}>
          <section role='body' className='ab-dialog__body'>
            { title ? <h6 className='ab-dialog__title'>{title}</h6> : null }
            { children }
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { actions ? this.renderActions() : null }
          </nav>
        </DialogWrapper>
      )
    } else if (type === 'backgroundImage') {
      className += ' backgroundImage';

      return (
        <DialogWrapper
          className={className}>
          <section role='body' className='ab-dialog__body'>
            <h6 className='ab-dialog__title'>Change image</h6>
            <div className='ab-dialog__wrap'>
              <div className='input'>
                <span className='input__title'>Edit image source:</span>
                <Input
                  type='text'
                  label='Image Source'
                  value='http://pivot.mediumra.re/img/hero8.jpg'
                  floating={false} />
                <span className='input__title'>Edit image alt:</span>
                <Input
                  type='text'
                  label='Image "alt" value'
                  floating={false} />
              </div>
              <div className='img'>
                <div className='img__wrap'>
                  <ImageItem
                    alt='Edit Image'
                    src='http://pivot.mediumra.re/img/hero8.jpg' />
                  <span className='img__info'>1400x933 pixels</span>
                </div>
              </div>
            </div>
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.renderImageChangeActions() }
          </nav>
          <DialogImagesViewer />
        </DialogWrapper>
      )
    }
  }

  show () {
    this.setState({
      active: true
    });
  }

  hide () {
    this.setState({
      active: false
    });
  }
}

export default Dialog;
