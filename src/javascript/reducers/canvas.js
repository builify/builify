import {
    assign as _assign,
    map as _map,
    isObject as _isObject,
    isNull as _isNull,
    isElement as _isElement
} from 'lodash';
import TTDOM from '../common/TTDOM';
import * as Actions from '../actions/constants';

const targets = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'em', 'i', 'span', 'p', 'a',
    'li', 'ul',
    'div',
    'img', 'input', 'textarea', 'blockquote',
    'figcaption'
].join(',');

function mouseEnterEvent() {
    TTDOM.element.classes.add(this, 'ab-highlight'); // eslint-disable-line
}

function mouseLeaveEvent() {
    TTDOM.element.classes.remove(this, 'ab-highlight'); // eslint-disable-line
}

const canvasInitialState = {
    iFrameWindow: null,

    currentHoverBlock: {
        block: {},
        elementReference: null,
        topX: 10
    }
};

export default function(state = canvasInitialState, action) {
    switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
        const iFrame = TTDOM.iframe.get('ab-cfrm');
        const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

        return _assign({}, state, {
            iFrameWindow
        });
    }

    case Actions.RESTART_PAGE: {
        const { iFrameWindow } = state;

        if (!_isNull(iFrameWindow) && iFrameWindow.scrollTo) {
            iFrameWindow.scrollTo(0, 0);
        }

        return state;
    }

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
        const { iFrameWindow } = state;
        const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
        let script = null;

        _map(filesToUpdate, (file) => {
            const fileSource = file.getAttribute('src');

            TTDOM.element.remove(file);

            script = iFrameWindow.document.createElement('script');
            script.src = fileSource;
            script.async = true;
            script.setAttribute('data-update', true);

            iFrameWindow.document.head.appendChild(script);
        });

        return state;
    }

    case Actions.CURRENT_HOVER_BLOCK: {
        const { elementReference, block } = action;

        if (_isElement(elementReference) && _isObject(block)) {
            const { iFrameWindow } = state;
            const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

            return _assign({}, state, {
                currentHoverBlock: {
                    block,
                    elementReference,
                    topX
                }
            });
        }

        throw new Error('Missing element or object in hover object.');
    }

    case Actions.REMOVE_CONTENTBLOCK: {
        return _assign({}, state, {
            currentHoverBlock: {
                block: {}
            }
        });
    }

    case Actions.CLONE_ITEM:
    case Actions.SET_CANVAS_ELEMENTS_HOVER_EVENTS: {
        const { iFrameWindow } = state;
        const targetElements = iFrameWindow.document.querySelectorAll(targets);

        // Add mouse events to elements inside core block.
        _map(targetElements, (target, i) => {
            const findUp = TTDOM.find.findUpAttr(target, 'data-abcpanel data-abctoolbox');

            if (findUp !== null ||
          target.getAttribute('data-abccorent') ||
          target.getAttribute('data-reactroot') ||
          target.getAttribute('data-ttroot') ||
          i === 0 // Fixes root content editable issue.
            ) {
                return;
            }

            target.contentEditable = true;

            // First remove old events.
            target.removeEventListener('mouseenter', mouseEnterEvent);
            target.removeEventListener('mouseleave', mouseLeaveEvent);

            // Add new events.
            target.addEventListener('mouseenter', mouseEnterEvent, false);
            target.addEventListener('mouseleave', mouseLeaveEvent, false);
        });

        return state;
    }

    default:
        return state;
    }
}
