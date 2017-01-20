import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Input from '../../shared/input';
import Title from '../title';
import CurrentPageSections from './current-page-sections';
import Button from '../../shared/button';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';
import {
  isNull as _isNull,
  capitalize as _capitalize
} from 'lodash';

class CurrentPage extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    sortContentBlocks: React.PropTypes.func.isRequired,
    exportPage: React.PropTypes.func.isRequired
  };

  state = {
    title: '',
    fileName: ''
  };

  componentWillMount () {
    const { page } = this.props;
    const { pageID, pageTitle, pageFileName } = page;

    if (!_isNull(pageID)) {
      this.setState({
        title: pageTitle,
        fileName: pageFileName
      });
    }
  }

  handleInputChange (name, value) {
    this.setState({
      ...this.state,
      [name]: value
    });

    return this.props[`setPage${_capitalize(name)}`](value);
  }

  exportPage () {
    return this.props.exportPage();
  }

  renderInput (type) {
    const className = classNames('itemwrap', 'm-b-3');
    let title = null;
    let description = null;
    let value = null;
    let clickFunction = null;

    if (type === 'title') {
      title = localization('website title');
      description = localization('info.title description');
      value = this.state.title;
      clickFunction = this.handleInputChange.bind(this, type);
    } else if (type === 'fileName') {
      title = localization('page filename');
      description = localization('info.filename description');
      value = this.state.fileName;
      clickFunction = this.handleInputChange.bind(this, type);
    }

    if (_isNull(title) && _isNull(value) && _isNull(clickFunction)) {
      return null;
    }

    return (
      <div>
        <Title title={title} description={description} />
        <Input className={className} value={value} onChange={clickFunction} />
      </div>
    );
  }

  render () {
    const { page, removeContentBlock, sortContentBlocks } = this.props;

    return (
      <div>
        <Title title={localization('sections')} />
        <CurrentPageSections
          page={page}
          onRemove={removeContentBlock}
          onSortBlocks={sortContentBlocks} />
        { this.renderInput('title') }
        { this.renderInput('fileName') }
        <div className={classNames('currentPage__divider')} />
        <div className='wrap'>
          <Button label={localization('export page')} onClick={::this.exportPage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  };
}

function mapDispatchToProps (dispatch) {
  return {
    removeContentBlock: function (element){
      dispatch(Actions.removeContentBlock(element));
    },

    sortContentBlocks: function (element) {
      dispatch(Actions.sortContentBlocks(element));
    },

    setPageTitle: function (title) {
      dispatch(Actions.setPageTitle(title));
    },

    setPageFilename: function (filename) {
      dispatch(Actions.setPageFilename(filename));
    },

    exportPage: function () {
      dispatch(Actions.exportPage());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPage);
