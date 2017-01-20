import expect from 'unexpected';
import * as Constants from '../../source/javascript/actions/constants';
import * as Actions from '../../source/javascript/actions/dialog';

describe('Dialog actions', () => {
  describe('openIconEditModal', () => {
    it('should be a function', () => {
      expect(Actions.openIconEditModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openIconEditModal(), 'to have keys', 'type', 'target');
      expect(Actions.openIconEditModal().type, 'to be', Constants.OPEN_ICON_EDIT_MODAL);
      expect(Actions.openIconEditModal().target, 'to be', null);
      expect(Actions.openIconEditModal('some-target').target, 'to be', 'some-target');
    });
  });

  describe('openImageEditModal', () => {
    it('should be a function', () => {
      expect(Actions.openImageEditModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openImageEditModal(), 'to have keys', 'type', 'target');
      expect(Actions.openImageEditModal().type, 'to be', Constants.OPEN_IMAGE_EDIT_MODAL);
      expect(Actions.openImageEditModal().target, 'to be', null);
      expect(Actions.openImageEditModal('some-target').target, 'to be', 'some-target');
    });
  });

  describe('openVideoEditModal', () => {
    it('should be a function', () => {
      expect(Actions.openVideoEditModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openVideoEditModal(), 'to have keys', 'type', 'target');
      expect(Actions.openVideoEditModal().type, 'to be', Constants.OPEN_VIDEO_EDIT_MODAL);
      expect(Actions.openVideoEditModal().target, 'to be', null);
      expect(Actions.openVideoEditModal('some-target').target, 'to be', 'some-target');
    });
  });

  describe('openCountdownEditModal', () => {
    it('should be a function', () => {
      expect(Actions.openCountdownEditModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openCountdownEditModal(), 'to have keys', 'type', 'target');
      expect(Actions.openCountdownEditModal().type, 'to be', Constants.OPEN_COUNTDOWN_EDIT_MODAL);
      expect(Actions.openCountdownEditModal().target, 'to be', null);
      expect(Actions.openCountdownEditModal('some-target').target, 'to be', 'some-target');
    });
  });

  describe('openPreviousPagesSelectionModal', () => {
    it('should be a function', () => {
      expect(Actions.openPreviousPagesSelectionModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openPreviousPagesSelectionModal(), 'to only have key', 'type');
      expect(Actions.openPreviousPagesSelectionModal().type, 'to be', Constants.OPEN_PREVIOUS_PAGES_SELECT_MODAL);
    });
  });
});
