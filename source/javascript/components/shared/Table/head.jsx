import React, { PropTypes } from 'react';
import Checkbox from '../check-box';
import { map as _map } from 'lodash';

export default function TableHead ({ model, onSelect, selected }) {
  let selectCell;
  const contentCells = _map(Object.keys(model), key => {
    return <th key={key}>{key}</th>;
  });

  if (onSelect) {
    selectCell = (
      <th
        key='select'
        className='ab-table__selectable'>
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
  className: PropTypes.string,
  model: PropTypes.object,
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

TableHead.defaultProps = {
  className: '',
  model: {},
  selected: false
};
