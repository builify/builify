/* eslint-disable */
import React from 'react';
import Random from '../common/random';
import isObject from 'lodash/isobject';
import has from 'lodash/has';
import Filter from '../components/shared/filter';
import ContentBlocks from '../components/shared/ContentBlocks';
import CurrentPage from '../components/shared/CurrentPage';
import Colors from '../components/shared/Colors';
import Title from '../components/shared/Title';
import SideTabOpener from '../components/shared/SideTabOpener';
import CheckBoxWrapper from '../components/shared/CheckBoxWrapper';
import SliderInputWrapper from '../components/shared/SliderInputWrapper';
import Copyright from '../components/shared/Copyright';
import Logo from '../components/shared/Logo';
import PrimaryNavigation from '../components/shared/PrimaryNavigation';

export default function (item) {
  if (!isObject(item)) {
    throw Error('No item defined or not object.');
  }

	if (has(item, 'type')) {
    const key = Random.randomKey('ch');

    switch (item.type) {
      case 'logo':
        return <Logo key={key} />

      case 'copyright':
        return <Copyright key={key} />

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
/* eslint-enable */
