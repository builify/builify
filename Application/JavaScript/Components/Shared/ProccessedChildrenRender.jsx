import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { setFont, setSwatch, openColorPicker, openSidetab, closeTab } from '../../Actions/ActionCreators';
import { randomKey, getProperty } from '../../Common/Common';
import cx from 'classnames';
import _ from 'lodash';
import Toggle from './Toggle.jsx';
import Filter from './Filter.jsx';
import ContentBlocks from './ContentBlocks.jsx';
import CurrentPage from './CurrentPage.jsx';
import Swatches from './Swatches.jsx';
import Colors from './Colors.jsx';
import Size from './Size.jsx';
import Title from './Title.jsx';
import ItemThatOpensSideTab from './ItemThatOpensSideTab.jsx';
import FontSelection from './FontSelection.jsx';

class ProccessedChildrenRender extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  renderTitle (item) {
		const { text } = item;
    const key = randomKey('title');

		return (
			<Title
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
    const key = randomKey('toggle');

    return (
      <Toggle
        key={key}
        action={action}
        label={getString(text)}
        toggled={state} />
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
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;
