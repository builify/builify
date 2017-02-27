import TTEventEmitter from 'tt-event-emitter';
import Combokeys from 'combokeys';
import {
  findIndex as _findIndex,
  map as _map
} from 'lodash';
import * as Actions from '../actions';
import { PAGE_AUTOMATIC_SAVE_TIME, PreviewModes} from '../constants';

const combokeys = new Combokeys(document.documentElement);
const LOAD_EVENTS = [
  'savecurrentpage',
  'restartpage',
  'preview-desktop',
  'preview-tablet',
  'preview-phone',
  'close-modal'
];

function initializeMessage () {
  console.log('BUILify - Initialized events successfully.');
}

export default class {
  _dispatch = null;
  _observable = null;

  constructor (dispatch) {
    this._dispatch = dispatch;

    try {
      this.initializeEmitter();
      this.loadEvents();
      this.initializeEventTriggers();
      this.initializeBackgroundEvents();
    } catch (e) {
      throw e;
    }

    initializeMessage();
  }

  initializeEmitter () {
    this._observable = new TTEventEmitter();
  }

  loadEvents () {
    _map(LOAD_EVENTS, (event) => {
      this.initializeEvent(event);
    });
  }

  initializeEvent (eventType) {
    if (!eventType) {
      return;
    }

    switch (eventType) {
      case 'savecurrentpage':
        this._observable.addListener('savecurrentpage', () => {
          this._dispatch(Actions.saveCurrentPage());
        });

        break;

      case 'restartpage':
        this._observable.addListener('restartpage', () => {
          this._dispatch(Actions.openRestartModal());
        });

        break;

      case 'preview-desktop':
        this._observable.addListener('preview-desktop', () => {
          this._dispatch(Actions.setPreviewMode(PreviewModes.INITIAL));
        });

        break;

      case 'preview-tablet':
        this._observable.addListener('preview-tablet', () => {
          this._dispatch(Actions.setPreviewMode(PreviewModes.TABLET));
        });

        break;

      case 'preview-phone':
        this._observable.addListener('preview-phone', () => {
          this._dispatch(Actions.setPreviewMode(PreviewModes.PHONE));
        });

        break;

      case 'close-modal':
        this._observable.addListener('close-modal', () => {
          this._dispatch(Actions.closeModal());
        }, 'keyup');

        break;

      default:
        break;
    }
  }

  initializeEventTriggers () {
    this.initializeHotKeys();
  }

  initializeHotKeys () {
    combokeys.bind('ctrl+s', () => {
      this.emit('savecurrentpage');
      return false;
    });

    combokeys.bind('ctrl+r', () => {
      this.emit('restartpage');
      return false;
    });

    combokeys.bind('ctrl+v+d', () => {
      this.emit('preview-desktop');
      return false;
    });

    combokeys.bind('ctrl+v+m', () => {
      this.emit('preview-tablet');
      return false;
    });

    combokeys.bind('ctrl+v+p', () => {
      this.emit('preview-phone');
      return false;
    });

    combokeys.bind('esc', () => {
      this.emit('close-modal');
    });
  }

  initializeBackgroundEvents () {
    if (_findIndex(LOAD_EVENTS, 'savecurrentpage') !== -1) {
      window.setInterval(() => {
        this._observable.emit('saveCurrentPage');
      }, PAGE_AUTOMATIC_SAVE_TIME);
    }
  }

  emit (eventType) {
    return this._observable.emit(eventType);
  }
}
