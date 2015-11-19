import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { setFont, setSwatch, openColorPicker, openSidetab, closeTab } from '../../Actions';
import { randomKey, getProperty } from '../../Common/Common';
import cx from 'classnames';
import _ from 'lodash';
import Filter from './Filter';
import ContentBlocks from './ContentBlocks';
import CurrentPage from './CurrentPage';
import Swatches from './Swatches';
import Colors from './Colors';
import Size from './Size';
import Title from './Title';
import ItemThatOpensSideTab from './ItemThatOpensSideTab';
import FontSelection from './FontSelection';
import Checkbox from './Checkbox';
import PageFile from './PageFile';
import PageTools from './PageTools';

class ProccessedChildrenRender extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  renderTitle (item) {
		const { text, className } = item;
    const key = randomKey('title');

		return (
			<Title
        className={className}
				title={text}
				key={key} />
		)
  }

  renderColors () {
		const key = randomKey('colors');

    return (
			<Colors
				key={key} />
		)
  }

  renderSwatch () {
		const key = randomKey('swatches');

    return (
			<Swatches
				key={key} />
		)
  }

  renderSwitch (item) {
		const { action, text, state } = item;
    const key = randomKey('checkbox');
    const label = getString(text);

    return (
      <Checkbox
        key={key}
        action={action}
        label={label}
        checked={state} />
    )
  }

  renderSize (item) {
		const key = randomKey('size');

		return (
			<Size
				item={item}
				key={key} />
		)
  }

  renderFont (item) {
		const key = randomKey('fontselection');

		return (
			<FontSelection
				item={item}
				key={key} />
		)
  }

  renderSideTab (item) {
    const key = randomKey('itemthatopenssidetab');

    return (
      <ItemThatOpensSideTab
				item={item}
				key={key} />
    )
  }

  renderPages () {
    const key = randomKey('pages');

    return (
      <CurrentPage
				key={key} />
    )
  }

  renderContentBlocks () {
    const key = randomKey('contentblocks');

		return (
			<ContentBlocks
				key={key} />
		)
  }

  renderFilter () {
    const key = randomKey('filter');

    return (
			<Filter
				key={key} />
		)
  }

  renderPageFile () {
    const key = randomKey('pagefile');

    return (
			<PageFile
				key={key} />
		)
  }

  renderPageTools () {
    const key = randomKey('pagetools');

    return (
			<PageTools
				key={key} />
		)
  }

  renderChildren (item) {
    if (!item || typeof item !== 'object') {
      throw Error('No item defined or not object.');
    }

		if (_.has(item, 'type')) {
      switch (item.type) {
        case 'title':
          return this.renderTitle(item);

        case 'colors':
          return this.renderColors(item);

        case 'swatches':
          return this.renderSwatch(item);

        case 'switch':
          return this.renderSwitch(item);

        case 'size':
          return this.renderSize(item);

        case 'font':
          return this.renderFont(item);

        case 'sidetab':
          return this.renderSideTab(item);

        case 'pages':
          return this.renderPages(item);

        case 'contentblocks':
          return this.renderContentBlocks(item);

        case 'filterblock':
          return this.renderFilter(item);

        case 'pagefile':
          return this.renderPageFile();

        case 'pagetools':
          return this.renderPageTools();
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;
