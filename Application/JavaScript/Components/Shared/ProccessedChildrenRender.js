import React, { Component, PropTypes } from 'react';
import { getString } from '../../Common/Localization';
import { getProperty } from '../../Utilities/DataManipulation';
import classNames from 'classnames';
import Toggle from '../Shared/Toggle'; 

class ProccessedChildrenRender extends Component {
	constructor (props) {
    super(props);

    this.renderChildren = this.renderChildren;
  }

  renderChildren (item, theme, localization, i) {
    if (!item || typeof item !== 'object') {
      throw Error('No item defined or not object.');
    }

    if (item.hasOwnProperty('type')) {
      item.text = item.text ? item.text : '';

      switch (item.type) {
        case 'title':
          let lang = getString(item.text);

          return (
            <h2 key={i}>{lang ? lang : item.text}</h2>
          )

          break;

        case 'color':
          let colorId = '';
          let colorName = '';

          if (theme.design.colors.hasOwnProperty(item.id)) {
            colorId = theme.design.colors[item.id];
            colorName = getString('design.colors.' + item.id);
          }

          return (
            <div
              className='ab-color'
              key={i}>
              <div className='ab-color__name'>{colorName}</div>
              <div className='ab-color__circle' title={colorId}><span style={{backgroundColor: colorId}} /></div>
            </div>
          )

          break;

        case 'swatches':
          let swatches = theme.design.swatches;
          let swatchesToRender = [];

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

                  if (typeof colors === 'object') {
                    if (colors.length == 2) {
                      color1 = colors[0];
                      color2 = colors[1];
                    }
                  } else if (typeof colors === 'string') {
                    color1 = color2 = colors;
                  }

                  return (
                    <div
                      className='ab-swatch'
                      key={i}>
                      <div className='ab-swatch__name' title={item.text}>{item.text}</div>
                      <div className='ab-swatch__color'>
                        <span style={{backgroundColor: color1}}/>
                        <span style={{backgroundColor: color2}}/>
                      </div>
                    </div>
                  )
                }) : null
              }
            </div>
          );

          break;

        case 'switch':
          return (
            <Toggle 
              key={i}
              label={getString(item.text)} 
              toggled={item.state} />
          )

        case 'size':
          const { theme } = this.props;
          let defaultValue = getProperty(theme, item.label);
          const outputRefName = 'sizeOutput' + i + '';

          return (
            <div
              className='ab-size'
              key={i}>
              <label>{getString(item.label)}</label>
              <input 
                onChange={(e) => {
                  e.preventDefault();

                  let { target } = e;
                  let { value } = target;
                  console.log(value);
                  this.refs[outputRefName].innerHTML = value;
                }} 
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

        default:
          break;
      }
    }

    return null;
  }
}

export default ProccessedChildrenRender;