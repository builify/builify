import * as Actions from '../actions/constants';

const initialState = [];

export default function assets (state = initialState, action) {
  switch (action) {
    case Actions.INITIALIZE: {
      return state;
    }

    default:
      return state;
  }
}
