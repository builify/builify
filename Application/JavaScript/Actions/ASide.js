import Actions from './Constants';

export function openTab (target) {
  return (dispatch) => {
    dispatch({
      type: Actions.OPEN_TAB,
      target: target
    });
  };
}

export function closeTab () {
  return {
    type: Actions.CLOSE_TAB
  };
}
