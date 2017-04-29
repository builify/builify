import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'lodash';
import Checkbox from '../check-box';
import classNames from '../../../common/classnames';
import { emptyFunction } from '../../../common/misc';

export default function TableHead ({ model, onSelect, selected }) {
  let selectCell;
  const contentCells = _map(Object.keys(model), (key) => {
    return <th key={key}>{key}</th>;
  });

  if (onSelect) {
    selectCell = (
      <th
        key="select"
        className={classNames('table__selectable')}>
        <Checkbox
          onChange={onSelect}
          checked={selected} />
      </th>
    );
  }

  return (
    <thead>
      <tr>{ [selectCell, ...contentCells] }</tr>
    </thead>
  );
}

TableHead.propTypes = {
  model: PropTypes.object,
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

TableHead.defaultProps = {
  model: {},
  selected: false,
  onSelect: emptyFunction
};
