import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';
import Scrollbar from '../../Shared/Scrollbar';

export default class TabIcons extends React.Component {
  state = {
    activeCategory: 0
  };

  render () {
    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Fonts</h2>
          <nav className='ab-modal__tabmenu'>

          </nav>
        </aside>
        <main className='ab-modal__tabcontent'>

        </main>
      </div>
    );
  }
}
