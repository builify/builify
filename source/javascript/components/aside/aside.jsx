import React from 'react';
import classNames from '../../common/classnames';
import Tab from './tab';
import BlockEditor from './block-editor';

export default class Aside extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <aside className={classNames('aside')}>
        <div className={classNames('aside__wrapper')}>
          <div className={classNames('aside__item')}>
            <Tab />
          </div>
        </div>
      </aside>
    );
  }
}
