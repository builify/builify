import React from 'react';;
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import Dropdown from '../../shared/dropdown';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions';

const options = [
  { text: 'POST', value: 'post' },
  { text: 'GET',  value: 'get' }
];

class FormEdit extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired
  };

  state = {
    action: 'path/to/your/api',
    method: 'post'
  };

  shouldComponentUpdate () {
    return true;
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
      { label: 'Save' }
    ];
    const containerStyle = {
      background: '#f5f5f5'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref='modalWrapper' className={className} onClose={this.props.closeModal}>
        <ModalTab title='Edit Form' onClose={::this.closeDialog}>
          <div>
            <div className={classNames('modal__tab')}>
              <div className={classNames('modal__input')}>
                <Input
                  type='text'
                  label='Action'
                  value={this.state.action}
                  onChange={this.handleInputChange.bind(this, 'action')} />
                <Dropdown
                  className={classNames('modal__dropdown')}
                  label='Method'
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
    closeModal: function () {
      dispatch(closeModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(FormEdit);
