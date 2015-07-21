import keyMirror from 'react/lib/keyMirror';

export default keyMirror({
  ADD_TODO: Symbol('ADD_TODO'),
  DELETE_TODO: Symbol('DELETE_TODO'),
  EDIT_TODO: Symbol('EDIT_TODO'),
  MARK_TODO: Symbol('MARK_TODO'),
  MARK_ALL: Symbol('MARK_ALL'),
  CLEAR_MARKED: Symbol('CLEAR_MARKED'),

  SHOW_ALL: Symbol('SHOW_ALL'),
  SHOW_MARKED: Symbol('SHOW_MARKED'),
  SHOW_UNMARKED: Symbol('SHOW_UNMARKED')
});