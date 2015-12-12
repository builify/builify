import React from 'react';
import _ from 'lodash';
import ClassNames from 'classnames';
import Random from '../../../Common/Random';
import Scrollbar from '../../Shared/Scrollbar';
import Image from '../../Shared/Image';

export default class ImageEditContentImages extends React.Component {
  static defaultProps = {
    builderConfiguration: React.PropTypes.object.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  };

  state = {
    activeCategory: 0
  }

  defaultImages = [];

  componentWillMount () {
    const { builderConfiguration } = this.props;
    const { imagesLibrary } = builderConfiguration;

    this.defaultImages = _.sortBy(imagesLibrary, 'category');
  }

  renderCategories () {
    const { activeCategory } = this.state;

    return _.map(this.defaultImages, (item, idx) => {
      const { category } = item;
      const className = ClassNames('ab-modal__tabitem', idx === activeCategory ? 'active' : null);

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
      );
    });
  }

  renderImages () {
    const { activeCategory } = this.state;
    const { onSelectImage } = this.props;

    return (
      <div className='ab-modal__tabimages'>
        { _.map(this.defaultImages, (item, catIdx) => {
          if (catIdx !== activeCategory) {
            return;
          }

          if (_.has(item, 'images')) {
            return _.map(item.images, (url, imgIdx) => {
              const className = ClassNames('ab-modal__tabimage');

              return (
                <Image
                  className={className}
                  backgroundImage
                  src={url}
                  onClick={e => {
                    return onSelectImage({
                      src: url
                    });
                  }} />
              );
            });
          }

          return null;
        }) }
      </div>
    );
  }

  render () {
    return (
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Categories</h2>
          <nav className='ab-modal__tabmenu'>
            { this.renderCategories() }
          </nav>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            { this.renderImages() }
          </Scrollbar>
        </main>
      </div>
    );
  }
}
