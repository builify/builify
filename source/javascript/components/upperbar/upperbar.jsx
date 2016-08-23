import React from 'react';
import classNames from '../../common/classnames';
import PreviewControls from './preview-controls';
import PageControls from './page-controls';

export default class Upperbar extends React.Component {
  render () {
    return (
      <div className={classNames('upperbar')}>
        <PageControls />
        <PreviewControls />
      </div>
    );
  }
}
