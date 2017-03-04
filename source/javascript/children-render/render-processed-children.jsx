import React from 'react';
import {
  has as _has,
  isObject as _isObject
} from 'lodash';
import Random from '../common/random';
import Filter from '../components/aside/filter';
import ContentBlocks from '../components/aside/content-blocks';
import CurrentPage from '../components/aside/current-page';
import Colors from '../components/aside/colors';
import Title from '../components/aside/title';
import SideTabOpener from '../components/aside/side-tab-opener';
import CheckBoxWrapper from '../components/shared/checkbox-wrapper';
import SliderInputWrapper from '../components/shared/slider-input-wrapper';
import Logo from '../components/shared/logo';
import PrimaryNavigation from '../components/aside/primary-navigation';

export default function renderProcessedChildren (item) {
  if (!_isObject(item)) {
    throw Error('No item defined or not object.');
  }

  if (_has(item, 'type')) {
    const key = Random.randomKey('rendered-children');

    switch (item.type) {
      case 'logo':
        return <Logo key={key} />;

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

      default:
        return null;
    }
  }

  return null;
}
