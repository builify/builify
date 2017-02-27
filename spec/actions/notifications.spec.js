import expect from 'unexpected';
import * as Constants from '../../source/javascript/actions/constants';
import * as Actions from '../../source/javascript/actions/notifications';

describe('Notification actions', () => {
  describe('addNotification', () => {
    it('should be a function', () => {
      expect(Actions.addNotification, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.addNotification(), 'to have keys', 'type', 'notification');
      expect(Actions.addNotification().type, 'to be', Constants.ADD_NOTIFICATION);
      expect(Actions.addNotification().notification, 'to be empty');
    });
  });

  describe('removeNotification', () => {
    it('should be a function', () => {
      expect(Actions.removeNotification, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.removeNotification(), 'to have keys', 'type', 'uid');
      expect(Actions.removeNotification().type, 'to be', Constants.REMOVE_NOTIFICATION);
      expect(Actions.removeNotification().uid, 'to be', 0);
    });
  });

  describe('demoNotification', () => {
    it('should be a function', () => {
      expect(Actions.demoNotification, 'to be a', 'function');
    });
  });
});
