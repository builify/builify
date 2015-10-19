import React, { Component } from 'react';
import { getBrowserSize, randomKey } from '../../Common/Common';
import classNames from 'classnames';
import Icon from './Icon.jsx';

class PanelItem extends Component {
  render () {
    return (
      <a
        href=''>
        <Icon name='tools' />
      </a>
    )
  }
}

class TextEditorPanel extends Component {
  /*componentDidMount () {
    let panelElement = this.refs.panel;
    const browserSize = getBrowserSize();
    const { width } = browserSize;
    const panelWidth = panelElement.offsetWidth;
    const mainElementWidth = width - 275;
    const x = mainElementWidth / 2;

    panelElement.style.left = x + 'px';
  }*/

  render () {
    const panelItems = [
      {'name': 'bold'},
      {'name': 'italic'},
      {'name': 'underline'},
      {'name': 'strikethrough'},
      {'name': 'color'},
      {'name': 'fontsize'},
      {'name': 'removeFormat'},
      {'name': 'formatParagraph'},
      {'name': 'align'},
      {'name': 'list'},
      {'name': 'createLink'},
      {'name': 'unLink'},
      {'name': 'htmlSource'}
    ];
    const cn = classNames('ab-txpanel', 'active');
    return null;
    return (
      <div
        ref='panel'
        className={cn}>
        {panelItems.map((item, i) => {
          const panelItemKey = '' + randomKey() + 'panelitem';

          return (
            <PanelItem
              key={panelItemKey} />
          )
        })}
      </div>
    )
  }
}

export default TextEditorPanel;
