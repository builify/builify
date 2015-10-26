import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { setFont, setSwatch, openColorPicker, openSidetab, closeTab } from '../../Actions/ActionCreators';
import { randomKey, getProperty } from '../../Common/Common';
import cx from 'classnames';
import Select from 'react-select';
import Toggle from './Toggle.jsx';
import Filter from './Filter.jsx';
import ContentBlocks from './ContentBlocks.jsx';
import CurrentPage from './CurrentPage.jsx';
import Swatches from './Swatches.jsx';
import Colors from './Colors.jsx';
import Size from './Size.jsx';

class ProccessedChildrenRender extends Component {
	constructor (props) {
    super(props);

    this.dispatch = () => {};
    this.renderChildren = this.renderChildren;
    this.template = {};
    this.localization = {};

    this._lifeCycle = 0;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  // Block components
  renderTitle (item, i) {
    let lang = getString(item.text);
    const key = randomKey('title');

    return (
      <h2 key={key}>{lang ? lang : item.text}</h2>
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

  renderFont (item, i) {
    const { fonts } = this.builderConfiguration;
    let fontsOptions = null;
    let value = null;
    let itemLabel = item.label.split('.');
    let labelName = itemLabel[itemLabel.length - 1];
    const key = '' + randomKey() + 'font';

    labelName = this.template.design.typography.fonts[labelName];
    value = labelName !== 'undefined' ? labelName : '';

    if (this.builderConfiguration.hasOwnProperty('fonts')) {
      fontsOptions = [...fonts];
    }

    return (
      <div
        key={i}
        className='ab-select'>
        <h3 className='ab-select__name'>{getString(item.label)}</h3>
        <Select
          key={key}
          name={String(i)}
          value={value}
          options={fontsOptions}
          {...bindActionCreators({
            onChange: (newValue) => {
              return setFont(newValue);
            }
          }, this.dispatch)} />
      </div>
    )
  }

  renderSideTab (item, i) {
    const itemIcon = item.icon;
    const doesItemHaveIcon = itemIcon === null ? false : true;
    const itemClassName = cx('ab-item', doesItemHaveIcon ? 'icon' : 'link');
    const childrenNodes = (item) => {
    	return (
      	<span>{getString(item.title)}</span>
      )
    };
    const key = randomKey('sidetab');

    return (
      <div
        className={itemClassName}
        data-targetid={item.target}
        key={key}
        {...bindActionCreators({
          onClick: (e) => {
            e.preventDefault();
            return openSidetab(item.target);
          }
        }, this.dispatch)}>
        {childrenNodes(item)}
      </div>
    )
  }

  renderPages (item, i) {
    let { pages } = this.props.builder;
    const key = randomKey('pages');

    if (!pages || pages === undefined) {
      return null;
    }

    if (pages.length !== 0) {
      return (
        <CurrentPage
					key={key} />
      )
    }
  }

  renderContentBlocks (item, i) {
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

  renderChildren (item, template, localization, builderConfiguration, dispatch, builder, i) {
    if (!item || typeof item !== 'object') {
      throw Error('No item defined or not object.');
    }

    this.dispatch = dispatch;
    this.builder = builder ? builder : {};
    this.builderConfiguration = builderConfiguration ? builderConfiguration : {};
    this.template = template ? template : {};
    this.localization = localization ? localization : {};

    if (item.hasOwnProperty('type')) {
      switch (item.type.toString()) {
        case 'title':
          return this.renderTitle(item, i);

        case 'colors':
          return this.renderColors(item, i);

        case 'swatches':
          return this.renderSwatch(item, i);

        case 'switch':
          return this.renderSwitch(item, i);

        case 'size':
          return this.renderSize(item, i);

        case 'font':
          return this.renderFont(item, i);

        case 'sidetab':
          return this.renderSideTab(item, i);

        case 'pages':
          return this.renderPages(item, i);

        case 'contentblocks':
          return this.renderContentBlocks(item, i);

        case 'filterblock':
          return this.renderFilter();
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;
