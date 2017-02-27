import expect from 'unexpected';
import * as Constants from '../../source/javascript/actions/constants';
import * as Actions from '../../source/javascript/actions/preview';

describe('Preview actions', () => {
  describe('setPreviewMode', () => {
    it('should be a function', () => {
      expect(Actions.setPreviewMode, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.setPreviewMode(), 'to have keys', 'type', 'mode');
      expect(Actions.setPreviewMode().type, 'to be', Constants.SET_PREVIEW_MODE);
      expect(Actions.setPreviewMode().mode, 'to be', 0);
      expect(Actions.setPreviewMode('some-target').mode, 'to be', 'some-target');
    });
  });
});
