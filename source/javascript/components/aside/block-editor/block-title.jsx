import React from 'react';
import classNames from '../../../common/classnames';

const BlockTitle = function (props) {
  return (
    <h3 className={classNames('be-block__title')}>{ props.title }</h3>
  );
};

BlockTitle.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default BlockTitle;
