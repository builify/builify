import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../../Actions/ActionCreators';
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


  render () {
    const { data } = this.props;

    this.childrenToRender = proccessChildrenData(data);

    console.log(this.childrenToRender)

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