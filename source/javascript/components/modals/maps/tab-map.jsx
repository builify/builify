import React from 'react';
import classNames from '../../../common/classnames';

export default class TabMap extends React.Component {
  state = {
    activeCategory: 0
  };

  render () {
    return (
      <div className={classNames('modal__tab')}>
        <aside className={classNames('modal__tabside')}>
          <h2>Categories</h2>
          <nav className={classNames('modal__tabmenu')}>
            <span>Test</span>
          </nav>
        </aside>
        <main className={classNames('modal__tabcontent')}>

        </main>
      </div>
    );
  }
}
