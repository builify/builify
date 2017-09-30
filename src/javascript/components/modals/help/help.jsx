import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import { closeModal } from '../../../actions';

class Help extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired
  };

  _modalNode = null;

  closeDialog () {
    return this._modalNode.closeDialog();
  }

  render () {
    const className = classNames(['modal', 'modal__transparent']);

    return (
      <ModalWrapper ref={(node) => { this._modalNode = node; }} className={className} onClose={this.props.closeModal}>
        <section>
          <h3 className={classNames('modal__transparent__title')}>Help</h3>
          <p>Create your pages by adding contentblocks and styling them. Read <a href="http://builify.com/documentation" target="_blank" rel="noopener noreferrer">documentation</a> for help.</p>
        </section>
        <section>
          <h3 className={classNames('modal__transparent__title')}>Keyboard shortcuts</h3>
          <table className={classNames('modal__transparent__shortcuts')}>
            <tbody>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + S</td>
                <td>Save current page</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + R</td>
                <td>Restart page</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + D</td>
                <td>Desktop preview mode</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + M</td>
                <td>Tablet preview mode</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + P</td>
                <td>Phone preview mode</td>
              </tr>
            </tbody>
          </table>
        </section>
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

export default connect(null, mapDispatchToProps)(Help);
