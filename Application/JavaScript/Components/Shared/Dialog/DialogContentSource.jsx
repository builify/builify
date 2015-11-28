import * as Constants from '../../../Constants';
import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { closeModal, updateContentBlockSource } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Input from '../Input'
import Button from '../Button';
import Dropdown from '../Dropdown';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';

class DialogLinkChange extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    editTarget: PropTypes.any.isRequired
  };

  dialogElement = null;
  targetBlock = null;
  labelValue = '';

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  componentWillMount () {
    const { editTarget, page } = this.props;
    const { navigation, main, footer } = page;
    const targetID = editTarget.getAttribute(Constants.CONTENTBLOCK_ATTR_ID);
    const targetType = editTarget.getAttribute(Constants.CONTENTBLOCK_ATTR_TYPE);

    if (targetType === 'navigation') {
      this.targetBlock = navigation;
      this.labelValue = navigation.source;
    } else if (targetType === 'footer') {
      this.targetBlock = footer;
      this.labelValue = footer.source;
    } else {
      const indexSearchQuery = { id: targetID };
      const itemIndex = _.findIndex(main, indexSearchQuery);

      if (itemIndex >= 0) {
        const block = main[itemIndex];

        this.targetBlock = block;
        this.labelValue = block.source;
      } else {
        throw Error('Something went wrong when querying item for source editing. ' + targetID);
      }
    }
  }

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['dialog'];
    const dialogElement = findDOMNode(dialogRef);

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
      dialogElement = findDOMNode(dialogRef);
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

  saveClick (e) {
    const { editTarget, onUpdateContentBlockSource } = this.props;
    const inputValue = this.refs.contentblocksource.getValue();

    if (inputValue) {
      onUpdateContentBlockSource(this.targetBlock, inputValue);
    }

    this.closeDialog();
  }

  renderActions () {
    const actions = [
      { label: 'Cancel', onClick: ::this.cancelClick },
      { label: 'Save', onClick: ::this.saveClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const className = cx('ab-dialog', 'contentblocksource');

    return (
      <DialogWrapper
        ref='dialog'
        className={className}>
        <DialogBody title='Edit Contentblock Source'>
          <Input
            ref='contentblocksource'
            multiline
            value={this.labelValue}
            label='Contentblock Source' />
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
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onUpdateContentBlockSource: (block, newSource) => {
      dispatch(updateContentBlockSource(block, newSource));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogLinkChange);
