import React from 'react';
import Random from '../common/random';
import _isObject from 'lodash/isobject';
import _has from 'lodash/has';
import Filter from '../components/shared/filter';
import ContentBlocks from '../components/shared/content-blocks';
import CurrentPage from '../components/shared/current-page';
import Colors from '../components/shared/colors';
import Title from '../components/shared/title';
import SideTabOpener from '../components/shared/side-tab-opener';
import CheckBoxWrapper from '../components/shared/checkbox-wrapper';
import SliderInputWrapper from '../components/shared/slider-input-wrapper';
import Copyright from '../components/shared/copyright';
import Logo from '../components/shared/logo';
import PrimaryNavigation from '../components/shared/primary-navigation';

export default function renderProcessedChildren (item) {
  if (!_isObject(item)) {
    throw Error('No item defined or not object.');
  }

	if (_has(item, 'type')) {
    const key = Random.randomKey('ch');

    switch (item.type) {
      case 'logo':
        return <Logo key={key} />;

      case 'copyright':
        return <Copyright key={key} />;

      case 'navigation':
        return <PrimaryNavigation key={key} />;

      case 'colors':
				return <Colors key={key} />;

			case 'filter':
				return <Filter key={key} />;

			case 'contentblocks':
				return <ContentBlocks key={key} />;

			case 'currentpage':
				return <CurrentPage key={key} />;

			case 'checkbox':
				return <CheckBoxWrapper item={item} key={key} />;

			case 'sidetabopener':
				return <SideTabOpener title={item.title} onClick={item.target} key={key} />;

      case 'title':
				return <Title className={item.className} title={item.title} key={key} />;

			case 'sliderinput':
				return <SliderInputWrapper item={item} key={key} />;
		}
  }

  return null;
}
