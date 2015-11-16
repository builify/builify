import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ModalTypes } from '../../Constants/Defines';
import { randomKey } from '../../Common/Common';
import { loadPreviousPage } from '../../Actions/ActionCreators';
import Time from '../../Common/Time';
import _ from 'lodash';
import cx from 'classnames';
import Events from '../../Common/Events';
import Button from './Button';
import Input from './Input';
import ImageItem from './ImageItem';
import Scrollbar from './Scrollbar';
import Dropdown from './Dropdown';
import Table from './Table';
import DialogImageEdit from './DialogImageEdit';
import DialogRestart from './DialogRestart';

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
    type: PropTypes.number,
    onClose: PropTypes.func,
    editTarget: PropTypes.any
  }

  static defaultProps = {
    actions: [],
    active: false,
    type: ModalTypes.CLASSIC,
    onClose: () => {}
  }

  state = {
    imgSize: {
      w: 0,
      h: 0
    }
  };

  closeEvent (e) {
    const { onClose } = this.props;

    Events.pauseEvent(e);
    this.hide();
    return onClose(e);
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

  renderLinkChangeActions () {
    const { editTarget } = this.props;
    const actions = [
      { label: 'Cancel', onClick: ::this.closeEvent },
      { label: 'Save', onClick: () => {
        const linkName = this.refs['link-name'].getValue();
        const linkHref = this.refs['link-href'].getValue();
        const linkTarget = this.refs['link-target'].getValue();

        editTarget.setAttribute('href', linkHref);
        editTarget.setAttribute('target', linkTarget);

        editTarget.innerText = linkName;

        this.closeEvent();
      }}
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

  contentblockSourceActions () {
    const { editTarget } = this.props;
    const actions = [
      { label: 'Cancel', onClick: ::this.closeEvent },
      { label: 'Save', onClick: () => {
        editTarget.innerHTML = this.refs.contentblocksource.getValue();

        this.closeEvent();
      }}
    ];

    return this.renderButtons(actions);
  }

  downloadActions () {
    const actions = [
      { label: 'Close', onClick: ::this.closeEvent },
      { label: 'Download' }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const { type, title, children, actions, editTarget, active } = this.props;
    let className = 'ab-dialog';

    if (this.props.active) className += ' active';
    if (this.props.className) className += ` ${this.props.className}`;

    switch (type) {
      case ModalTypes.CLASSIC:
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

      case ModalTypes.IMAGECHANGE:
        return (
          <DialogImageEdit
            active={active}
            editTarget={editTarget}
            closeEvent={::this.closeEvent} />
        )

      case ModalTypes.RESTART:
        return (
          <DialogRestart
            active={active} />
        )

      case ModalTypes.LINKCHANGE:
        const targets = [
          { value: '_blank', label: 'Open in new tab'},
          { value: '_self', label: 'Open in current tab'}
        ];
        let linkHref = '#';
        let linkName = '';
        let linkTarget = '_self';

        if (editTarget !== undefined && editTarget !== null) {
          const target = editTarget.target;

          linkName = editTarget.innerText;
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
                <span className='input__title'>Edit link name:</span>
                <Input
                  ref='link-name'
                  type='text'
                  label='Link Name'
                  value={linkName}
                  floating={false} />
                <span className='input__title'>Edit link url:</span>
                <Input
                  ref='link-href'
                  type='text'
                  label='Link URL'
                  value={linkHref}
                  floating={false} />
                <span className='input__title'>Edit image target:</span>
                <Dropdown
                  ref='link-target'
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
      case ModalTypes.ICONCHANGE:
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

      case ModalTypes.PREVIOUSPAGES:
        const { builder, onLoadPreviousPage } = this.props;
        const { pages } = builder;

        className += ' previouspages';

        return (
          <DialogWrapper
            className={className}>
            <section role='body' className='ab-dialog__body'>
              <h6 className='ab-dialog__title'>Select page to load</h6>
              {_.map(pages, (page, idx) => {
                const { id, title } = page;
                const time = new Date(+(id.split('-')[1]) * 1000);
                const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
                const pageText = `${title} - (${formatedTime})`;

                return (
                  <div
                    onClick={(e) => {
                      Events.pauseEvent(e);

                      this.closeEvent();

                      return onLoadPreviousPage(id);
                    }}
                    key={idx}
                    className='pageitem'>
                    <span>{pageText}</span>
                  </div>
                )
              })}
            </section>
            <nav role='navigation' className='ab-dialog__navigation'>
              { this.previousPagesActions() }
            </nav>
          </DialogWrapper>
        )

      case ModalTypes.CONTENTBLOCKSOURCE:
        const editTargetInnerHTML = editTarget.innerHTML;
        const labelValue = editTargetInnerHTML || 'Source';

        className += ' contentblocksource';

        return (
          <DialogWrapper
            className={className}>
            <section role='body' className='ab-dialog__body'>
              <h6 className='ab-dialog__title'>Edit Contentblock Source</h6>
              <Input
                ref='contentblocksource'
                multiline
                value={labelValue}
                label='Contentblock Source' />
            </section>
            <nav role='navigation' className='ab-dialog__navigation'>
              { this.contentblockSourceActions() }
            </nav>
          </DialogWrapper>
        )

      case ModalTypes.DOWNLOADPAGES: {
        const { builder } = this.props;
        const { pages: builderPages } = builder;
        const pagesModel = {
          name: {type: String}
        };
        let pages = [];

        className += ' downloadpages';

        _.map(builderPages, (page, idx) => {
          const { id, title } = page;
          const time = new Date(+(id.split('-')[1]) * 1000);
          const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
          const pageText = `${title} - (${formatedTime})`;

          pages.push({
            name: pageText
          });
        });

        const handleSelect = (e) => {
          console.log(e);
        }

        return (
          <DialogWrapper
            className={className}>
            <section role='body' className='ab-dialog__body'>
              <h6 className='ab-dialog__title'>Pages Download</h6>
              <Table
                model={pagesModel}
                dataSource={pages}
                onSelect={handleSelect}
                onChange={handleSelect} />
            </section>
            <nav role='navigation' className='ab-dialog__navigation'>
              { this.downloadActions() }
            </nav>
          </DialogWrapper>
        )
      }
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
