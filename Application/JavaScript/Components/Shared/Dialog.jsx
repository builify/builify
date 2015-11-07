import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import { loadPreviousPage } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';
import Events from '../../Common/Events';
import Button from './Button';
import Input from './Input';
import ImageItem from './ImageItem';
import Scrollbar from './Scrollbar';
import Dropdown from './Dropdown';

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
    type: PropTypes.string,
    onClose: PropTypes.func,
    editTarget: PropTypes.any
  }

  static defaultProps = {
    actions: [],
    active: false,
    type: 'classic',
    onClose: () => {}
  }

  state = {
    active: this.props.active
  };

  closeEvent (e) {
    Events.pauseEvent(e);

    this.hide();

    this.props.onClose(e);
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
    const { actions } = this.props;

    return this.renderButtons(actions);
  }

  renderImageChangeActions () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeEvent },
      { label: 'Save' }
    ];

    return this.renderButtons(actions);
  }

  renderLinkChangeActions () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeEvent },
      { label: 'Save' }
    ];

    return this.renderButtons(actions);
  }

  iconChangeActions () {
    const actions = [
      { label: 'Done', onClick: ::this.closeEvent }
    ];

    return this.renderButtons(actions);
  }

  previousPagesActions () {
    const actions = [
      { label: 'Close', onClick: ::this.closeEvent }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const { type, title, children, actions, editTarget } = this.props;
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
    } else if (type === 'imageChange') {
      let targetUrl = 'http://pivot.mediumra.re/img/hero8.jpg';

      if (editTarget !== undefined && editTarget !== null) {
        if (editTarget.classList.contains('background-image-holder')) {
          const sty = window.getComputedStyle(editTarget, null);
          const bg = sty.getPropertyValue('background-image');

          targetUrl = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        }
      }

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
                  value={targetUrl}
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
                    src={targetUrl} />
                  <span className='img__info'>1400x933 pixels</span>
                </div>
              </div>
            </div>
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.renderImageChangeActions() }
          </nav>
        </DialogWrapper>
      )
    } else if (type === 'linkChange') {
      const targets = [
        { value: '_blank', label: 'Open in new tab'},
        { value: '_self', label: 'Open in current tab'}
      ];
      let linkHref = '#';
      let linkTarget = '_self';

      if (editTarget !== undefined && editTarget !== null) {
        const target = editTarget.target;

        linkHref = editTarget.getAttribute('href');
        linkTarget = target.length === 0 ? linkTarget : target;
      }

      className += ' link';

      return (
        <DialogWrapper
          className={className}>
          <section role='body' className='ab-dialog__body'>
            <h6 className='ab-dialog__title'>Change link</h6>
            <div className='input'>
              <span className='input__title'>Edit link url:</span>
              <Input
                type='text'
                label='Image Source'
                value={linkHref}
                floating={false} />
              <span className='input__title'>Edit image target:</span>
              <Dropdown
                className='dropdown'
                auto
                dataSource={targets}
                value={linkTarget} />
            </div>
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.renderLinkChangeActions() }
          </nav>
        </DialogWrapper>
      )
    } else if (type === 'iconChange') {
      className += ' iconc';

      return (
        <DialogWrapper
          className={className}>
          <section role='body' className='ab-dialog__body'>
            <h6 className='ab-dialog__title'>Change Icon</h6>
            <Scrollbar height={300} width={600}>
              <div className='iconc__inner'>
                <h3>Icon</h3>
              </div>
            </Scrollbar>
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.iconChangeActions() }
          </nav>
        </DialogWrapper>
      )
    } else if (type === 'previousPages') {
      const { builder, onLoadPreviousPage } = this.props;
      const { pages } = builder;

      className += ' previouspages';

      return (
        <DialogWrapper
          className={className}>
          <section role='body' className='ab-dialog__body'>
            <h6 className='ab-dialog__title'>Select page to load</h6>
          </section>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.previousPagesActions() }
          </nav>
        </DialogWrapper>
      )
    }

    return null;
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

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onLoadPreviousPage: (page) => {
      dispatch(loadPreviousPage(page));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
