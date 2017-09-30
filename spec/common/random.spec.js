import expect from 'unexpected';
import Random from '../../src/javascript/common/random';

describe('Random', () => {
  it('should be object', () => {
    expect(Random, 'to be a', 'object');
  });

  describe('randomString', () => {
    it('should be function', () => {
      expect(Random.randomString, 'to be a', 'function');
    });
  });

  describe('randomKey', () => {
    it('should be function', () => {
      expect(Random.randomKey, 'to be a', 'function');
    });

    it('should be return correct value', () => {
      for (let i = 0; i < 1000; i++) {
        expect(Random.randomKey('test'), 'to be', `test${i}`);
      }
    });
  });
});
