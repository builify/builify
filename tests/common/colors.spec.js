import expect from 'unexpected';
import * as Colors from '../../src/javascript/common/colors';

describe('Common - Colors', () => {
  describe('hex', () => {
    it('should be a function', () => {
      expect(Colors.hex, 'to be a', 'function');
    });
  });
  
  describe('rgbToHex', () => {
    it('should be a function', () => {
      expect(Colors.rgbToHex, 'to be a', 'function');
    });

    it('should return correct values', () => {
      expect(Colors.rgbToHex('somefile.jpg'), 'to be a', 'string');
      expect(Colors.rgbToHex('rgb(255, 255, 255)'), 'to be', '#ffffff');
      expect(Colors.rgbToHex('rgb(0, 0, 0)'), 'to be', '#000000');
      expect(Colors.rgbToHex('rgb(255, 255, 255, 1)'), 'to be', '#ffffff');
    });
  });
});
