import expect from 'unexpected';
import * as Constants from '../../source/javascript/constants';

describe('Constants', () => {
  describe('Template constants', () => {
    it('should be string', () => {
      expect(Constants.TEMPLATE_ASSETS_STORAGE_NAME, 'to be a', 'string');
      expect(Constants.TEMPLATE_PAGES_STORAGE_NAME, 'to be a', 'string');
      expect(Constants.TEMPLATE_PACKAGE_FILENAME, 'to be a', 'string');
      expect(Constants.TEMPLATE_PACKAGE_EXTENSION, 'to be a', 'string');
    });
  });

  describe('Page constants', () => {
    it('should be number', () => {
      expect(Constants.MAXIUMUM_PAGES_IN_STORAGE_DEMO, 'to be a', 'number');
      expect(Constants.MAXIUMUM_PAGES_IN_STORAGE_FULL, 'to be a', 'number');
      expect(Constants.MAXIUMUM_PAGES_IN_STORAGE, 'to be a', 'number');
    });
  });

  describe('Enums', () => {
    describe('Current locations', () => {
      it('should be object', () => {
        expect(Constants.CurrentLocations, 'to be a', 'object');
      });
    });

    describe('Preview modes', () => {
      it('should be object', () => {
        expect(Constants.PreviewModes, 'to be a', 'object');
      });
    });

    describe('Dialog types', () => {
      it('should be object', () => {
        expect(Constants.DialogTypes, 'to be a', 'object');
      });
    });

    describe('Colorpicker target types', () => {
      it('should be object', () => {
        expect(Constants.ColorPickerTargetTypes, 'to be a', 'object');
      });
    });
  });
});
