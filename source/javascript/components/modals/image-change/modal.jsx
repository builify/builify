import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  map as _map,
  has as _has
} from 'lodash';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import ContentTabs from './content-tabs';
import { defaultTabId, tabList } from './config';

class TabNavigation extends React.Component {
  static propTypes = {
    builderConfiguration: PropTypes.object.isRequired,
    assets: PropTypes.array.isRequired,
    editTarget: PropTypes.any.isRequired,
    onUploadImage: PropTypes.func.isRequired,
    onSelectImage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    activeTab: defaultTabId
  };

  shouldComponentUpdate (nextProps, nextState) {
    return (nextState.activeTab !== this.state.activeTab);
  }

  renderTabNavigation () {
    const { assets } = this.props;
    const { activeTab } = this.state;
    const tabClick = (id) => {
      this.setState({
        activeTab: id
      });
    };

    if (!tabList) {
      return null;
    }

    return _map(tabList, (tab) => {
      const { id } = tab;
      const className = classNames('modal__tablabel', {
        active: id === activeTab
      });
      let { label } = tab;

      if (_has(tab, 'imagesUploaded')) {
        if (assets.length !== 0) {
          label = `${label} (${assets.length})`;
        }
      }

      return (
        <div key={Random.randomKey('tab')} className={className} onClick={() => { tabClick(id); }}>
          <span>{ label }</span>
        </div>
      );
    });
  }

  render () {
    const { onSelectImage, assets, builderConfiguration, editTarget, onUploadImage, onClose } = this.props;
    const { activeTab } = this.state;
    const title = 'Select an Image';

    return (
      <div>
        <header className={classNames('modal__tabs')}>
          <h2>{ title }</h2>
          <nav>
            { this.renderTabNavigation() }
          </nav>
        </header>
        <ContentTabs
          onSelectImage={onSelectImage}
          editTarget={editTarget}
          onUploadImage={onUploadImage}
          assets={assets}
          builderConfiguration={builderConfiguration}
          activeTab={activeTab}
          onClose={onClose} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { assets } = state;

  return {
    assets
  };
}

export default connect(mapStateToProps)(TabNavigation);
