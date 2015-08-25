import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import BackButton from '../Shared/BackButton';

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
      }
    }

    return null;
  }


  render () {
    const { data, theme, localization } = this.props;

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div 
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <div className='ab-sidetab__wrapper'>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{data.title}<span>{data.subtitle}</span></h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, i);
            }) : false
          }
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localization,
    theme: state.theme
  };
}

export default connect(mapStateToProps)(SideTab);