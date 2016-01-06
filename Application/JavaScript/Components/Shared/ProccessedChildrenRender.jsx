import React from 'react';
import { getString } from '../../Common/Localization';
import Random from '../../Common/Random';
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

/* eslint-disable */
export default class ProccessedChildrenRender extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  renderTitle (item) {
		const { text, className } = item;
    const key = Random.randomKey('title');

		return (
			<Title
        className={className}
				title={text}
				key={key} />
		);
  }

  renderColors () {
		const key = Random.randomKey('colors');

    return (
			<Colors
				key={key} />
		);
  }

  renderSwatch () {
		const key = Random.randomKey('swatches');

    return (
			<Swatches
				key={key} />
		);
  }

  renderSwitch (item) {
    const { action, text, state } = item;
    const label = getString(text);

    console.log(item);

    return (
      <Checkbox
        key={Random.randomKey('checkbox')}
        label={label}
        checked={state}
        onChange={(e) => console.log(e)} />
    );
  }

  renderSize (item) {
		const key = Random.randomKey('size');

		return (
			<Size
				item={item}
				key={key} />
		);
  }

  renderFont (item) {
		const key = Random.randomKey('fontselection');

		return (
			<FontSelection
				item={item}
				key={key} />
		);
  }

  renderSideTab (item) {
    const key = Random.randomKey('itemthatopenssidetab');

    return (
      <ItemThatOpensSideTab
				item={item}
				key={key} />
    );
  }

  renderPages () {
    const key = Random.randomKey('pages');

    return (
      <CurrentPage
				key={key} />
    );
  }

  renderContentBlocks () {
    const key = Random.randomKey('contentblocks');

		return (
			<ContentBlocks
				key={key} />
		);
  }

  renderFilter () {
    const key = Random.randomKey('filter');

    return (
			<Filter
				key={key} />
		);
  }

  renderPageTools () {
    const key = Random.randomKey('pagetools');

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

        case 'pagetools':
          return this.renderPageTools();
      }
    }

    return null;
  }
}

/* eslint-enable */
