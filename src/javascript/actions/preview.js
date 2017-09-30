import Actions from './constants';
import { PreviewModes } from '../constants';

export function setPreviewMode(mode = PreviewModes.INITIAL) {
    return {
        type: Actions.SET_PREVIEW_MODE,
        mode
    };
}
