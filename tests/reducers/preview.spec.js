import expect from 'unexpected';
import reducer from '../../src/javascript/reducers/preview';
import { PreviewModes } from '../../src/javascript/constants';
import * as ActionTypes from '../../src/javascript/actions/constants';

describe('Preview reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
      'to equal',
      {
        previewMode: PreviewModes.INITIAL
      }
    );
  });

  it('should handle SET_PREVIEW_MODE', () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.SET_PREVIEW_MODE,
        mode: PreviewModes.TABLET
      }),
      'to equal',
      {
        previewMode: PreviewModes.TABLET
      }
    );

    expect(
      reducer(undefined, {
        type: ActionTypes.SET_PREVIEW_MODE,
        mode: PreviewModes.PHONE
      }),
      'to equal',
      {
        previewMode: PreviewModes.PHONE
      }
    );
  });
});
