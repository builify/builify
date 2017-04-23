import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import { closeModal, setCustomCSS } from '../../../actions';

class Feedback extends React.Component {
  static propTypes = {
    customStylesheetText: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    setCustomCSS: PropTypes.func.isRequired
  };

  state = {
    text: ''
  };

  shouldComponentUpdate (nextProps, nextState) {
    return (nextState.text !== this.state.text);
  }

  componentWillMount () {
    const { customStylesheetText } = this.props;

    this.setState({
      text: customStylesheetText
    });
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleInputChange (value) {
    this.setState({
      ...this.state,
      text: value
    });
  }

  saveCustomCSS () {
    this.closeDialog();
    return this.props.setCustomCSS(this.state.text);
  }

  render () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveCustomCSS }
    ];
    const containerStyle = {
      background: '#f5f5f5'
    };
    const style = {
      height: '200px',
      fontSize: '12px',
      maxHeight: '300px'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref="modalWrapper" className={className} onClose={this.props.closeModal}>
        <ModalTab title="Custom CSS" onClose={::this.closeDialog}>
          <div>
            <div className={classNames('modal__tab')}>
              <Input
                className={classNames('modal__input')}
                type="text"
                label="Custom CSS"
                multiline
                showLength
                style={style}
                value={this.state.text}
                onChange={::this.handleInputChange} />
            </div>
          </div>
          <BottomNavigation style={containerStyle} actions={actions} />
        </ModalTab>
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  const { template } = state;
  const { customStylesheetText } = template;

  return {
    customStylesheetText
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },

    setCustomCSS: (value) => {
      dispatch(setCustomCSS(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
