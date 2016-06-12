import expect from 'unexpected';
import localization from '../../source/javascript/common/localization';

describe('Localization', () => {
  it('should be function', () => {
    expect(localization, 'to be a', 'function');
  });

  it('should return correct value', () => {
    expect(localization('test'), 'to be', 'test');
  });
});
