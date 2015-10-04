import React, { Component } from 'react';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
import TemplateItem from './TemplateItem';
import Icon from '../Shared/Icon';

class TemplateSelectionScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectionListX: 0
    };
  }

  previousSlides () {
    let XPos = 0;

    this.setState({
      selectionListX: XPos
    });

    this.refs.selectionList.style.transform = 'translateX(' + XPos + 'px)';
  }

  nextSlides () {
    let XPos = -350;
    let howMuchCanWeGoRight = 0;
    const itemWidth = 350 + (45 * 2);

    this.setState({
      selectionListX: XPos
    });

    this.refs.selectionList.style.transform = 'translateX(' + XPos + 'px)';
  }

  updateSlider (direction = 'right') {
    if (direction == 'left') {
      this.previousSlides();
    } else if (direction == 'right') {
      this.nextSlides();
    }
  }

  leftNavigationClick (e) {
    this.updateSlider('left');
  }

  rightNavigationClick (e) {
    this.updateSlider('right');
  }

  render () {
    const { templates } = this.props;
    const templatesLength = templates ? templates.length : 0;
    const listStyle = {
      width: (templatesLength * (350 + (45 * 2)))
    };
    const navigationNodes = () => {
      if (templatesLength > 1) {
        return (
          <div className='ab-selecttemplate__nav'>
            <div
              className='left'
              onClick={::this.leftNavigationClick}>
              <Icon name='angle-left' />
            </div>
            <div 
              className='right'
              onClick={::this.rightNavigationClick}>
              <Icon name='angle-right' />
            </div>
          </div>
        )
      } else {
        return null;
      }
    };
    const listCN = classNames('selecttemplate__list', templatesLength > 1 ? 'many' : '');

    return (
      <div className='ab-selecttemplate'>
        <div className='ab-selecttemplate__heading'>{getString('templateselection')}</div>
        <ul 
          className={listCN}
          ref={'selectionList'}
          data-items={templatesLength}>
          {templates.map((template, i) => {
            return (
              <TemplateItem
                ref={'templateItem-' + i}
                key={'templateItem' + i} 
                templateInformation={template} />
            )
          })}
        </ul>
        {navigationNodes()}
      </div>
    )
  }
}

export default TemplateSelectionScreen;