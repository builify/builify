import Actions from './constants';

export function openTab (target) {
  return {
    type: Actions.OPEN_TAB,
    target: target
  };
}

export function openBlockEditorTab (editTarget) {
  return {
    type: Actions.OPEN_BLOCKEDITOR_TAB,
    editTarget: editTarget
  };
}

export function closeBlockEditorTab () {
  return {
    type: Actions.CLOSE_BLOCKEDITOR_TAB
  };
}

export function closeTab () {
  return {
    type: Actions.CLOSE_TAB
  };
}
