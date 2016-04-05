/* eslint-disable */
import React from 'react';
import Random from './Random';
import _ from 'lodash';
import Filter from '../Components/Shared/Filter';
import ContentBlocks from '../Components/Shared/ContentBlocks';
import CurrentPage from '../Components/Shared/CurrentPage';
import Colors from '../Components/Shared/Colors';
import Title from '../Components/Shared/Title';
import SideTabOpener from '../Components/Shared/SideTabOpener';
import CheckBoxWrapper from '../Components/Shared/CheckBoxWrapper';
import SliderInputWrapper from '../Components/Shared/SliderInputWrapper';
import Copyright from '../Components/Shared/Copyright';
import Logo from '../Components/Shared/Logo';
import PrimaryNavigation from '../Components/Shared/PrimaryNavigation';

export default function (item) {
  if (!_.isObject(item)) {
    throw Error('No item defined or not object.');
  }

	if (_.has(item, 'type')) {
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
				return (
					<CheckBoxWrapper
						item={item}
						key={key} />
				);

			case 'sidetabopener':
				return (
					<SideTabOpener
						title={item.title}
						onClick={item.target}
						key={key} />
				);

      case 'title':
				return (
					<Title
		        className={item.className}
						title={item.title}
						key={key} />
				);

			case 'sliderinput':
				return (
					<SliderInputWrapper
						data={item}
						key={key} />
				);
		}
  }

  return null;
}
/* eslint-enable */
