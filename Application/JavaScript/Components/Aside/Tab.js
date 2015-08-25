import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeTab, openSidetab } from '../../Actions/ActionCreators';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import classNames from 'classnames';
import BackButton from '../Shared/BackButton';

class Tab extends Component {
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

    this.childrenToRender = [];
  } 

  shouldComponentUpdate () {
    return false; // For now
  }

  closeTab (e) {
    return closeTab();
  }

  renderChildren (item, i) {
    const { dispatch } = this.props;

    if (item.hasOwnProperty('type')) {
      if (!item.text) {
        item.text = ''
      };

      switch (item.type) {
        case 'pages':
          let { pages } = this.props.builder;

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

          break;

        case 'title':
          return (
            <h2 key={i}>{item.text}</h2>
          )

        case 'sidetab':
          let sidebarClassName = classNames('ab-item', 'goto');

          return (
            <div
              className={sidebarClassName}
              data-targetid={item.target}
              key={i} 
              {...bindActionCreators({
                onClick: ::this.sidebarClick
              }, dispatch)}>
              {item.title.toString()}
            </div>
          )
      }
    }

    return null;
  }

  sidebarClick (e) {
    e.preventDefault();

    let targetId = e.target.getAttribute('data-targetid');
  
    return openSidetab(targetId);
  }

  render () {
    const { data, targetIndex } = this.props;
    
    this.childrenToRender = proccessChildrenData(data);

    return (
      <div 
        className='ab-tab' 
        data-target={targetIndex}>
        <div className='ab-tab__wrapper'>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, i);
            }) : null
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
    localization: state.localizationData
  };
}

export default connect(
  mapStateToProps
)(Tab);