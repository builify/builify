import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { setFont, setSwatch, openColorPicker, openSidetab, closeTab } from '../../Actions/ActionCreators';
import { randomKey, getProperty } from '../../Common/Common';
import classNames from 'classnames';
import Select from 'react-select';
import Toggle from './Toggle.jsx';
import Filter from './Filter.jsx';
import BlockTitle from './BlockTitle.jsx';
import ContentBlock from './ContentBlock.jsx';
import CurrentPage from './CurrentPage.jsx';
import Swatches from './Swatches.jsx';

class ProccessedChildrenRender extends Component {
	constructor (props) {
    super(props);

    this.dispatch = () => {};
    this.renderChildren = this.renderChildren;
    this.theme = {};
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

  renderColors (item, i) {
    let colors = this.theme.design.colors;
    let colorsElements = [];

    for (let color in colors) {
      if (colors.hasOwnProperty(color)) {
        let colorName = getString('design.colors.' + color);
        let colorId = colors[color];
        const key = randomKey('color');

        colorsElements.push(
          <div
            className='ab-color'
            key={key}>
            <div
              className='ab-color__name'
              title={colorName}>
              {colorName}
            </div>
            <div
              className='ab-color__circle'
              title={colorId}
              {...bindActionCreators({
                onClick: (e) => {
                  return openColorPicker(e.target);
                }
              }, this.dispatch)}>
              <span
                data-color={item.id}
                style={{backgroundColor: colorId}} />
            </div>
          </div>
        );
      }
    }

    return colorsElements;
  }

  renderSwatch (item, i) {
		const key = randomKey('swatches');

    return (
			<Swatches
				key={key} />
		)
  }

  renderSwitch (item, i) {
    const key = randomKey('toggle');

    return (
      <Toggle
        key={key}
        action={item.action}
        label={getString(item.text)}
        toggled={item.state} />
    )
  }

  renderSize (item, i) {
    const { theme } = this.props;
    let defaultValue = getProperty(this.theme, item.label);
    const outputRefName = 'sizeOutput-' + i + '';
    const changeEvent = (e) => {
      e.preventDefault();
      let { target } = e;
      let { value } = target;

      this.refs[outputRefName].innerHTML = value;
    };
    let isIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
    const key = randomKey('size');

    return (
      <div
        className='ab-size'
        key={key}>
        <label>{getString(item.label)}</label>
        <input
          onMouseUp={isIE ? changeEvent : () => {}}
          onChange={!isIE ? changeEvent : () => {}}
          defaultValue={defaultValue !== 'undefined' ? defaultValue : 0}
          step={1}
          min={item.min}
          max={item.max}
          type='range'
          name='range' />
        <div className='ab-size__output'>
          <span ref={outputRefName}>{defaultValue !== 'undefined' ? defaultValue : 0}</span>
        </div>
      </div>
    )
  }

  renderFont (item, i) {
    const { fonts } = this.builderConfiguration;
    let fontsOptions = null;
    let value = null;
    let itemLabel = item.label.split('.');
    let labelName = itemLabel[itemLabel.length - 1];
    const key = '' + randomKey() + 'font';

    labelName = this.theme.design.typography.fonts[labelName];
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
    const itemClassName = classNames('ab-item', doesItemHaveIcon ? 'icon' : 'link');
    const childrenNodes = (item) => {
      /*if (item.icon !== null) {
        return (
          <div>
            <Icon className='ico' name={item.icon} />
            <span className='text'>{getString(item.title)}</span>
          </div>
        )
      } else {*/
        return (
          <span>{getString(item.title)}</span>
        )
      //}
    };
    const key = '' + randomKey() + 'sidetab';

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
    if (this.theme.hasOwnProperty('blocks')) {
      const { blocks } = this.theme;
      const blocksLength = blocks.length;
      let itemsToRender = [];
      const key = randomKey('contentblock');

      if (blocksLength > 0) {
        blocks.map((block, i) => {
          if (block.hasOwnProperty('type')) {
            const { type } = block;

            itemsToRender.push({
              type: 'blocktitle',
              name: type
            });

            if (block.hasOwnProperty('items')) {
              const blockItems = block.items;
              const itemsLength = blockItems.length;

              if (itemsLength > 0) {
                blockItems.map((blockItem, i) => {
                  const { title, source } = blockItem;
                  const thumbnail = blockItem.hasOwnProperty('thumbnail') ? blockItem.thumbnail : null;

                  itemsToRender.push({
                    type: 'block',
                    blockType: type,
                    name: title,
                    source: source,
                    thumbnail: thumbnail
                  });
                })
              }
            }

          } else {
            throw Error('Missing type of ' + JSON.stringify(block));
          }
        })
      }

      return (
        <div
          key={key}
          className='ab-contentblocks'>
          <div className='ab-contentblocks__inner'>
            {itemsToRender.map((item, i) => {
              const { type } = item;

              if (type === 'blocktitle') {
                return (
                  <BlockTitle
                    key={i}
                    data={item} />
                )
              } else if (type === 'block') {
                return (
                  <ContentBlock
                    key={i}
                    data={item} />
                )
              }
            })}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  renderFilter (item, i) {
    const key = randomKey('contentblock');

    return (
			<Filter
				key={key} />
		)
  }

  renderChildren (item, theme, localization, builderConfiguration, dispatch, builder, i) {
    if (!item || typeof item !== 'object') {
      throw Error('No item defined or not object.');
    }

    this.dispatch = dispatch;
    this.builder = builder ? builder : {};
    this.builderConfiguration = builderConfiguration ? builderConfiguration : {};
    this.theme = theme ? theme : {};
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
          return this.renderFilter(item, i);
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;
