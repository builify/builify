import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { getProperty } from '../../Common/DataManipulation';
import { setFont, setSwatch, openColorPicker, openSidetab, closeTab } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import Builder from '../../Common/Builder';
import Toggle from '../Shared/Toggle';
import ContentBlock from '../Shared/ContentBlock'; 
import Select from 'react-select';

class ProccessedChildrenRender extends Component {
	constructor (props) {
    super(props);

    this.dispatch = () => {};
    this.renderChildren = this.renderChildren;
    this.theme = {};
    this.localization = {};
  }

  // Block components
  renderTitle (item, i) {
    let lang = getString(item.text);

    return (
      <h2 key={i}>{lang ? lang : item.text}</h2>
    )
  }

  renderColors (item, i) {
    let colors = this.theme.design.colors;
    let colorsElements = [];

    for (let color in colors) {
      if (colors.hasOwnProperty(color)) {
        let colorName = getString('design.colors.' + color);
        let colorId = colors[color];
        colorsElements.push(
          <div
            className='ab-color'
            key={color}>
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
    let swatches = [];
    let swatchesToRender = [];

    if (this.theme.design.hasOwnProperty('swatches')) {
      swatches = this.theme.design.swatches;
    }

    for (let i = 0; i < swatches.length; i++) {
      let swatch = swatches[i];
      swatchesToRender.push({text: swatch.name, colors: swatch.colors});
    }

    return (
      <div key={i}>
        {swatchesToRender.length !== 0 ?
          swatchesToRender.map((item, i) => {
            let colors = item.colors;
            let color1, color2 = '';
            let colorsTitle = '';

            if (typeof colors === 'object') {
              if (colors.length == 1) {
                color1 = color2 = colors[0];

                colorsTitle = color1;
              } else if (colors.length == 2) {
                color1 = colors[0];
                color2 = colors[1];

                colorsTitle = color1 + '/' + color2;
              }
            } else if (typeof colors === 'string') {
              color1 = color2 = colors;

              colorsTitle = color1;
            }

            return (
              <div
                className='ab-swatch'
                key={i}
                {...bindActionCreators({
                  onClick: (e) => {
                    return setSwatch(item.text);
                  }
                }, this.dispatch)}>
                <div 
                  className='ab-swatch__name' 
                  title={item.text}>
                  {item.text}
                </div>
                <div
                  className='ab-swatch__color'
                  title={colorsTitle}>
                  <span style={{backgroundColor: color1}}/>
                  <span style={{backgroundColor: color2}}/>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    )
  }

  renderSwitch (item, i) {
    return (
      <Toggle 
        key={i}
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

    return (
      <div
        className='ab-size'
        key={i}>
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
          key={i}
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
    let sidebarClassName = classNames('ab-item', 'goto');

    return (
      <div
        className={sidebarClassName}
        data-targetid={item.target}
        key={i} 
        {...bindActionCreators({
          onClick: (e) => {
            e.preventDefault();
            let targetId = e.target.getAttribute('data-targetid');
          
            return openSidetab(targetId);
          }
        }, this.dispatch)}>
        {getString(item.title)}
      </div>
    )
  }

  renderPages (item, i) {
    let { pages } = this.props.builder;

    if (!pages || pages === undefined) {
      return null;
    }

    if (pages.length !== 0) {
      return (
        <ul
          className='ab-pages'
          key={i}>
          {pages.map((page, i) => {
            return (
              <li key={i}>
                {page.id}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  renderContentBlocks (item, i) {
    return (
      <div className='ab-contentblocks'>
        <div className='ab-contentblocks__inner'>
          {[0,1,2,3, 5, 6, 7, 8, 9, 10, 11].map((item, i) => {
            const contentBlockKey = Builder.randomKey();
            return <ContentBlock key={contentBlockKey} />
          })}
        </div>
      </div>
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
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;