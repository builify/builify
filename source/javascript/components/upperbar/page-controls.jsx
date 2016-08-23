import React from 'react';
import classNames from '../../common/classnames';
import Dropdown from '../shared/dropdown';

class PageControls extends React.Component {
  state = {
    page: ''
  };

  chnagePage (page) {
    this.setState({
      page: page
    });
  }

  render () {
    return (
      <div className={classNames('upperbar__pcontrols')}>
        <Dropdown label="Select Page" value={this.state.page} previews={false} onChange={::this.chnagePage} />
      </div>
    );
  }
}

export default PageControls;
