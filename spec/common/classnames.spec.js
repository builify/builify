import expect from 'unexpected';
import classNames from '../../source/javascript/common/classnames';

describe('ClassNames', () => {
  it('should be function', () => {
    expect(classNames, 'to be a', 'function');
  });

  it('should return correct value', () => {
    expect(classNames('test', 123), 'to be', 'ab-test 123');
  });
});
