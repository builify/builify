import _assign from 'lodash/assign';
import * as Actions from '../actions/constants';
import { ModalTypes } from '../constants';

const initialState = {
  isModalOpen: false,
  modalType: ModalTypes.NONE,
  modalTarget: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_IMAGE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.IMAGECHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_COUNTDOWN_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.COUNTDOWN,
        modalTarget: action.target
      });

    case Actions.OPEN_ICON_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.ICONCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_VIDEO_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.VIDEOEDIT,
        modalTarget: action.target
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.LINKCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.PREVIOUSPAGES
      });

    case Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.CONTENTBLOCKSOURCE,
        modalTarget: action.currentHoverBlock
      });

    case Actions.OPEN_DOWNLOAD_MODAL: {
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.DOWNLOADPAGES
      });
    }

    case Actions.OPEN_RESTART_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.RESTART
      });

    case Actions.OPEN_FEEDBACK_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.FEEDBACK
      });

    case Actions.OPEN_CUSTOMCSS_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.CUSTOMCSS
      });

    case Actions.OPEN_LINK_CHANGE_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.LINKCHANGE
      });

    case Actions.CLOSE_MODAL:
      return _assign({}, state, {
        isModalOpen: false,
        modalType: ModalTypes.NONE,
        modalTarget: null
      });
  }

  return state;
}
