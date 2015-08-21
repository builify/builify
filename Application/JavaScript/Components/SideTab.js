import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../Actions/ActionCreators';
import classNames from 'classnames';
import BackButton from './BackButton';

class SideTab extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  closeSidetab () {
    return closeSidetab();
  }

  proccessChildren (data) {
    let childrenToRender = [];

    if (!data) {
      throw Error('No data defined.');
    }

    if (data.hasOwnProperty('children')) {
      let childrenLength = data.children.length;

      for (let i = 0; i < childrenLength; i++) {
        let children = data.children[i];
        
        if (children.hasOwnProperty('type')) {
          let childrenType = children.type.split('.');

          if (childrenType[0] === 'block') {
            if (!childrenType[1]) {
              let messageString = 'No block type defined of children';
              throw Error(messageString);
            }

            let blockType = childrenType[1];

            if (blockType === 'title') {
              let childrenTitle = children.title;
              childrenToRender.push({type: 'title', 'text': childrenTitle});
            } else if (blockType === 'colors') {
              if (children.hasOwnProperty('colors')) {
                let colors = children.colors;
                let howManyColors = colors.length;

                for (let j = 0; j < howManyColors; j++) {
                  let color = colors[j];
                  let colorData = {
                    type: 'color',
                    text: color.name,
                    target: color.target,
                    defaultValue: color.defaultValue
                  };

                  childrenToRender.push(colorData);
                }
              }
            } else if (blockType === 'swatch') {
              if (children.hasOwnProperty('swatches')) {
                let swatches = children.swatches;
                let howManySwatches = swatches.length;

                for (let j = 0; j < howManySwatches; j++) {
                  let swatch = swatches[j];
                  let swatchData = {
                    type: 'swatch',
                    text: swatch.name,
                    colors: swatch.colors
                  };

                  childrenToRender.push(swatchData);
                }
              }
            }
          }
        } else {
          let messageString = 'Sidetab with id of "' + data.id + '" has children that has type missing. The children is ' + i + ' of the children list.';
          throw Error(messageString);
        }
      }
    }

    this.childrenToRender = childrenToRender;
  } 

  renderChildren (item, i) {
    if (item.hasOwnProperty('type')) {
      if (!item.text) {
        item.text = '';
      }

      if (item.type === 'title') {
        return (
          <h2 key={i}>{item.text}</h2>
        );
      } else if (item.type === 'color') {
        return (
          <div 
            className='ab-color'
            key={i}>
            <div className='ab-color__name'>{item.text}</div>
            <div className='ab-color__circle' title={item.defaultValue}><span style={{backgroundColor: item.defaultValue}} /></div>
          </div>
        );
      } else if (item.type === 'swatch') {
        let colors = item.colors;
        let color1 = colors[0];
        let color2 = colors[1]; 

        return (
          <div 
            className='ab-swatch'
            key={i}>
            <div className='ab-swatch__name'>{item.text}</div>
            <div className='ab-swatch__color'>
              <span style={{backgroundColor: color1}}/>
              <span style={{backgroundColor: color2}}/>
            </div>
          </div>
        );
      }
    }
  }

  proccessThemeData (theme, data) {
    let childrenToRender = [];

    if (!data) {
      throw Error('No data defined.');
    }

    this.childrenToRender = childrenToRender;

    console.log(...arguments);
  }

  render () {
    const { data, theme } = this.props;

    this.proccessThemeData(theme, data);

    return (
      <div 
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <div className='ab-sidetab__wrapper'>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{data.title}<span>{data.subtitle}</span></h1>
          
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData,
    theme: state.theme
  };
}

export default connect(mapStateToProps)(SideTab);