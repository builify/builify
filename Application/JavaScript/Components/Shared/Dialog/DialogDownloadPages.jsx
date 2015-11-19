import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { restartPage, closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Time from '../../../Common/Time';
import Button from '../Button';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';
import Table from '../Table';

class TablePages extends Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    source: PropTypes.array.isRequired
  };

  state = {
    selected: [],
    source: this.props.source
  };

  handleChange (row, key, value) {
    const { source } = this.state;

    source[row][key] = value;

    this.setState({ source });
  }

  handleSelect (selected) {
    this.setState({ selected });
  }

  render () {
    return (
      <Table
        model={this.props.model}
        onChange={::this.handleChange}
        onSelect={::this.handleSelect}
        selected={this.state.selected}
        source={this.state.source} />
    );
  }
}

class DialogDownloadPages extends Component {
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
      window.setTimeout(() => {
        dialogElement.classList.add('active');
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
      );
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

    window.setTimeout(() => {
      return onCloseModal();
    }, 300);
  }

  noClick (e) {
    this.closeDialog();
  }

  yesClick (e) {
    const { onRestart } = this.props;

    this.closeDialog();

    return onRestart();
  }

  renderActions () {
    const actions = [
      { label: 'No', onClick: ::this.noClick },
      { label: 'Yes', onClick: ::this.yesClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const className = cx('ab-dialog', 'medium');
    const { builder } = this.props;
    const { pages: builderPages } = builder;
    const pagesModel = {
      name: {type: String}
    };

    let pages = [];

    _.map(builderPages, (page, idx) => {
      const { id, title } = page;
      const time = new Date(+(id.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss d/M/y');
      const pageText = `${title} - (${formatedTime})`;

      pages.push({
        name: pageText
      });
    });

    return (
      <DialogWrapper
        className={className}
        ref='dialog'>
        <DialogBody title='Choose Pages to Download'>
          <TablePages
            model={pagesModel}
            source={pages} />
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
    onRestart: () => {
      dispatch(restartPage());
    },

    onCloseModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogDownloadPages);
