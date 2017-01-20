import expect from 'unexpected';
import * as Misc from '../../source/javascript/common/misc';

describe('Common - Misc', () => {
  describe('emptyFunction', () => {
    it('should be a function', () => {
      expect(Misc.emptyFunction, 'to be a', 'function');
    });
  });

  describe('getExtension', () => {
    it('should be a function', () => {
      expect(Misc.getExtension, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Misc.getExtension('somefile.jpg'), 'to be a', 'string');
      expect(Misc.getExtension('somefile.jpg'), 'to be', 'jpg');
      expect(Misc.getExtension('somefile.png'), 'to be', 'png');
      expect(Misc.getExtension('somefile.123213.jpeeeeg.jpg.png'), 'to be', 'png');
      expect(Misc.getExtension('some---123123 file.png'), 'to be', 'png');
      expect(Misc.getExtension('somefile'), 'to be a', 'undefined');
    });
  });
});
