import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isObject as _isObject,
  isElement as _isElement,
  isNull as _isNull,
  has as _has
} from 'lodash';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import Dropdown from '../../shared/dropdown';
import { closeModal } from '../../../actions';

const options = [
  { text: 'POST', value: 'post' },
  { text: 'GET', value: 'get' }
];

class FormEdit extends React.Component {
  static propTypes = {
    editTarget: PropTypes.any,
    closeModal: PropTypes.func.isRequired
  };

  state = {
    action: 'path/to/your/api',
    method: 'post'
  };

  shouldComponentUpdate (nextProps, nextState) {
    return (nextState.action !== this.state.action || nextState.method !== this.state.method);
  }

  componentWillMount () {
    const formElement = this.getFormElement();

    if (!_isNull(formElement)) {
      const action = formElement.getAttribute('action') || this.state.action;
      const method = formElement.getAttribute('method') || this.state.method;

      this.setState({
        action,
        method
      });
    }
  }

  saveFormAttributes () {
    const formElement = this.getFormElement();

    if (!_isNull(formElement)) {
      formElement.setAttribute('action', this.state.action);
      formElement.setAttribute('method', this.state.method);
    }

    return this.closeDialog();
  }

  getFormElement () {
    const { editTarget } = this.props;

    if (_isObject(editTarget) &&
      _has(editTarget, 'elementReference') &&
      _isElement(editTarget.elementReference)) {
      const formElement = editTarget.elementReference.querySelector('form');

      if (_isElement(formElement)) {
        return formElement;
      }
    }

    return null;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleInputChange (type, value) {
    this.setState({
      ...this.state,
      [type]: value
    });
  }

  render () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveFormAttributes }
    ];
    const containerStyle = {
      background: '#f5f5f5'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref="modalWrapper" className={className} onClose={this.props.closeModal}>
        <ModalTab title="Edit Form" onClose={::this.closeDialog}>
          <div>
            <div className={classNames('modal__tab')}>
              <div className={classNames('modal__input')}>
                <Input
                  type="text"
                  label="Action"
                  value={this.state.action}
                  onChange={this.handleInputChange.bind(this, 'action')} />
                <Dropdown
                  className={classNames('modal__dropdown')}
                  label="Method"
                  value={this.state.method}
                  options={options}
                  height={60}
                  previews={false}
                  onChange={this.handleInputChange.bind(this, 'method')} />
              </div>
            </div>
          </div>
          <BottomNavigation style={containerStyle} actions={actions} />
        </ModalTab>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(FormEdit);
