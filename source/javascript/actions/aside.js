import Actions from './constants';

export function openTab (target) {
  return {
    type: Actions.OPEN_TAB,
    target: target
  };
}

export function closeTab () {
  return {
    type: Actions.CLOSE_TAB
  };
}
