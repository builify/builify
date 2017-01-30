import expect from 'unexpected';
import * as Constants from '../../source/javascript/actions/constants';
import * as Actions from '../../source/javascript/actions/page';

describe('Page actions', () => {
  describe('startNewPage', () => {
    it('should be a function', () => {
      expect(Actions.startNewPage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.startNewPage(), 'to have keys', 'type', 'pageID', 'pagesInStorage');
      expect(Actions.startNewPage().type, 'to be', Constants.START_NEW_PAGE);
    });
  });

  describe('loadPreviousPage', () => {
    it('should be a function', () => {
      expect(Actions.loadPreviousPage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.loadPreviousPage(), 'to have keys', 'type', 'idx');
      expect(Actions.loadPreviousPage().type, 'to be', Constants.LOAD_PREVIOUS_PAGE);
      expect(Actions.loadPreviousPage('123').idx, 'to be', '123');
    });
  });

  describe('checkPreviousPagesInStorage', () => {
    it('should be a function', () => {
      expect(Actions.checkPreviousPagesInStorage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.checkPreviousPagesInStorage(), 'to only have key', 'type');
      expect(Actions.checkPreviousPagesInStorage().type, 'to be', Constants.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE);
    });
  });

  describe('flushPagesInStorage', () => {
    it('should be a function', () => {
      expect(Actions.flushPagesInStorage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.flushPagesInStorage(), 'to only have key', 'type');
      expect(Actions.flushPagesInStorage().type, 'to be', Constants.FLUSH_PAGES_IN_STORAGE);
    });
  });

  describe('getCurrentPageData', () => {
    it('should be a function', () => {
      expect(Actions.getCurrentPageData, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.getCurrentPageData(), 'to only have key', 'type');
      expect(Actions.getCurrentPageData().type, 'to be', Constants.GET_CURRENT_PAGE_DATA);
    });
  });

  describe('saveCurrentPage', () => {
    it('should be a function', () => {
      expect(Actions.saveCurrentPage, 'to be a', 'function');
    });
  });

  describe('downloadAsHTML', () => {
    it('should be a function', () => {
      expect(Actions.downloadAsHTML, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.downloadAsHTML(), 'to only have key', 'type');
      expect(Actions.downloadAsHTML().type, 'to be', Constants.DOWNLOAD_AS_HTML);
    });
  });

  describe('restartPage', () => {
    it('should be a function', () => {
      expect(Actions.restartPage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.restartPage(), 'to only have key', 'type');
      expect(Actions.restartPage().type, 'to be', Constants.RESTART_PAGE);
    });
  });

  describe('setPageTitle', () => {
    it('should be a function', () => {
      expect(Actions.setPageTitle, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.setPageTitle(), 'to have keys', 'type', 'title');
      expect(Actions.setPageTitle().type, 'to be', Constants.SET_PAGE_TITLE);
      expect(Actions.setPageTitle('123').title, 'to be', '123');
    });
  });

  describe('setPageFilename', () => {
    it('should be a function', () => {
      expect(Actions.setPageFilename, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.setPageFilename(), 'to have keys', 'type', 'filename');
      expect(Actions.setPageFilename().type, 'to be', Constants.SET_PAGE_FILENAME);
      expect(Actions.setPageFilename('123').filename, 'to be', '123');
    });
  });

  describe('importPage', () => {
    it('should be a function', () => {
      expect(Actions.importPage, 'to be a', 'function');
    });
  });

  describe('exportPage', () => {
    it('should be a function', () => {
      expect(Actions.exportPage, 'to be a', 'function');
    });
  });

  describe('deletePage', () => {
    it('should be a function', () => {
      expect(Actions.deletePage, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Actions.deletePage(), 'to have keys', 'type', 'id');
      expect(Actions.deletePage().type, 'to be', Constants.DELETE_PAGE);
      expect(Actions.deletePage('123').id, 'to be', '123');
    });
  });
});
