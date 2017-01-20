import expect from 'unexpected';
import * as Constants from '../../source/javascript/actions/constants';
import * as Actions from '../../source/javascript/actions/aside';

describe('Aside actions', () => {
  describe('openTab', () => {
    it('should be a function', () => {
      expect(Actions.openTab, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openTab(), 'to have keys', 'type', 'target');
      expect(Actions.openTab().type, 'to be', Constants.OPEN_TAB);
      expect(Actions.openTab('some-target').target, 'to be', 'some-target');
    });
  });

  describe('openBlockEditorTab', () => {
    it('should be a function', () => {
      expect(Actions.openBlockEditorTab, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.openBlockEditorTab(), 'to have keys', 'type', 'editTarget');
      expect(Actions.openBlockEditorTab().type, 'to be', Constants.OPEN_BLOCKEDITOR_TAB);
      expect(Actions.openBlockEditorTab('some-target').editTarget, 'to be', 'some-target');
    });
  });

  describe('closeBlockEditorTab', () => {
    it('should be a function', () => {
      expect(Actions.closeBlockEditorTab, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.closeBlockEditorTab(), 'to only have key', 'type');
      expect(Actions.closeBlockEditorTab().type, 'to be', Constants.CLOSE_BLOCKEDITOR_TAB);
    });
  });

  describe('closeTab', () => {
    it('should be a function', () => {
      expect(Actions.closeTab, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.closeTab(), 'to only have key', 'type');
      expect(Actions.closeTab().type, 'to be', Constants.CLOSE_TAB);
    });
  });
});
