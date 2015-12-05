import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../Actions';
import Random from '../../../Common/Random';
import Scrollbar from '../Scrollbar';
import Button from '../Button';
import Input from '../Input';
import Image from '../Image';
import cx from 'classnames';
import _ from 'lodash';

const tabList = [
  { id: 1, label: 'Library' },
  { id: 2, label: 'Current Image' },
  { id: 3, label: 'Upload New' },
  { id: 4, label: 'Uploaded Images' }
];

const defaultImages = _.sortBy([
  {
    category: 'Architecture',
    images: [
      'https://s3.amazonaws.com/branded.me/gallery/architecture/1.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/2.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/3.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/4.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/5.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/6.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/7.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/8.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/9.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/10.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/11.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/12.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/13.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/architecture/14.jpg',
    ]
  },
  {
    category: 'Business',
    images: [
      'https://s3.amazonaws.com/branded.me/gallery/business/1.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/2.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/3.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/4.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/5.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/6.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/7.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/8.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/9.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/10.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/11.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/12.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/13.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/business/14.jpg',
    ]
  },
  {
    category: 'Patterns',
    images: [
      'https://s3.amazonaws.com/branded.me/gallery/patterns/1.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/2.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/3.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/4.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/5.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/6.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/7.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/8.png',
      'https://s3.amazonaws.com/branded.me/gallery/patterns/9.png'
    ]
  },
  {
    category: 'Colors',
    images: [
      'https://s3.amazonaws.com/branded.me/gallery/colors/1.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/2.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/3.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/4.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/5.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/6.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/7.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/8.png',
      'https://s3.amazonaws.com/branded.me/gallery/colors/9.png'
    ]
  },
  {
    category: 'Textures',
    images: [
      'https://s3.amazonaws.com/branded.me/gallery/textures/1.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/2.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/3.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/4.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/5.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/6.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/7.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/8.jpg',
      'https://s3.amazonaws.com/branded.me/gallery/textures/9.jpg',
    ]
  }
], 'category');

class ModalWrapper extends Component {
  render () {
    const { children, className } = this.props;

    return (
      <div className={className ? className : null}>
        <div role='overlay' className='ab-modal__overlay' />
        <div role='content' className='ab-modal__content'>
          { children }
        </div>
      </div>
    );
  }
}

class ImageEditContentImages extends Component {
  state = {
    activeCategory: 0,
    selectedItem: {
      category: -1,
      image: -1
    }
  }

  render () {
    const { activeCategory, selectedItem } = this.state;

    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Categories</h2>
          <nav className='ab-modal__tabmenu'>
            { _.map(defaultImages, (item, idx) => {
              const { category } = item;
              const className = cx('ab-modal__tabitem', idx === activeCategory ? 'active' : null);

              return (
                <div
                  key={Random.randomKey('tabitem')}
                  className={className}
                  onClick={e => {
                    this.setState({
                      activeCategory: idx
                    });
                  }}>
                  <span>{category}</span>
                </div>
              )
            }) }
          </nav>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            <div className='ab-modal__tabimages'>
              { _.map(defaultImages, (item, catIdx) => {
                if (catIdx !== activeCategory) {
                  return;
                }

                if (_.has(item, 'images')) {
                  return _.map(item.images, (url, imgIdx) => {
                    const isSelected = !!(selectedItem.category === catIdx && selectedItem.image === imgIdx);
                    const className = cx('ab-modal__tabimage', isSelected ? 'active' : null);

                    return (
                      <Image
                        className={className}
                        backgroundImage
                        src={url}
                        onClick={e => {
                          if (isSelected) {
                            this.setState({
                              selectedItem: {
                                category: -1,
                                image: -1
                              }
                            });
                          } else {
                            this.setState({
                              selectedItem: {
                                category: catIdx,
                                image: imgIdx
                              }
                            });
                          }
                        }} />
                    );
                  });
                }

                return null;
              }) }
            </div>
          </Scrollbar>
        </main>
      </div>
    );
  }
}

class ImageEditContentCurrentImage extends Component {
  render () {
    const imageSrc = 'https://s3.amazonaws.com/branded.me/gallery/architecture/1.jpg';

    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside sec'>
          <h2>Edit Image Src</h2>
          <Input
            ref='image-src'
            type='text'
            label='Image Source'
            value={imageSrc}
            floating={false} />
        </aside>
        <main className='ab-modal__tabcontent sec'>
          <Image
            className='ab-modal__imgholder'
            backgroundImage
            src={imageSrc} />
        </main>
      </div>
    );
  }
}

class ImageEditTabTabContent extends Component {
  static propTypes = {
    activeTab: PropTypes.number.isRequired
  }

  render () {
    const { activeTab } = this.props;

    switch (activeTab) {
      case 1:
        return <ImageEditContentImages />

      case 2:
        return <ImageEditContentCurrentImage />
    }

    return null;
  }
}

class ImageEditTabs extends Component {
  state = {
    activeTab: 2
  };

  renderTablist (activeTab) {
    return _.map(tabList, tab => {
      const { label, id } = tab;
      const className = cx('ab-modal__tablabel', id === activeTab ? 'active' : null);

      return (
        <div
          key={Random.randomKey('tab')}
          className={className}
          onClick={(e) => {
            this.setState({
              activeTab: id
            });
          }}>
          <span>{label}</span>
        </div>
      )
    });
  }

  render () {
    const { activeTab } = this.state;

    return (
      <div>
        <header className='ab-modal__tabs'>
          <h2>Select an Image</h2>
          <nav>
            { this.renderTablist(activeTab) }
            <div className='ab_modal__pointer' />
          </nav>
        </header>
        <ImageEditTabTabContent activeTab={activeTab} />
      </div>
    )
  }
}

class ImageEditNavigation extends Component {
  renderButtons (actions) {
    return _.map(actions, (action, idx) => {
      let className = 'ab-modal__button';

      if (action.className) className += ` ${action.className}`;

      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      )
    });
  }

  saveClick (e) {
    const { closeDialog } = this.props;

    return closeDialog;
  }

  renderActions () {
    const { closeDialog } = this.props;
    const actions = [
      { label: 'Cancel', onClick: closeDialog },
      { label: 'Save', onClick: ::this.saveClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    return (
      <nav role='navigation' className='ab-modal__navigation'>
        { this.renderActions() }
      </nav>
    )
  }
}

class ImageEdit extends Component {
  dialogElement = null;

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['modalWrapper'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active) {
      _.delay(() => {
        if (dialogElement) {
          dialogElement.classList.add('active');
        }
      }, 16);
    }
  }

  closeDialog () {
    const { onCloseModal } = this.props;
    let dialogElement = null;

    if (this.dialogElement !== null) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = ReactDOM.findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _.delay(() => {
      return onCloseModal();
    }, 300);
  }

  render () {
    const className = cx('ab-modal');

    return (
      <ModalWrapper
        ref='modalWrapper'
        className={className}>
        <ImageEditTabs />
        <ImageEditNavigation
          closeDialog={::this.closeDialog} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageEdit);
