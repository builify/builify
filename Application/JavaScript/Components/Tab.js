import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { closeTab, openSidetab } from '../Actions/ActionCreators';
import classNames from 'classnames';
import BackButton from './BackButton';

@connect(state => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder,
  localization: state.localizationData
}))
export default class Tab extends Component {
  static propTypes = {
    data: PropTypes.object,
    targetIndex: PropTypes.number
  };

  static defaultProps = {
    data: {},
    targetIndex: 0
  };

  constructor (props) {
    super(props);

    this.sideTabs = [];
  } 

  closeTab (e) {
    return closeTab();
  }

  proccessChildren () {
    let sideTabs = [];

    if (this.props.data.hasOwnProperty('children')) {
      const { children } = this.props.data;

      if (children.length !== 0) {
        for (let i = 0; i < children.length; i++) {
          let currentChildren = children[i];
          let currentChildrenType = currentChildren.type;
          
          if (currentChildrenType.indexOf('open') !== -1) {
            let openWhat = currentChildrenType.substr('open.'.length);

            if (openWhat !== '') {
              if (openWhat === 'sidetab') {
                let target = currentChildren.target.split('.');
                let sideTarget = target[target.length - 1];
                let sideTabData = {
                  title: currentChildren.title,
                  target: sideTarget
                };

                sideTabs.push(sideTabData);
              }
            }
          }
        }
      } 
    }

    this.sideTabs = sideTabs;
  }

  sidebarClick (e) {
    e.preventDefault();

    let targetId = e.target.getAttribute('data-targetid');
  
    return openSidetab(targetId);
  }

  renderSidebar (item, i) {
    const { dispatch } = this.props;
    const sidebarClassName = classNames('to-sidebar');

    return (
      <h2 
        className={sidebarClassName}
        data-targetid={item.target}
        key={i} 
        {...bindActionCreators({
          onClick: ::this.sidebarClick
        }, dispatch)}>
        {item.title.toString()}
      </h2>
    );
  }

  render () {
    const { data, targetIndex, dispatch } = this.props;

    this.proccessChildren();

    return (
      <div 
        className='ab-tab' 
        data-target={targetIndex} 
        ref={'tab-' + targetIndex}>
        <div className='ab-tab__wrapper'>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {this.sideTabs.length !== 0 ?
            this.sideTabs.map((item, i) => {
              return this.renderSidebar(item, i);
            }) : null
          }
        </div>
      </div>
    );
  }
};