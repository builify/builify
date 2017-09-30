import expect from 'unexpected';
import Events from '../../src/javascript/events';

describe('Events', () => {
  it('should be a class', () => {
    expect(new Events(), 'to be a', 'object');
  });
});
