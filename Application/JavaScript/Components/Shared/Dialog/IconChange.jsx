import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Button from '../Button';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';
import Scrollbar from '../Scrollbar';
import Input from '../Input';

class IconsList extends Component {
  static propTypes = {
    iconPack: PropTypes.object.isRequired
  }

  renderIcons (icons, iconClass) {
    return _.map(icons, (icon, idx) => {
      const className = cx(iconClass, icon);

      return (
        <li
          className='ab-iconChange__iconItem'
          key={idx}>
          <i
            className={className}
            title={icon} />
        </li>
      )
    });
  }

  getScrollbarSize () {
    return {
      h: 300,
      w: 700
    }
  }

  render () {
    const { iconPack } = this.props;
    const { icons, iconInformation, iconPrefix, iconClass, iconFullname } = iconPack;
    const { h: scrollbarHeight, w: scrollbarWeigth } = this.getScrollbarSize();
    const iconsLength = icons.length;
    const iconInformationText = `${iconsLength} icons in ${iconFullname} pack.`;

    return (
      <div>
        <Input
          icon='search'
          label='Search' />
        <div>
          <span>{iconInformationText}</span>
          <a
            href={iconInformation}
            target='_blank'>
            <span>More info</span>
          </a>
        </div>
        <div>
          <Scrollbar
            height={scrollbarHeight}
            width={scrollbarWeigth}>
            <ul>
              { this.renderIcons(icons, iconClass) }
            </ul>
          </Scrollbar>
        </div>
      </div>
    );
  }
}

class IconChange extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  };

  dialogElement = null;

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['dialog'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active) {
      _.delay(() => {
        if (dialogElement) {
          dialogElement.classList.add('active');
        }
      }, 16);
    }
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

  closeDialog () {
    const { onCloseModal } = this.props;
    let dialogElement = null;

    if (this.dialogElement !== null) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = ReactDOM.findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _.delay(() => {
      return onCloseModal();
    }, 300);
  }

  cancelClick (e) {
    this.closeDialog();
  }

  renderActions () {
    const actions = [
      { label: 'Cancel', onClick: ::this.cancelClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const { builder } = this.props;
    const { iconPacks } = builder;
    const className = cx('ab-dialog', 'large');
    const icons = iconPacks[0];

    return (
      <DialogWrapper
        className={className}
        ref='dialog'>
        <DialogBody
          title='Change Icon'
          className='ab-iconChange'>
          <IconsList
            iconPack={icons} />
        </DialogBody>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IconChange);
