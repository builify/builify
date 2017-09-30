import expect from 'unexpected';
import * as Constants from '../../src/javascript/actions/constants';
import * as Actions from '../../src/javascript/actions/modal';

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

  describe('openDownloadModal', () => {
    it('should be a function', () => {
      expect(Actions.openDownloadModal, 'to be a', 'function');
    });
  });

  describe('openRestartModal', () => {
    it('should be a function', () => {
      expect(Actions.openRestartModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openRestartModal(), 'to only have key', 'type');
      expect(Actions.openRestartModal().type, 'to be', Constants.OPEN_RESTART_MODAL);
    });
  });

  describe('openFeedbackModal', () => {
    it('should be a function', () => {
      expect(Actions.openFeedbackModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openFeedbackModal(), 'to only have key', 'type');
      expect(Actions.openFeedbackModal().type, 'to be', Constants.OPEN_FEEDBACK_MODAL);
    });
  });

  describe('openMapsModal', () => {
    it('should be a function', () => {
      expect(Actions.openMapsModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openMapsModal(), 'to only have key', 'type');
      expect(Actions.openMapsModal().type, 'to be', Constants.OPEN_MAPS_MODAL);
    });
  });

  describe('openCustomCSSModal', () => {
    it('should be a function', () => {
      expect(Actions.openCustomCSSModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openCustomCSSModal(), 'to only have key', 'type');
      expect(Actions.openCustomCSSModal().type, 'to be', Constants.OPEN_CUSTOMCSS_MODAL);
    });
  });

  describe('openLinkChangeModal', () => {
    it('should be a function', () => {
      expect(Actions.openLinkChangeModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openLinkChangeModal(), 'to only have key', 'type');
      expect(Actions.openLinkChangeModal().type, 'to be', Constants.OPEN_LINK_CHANGE_MODAL);
    });
  });

  describe('closeModal', () => {
    it('should be a function', () => {
      expect(Actions.closeModal, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.closeModal(), 'to only have key', 'type');
      expect(Actions.closeModal().type, 'to be', Constants.CLOSE_MODAL);
    });
  });
});
