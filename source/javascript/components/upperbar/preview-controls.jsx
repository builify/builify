import React from 'react';
import classNames from '../../common/classnames';
import Icon from '../shared/icon';

class PreviewControlsItem extends React.Component {
  render () {
    const { name } = this.props;
    const iconSize = 24;
    const className = classNames(null, {
      'active': this.props.active
    });
    const style = {
      fill: '#444'
    };
    let title = '';

    switch (name) {
      case 'desktop':
        title = 'Set to Desktop View';
        break;

      case 'tablet':
        title = 'Set to Tablet View';
        break;

      case 'phone':
        title = 'Set to Phone View';
        break;

      case 'settings-applications':
        title = 'Set to Editor Mode';
        break;
    }

    return (
      <li className={className} title={title}>
        <Icon icon={name} style={style} size={iconSize} />
      </li>
    );
  }
}

class PreviewControls extends React.Component {
  render () {
    return (
      <div className={classNames('preview-controls')}>
        <ul>
          <PreviewControlsItem name='settings-applications' active={true} />
          <PreviewControlsItem name='desktop' />
          <PreviewControlsItem name='tablet' />
          <PreviewControlsItem name='phone' />
        </ul>
      </div>
    );
  }
}

export default PreviewControls;
