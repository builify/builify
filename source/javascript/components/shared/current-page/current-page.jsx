import React from 'react';
import Random from '../../../Common/Random';
import _ from 'lodash';
import classNames from 'classnames';
import Sortable from '../Sortable';
import Icon from '../Icon';
import Input from '../Input';
import Title from '../Title';
import * as Actions from '../../../Actions';
import { connect } from 'react-redux';

class CurrentPageItem extends React.Component {
  static propTypes = {
    onRemoveClick: React.PropTypes.func,
    data: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    onRemoveClick: function () {}
  };

  render () {
    const { data, onRemoveClick } = this.props;
    const { id, type, blockName } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const isNotSortable = type === 'navigation' || type === 'footer' ? true : false;
    const itemClassName = classNames('ab-currentPage__item', isNotSortable ? 'notsortable' : '');

    return (
      <li
        data-blockid={id}
        className={itemClassName}>
        {(() => {
          if (!isNotSortable) {
            return (
              <div
                className='handle'
                title='Remove Element'>
                <Icon
                  size={18}
                  icon='reorder' />
              </div>
            );
          }
        })()}
        <div className='ab-currentPage__item-title'>
          {blockName}
        </div>
        <Icon
          onClick={onRemoveClick}
          className='remove'
          style={removeIconStyle}
          size={24}
          icon='clear' />
      </li>
    );
  }
}

class CurrentPageSections extends React.Component {
  renderNotSortableItems (notSortableItems) {
    const { onRemove } = this.props;

    return _.map(notSortableItems, item => {
      return (
          <CurrentPageItem
            onRemoveClick={() => {
              return onRemove(item);
            }}
            data={item}
            key={Random.randomKey('notsortableitem')} />
      );
    });
  }

  renderSortableItems (items) {
    const { onRemove } = this.props;

    return _.map(items, item => {
      return (
        <CurrentPageItem
          onRemoveClick={() => {
            return onRemove(item);
          }}
          data={item}
          key={Random.randomKey('sortableitem')} />
      );
    });
  }

  renderPageDivider (notSortableItems) {
    return notSortableItems.length > 0 ? <div className='ab-currentPage__divider' /> : null;
  }

  render () {
    const { page, onSortBlocks } = this.props;
    const { navigation, main, footer } = page;
    const sortableOptions = {
      draggable: '.draggable',
      filter: '.ignore',
      handle: '.handle',
      onSort: (evt) => {
        return onSortBlocks(evt);
      }
    };
    let items = [];
    let notSortableItems = [];

    _.map(main, (mainItem) => {
      items.push(mainItem);
    });

    if (_.values(navigation).length !== 0) {
      notSortableItems.unshift(navigation);
    }

    if (_.values(footer).length !== 0) {
      notSortableItems.push(footer);
    }

    if (_.values(navigation).length === 0 && _.values(footer).length === 0 && main.length === 0) {
      return <span className='tip'>Your current page is empty :(</span>;
    } else {
      return (
        <div>
          <ul>
            { this.renderNotSortableItems(notSortableItems) }
          </ul>
          { this.renderPageDivider(notSortableItems) }
          <Sortable
            sortable={sortableOptions}
            component='ul'
            childElement='div'
            className='ab-currentPage'>
            { this.renderSortableItems(items) }
          </Sortable>
          { this.renderPageDivider(items) }
        </div>
      );
    }
  }
}

class CurrentPage extends React.Component {
  state = {
    title: '',
    fileName: ''
  };

  static propTypes = {
    page: React.PropTypes.object.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    sortContentBlocks: React.PropTypes.func.isRequired
  };

  componentWillMount () {
    const { page } = this.props;
    const { pageID, pageTitle, pageFileName } = page;

    if (!_.isNull(pageID)) {
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

    return this.props[`setPage${_.capitalize(name)}`](value);
  }

  renderInput (type) {
    const className = classNames('ab-itemwrap', 'm-b-3');
    let title = null;
    let description = null;
    let value = null;
    let clickFunction = null;

    if (type === 'title') {
      title = `Website Title`;
      description = `This is displayed in search results and in your browser's title bar.`;
      value = this.state.title;
      clickFunction = this.handleInputChange.bind(this, type);
    } else if (type === 'fileName') {
      title = `Page's Filename`;
      description = `This will be page's filename`;
      value = this.state.fileName;
      clickFunction = this.handleInputChange.bind(this, type);
    }

    if (!_.isNull(title) && !_.isNull(value) && !_.isNull(clickFunction)) {
      return (
        <div>
          <Title
            title={title}
            description={description} />
          <Input
            className={className}
            value={value}
            onChange={clickFunction} />
        </div>
      );
    }
  }

  render () {
    const { page, removeContentBlock, sortContentBlocks } = this.props;

    return (
      <div>
        <Title title='Sections' />
        <CurrentPageSections
          page={page}
          onRemove={removeContentBlock}
          onSortBlocks={sortContentBlocks} />
        { this.renderInput('title') }
        { this.renderInput('fileName') }
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
    removeContentBlock: (element) => {
      dispatch(Actions.removeContentBlock(element));
    },

    sortContentBlocks: (element) => {
      dispatch(Actions.sortContentBlocks(element));
    },

    setPageTitle: (title) => {
      dispatch(Actions.setPageTitle(title));
    },

    setPageFilename: (filename) => {
      dispatch(Actions.setPageFilename(filename));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPage);
