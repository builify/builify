import _assign from 'lodash/assign';
import _size from 'lodash/size';
import downloadPages from '../pages/download';
import * as Actions from '../actions/constants';
import { DialogTypes } from '../constants';

const initialState = {
  isModalOpen: false,
  modalType: DialogTypes.NONE,
  modalTarget: null
};

export default function builder (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_IMAGE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.IMAGECHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_COUNTDOWN_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.COUNTDOWN,
        modalTarget: action.target
      });

    case Actions.OPEN_ICON_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.ICONCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_VIDEO_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.VIDEOEDIT,
        modalTarget: action.target
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.LINKCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.PREVIOUSPAGES
      });

    case Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.CONTENTBLOCKSOURCE,
        modalTarget: action.currentHoverBlock
      });

    case Actions.OPEN_DOWNLOAD_MODAL: {
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.DOWNLOADPAGES
      });
    }

    case Actions.OPEN_RESTART_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.RESTART
      });

    case Actions.OPEN_FEEDBACK_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.FEEDBACK
      });

    case Actions.OPEN_CUSTOMCSS_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.CUSTOMCSS
      });

    case Actions.OPEN_LINK_CHANGE_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.LINKCHANGE
      });

    case Actions.CLOSE_MODAL:
      return _assign({}, state, {
        isModalOpen: false,
        modalType: DialogTypes.NONE,
        modalTarget: null
      });
  }

  return state;
}
