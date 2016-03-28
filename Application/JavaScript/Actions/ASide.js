import Actions from './Constants';

export function openTab (target) {
  window.dispatchEvent(new Event('resize'));

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

export function openSidetab (target) {
  window.dispatchEvent(new Event('resize'));

  return {
    type: Actions.OPEN_SIDETAB,
    target: target
  };
}

export function closeSidetab () {
  return {
    type: Actions.CLOSE_SIDETAB
  };
}
