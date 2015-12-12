import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import { removeContentBlock, sortContentBlocks, setPageTitle, setPageFilename } from '../../Actions';
import _ from 'lodash';
import cx from 'classnames';
import Sortable from './Sortable';
import Icon from './Icon';
import Input from './Input';
import Button from './Button';
import Title from './Title';

class CurrentPageDivider extends Component {
  render () {
    return (
      <div className='ab-currentPage__divider' />
    )
  }
}

class CurrentPageItem extends Component {
  static propTypes = {
    onRemoveClick: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  static defaultProps = {
    onRemoveClick: () => {}
  }

  render () {
    const { data, onRemoveClick } = this.props;
    const { id, type, blockName, elementReference, hasBeenRendered } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const isNotSortable = type === 'navigation' || type === 'footer' ? true : false;
    const itemClassName = cx('ab-currentPage__item', isNotSortable ? 'notsortable' : '');

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
            )
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
    )
  }
}

class CurrentPageSections extends React.Component {
  render () {
    const { page, onRemove, onSortBlocks } = this.props;
    const { navigation, main, footer } = page;
    const sortableOptions = {
      draggable: '.draggable',
      filter: '.ignore',
      handle: '.handle',
      onSort: (evt) => {
        return onSortBlocks(evt);
      }
    }
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

    if (_.values(navigation).length === 0 &&
        _.values(footer).length === 0 &&
        main.length === 0) {
      return (
        <span className='tip'>Your current page is empty :(</span>
      )
    } else {
      return (
        <div>
          <ul>
          {_.map(notSortableItems, item => {
            const key = randomKey('notsortableitem');

            return (
              <CurrentPageItem
                data={item}
                key={key} />
            )
          })}
          </ul>
          {(() => {
            if (notSortableItems.length > 0) {
              return <CurrentPageDivider />
            }
          })()}
          <Sortable
            sortable={sortableOptions}
            component='ul'
            childElement='div'
            className='ab-currentPage'>
            {_.map(items, (item) => {
              const { elementReference } = item;
              const key = randomKey('sortableitem');

              return (
                <CurrentPageItem
                  onRemoveClick={(e) => {
                    return onRemove(elementReference);
                  }}
                  data={item}
                  key={key} />
              )
            })}
          </Sortable>
        </div>
      );
    }
  }
}

class CurrentPage extends React.Component {
  changePageTitle () {
    const { onSetPageTitle } = this.props;
    const titleValue = this.refs['input-title'].getValue();

    return onSetPageTitle(titleValue);
  }

  changePageFilename () {
    const { onSetPageFilename } = this.props;
    const filenameValue = this.refs['input-filename'].getValue();

    return onSetPageFilename(filenameValue);
  }

  render () {
    const { page, onRemove, onSortBlocks, onSetPageTitle, onSetPageFilename } = this.props;
    const { pageTitle, pageFileName } = page;

    console.log(page);

    return (
      <div>
        <Title title='Sections' />
        <CurrentPageSections
          page={page}
          onRemove={onRemove}
          onSortBlocks={onSortBlocks} />
        <Title
          title='Website Title'
          description="This is displayed in search results and in your browser's title bar." />
        <Input
          ref='input-title'
          className='ab-itemwrap padding-top-1'
          value={pageTitle}
          onBlur={::this.changePageTitle} />
        <Title
          title='Filename'
          description="This will be page's filename" />
        <Input
          ref='input-filename'
          className='ab-itemwrap padding-top-1'
          value={pageFileName}
          onBlur={::this.changePageFilename} />
      </div>
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
    onRemove: (element) => {
      dispatch(removeContentBlock(element));
    },

    onSortBlocks: (element) => {
      dispatch(sortContentBlocks(element));
    },

    onSetPageTitle: (title) => {
      dispatch(setPageTitle(title));
    },

    onSetPageFilename: (filename) => {
      dispatch(setPageFilename(filename));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPage);
