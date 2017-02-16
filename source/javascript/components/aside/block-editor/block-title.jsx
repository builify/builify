import React from 'react';
import classNames from '../../../common/classnames';

function BlockTitle ({
  title
}) {
  return (
    <h3 className={classNames('be-block__title')}>{ title }</h3>
  );
}

BlockTitle.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default BlockTitle;
