import React from 'react';
import _map from 'lodash/map';
import _isObject from 'lodash/isobject';
import _size from 'lodash/size';
import classNames from '../../common/classnames';
import Dropdown from '../shared/dropdown';
import { connect } from 'react-redux';

class PageControls extends React.Component {
  static propTypes = {
    pages: React.PropTypes.array.isRequired
  };

  state = {
    page: ''
  };

  chnagePage (page) {
    this.setState({
      page: page
    });
  }

  render () {
    const { pages } = this.props;
    let options = [];

    if (_size(pages) > 0) {
      _map(pages, (page) => {
        if (_isObject(page)) {
          const { pageID, pageFileName } = page;

          options.push({
            text: pageFileName,
            value: pageID
          });
        }
      });
    }

    return (
      <div className={classNames('upperbar__pcontrols')}>
        <Dropdown options={options} label="Select Page" value={this.state.page} previews={false} onChange={::this.chnagePage} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder } = state;
  const { pages } = builder;

  return {
    pages: pages
  };
}

export default connect(mapStateToProps)(PageControls);
